'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import MapView from '../../components/MapView';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'card';
  cardData?: any;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Good afternoon, Chief. System diagnostics are green. I have processed 1,240 data points in the last 15 minutes. How can I assist with public safety operations today?',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsThinking(true);

    // Simulate AI response for the demo
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Analysis complete. I've identified a localized high-density incident near Broadway & 4th. I recommend taking the Western Perimeter Route. It adds 4 minutes to your travel time but bypasses three active hotspots.",
        type: 'card',
        cardData: {
          risk: 'Medium',
          confidence: '94%',
          traffic: 'Nominal',
          incidentDelta: '+12% (1h)'
        }
      }]);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface overflow-hidden h-screen flex flex-col">
      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 left-0 z-30 flex justify-between items-center px-8 py-4 w-full bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-extrabold text-primary">Sentinel</h1>
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary" placeholder="Search incidents..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary-container text-on-primary-container font-bold rounded-lg transition-transform active:scale-95">Quick SOS</button>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
            <img alt="Officer" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC5Gne3t6G9Npt1p8bQ8I-8COQBES47kSJB81bCKMWBnCvC2BQvxuHzeW8sEzhE1m4Mi-I-_h7bDwNyfE06Ac_ctoRAXqKCuj-dutLYQbU07ftfmzo1Wcrr2dBGIiYFGjKUU6mnTjpC3dymwCCNAVfl7uWJI1nYAkDEF4Jxwzhsw8B29Mjt4sR59FOnqp207fRZ4ghoieWYoMt1N-dGhbXeuedHVSjxHzQ2TbOgDDId-f5-DICVRwWdaNOeRMoA5UYFLZqYTDPEFP8"/>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-20 overflow-hidden">
        {/* SideNavBar Shell */}
        <aside className="w-72 bg-surface/60 backdrop-blur-xl border-r border-outline-variant/30 flex flex-col">
          <div className="p-6 pb-2">
            <h2 className="text-xl font-bold text-primary">Sentinel</h2>
            <p className="text-xs text-on-surface-variant">Public Safety Dashboard</p>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-all" href="/">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Command Center</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-all" href="/map">
              <span className="material-symbols-outlined">map</span>
              <span className="text-sm">Live Map</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold" href="/ai">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="text-sm">AI Assistant</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left: Chat Interface */}
          <section className="w-2/5 h-full flex flex-col bg-surface border-r border-outline-variant/20 shadow-sm relative z-10">
            <div className="px-8 py-6 border-b border-outline-variant/10">
              <h3 className="text-xl font-bold text-primary">Intelligence Hub</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">Active Sync • v4.2.1</span>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary text-white'}`}>
                    <span className="material-symbols-outlined text-[18px]">{msg.role === 'assistant' ? 'smart_toy' : 'person'}</span>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className={`p-4 rounded-xl shadow-sm border ${msg.role === 'assistant' ? 'bg-surface-container-low border-outline-variant/20 rounded-tl-none' : 'bg-primary text-on-primary border-transparent rounded-tr-none max-w-[80%] ml-auto'}`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.type === 'card' && (
                      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-primary">Risk Factor: {msg.cardData.risk}</span>
                          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Confidence {msg.cardData.confidence}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                            <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-1 text-white/50">Traffic Vol</p>
                            <p className="text-xs font-bold">{msg.cardData.traffic}</p>
                          </div>
                          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                            <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-1 text-white/50">Incident Delta</p>
                            <p className="text-xs font-bold text-error">{msg.cardData.incidentDelta}</p>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 transition-all active:scale-98">
                          Push Route to Navigation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary-container/50 text-[18px]">smart_toy</span>
                  </div>
                  <div className="bg-surface-container-low/50 p-4 rounded-xl rounded-tl-none border border-dashed border-outline-variant/30">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-surface border-t border-outline-variant/10">
              <div className="relative flex items-end gap-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 shadow-sm">
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-2 max-h-32" 
                  placeholder="Ask Sentinel..." 
                  rows={1}
                ></textarea>
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-xl transition-all active:scale-95 shadow-md"
                >
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right: Interactive Context Map */}
          <section className="flex-1 h-full relative overflow-hidden bg-surface-dim">
            <div className="absolute inset-0 z-0">
              <MapView />
            </div>
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
              <div className="bg-surface/80 backdrop-blur-md p-2 rounded-xl border border-outline-variant/30 flex flex-col shadow-sm">
                <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"><span className="material-symbols-outlined">add</span></button>
                <div className="h-[1px] bg-outline-variant/30 my-1 mx-2"></div>
                <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"><span className="material-symbols-outlined">remove</span></button>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 z-20 max-w-xs">
              <div className="bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30 shadow-lg">
                <h4 className="text-sm font-bold mb-3">Live Risk Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <span className="text-xs text-on-surface-variant">High Risk Incident</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full border-2 border-dashed border-primary"></div>
                    <span className="text-xs text-on-surface-variant">Recommended Route</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 z-20">
              <div className="bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full border border-outline-variant/30 shadow-xl flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-on-surface-variant">Status</span>
                  <span className="text-sm font-bold text-emerald-600">Optimal Safety</span>
                </div>
                <button className="bg-primary text-on-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform">
                  Start Navigation
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
