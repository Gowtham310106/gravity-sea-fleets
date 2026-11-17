import React, { useState } from 'react';
import { Ship, Anchor } from 'lucide-react';

export default function VesselImage({ src, alt, className = "", vesselType = "Commercial Vessel" }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`relative bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden ${className}`}>
        {/* Subtle background radar circles */}
        <div className="absolute inset-0 nautical-grid opacity-20 pointer-events-none" />
        <div className="absolute w-36 h-36 rounded-full border border-cyan-500/10 animate-ping opacity-25 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center space-y-2">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-cyan-400 shadow-lg">
            <Ship className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">{alt}</span>
          <span className="text-[10px] font-specs text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900">
            {vesselType} • Verified Tonnage
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      loading="lazy"
    />
  );
}
