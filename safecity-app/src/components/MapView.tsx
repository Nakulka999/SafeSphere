'use client';

import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center">
      <span className="text-slate-500 font-medium">Loading Map...</span>
    </div>
  )
});

export default function MapView() {
  return (
    <div className="w-full h-full relative z-0">
      <MapClient />
    </div>
  );
}
