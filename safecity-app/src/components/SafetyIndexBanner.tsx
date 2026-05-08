'use client';

import { useAppStore } from '../store/useAppStore';
import { ShieldAlert, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SafetyIndexBanner() {
  const { safetyScore } = useAppStore();

  const isHighRisk = safetyScore >= 70;
  const isMediumRisk = safetyScore >= 40 && safetyScore < 70;
  
  return (
    <div className="absolute top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-40 max-w-lg w-full">
      <AnimatePresence mode="wait">
        {isHighRisk && (
          <motion.div 
            key="high"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-200 shadow-sm rounded-xl p-3 flex items-start gap-3 backdrop-blur-md bg-opacity-90"
          >
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">High Risk Area Detected</p>
              <p className="text-xs text-red-600 mt-1">
                Avoid walking alone after 10 PM. Historical data shows multiple incidents in this zone.
              </p>
            </div>
          </motion.div>
        )}
        
        {isMediumRisk && (
          <motion.div 
            key="medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-amber-50 border border-amber-200 shadow-sm rounded-xl p-3 flex items-start gap-3 backdrop-blur-md bg-opacity-90"
          >
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Caution Advised</p>
              <p className="text-xs text-amber-600 mt-1">
                Stay alert. A few scattered reports have been logged near your current route.
              </p>
            </div>
          </motion.div>
        )}
        
        {!isHighRisk && !isMediumRisk && (
          <motion.div 
            key="low"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 border border-slate-200 shadow-sm rounded-xl p-3 flex items-center gap-3 backdrop-blur-md"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-medium text-slate-700">Area is currently safe</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
