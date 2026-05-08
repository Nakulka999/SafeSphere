'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useSOSHandler } from '../hooks/useSOSHandler';

export default function SOSButton() {
  const { sosState, setSosState } = useAppStore();
  const { location } = useSOSHandler();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      } else {
        setSosState('active');
        // trigger the actual SOS logic here (start recording, capture location, call Agent 1)
      }
    }
    return () => clearTimeout(timer);
  }, [sosState, countdown, setSosState]);

  const handlePress = () => {
    if (sosState === 'idle') {
      setSosState('countdown');
      setCountdown(10);
    }
  };

  const handleCancel = () => {
    setSosState('idle');
    setCountdown(10);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      <AnimatePresence>
        {sosState === 'countdown' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white px-6 py-3 rounded-2xl shadow-xl text-slate-800 font-bold flex flex-col items-center border border-slate-100"
          >
            <span className="text-sm text-slate-500 mb-1">Sending alert in</span>
            <span className="text-3xl text-red-600">{countdown}</span>
            <button 
              onClick={handleCancel}
              className="text-xs text-slate-400 mt-2 hover:text-slate-600 uppercase tracking-widest font-semibold"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handlePress}
        disabled={sosState === 'active'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          sosState === 'active' 
            ? { scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(220, 38, 38, 0)", "0px 0px 30px rgba(220, 38, 38, 0.6)", "0px 0px 0px rgba(220, 38, 38, 0)"], transition: { repeat: Infinity, duration: 1.5 } } 
            : {}
        }
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl font-bold text-white text-xl transition-all border-4 border-white ${
          sosState === 'idle' ? 'bg-red-600 hover:bg-red-700' :
          sosState === 'countdown' ? 'bg-red-500 ring-4 ring-red-200' : 'bg-red-800'
        }`}
      >
        {sosState === 'active' ? 'LIVE' : 'SOS'}
      </motion.button>
    </div>
  );
}
