import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      severity,
      riskScore,
      userProfile,
      location,
      evidenceReady
    } = body;

    let actions: string[] = [];
    let responseType = "SOFT_ALERT"; // Default

    // Decision Logic
    if (severity === 'CRITICAL') {
      responseType = "EMERGENCY_MODE";
      actions = [
        "ACTIVATE_LIVE_RECORDING",
        "NOTIFY_FAMILY_IMMEDIATELY",
        "ALERT_NEAREST_POLICE",
        "DISPATCH_AMBULANCE",
        "NOTIFY_NEARBY_VOLUNTEERS"
      ];
    } else if (severity === 'HIGH') {
      responseType = "EMERGENCY_MODE";
      actions = [
        "START_EVIDENCE_STORAGE",
        "NOTIFY_TRUSTED_CONTACTS",
        "TRIGGER_LIVE_GPS_STREAM"
      ];
    } else if (severity === 'MODERATE') {
      responseType = "SOFT_ALERT";
      actions = [
        "PROMPT_USER_CONFIRMATION",
        "MONITOR_SENSORS_INTENSELY"
      ];
    }

    return NextResponse.json({
      responseType,
      actions,
      nextStep: severity === 'LOW' ? "CONTINUE_MONITORING" : "INITIATE_WORKFLOW",
      orchestration: {
        familyNotified: severity === 'HIGH' || severity === 'CRITICAL',
        emergencyServicesAlerted: severity === 'CRITICAL'
      }
    });

  } catch (error) {
    console.error('Dispatch Agent Error:', error);
    return NextResponse.json({ error: 'Failed to orchestrate dispatch' }, { status: 500 });
  }
}
