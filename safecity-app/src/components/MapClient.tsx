import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppStore } from '../store/useAppStore';
import { Info } from 'lucide-react';

const HOTSPOTS = [
  { lat: 12.9716, lng: 77.5946, radius: 500, color: 'red', label: 'High Crime Zone' },
  { lat: 12.9279, lng: 77.6271, radius: 400, color: 'orange', label: 'Accident Prone' }
];

// Fix leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const incidentIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const reportIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapClient() {
  const { incidents, reports, mapMode } = useAppStore();
  
  const mapUrl = mapMode === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const defaultCenter = [12.9716, 77.5946] as [number, number]; // Bangalore default

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        url={mapUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Hotspots / Heatmap Visualization */}
      {HOTSPOTS.map((hotspot, idx) => (
        <Circle
          key={`hotspot-${idx}`}
          center={[hotspot.lat, hotspot.lng]}
          radius={hotspot.radius}
          pathOptions={{ 
            color: hotspot.color, 
            fillColor: hotspot.color, 
            fillOpacity: 0.15,
            weight: 1,
            dashArray: '5, 5'
          }}
        >
          <Popup>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-tight">
              <Info className="w-3 h-3" />
              {hotspot.label}
            </div>
          </Popup>
        </Circle>
      ))}

      {/* Incidents (SOS, CRASH, FIRE, DISTRESS) */}
      {incidents.map((incident) => (
        <Marker 
          key={incident.id} 
          position={[incident.location.lat, incident.location.lng]}
          icon={incidentIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-red-600">{incident.type} Alert</h3>
              <p className="text-sm">Risk Score: {incident.riskScore}/100</p>
              <p className="text-xs text-gray-500">{new Date(incident.timestamp).toLocaleTimeString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Citizen Reports */}
      {reports.map((report) => (
        <Marker 
          key={report.id} 
          position={[report.location.lat, report.location.lng]}
          icon={reportIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-amber-600">{report.type}</h3>
              <p className="text-sm">{report.notes}</p>
              <p className="text-xs text-gray-500">Severity: {report.severity}/5</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
    </MapContainer>
  );
}
