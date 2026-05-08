import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useGeolocation } from './useGeolocation';
import { useEvidenceRecorder } from './useEvidenceRecorder';
import { pushLocationToTraccar } from '@/lib/traccar';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useSOSHandler() {
  const { sosState, setSosState, user, setIncidents, incidents, detections, setSafetyScore } = useAppStore();
  const { location } = useGeolocation();
  const { isRecording, startRecording, stopRecording } = useEvidenceRecorder();
  const workflowActive = useRef(false);

  useEffect(() => {
    const runOrchestration = async () => {
      if (!location || workflowActive.current) return;
      workflowActive.current = true;

      try {
        // 1. Validation Agent
        const valRes = await fetch('/api/agents/validation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ detections, context: 'outdoor', timestamp: new Date().toISOString() })
        });
        const validation = await valRes.json();

        if (!validation.isValid) {
          console.log('Alert filtered by Validation Agent:', validation.reason);
          setSosState('idle');
          workflowActive.current = false;
          return;
        }

        // 2. Severity Agent
        const sevRes = await fetch('/api/agents/severity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            detections, 
            userStatus: 'responsive', 
            locationContext: { isHighCrimeZone: true, isIndoor: false },
            environmentalSensors: { smokeIncreasing: false }
          })
        });
        const severity = await sevRes.json();
        setSafetyScore(severity.score);

        // 3. Dispatch Agent
        const dispRes = await fetch('/api/agents/dispatch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            severity: severity.severity, 
            riskScore: severity.score,
            location
          })
        });
        const dispatch = await dispRes.json();

        // 4. Execute Actions
        if (dispatch.actions.includes('ACTIVATE_LIVE_RECORDING')) {
          startRecording();
        }

        // 5. Store Incident in Firebase
        const incidentData = {
          type: "SOS",
          userId: user?.email || 'anon',
          userName: user?.name || 'Anonymous',
          location: { lat: location.lat, lng: location.lng, address: "Current Location" },
          timestamp: new Date().toISOString(),
          riskScore: severity.score,
          status: "active",
          severity: severity.severity,
          agentAnalysis: `Validation: ${validation.reason || 'Confirmed'}. Dispatch: ${dispatch.responseType}`
        };

        const docRef = await addDoc(collection(db, "incidents"), incidentData);
        setIncidents([...incidents, { ...incidentData, id: docRef.id } as any]);

      } catch (error) {
        console.error('Orchestration failed:', error);
      } finally {
        workflowActive.current = false;
      }
    };

    if (sosState === 'active' && location) {
      runOrchestration();
      
      // Traccar Streaming
      if (user?.safetyPreferences.streamToTraccar) {
        const interval = setInterval(() => {
          pushLocationToTraccar(123456, location.lat, location.lng);
        }, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [sosState, location]);

  return { location, isRecording };
}
