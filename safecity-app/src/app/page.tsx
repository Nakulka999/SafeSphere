'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import MapView from '../components/MapView';
import Link from 'next/link';

export default function SentinelHome() {
  const { initBackend, incidents, safetyScore } = useAppStore();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  useEffect(() => {
    return initBackend();
  }, []);

  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 right-0 left-0 z-30 flex justify-between items-center px-8 py-4 w-full bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold text-primary">Sentinel</span>
          <div className="hidden md:flex gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1" href="/">Command Center</Link>
            <Link className="text-on-surface-variant hover:bg-surface-container-high/50 transition-colors px-2 rounded" href="/map">Live Map</Link>
            <Link className="text-on-surface-variant hover:bg-surface-container-high/50 transition-colors px-2 rounded" href="/admin">Admin</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-primary text-[18px]">sensors</span>
            <span className="font-mono text-xs text-on-surface-variant">Emergency Mode</span>
          </div>
          <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-bold transition-transform duration-200 active:scale-95">Quick SOS</button>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-high/50 rounded-full cursor-pointer">notifications</span>
            <img 
              alt="Chief Officer Profile" 
              className="w-10 h-10 rounded-full border border-outline-variant/30 object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPhjKcZx33EPrviS203d7R9G8tVEchvexuB-REjWirHLIbkOg2wfZhAvv0WM6fLLgdExETK0Q-d3iD9yvC0Qi6OF2i9dLX0RMUjlt3WPp2CxR1gSAi8Y9MsIsY_l2ycSf5zRmuRJyiQF5XOW3wa9wa2W3ctZo6fZwbWeBAfnxRPdF71vJDhdzZcg_146qsTd0G7mBz-_dHcz1cty1CWq_QNxl2isWml91zls_ayDzzoLb94oRN5CopeNamqN3U69uvfxNH_T0_iZ6_"
            />
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full z-40 bg-surface/60 backdrop-blur-xl border-r border-outline-variant/30 flex-col w-72 hidden md:flex pt-24 pb-8 px-4">
        <div className="flex flex-col gap-1 flex-grow">
          <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all" href="/">
            <span className="material-symbols-outlined">dashboard</span>Command Center
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all" href="/map">
            <span className="material-symbols-outlined">map</span>Live Map
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all" href="/admin">
            <span className="material-symbols-outlined">warning</span>Incidents
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all text-left">
            <span className="material-symbols-outlined">local_fire_department</span>Hotspots
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all text-left">
            <span className="material-symbols-outlined">construction</span>Emergency Tools
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all text-left">
            <span className="material-symbols-outlined">smart_toy</span>AI Assistant
          </button>
        </div>
        <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all text-left">
            <span className="material-symbols-outlined">help</span>Support
          </button>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 transition-all" href="/login">
            <span className="material-symbols-outlined">logout</span>Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="md:ml-72 pt-24 pb-12 px-8 min-h-screen">
        {/* Hero Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-2">Good morning, Chief.</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-mono text-xs text-on-surface uppercase">AI SYSTEM: ACTIVE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-[18px]">wifi</span>
                <span className="font-mono text-xs text-on-surface uppercase">ONLINE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-container rounded-full border border-secondary/10">
                <span className="text-xs font-bold text-on-secondary-container uppercase tracking-wider">Threat Level: Low/Stable</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all hover:brightness-110 active:scale-95">
              <span className="material-symbols-outlined">emergency_share</span>
              Quick SOS
            </button>
          </div>
        </div>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Core Metrics Column */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Cards */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant text-sm">Active Incidents</span>
                <span className="material-symbols-outlined text-primary opacity-50">analytics</span>
              </div>
              <div className="text-5xl font-bold text-primary">{incidents.length.toString().padStart(2, '0')}</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant text-sm">Current Risk Level</span>
                <span className="material-symbols-outlined text-primary opacity-50">show_chart</span>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary">{safetyScore}%</div>
                <div className="h-1 w-full bg-surface-container rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${safetyScore}%` }}></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant text-sm">Responders</span>
                <span className="material-symbols-outlined text-primary opacity-50">groups_3</span>
              </div>
              <div className="text-5xl font-bold text-primary">12 <span className="text-sm font-normal text-on-surface-variant">units</span></div>
            </div>

            {/* Detection Feed (Wide) */}
            <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">sensors</span> Real-time Detections
                </h3>
                <span className="font-mono text-sm text-primary">Live Updates</span>
              </div>
              <div className="p-0 max-h-[400px] overflow-y-auto">
                {incidents.slice().reverse().map((incident) => (
                  <div key={incident.id} className="p-6 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <div className="flex justify-between mb-2">
                      <span className={`flex items-center gap-2 font-bold text-sm ${incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'text-error' : 'text-primary'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${incident.severity === 'HIGH' || incident.severity === 'CRITICAL' ? 'bg-error' : 'bg-primary'}`}></span>
                        {incident.type}
                      </span>
                      <span className="font-mono text-sm text-on-surface-variant">
                        {new Date(incident.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-on-surface mb-3">{incident.agentAnalysis}</p>
                    <div className="flex gap-2">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-mono text-[11px]">ZONE A</span>
                      <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-mono text-[11px] uppercase">{incident.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  <span className="font-bold text-xs tracking-widest uppercase text-white/70">AI Reasoning</span>
                </div>
                <p className="text-2xl font-bold leading-tight mb-4">Elevated risk after 10 PM in District 4.</p>
                <p className="opacity-80 text-sm">Historical data indicates a 23% increase in incidents during these hours due to reduced patrol coverage and low visibility.</p>
              </div>
              <button className="mt-6 w-full py-2 border border-white/20 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">Adjust Patrols</button>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Map Preview */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 z-0">
                <MapView />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div>
                  <p className="text-white font-bold text-sm">Local Activity Map</p>
                  <p className="text-white/70 text-sm">Live Hotspots</p>
                </div>
                <Link href="/admin" className="material-symbols-outlined text-white p-2 bg-primary rounded-lg cursor-pointer">open_in_full</Link>
              </div>
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[18px]">campaign</span>
                  <span className="text-sm">Nearby</span>
                </div>
                <span className="text-2xl font-bold text-primary">04</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[18px]">car_crash</span>
                  <span className="text-sm">Crashes</span>
                </div>
                <span className="text-2xl font-bold text-primary">0</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                  <span className="text-sm">Fires</span>
                </div>
                <span className="text-2xl font-bold text-primary">01</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[18px]">person_check</span>
                  <span className="text-sm">Trust</span>
                </div>
                <span className="text-2xl font-bold text-primary">99%</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">bolt</span> Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full text-left px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 font-bold text-primary">
                    <span className="material-symbols-outlined">emergency</span> Trigger SOS
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 font-bold text-primary">
                    <span className="material-symbols-outlined">report_problem</span> Report Hazard
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-surface-container-low border border-outline-variant/10 rounded-lg flex items-center justify-between hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 font-bold text-primary">
                    <span className="material-symbols-outlined">share_location</span> Live Location
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-8 flex flex-wrap gap-8 items-center py-6 border-t border-outline-variant/20 opacity-60">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Last Sync</span>
            <span className="font-mono text-sm">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Threat Score</span>
            <span className="font-mono text-sm">STABLE - 12.5</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Sensor Status</span>
            <span className="font-mono text-sm text-primary">NOMINAL</span>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/30 px-6 py-3 flex justify-between items-center text-on-surface-variant">
        <Link className="flex flex-col items-center text-primary" href="/"><span className="material-symbols-outlined">dashboard</span><span className="text-[10px] mt-1 font-bold">Center</span></Link>
        <Link className="flex flex-col items-center" href="/map"><span className="material-symbols-outlined">map</span><span className="text-[10px] mt-1">Map</span></Link>
        <Link className="flex flex-col items-center" href="/admin"><span className="material-symbols-outlined">warning</span><span className="text-[10px] mt-1">AI</span></Link>
        <Link className="flex flex-col items-center" href="/profile"><span className="material-symbols-outlined">settings</span><span className="text-[10px] mt-1">Profile</span></Link>
      </nav>
    </div>
  );
}
