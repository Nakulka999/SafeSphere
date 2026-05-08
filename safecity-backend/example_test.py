import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_status():
    print("Testing /status...")
    r = requests.get(f"{BASE_URL}/status")
    print(r.json())

def test_audio_event():
    print("\nTesting /audio-event (Simulating Scream)...")
    payload = {
        "event": "Screaming",
        "confidence": 0.92
    }
    r = requests.post(f"{BASE_URL}/audio-event", json=payload)
    print(r.json())

def test_motion_data():
    print("\nTesting /sensor-data (Simulating Impact)...")
    payload = {
        "accel": {"x": 10.5, "y": 2.1, "z": 35.5},
        "gyro": {"x": 0.1, "y": 0.5, "z": 0.2},
        "timestamp": "2026-05-08T12:00:00Z"
    }
    r = requests.post(f"{BASE_URL}/sensor-data", json=payload)
    print(r.json())

def test_severity():
    print("\nChecking Severity after events...")
    r = requests.get(f"{BASE_URL}/severity")
    print(f"Current Severity: {r.json()}")

if __name__ == "__main__":
    try:
        test_status()
        test_audio_event()
        test_motion_data()
        test_severity()
    except Exception as e:
        print(f"Error: {e}. Is the server running on port 8000?")
