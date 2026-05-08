import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      detections,
      context, // e.g., "indoors", "home", "night"
      movementPattern,
      userInteraction, // Did they dismiss previous alerts?
      timestamp
    } = body;

    // Logic for false-positive reduction
    let isValid = true;
    let confidence = 0.8;
    let reasoning = "";

    // Example check: Phone drop vs Real fall
    if (detections.fallDetected && movementPattern === 'single_impact_no_rotation') {
      isValid = false;
      confidence = 0.4;
      reasoning = "Impact pattern resembles a simple phone drop rather than a human fall.";
    }

    // Example check: TV scream vs Real scream
    if (detections.screamProbability > 0.7 && context === 'home' && userInteraction === 'ignored') {
      isValid = false;
      confidence = 0.3;
      reasoning = "Environmental noise or media detected in a safe zone with no user reaction.";
    }

    // Example check: Campfire vs Fire alert
    if (detections.fireProbability > 0.5 && context === 'outdoors' && timestamp.includes('20:00')) {
      isValid = true;
      confidence = 0.6; // Moderate confidence
      reasoning = "Fire detected outdoors at night; validating against smoke density.";
    }

    return NextResponse.json({
      isValid,
      confidence,
      reasoning,
      filteredDetections: isValid ? detections : {}
    });

  } catch (error) {
    console.error('Validation Agent Error:', error);
    return NextResponse.json({ error: 'Failed to validate alert' }, { status: 500 });
  }
}
