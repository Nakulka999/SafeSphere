from ultralytics import YOLO
import cv2
import numpy as np
import logging
from datetime import datetime

logger = logging.getLogger("VisionService")

class VisionDetector:
    def __init__(self):
        logger.info("Loading YOLOv8 Nano model...")
        # Note: This will download yolov8n.pt on first run
        self.model = YOLO('yolov8n.pt') 
        
        # In a real safety app, you'd use a custom model trained for fire/smoke
        # For this MVP, we represent the logic. 
        # YOLOv8n default classes: 0 is person, 56 is fire hydrant (no 'fire' by default)
        # We assume a fire-trained model 'fire.pt' would be used in production.

    def process_frame(self, frame_bytes):
        # Convert bytes to opencv image
        nparr = np.frombuffer(frame_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return None

        # Run inference
        results = self.model(img, conf=0.5, verbose=False)
        
        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Mock fire detection logic for demonstration 
                # (In production, 'fire' would be a specific class index)
                # Here we just look for high confidence objects
                b = box.xyxy[0].tolist()
                c = box.cls
                conf = float(box.conf)
                
                detections.append({
                    "fire_detected": True,
                    "confidence": conf,
                    "bbox": b,
                    "timestamp": datetime.now().isoformat()
                })

        return detections[0] if detections else None
