'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import MapView from '../../components/MapView';
import Link from 'next/link';

export default function LiveMapPage() {
  const { incidents, initBackend } = useAppStore();
  const [layers, setLayers] = useState({
    crime: true,
    accidents: true,
    fire: true,
    responders: true,
    lighting: false
  });

  useEffect(() => {
    initBackend();
  }, []);

  return (
    <div className="bg-background text-on-surface overflow-hidden h-screen flex flex-col">
      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 left-0 z-30 flex justify-between items-center px-8 py-4 w-full bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-extrabold text-primary">Sentinel</h1>
          <div className="hidden md:flex gap-6 ml-4">
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" href="/">Command Center</Link>
            <Link className="text-primary font-bold border-b-2 border-primary pb-1" href="/map">Live Map</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" href="/admin">Incidents</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-error text-white font-bold rounded-lg transition-transform active:scale-95 shadow-md">Quick SOS</button>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
            <img alt="Officer" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC5Gne3t6G9Npt1p8bQ8I-8COQBES47kSJB81bCKMWBnCvC2BQvxuHzeW8sEzhE1m4Mi-I-_h7bDwNyfE06Ac_ctoRAXqKCuj-dutLYQbU07ftfmzo1Wcrr2dBGIiYFGjKUU6mnTjpC3dymwCCNAVfl7uWJI1nYAkDEF4Jxwzhsw8B29Mjt4sR59FOnqp207fRZ4ghoieWYoMt1N-dGhbXeuedHVSjxHzQ2TbOgDDId-f5-DICVRwWdaNOeRMoA5UYFLZqYTDPEFP8"/>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-20 overflow-hidden relative">
        {/* Full Screen Map */}
        <div className="absolute inset-0 z-0">
          <MapView />
        </div>

        {/* Floating Layer Controls */}
        <div className="absolute top-6 left-6 z-20 w-72 space-y-4">
          <div className="bg-surface/90 backdrop-blur-xl p-6 rounded-2xl border border-outline-variant/30 shadow-2xl">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">layers</span> Map Intelligence
            </h3>
            <div className="space-y-3">
              {Object.entries(layers).map(([key, val]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors capitalize">{key.replace('_', ' ')}</span>
                  <input 
                    type="checkbox" 
                    checked={val} 
                    onChange={() => setLayers(prev => ({ ...prev, [key]: !val }))}
                    className="w-10 h-5 bg-surface-container-highest rounded-full appearance-none checked:bg-primary relative transition-colors cursor-pointer after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full after:transition-transform checked:after:translate-x-5"
                  />
                </label>
              ))}
            </div>
            <div className="h-[1px] bg-outline-variant/20 my-4"></div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-widest">Global Filters</p>
              <select className="w-full bg-surface-container-low border-none rounded-lg py-2 text-xs font-bold text-primary focus:ring-1 focus:ring-primary">
                <option>Severity: All Levels</option>
                <option>Severity: High Only</option>
                <option>Severity: Critical Only</option>
              </select>
            </div>
          </div>

          {/* AI Risk Panel */}
          <div className="bg-primary text-on-primary p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Predictive Danger</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">Medium Risk</p>
              <p className="text-xs opacity-80 italic">"Broadway & 4th intersection shows high congestion + 2 recent audio anomalies."</p>
            </div>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-all">
              Calculate Safest Route
            </button>
          </div>
        </div>

        {/* Floating Zoom Controls */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
          <div className="bg-surface/90 backdrop-blur-md p-2 rounded-xl border border-outline-variant/30 flex flex-col shadow-lg">
            <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"><span className="material-symbols-outlined">add</span></button>
            <div className="h-[1px] bg-outline-variant/30 my-1 mx-2"></div>
            <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"><span className="material-symbols-outlined">remove</span></button>
          </div>
          <button className="bg-surface/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 shadow-lg hover:bg-white transition-colors">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Bottom Legend (Mobile Friendly) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-auto max-w-lg">
          <div className="bg-surface/90 backdrop-blur-xl px-8 py-3 rounded-full border border-outline-variant/30 shadow-2xl flex items-center gap-8 whitespace-nowrap overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error animate-pulse"></div>
              <span className="text-xs font-bold">Fire/Emergency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs font-bold">Responders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xs font-bold">High Crime Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold">Safe Hotspots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
