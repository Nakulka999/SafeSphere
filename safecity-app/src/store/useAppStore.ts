import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  emergencyContacts: Array<{ name: string; phone: string; email: string }>;
  medicalDetails?: string;
  safetyPreferences: {
    autoSOS: boolean;
    streamToTraccar: boolean;
    notifyNearbyVolunteers: boolean;
  };
}

export interface Responder {
  type: string;
  eta: string;
  unit: string;
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  type: "SOS" | "CRASH" | "FIRE" | "DISTRESS";
  userId: string;
  userName: string;
  location: Location;
  timestamp: string;
  riskScore: number;
  status: "active" | "resolved" | "false_alarm";
  evidenceUrls?: string[];
  agentAnalysis?: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  responders?: Responder[];
}

export interface Report {
  id: string;
  type: "POTHOLE" | "UNSAFE_ROAD" | "LOW_LIGHT" | "SUSPICIOUS";
  userId: string;
  location: Location;
  imageUrl?: string;
  severity: number;
  notes: string;
  timestamp: string;
  status: "pending" | "verified" | "resolved";
  upvotes: number;
}

interface AppState {
  // Data
  user: UserProfile | null;
  incidents: Incident[];
  reports: Report[];
  userId: string;
  
  // UI State
  mapMode: 'light' | 'dark';
  sosState: 'idle' | 'countdown' | 'active';
  safetyScore: number; // 0-100
  
  // Detection Probabilities (Agent 1 Output)
  detections: {
    screamProbability: number;
    fallDetected: boolean;
    fireProbability: number;
    keywordsDetected: string[];
  };

  // Actions
  setUser: (user: UserProfile | null) => void;
  setIncidents: (incidents: Incident[]) => void;
  setReports: (reports: Report[]) => void;
  setMapMode: (mode: 'light' | 'dark') => void;
  setSosState: (state: 'idle' | 'countdown' | 'active') => void;
  setSafetyScore: (score: number) => void;
  updateDetections: (detections: Partial<AppState['detections']>) => void;
  initBackend: () => () => void;
  setUserRole: (role: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    emergencyContacts: [],
    safetyPreferences: {
      autoSOS: true,
      streamToTraccar: true,
      notifyNearbyVolunteers: true
    }
  },
  incidents: [],
  reports: [],
  userId: "user_123",
  mapMode: 'light',
  sosState: 'idle',
  safetyScore: 10,
  detections: {
    screamProbability: 0,
    fallDetected: false,
    fireProbability: 0,
    keywordsDetected: []
  },

  setUser: (user) => set({ user }),
  setIncidents: (incidents) => set({ incidents }),
  setReports: (reports) => set({ reports }),
  setMapMode: (mapMode) => set({ mapMode }),
  setSosState: (sosState) => set({ sosState }),
  setSafetyScore: (safetyScore) => set({ safetyScore }),
  updateDetections: (newDetections) => set((state) => ({ 
    detections: { ...state.detections, ...newDetections } 
  })),

  // WebSocket Integration
  initBackend: () => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'EVENT') {
        set((state) => ({ incidents: [...state.incidents, data as any] }));
      } else if (type === 'SEVERITY') {
        set({ safetyScore: data.score });
      }
    };
    return () => socket.close();
  },
  setUserRole: (role) => console.log('Role set:', role)
}));
