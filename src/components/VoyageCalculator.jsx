import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Ship, 
  Gauge, 
  Fuel, 
  Clock, 
  ArrowRight, 
  Leaf, 
  Calculator, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { MAJOR_PORTS, NAUTICAL_DISTANCES, VESSEL_CLASSES } from '../data/marineCalculator';

export default function VoyageCalculator({ onOpenEnquiryWithData }) {
  const [origin, setOrigin] = useState('ras_tanura');
  const [destination, setDestination] = useState('singapore');
  const [vesselClassId, setVesselClassId] = useState('aframax');
  const [speedKnots, setSpeedKnots] = useState(13.5);

  const selectedVessel = VESSEL_CLASSES.find(v => v.id === vesselClassId) || VESSEL_CLASSES[0];
  const originPort = MAJOR_PORTS.find(p => p.id === origin) || MAJOR_PORTS[0];
  const destPort = MAJOR_PORTS.find(p => p.id === destination) || MAJOR_PORTS[1];

  // Lookup or estimate distance
  const routeKey = `${origin}-${destination}`;
  let distanceNm = NAUTICAL_DISTANCES[routeKey];
  if (!distanceNm) {
    // Fallback great circle approximation
    const degToRad = Math.PI / 180;
    const dLat = (destPort.lat - originPort.lat) * degToRad;
    const dLon = (destPort.lng - originPort.lng) * degToRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(originPort.lat * degToRad) * Math.cos(destPort.lat * degToRad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceNm = Math.round(6371 * c * 0.539957 * 1.18); // 1.18 nautical sea route factor
  }

  // Transit calculations
  const totalHours = distanceNm / speedKnots;
  const transitDays = (totalHours / 24).toFixed(1);
  const totalFuelMT = (parseFloat(transitDays) * selectedVessel.dailyFuelMT).toFixed(1);

  // Carbon CII index estimation (approx 3.114 tonnes CO2 per MT VLSFO)
  const co2Emissions = (totalFuelMT * 3.114).toFixed(0);

  const handleInquire = () => {
    onOpenEnquiryWithData({
      loadPort: originPort.name,
      dischargePort: destPort.name,
      message: `Voyage Estimation: ${distanceNm} nm from ${originPort.name} to ${destPort.name} utilizing ${selectedVessel.name}. Estimated transit: ${transitDays} sea days @ ${speedKnots} kts.`
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 nautical-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Maritime Voyage Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nautical Distance, Transit Days & Fuel Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Calculate realistic sea voyage legs, fuel consumption profiles, and green carbon indices between major global shipping gateways based on GRAVITY SEA FLEETS engineering baselines.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-6 rounded-xl border border-slate-800/80">
            
            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Loading Port / Origin</span>
                </label>
                <select
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {MAJOR_PORTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Discharge Port / Dest</span>
                </label>
                <select
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {MAJOR_PORTS.map(p => (
                    <option key={p.id} value={p.id} disabled={p.id === origin}>
                      {p.name} ({p.region})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vessel Class Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-cyan-400" />
                <span>Vessel Specification & Tonnage Class</span>
              </label>
              <select
                value={vesselClassId}
                onChange={e => {
                  const id = e.target.value;
                  setVesselClassId(id);
                  const v = VESSEL_CLASSES.find(item => item.id === id);
                  if (v) setSpeedKnots(v.avgSpeedKnots);
                }}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {VESSEL_CLASSES.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.capacityNote}
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Economical Operating Speed</span>
                </span>
                <span className="font-specs text-cyan-400 font-bold">{speedKnots} Knots</span>
              </div>
              <input
                type="range"
                min="10.0"
                max="18.0"
                step="0.5"
                value={speedKnots}
                onChange={e => setSpeedKnots(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-specs mt-1">
                <span>10.0 kts (Super Eco)</span>
                <span>13.5 kts (Standard Eco)</span>
                <span>18.0 kts (High Speed)</span>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-xl border border-cyan-900/50 space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs uppercase font-specs tracking-wider text-cyan-400 font-bold">
                Voyage Estimation Summary
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Weather: Calm Sea Baseline
              </span>
            </div>

            {/* Key Output Metrics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Sea Distance</span>
                </div>
                <strong className="text-2xl font-specs text-white block">
                  {distanceNm.toLocaleString()} <span className="text-xs font-normal text-slate-400">nm</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Approx. {Math.round(distanceNm * 1.852).toLocaleString()} kilometers
                </span>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Sea Transit Time</span>
                </div>
                <strong className="text-2xl font-specs text-white block">
                  {transitDays} <span className="text-xs font-normal text-slate-400">days</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  At constant {speedKnots} kts speed
                </span>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Fuel className="w-4 h-4 text-amber-400" />
                  <span>Fuel Consumption</span>
                </div>
                <strong className="text-2xl font-specs text-amber-400 block">
                  {totalFuelMT} <span className="text-xs font-normal text-slate-400">MT</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {selectedVessel.fuelType} bunker grade
                </span>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Est. CO2 Footprint</span>
                </div>
                <strong className="text-2xl font-specs text-emerald-400 block">
                  {co2Emissions} <span className="text-xs font-normal text-slate-400">MT</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  IMO GHG Tier III calculation
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleInquire}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Inquire for this Voyage Fixture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
