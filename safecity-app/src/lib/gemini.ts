import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || 'dummy_key';
const genAI = new GoogleGenerativeAI(apiKey);

// We'll use the gemini-1.5-flash model as requested
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Generate a short narrative summarizing the threat assessment.
 */
export async function generateThreatNarrative(sensorData: any): Promise<string> {
  const prompt = `A distress signal has been detected with the following sensor readings: ${JSON.stringify(sensorData)}. 
In 2 sentences, describe the likely scenario and urgency level. 
Respond in plain English for a dispatch operator.`;

  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error (Threat Narrative):', error);
    return 'Emergency distress signal detected. Immediate attention may be required based on anomalous sensor readings.';
  }
}

/**
 * Generate a dispatch summary message for emergency contacts.
 */
export async function generateDispatchMessage(incidentData: any): Promise<string> {
  const prompt = `An emergency incident of severity ${incidentData.severity} has been detected at ${incidentData.location.address || 'GPS ' + incidentData.location.lat + ',' + incidentData.location.lng} 
at ${incidentData.timestamp}. Risk score: ${incidentData.riskScore}/100. 
Write a 3-sentence dispatch notification for emergency contacts 
that includes the location, urgency, and what they should do. Keep it calm but clear.`;

  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error (Dispatch Message):', error);
    return `Emergency alert triggered at ${incidentData.location.address || 'current location'}. Please attempt to contact the individual immediately. If unreachable, authorities may need to be notified.`;
  }
}

/**
 * Generate a proactive safety tip based on historical data.
 */
export async function generateSafetyWarning(historicalData: any, address: string, dayOfWeek: string, timeRange: string): Promise<string> {
  const prompt = `Based on historical safety data, the area near ${address} has had ${historicalData.incidentCount} incidents 
on ${dayOfWeek} evenings between ${timeRange}. 
Write one short proactive safety tip for a user currently in or heading to this area. 
Keep it under 25 words. Be specific, not generic.`;

  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error (Safety Warning):', error);
    return 'Exercise caution in this area during late hours due to historical incident patterns.';
  }
}
