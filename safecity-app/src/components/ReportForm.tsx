'use client';

import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useGeolocation } from '../hooks/useGeolocation';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger
} from './ui/sheet';
import { Button } from './ui/button';
import { TriangleAlert, Camera, MapPin } from 'lucide-react';

export default function ReportForm() {
  const { location } = useGeolocation();
  const { setReports, reports, userId } = useAppStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"POTHOLE" | "UNSAFE_ROAD" | "LOW_LIGHT" | "SUSPICIOUS">('POTHOLE');
  const [severity, setSeverity] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      alert("Waiting for GPS location...");
      return;
    }

    const newReport = {
      id: 'report-' + Date.now(),
      type,
      userId,
      location: { lat: location.lat, lng: location.lng },
      severity,
      notes,
      timestamp: new Date().toISOString(),
      status: "pending" as const,
      upvotes: 0
    };

    // Optimistic UI update
    setReports([...reports, newReport]);
    setIsOpen(false);
    
    // In full app, upload image to Firebase Storage and addDoc to Firestore
    // alert("Report submitted successfully!");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-6 left-6 z-50 rounded-full h-14 w-14 shadow-lg bg-amber-500 hover:bg-amber-600 border-2 border-white"
          size="icon"
        >
          <TriangleAlert className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="rounded-t-2xl h-[85vh] sm:h-[600px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Report Citizen Hazard</SheetTitle>
          <SheetDescription>
            Help keep the community safe by reporting infrastructure issues or suspicious activities.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 flex-1 overflow-y-auto pb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Issue Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['POTHOLE', 'UNSAFE_ROAD', 'LOW_LIGHT', 'SUSPICIOUS'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`p-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                    type === t 
                    ? 'bg-amber-100 border-amber-500 text-amber-800' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              Severity <span>{severity}/5</span>
            </label>
            <input 
              type="range" 
              min="1" max="5" 
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide more context..."
              className="w-full min-h-[100px] p-3 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 border-dashed border-2 h-14 flex flex-col gap-1 items-center justify-center text-slate-500">
              <Camera className="h-4 w-4" />
              <span className="text-[10px] uppercase font-bold">Add Photo</span>
            </Button>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg h-14 flex flex-col items-center justify-center text-slate-500 px-2 overflow-hidden">
              <MapPin className="h-4 w-4 text-emerald-500 mb-1" />
              <span className="text-[10px] uppercase font-bold truncate w-full text-center">
                {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Locating...'}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium mt-auto" disabled={!location}>
            Submit Report
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
