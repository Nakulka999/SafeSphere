const TRACCAR_URL = process.env.NEXT_PUBLIC_TRACCAR_URL || 'http://localhost:8082';
const TRACCAR_EMAIL = process.env.NEXT_PUBLIC_TRACCAR_EMAIL || 'srimanikantapothu@gmail.com';
const TRACCAR_PASSWORD = process.env.NEXT_PUBLIC_TRACCAR_PASSWORD || 'psmk.2006';

// Helper to get Basic Auth header
const getAuthHeader = () => {
  return 'Basic ' + btoa(`${TRACCAR_EMAIL}:${TRACCAR_PASSWORD}`);
};

/**
 * Update the user's location in Traccar (Simulated device push)
 * For Traccar, usually you push location via OsmAnd protocol (port 5055) 
 * but here we use the REST API if permitted, or we just log it as a simulation for the MVP.
 */
export const pushLocationToTraccar = async (deviceId: number, lat: number, lng: number) => {
  try {
    // Some Traccar instances allow POST to /api/positions
    const response = await fetch(`${TRACCAR_URL}/api/positions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify({
        deviceId,
        latitude: lat,
        longitude: lng,
        altitude: 0,
        speed: 0,
        course: 0,
        network: null,
        attributes: {}
      })
    });

    if (!response.ok) {
      console.warn('Traccar push failed', await response.text());
    }
  } catch (error) {
    console.error('Error pushing to Traccar', error);
  }
};

/**
 * Fetch all live positions from Traccar (e.g., to show responders on admin map)
 */
export const fetchLivePositions = async () => {
  try {
    const response = await fetch(`${TRACCAR_URL}/api/positions`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch positions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Traccar positions', error);
    return [];
  }
};

/**
 * Fetch route history for a device
 */
export const fetchRouteHistory = async (deviceId: number, from: string, to: string) => {
  try {
    const response = await fetch(
      `${TRACCAR_URL}/api/reports/route?deviceId=${deviceId}&from=${from}&to=${to}`, 
      {
        headers: {
          'Authorization': getAuthHeader(),
          'Accept': 'application/json'
        }
      }
    );
    if (!response.ok) throw new Error('Failed to fetch route');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Traccar route', error);
    return [];
  }
};
