import asyncio
import json
import logging
from datetime import datetime
from typing import List, Dict
  
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel

from .config import config
from services.audio_service import AudioDetector
from services.vision_service import VisionDetector
from services.validation_service import ValidationEngine

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("SafeCity-Backend")

app = FastAPI(title="SafeCity AI Intelligence Backend")

# In-memory stores
events_history = []
current_severity = {"level": "LOW", "score": 0}

# Initialize Services
audio_detector = AudioDetector()
vision_detector = VisionDetector()
validation_engine = ValidationEngine()

class SensorData(BaseModel):
    accel: Dict[str, float]
    gyro: Dict[str, float]
    timestamp: str

class AudioEvent(BaseModel):
    event: str
    confidence: float

class VisionEvent(BaseModel):
    fire_detected: bool
    confidence: float
    bbox: List[float]

# WebSocket Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.get("/status")
async def get_status():
    return {"status": "online", "timestamp": datetime.now().isoformat()}

@app.post("/sensor-data")
async def post_sensor_data(data: SensorData):
    # Handle Motion/Jerk Logic
    motion_event = validation_engine.process_motion(data.accel, data.gyro)
    if motion_event:
        events_history.append(motion_event)
        await manager.broadcast(json.dumps({"type": "EVENT", "data": motion_event}))
        update_severity()
    return {"status": "received"}

@app.post("/audio-event")
async def post_audio_event(event: AudioEvent):
    logger.info(f"Audio event received: {event.event} ({event.confidence})")
    processed_event = {
        "type": "audio",
        "event": event.event,
        "confidence": event.confidence,
        "timestamp": datetime.now().isoformat()
    }
    events_history.append(processed_event)
    await manager.broadcast(json.dumps({"type": "EVENT", "data": processed_event}))
    update_severity()
    return {"status": "processed"}

@app.get("/severity")
async def get_severity():
    return current_severity

@app.get("/events")
async def get_events():
    return events_history[-50:] # Return last 50 events

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming client messages if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket)

def update_severity():
    global current_severity
    current_severity = validation_engine.calculate_severity(events_history)
    asyncio.create_task(manager.broadcast(json.dumps({"type": "SEVERITY", "data": current_severity})))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
