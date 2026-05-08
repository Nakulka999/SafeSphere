import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      detections, // { screamProbability, fallDetected, fireProbability, keywordsDetected }
      userStatus, // "responsive" | "unresponsive"
      locationContext, // { isHighCrimeZone: boolean, isIndoor: boolean }
      environmentalSensors // { smokeIncreasing: boolean }
    } = body;

    let score = 0;

    // Point System Logic
    if (detections.screamProbability > 0.8) score += 30;
    if (detections.fallDetected) score += 20;
    if (userStatus === 'unresponsive') score += 40;
    if (locationContext.isHighCrimeZone) score += 15;
    if (detections.fireProbability > 0.6 && locationContext.isIndoor) score += 50;
    if (environmentalSensors.smokeIncreasing) score += 30;
    if (detections.keywordsDetected.length > 0) score += 25;

    // Severity Level Mapping
    let level = "LOW";
    if (score >= 86) level = "CRITICAL";
    else if (score >= 61) level = "HIGH";
    else if (score >= 31) level = "MODERATE";

    return NextResponse.json({
      score,
      severity: level,
      breakdown: {
        points: score,
        thresholds: "0-30: Low, 31-60: Moderate, 61-85: High, 86+: Critical"
      }
    });

  } catch (error) {
    console.error('Severity Agent Error:', error);
    return NextResponse.json({ error: 'Failed to calculate severity' }, { status: 500 });
  }
}
