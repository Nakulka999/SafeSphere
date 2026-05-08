'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import MapView from '../../components/MapView';
import Link from 'next/link';

export default function AdminDashboard() {
  const { incidents, initBackend, setIncidents } = useAppStore();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  useEffect(() => {
    initBackend();
  }, []);

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[incidents.length - 1];

  const simulateAlert = () => {
    const newIncident = {
      id: 'sim-' + Date.now(),
      type: "FIRE" as const,
      userId: "user_sim",
      userName: "Simulation Bot",
      location: { lat: 12.9716, lng: 77.5946 },
      timestamp: new Date().toISOString(),
      riskScore: 85,
      status: "active" as const,
      severity: "HIGH" as const,
      agentAnalysis: "YOLOv8 detected fire (conf: 0.89) in residential zone. Multi-agent validation: Confirmed."
    };
    setIncidents([...incidents, newIncident]);
    setSelectedIncidentId(newIncident.id);
  };

  return (
    <div className="bg-background text-on-background font-body-base overflow-hidden h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full z-40 bg-surface/60 backdrop-blur-xl w-72 flex flex-col border-r border-outline-variant/30">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-primary">Sentinel</h1>
          <p className="text-xs text-on-surface-variant">Public Safety Dashboard</p>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors rounded-lg" href="/">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Command Center</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors rounded-lg" href="/map">
            <span className="material-symbols-outlined">map</span>
            <span className="text-sm">Live Map</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="/admin">
            <span className="material-symbols-outlined">warning</span>
            <span className="text-sm">Incidents</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors rounded-lg w-full text-left">
            <span className="material-symbols-outlined">local_fire_department</span>
            <span className="text-sm">Hotspots</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors rounded-lg w-full text-left">
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-sm">AI Assistant</span>
          </button>
        </nav>
        <div className="px-4 py-6 border-t border-outline-variant/30 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors rounded-lg" href="/login">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 flex flex-col h-full bg-surface">
        {/* TopAppBar */}
        <header className="h-20 flex justify-between items-center px-8 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30 z-30">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search incidents..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={simulateAlert}
              className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/20 transition-all mr-2"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              Simulate Alert
            </button>
            <button className="px-4 py-2 bg-error text-white rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[20px]">emergency</span>
              Quick SOS
            </button>
            <div className="h-10 w-10 rounded-full bg-primary-fixed border border-outline-variant overflow-hidden">
              <img alt="Officer Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoIlb4cGCA5ma_DagLIuD4ayDJbOPIiY2OR0MVs7gdKCs34mEUYYB7jR7HzoRv6NgRhh3jP-YT_S7EpFllZQABTq5g8dW_T_Z9wX53vI3iOyoASVNPF_Ce-PF4FzHigj_3fI92wk9KqCnNRznyY2HGko1y-hJ7zGRCg4EsNn7BncfinXl8It-UtiIHDanoipuiKCHgGaYEsfVeNqqXVDCZebRUfhPX0jxRmtuAWMzc30x71Ad5B6STEQ7AlNFlrPrxVv8KQn2fGOB7"/>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 overflow-hidden flex gap-0">
          {/* Incident List Pane */}
          <section className="w-[420px] border-r border-outline-variant/30 flex flex-col bg-surface-container-low">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Active Events</h2>
              <div className="flex gap-2 p-1 bg-surface-container border border-outline-variant/50 rounded-xl mb-4">
                <button className="flex-1 py-1.5 text-xs font-bold bg-white text-primary rounded-lg shadow-sm">Active</button>
                <button className="flex-1 py-1.5 text-xs text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg">Resolved</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
              {incidents.slice().reverse().map((incident) => (
                <div 
                  key={incident.id} 
                  onClick={() => setSelectedIncidentId(incident.id)}
                  className={`p-4 border-2 rounded-xl relative cursor-pointer transition-all ${selectedIncidentId === incident.id || (!selectedIncidentId && incident === incidents[incidents.length-1]) ? 'bg-surface border-primary' : 'bg-surface/50 border-outline-variant/30 opacity-80 hover:opacity-100'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-mono text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 ${incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'text-error' : 'text-primary'}`}>
                      <span className={`w-2 h-2 rounded-full animate-pulse ${incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'bg-error' : 'bg-primary'}`}></span> 
                      {incident.severity} ALERT
                    </span>
                    <span className="font-mono text-[11px] text-on-surface-variant">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <h3 className="font-bold mb-1">{incident.type} Detected</h3>
                  <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{incident.agentAnalysis}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-surface-container-high p-2 rounded-lg">
                      <p className="text-[9px] text-on-surface-variant uppercase font-bold text-white/70">Confidence</p>
                      <p className="font-mono text-xs">{(incident.riskScore || 85)}%</p>
                    </div>
                    <div className="bg-surface-container-high p-2 rounded-lg">
                      <p className="text-[9px] text-on-surface-variant uppercase font-bold text-white/70">Source</p>
                      <p className="font-mono text-xs uppercase">{incident.userId === 'user_sim' ? 'IoT Sensor' : 'Citizen'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detail Pane */}
          <section className="flex-1 flex flex-col overflow-hidden">
            {selectedIncident ? (
              <>
                {/* Detail Header */}
                <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-white">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedIncident.severity === 'HIGH' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                        {selectedIncident.severity} Intervention
                      </span>
                      <span className="font-mono text-xs text-on-surface-variant">#INC-{selectedIncident.id.split('-')[1] || '44921'}</span>
                    </div>
                    <h2 className="text-3xl font-extrabold">{selectedIncident.type} Emergency</h2>
                    <p className="text-sm text-on-surface-variant mt-1">Zone 4-B • Lat: {selectedIncident.location.lat.toFixed(4)} • Lng: {selectedIncident.location.lng.toFixed(4)}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 border border-primary text-primary font-bold rounded-xl active:scale-95 transition-transform hover:bg-surface-container-low">Request Backup</button>
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform hover:bg-primary-container">Dispatch Units</button>
                  </div>
                </div>

                {/* Detail Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Col: Map & Reasoning */}
                    <div className="col-span-8 space-y-6">
                      <div className="aspect-video bg-surface-container-highest rounded-2xl relative overflow-hidden border border-outline-variant/30">
                        <div className="absolute inset-0 grayscale opacity-40">
                          <MapView />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/40 z-10">
                          <p className="font-mono text-[9px] uppercase font-bold text-on-surface-variant mb-1">Live Coordinates</p>
                          <p className="font-mono text-xs">{selectedIncident.location.lat.toFixed(6)}, {selectedIncident.location.lng.toFixed(6)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* AI Reasoning */}
                        <div className="p-6 bg-surface-container-low border border-outline-variant rounded-2xl">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">psychology</span>
                            AI Reasoning Agent
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs mb-1 font-bold">
                                <span>Threat Probability</span>
                                <span className="font-mono text-error">{selectedIncident.riskScore}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-surface-container-highest rounded-full">
                                <div className="h-full bg-error rounded-full transition-all duration-1000" style={{ width: `${selectedIncident.riskScore}%` }}></div>
                              </div>
                            </div>
                            <p className="text-sm text-on-surface-variant italic leading-relaxed border-l-2 border-primary pl-4">
                              "{selectedIncident.agentAnalysis}"
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              <span className="bg-surface-container-highest text-[10px] px-2 py-1 rounded font-mono uppercase">Multi-Agent Verified</span>
                              <span className="bg-surface-container-highest text-[10px] px-2 py-1 rounded font-mono uppercase">Priority Dispatch</span>
                            </div>
                          </div>
                        </div>

                        {/* Dispatch Status */}
                        <div className="p-6 bg-surface-container-low border border-outline-variant rounded-2xl">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">hail</span>
                            Dispatch Status
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                                  <span className="material-symbols-outlined">local_police</span>
                                </div>
                                <div>
                                  <p className="text-sm font-bold">Unit 42-Echo</p>
                                  <p className="text-[10px] text-on-surface-variant uppercase">Officer J. Vance</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-primary">ETA: 2m 14s</span>
                            </div>
                            <button className="w-full py-2 bg-surface-container border border-outline-variant text-xs font-bold rounded-lg hover:bg-surface-container-highest transition-colors">Assign Secondary Unit</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Col: Timeline & Evidence */}
                    <div className="col-span-4 space-y-6">
                      <div className="p-6 bg-white border border-outline-variant rounded-2xl flex-1">
                        <h4 className="font-bold mb-6 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">history</span>
                          Threat Timeline
                        </h4>
                        <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
                          <div className="relative">
                            <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full border-4 border-white bg-error ring-4 ring-error/20"></span>
                            <p className="font-mono text-[10px] text-on-surface-variant mb-1">NOW</p>
                            <p className="text-sm font-bold">Incident Ongoing</p>
                            <p className="text-[11px] text-on-surface-variant">AI Monitoring for changes.</p>
                          </div>
                          <div className="relative opacity-60">
                            <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full border-4 border-white bg-primary"></span>
                            <p className="font-mono text-[10px] text-on-surface-variant mb-1">T-2 MIN</p>
                            <p className="text-sm font-bold">Agents Triggered</p>
                            <p className="text-[11px] text-on-surface-variant">YOLOv8/YAMNet consensus achieved.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-white border border-outline-variant rounded-2xl">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">photo_library</span>
                          Evidence Vault
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-outline-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary/40 text-3xl">videocam</span>
                          </div>
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-outline-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary/40 text-3xl">graphic_eq</span>
                          </div>
                          <div className="aspect-square border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-xs">add</span>
                            <span className="text-[10px] font-bold mt-1 uppercase">Attach</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
                <p>Select an incident to view deep analysis</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
