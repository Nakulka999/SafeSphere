import { ReactNode } from 'react';
import Link from 'next/link';
import { Shield, Activity, Map as MapIcon, Flame, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl font-bold text-white tracking-wide">SafeCity</h1>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-6 py-3 bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-400">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Live Intelligence</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 transition-colors">
                <MapIcon className="w-5 h-5" />
                <span className="font-medium">Geospatial Data</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 transition-colors">
                <Flame className="w-5 h-5" />
                <span className="font-medium">Fire Sensors</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 w-full rounded-md transition-colors text-sm">
            <Settings className="w-4 h-4" />
            System Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">Intelligence Command Center</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-500">System Online</span>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
