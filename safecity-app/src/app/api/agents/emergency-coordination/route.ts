import { NextResponse } from 'next/server';
import { generateDispatchMessage } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      incidentId,
      location,
      severity,
      riskScore,
      userId,
      userEmergencyContacts = []
    } = body;

    // Call Gemini API to generate a dispatch summary message
    const dispatchMessage = await generateDispatchMessage({
      severity,
      location,
      timestamp: new Date().toISOString(),
      riskScore
    });

    // Simulate nearest responder selection
    const generateOffset = () => (Math.random() - 0.5) * 0.02; // Roughly within ~1-2km
    const simulatedResponders = [
      {
        type: 'Police',
        eta: Math.floor(Math.random() * 5 + 2) + ' min',
        unit: 'Unit ' + Math.floor(Math.random() * 10) + 'B',
        lat: location.lat + generateOffset(),
        lng: location.lng + generateOffset()
      },
      {
        type: 'Ambulance',
        eta: Math.floor(Math.random() * 8 + 3) + ' min',
        unit: 'Medic ' + Math.floor(Math.random() * 5 + 1),
        lat: location.lat + generateOffset(),
        lng: location.lng + generateOffset()
      }
    ];

    // In a full implementation, we would use EmailJS or SendGrid here to send emails to userEmergencyContacts.
    // For this MVP API route, we return the generated data.
    const emailSent = userEmergencyContacts.length > 0;
    
    return NextResponse.json({
      dispatchMessage,
      simulatedResponders,
      emailSent,
      notificationsSent: emailSent ? userEmergencyContacts.length : 0
    });

  } catch (error) {
    console.error('Agent 2 Error:', error);
    return NextResponse.json({ error: 'Failed to coordinate emergency' }, { status: 500 });
  }
}
