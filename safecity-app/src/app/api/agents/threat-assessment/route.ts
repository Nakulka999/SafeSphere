import { NextResponse } from 'next/server';
import { generateThreatNarrative } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      audioAmplitude = 0,
      motionMagnitude = 0,
      timeOfDay = "12:00",
      locationRiskHistory = 0,
      userReportedKeyword = "",
      nearbyIncidentCount = 0,
      distanceToHotspot = 1000
    } = body;

    // Agent 1 Heuristic Logic
    let baseScore = 0;

    if (audioAmplitude > 0.8) baseScore += 35;
    if (motionMagnitude > 15) baseScore += 30;
    
    const keywords = userReportedKeyword.toLowerCase();
    if (keywords.includes('help') || keywords.includes('scream') || keywords.includes('police')) {
      baseScore += 25;
    }

    // Parse time to check if it's late night (22:00 to 05:00)
    const hour = parseInt(timeOfDay.split(':')[0] || '12', 10);
    if (hour >= 22 || hour <= 5) baseScore += 10;

    if (nearbyIncidentCount > 1) baseScore += 10;
    if (distanceToHotspot < 200) baseScore += 15;
    if (locationRiskHistory > 2) baseScore += 10;

    const riskScore = Math.min(100, baseScore);

    // Determine Severity
    let severity = 'low';
    if (riskScore > 30 && riskScore <= 60) severity = 'medium';
    else if (riskScore > 60 && riskScore <= 85) severity = 'high';
    else if (riskScore > 85) severity = 'critical';

    // Determine Action
    let recommendedAction = 'MONITOR';
    if (riskScore > 80) recommendedAction = 'DISPATCH_ALERT';
    else if (riskScore < 20) recommendedAction = 'FALSE_ALARM';

    // Call Gemini API to generate narrative
    const narrative = await generateThreatNarrative(body);

    return NextResponse.json({
      riskScore,
      severity,
      narrative,
      recommendedAction
    });

  } catch (error) {
    console.error('Agent 1 Error:', error);
    return NextResponse.json({ error: 'Failed to assess threat' }, { status: 500 });
  }
}
