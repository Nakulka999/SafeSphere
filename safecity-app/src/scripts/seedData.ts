// npx ts-node src/scripts/seedData.ts
// Seeds initial hotspots and dummy incidents for demo purposes

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DUMMY_INCIDENTS = [
  {
    type: "SOS",
    userName: "Riya Sharma",
    location: { lat: 12.9784, lng: 77.5906 }, // Cubbon Park area
    timestamp: new Date().toISOString(),
    riskScore: 82,
    status: "active",
    severity: "high",
    agentAnalysis: "Anomalous audio amplitude detected near a high-frequency incident zone."
  },
  {
    type: "CRASH",
    userName: "Motorist 712",
    location: { lat: 12.9611, lng: 77.5855 }, // Richmond Road
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    riskScore: 94,
    status: "resolved",
    severity: "critical",
    agentAnalysis: "Deceleration spike of 22m/s² recorded. Impact confirmed via GPS correlation."
  }
];

const DUMMY_HOTSPOTS = [
  {
    center: { lat: 12.9716, lng: 77.5946 },
    radius: 500,
    incidentCount: 12,
    category: "crime",
    riskLevel: "high"
  },
  {
    center: { lat: 12.9279, lng: 77.6271 }, // Koramangala
    radius: 400,
    incidentCount: 5,
    category: "road_hazard",
    riskLevel: "medium"
  }
];

async function seed() {
  console.log('Seeding demo data...');
  
  for (const incident of DUMMY_INCIDENTS) {
    await addDoc(collection(db, "incidents"), incident);
  }
  
  for (const hotspot of DUMMY_HOTSPOTS) {
    await addDoc(collection(db, "hotspots"), hotspot);
  }
  
  console.log('Seeding complete.');
}

// seed().catch(console.error);
