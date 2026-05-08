# 🛡️ SafeCity: Multi-Agent AI Safety Infrastructure

SafeCity is a comprehensive public safety platform that leverages autonomous AI agents to detect, validate, and respond to emergencies in real-time.

## ✨ Features

- **Multi-Agent Orchestration**: A 4-agent pipeline (Detection, Validation, Severity, Dispatch) ensuring high-precision emergency response.
- **Real-time AI Integration**:
  - **Audio (YAMNet)**: Detects screams, sirens, and distress.
  - **Vision (YOLOv8)**: Detects fire and smoke from camera feeds.
  - **Motion**: Detects falls, vehicle impacts, and violent motion.
- **Admin Command Center**: Real-time incident feed, geospatial mapping, and automated dispatch.
- **Citizen SOS**: One-tap emergency alerting with automatic evidence recording (Audio/Video).
- **Citizen Reporting**: Report infrastructure hazards (potholes, unsafe lighting) with GPS-tagged reports.

## 🏗️ Architecture

### AI Backend (Python/FastAPI)
Located in `/safecity-backend`. Handles heavy compute tasks:
- **TensorFlow Hub (YAMNet)**: Global-standard audio event classification.
- **Ultralytics (YOLOv8)**: State-of-the-art vision detection.
- **Validation Engine**: Heuristic and physics-based cross-signal correlation.

### Dashboard (Next.js)
Located in `/safecity-app`. The user interface for citizens and administrators:
- **Zustand**: Global state management.
- **Framer Motion**: Premium, smooth UI transitions.
- **WebSockets**: Live bidirectional data streaming.

## 🚀 Getting Started

### 1. Start the AI Backend
```bash
cd safecity-backend
# Install dependencies
pip install -r requirements.txt
# Run the server
python -m app.main
```

### 2. Start the Next.js App
```bash
cd safecity-app
# Install dependencies
npm install
# Run the dev server
npm run dev
```

## 📜 Multi-Agent Logic
1. **Detection**: Sensors capture raw data (Mic, Cam, IMU).
2. **Validation**: Filters noise (e.g., distinguishing a TV siren from a real ambulance).
3. **Severity**: Assigns a risk score (0-100) based on signal intensity and historical context.
4. **Dispatch**: Triggers appropriate workflows (Police, Fire, Ambulance, or Volunteers).

---
*Built for the Public Safety Hackathon 2026*
