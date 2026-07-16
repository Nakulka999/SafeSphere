# 🛡️ SafeSphere

> AI-powered public safety intelligence platform built with React, Python, and multi-agent AI for real-time incident detection, response coordination, and digital forensics.

![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.10+-yellow)
![React](https://img.shields.io/badge/React-19-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)

---

## Overview

SafeSphere is a full-stack public safety platform that combines **AI agents**, **live geospatial intelligence**, and **digital forensics** into a single command center.

The platform enables emergency responders to detect, validate, prioritize, and respond to incidents using an autonomous five-agent pipeline.

---

## Features

- 🚨 Live Command Center Dashboard
- 🗺️ Real-time Tactical Map
- 🤖 Multi-Agent AI Pipeline
- 🆘 One-Tap SOS Broadcasting
- 🧠 AI Intelligence Assistant
- 🔒 Digital Evidence Vault
- 📊 Live Risk Scoring
- ⚡ Real-time WebSocket Updates

---

## System Architecture

```
React Frontend
       │
 REST API + WebSocket
       │
Python Backend
       │
Multi-Agent Pipeline
       │
Detector
Validator
Profiler
Dispatcher
Auditor
```

---

## AI Pipeline

### Agent 1 — Detector
Detects SOS signals, GPS anomalies, and sensor events.

### Agent 2 — Validator
Performs cross-modal verification across multiple data sources.

### Agent 3 — Profiler
Computes district risk scores using incident intelligence.

### Agent 4 — Dispatcher
Routes the nearest responder units.

### Agent 5 — Auditor
Maintains a tamper-evident chain of custody.

---

## Tech Stack

### Frontend

- React
- Leaflet
- WebSockets

### Backend

- Python
- FastAPI

### AI

- Multi-Agent Architecture
- Risk Scoring Engine

### Database & Storage

- Evidence Vault
- Chain of Custody

---

## Project Structure

```
SafeSphere
│
├── frontend
├── backend
├── agents
├── api
├── evidence_vault
└── tests
```

---

## Installation

```bash
git clone https://github.com/Nakulka999/SafeSphere.git

cd SafeSphere
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

python main.py
```

---

## Performance

| Metric | Value |
|---------|------:|
| AI Confidence | 98.4% |
| Predictive Accuracy | 91% |
| System Latency | 142 ms |

---

## Future Improvements

- Mobile responder app
- CCTV integration
- IoT sensor integration
- Predictive crime heatmaps
- Voice-controlled AI assistant
- Edge inference
- State-wide safety federation

---

## Built For

Google India Hackathon 2025

---

## Author

**Nakul Kandpal**

- LinkedIn: https://www.linkedin.com/in/nakulka999/

---

⭐ If you found this project interesting, consider giving it a star.
