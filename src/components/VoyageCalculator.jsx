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

  const routeKey = `${origin}-${destination}`;
  let distanceNm = NAUTICAL_DISTANCES[routeKey];
  if (!distanceNm) {
    const degToRad = Math.PI / 180;
    const dLat = (destPort.lat - originPort.lat) * degToRad;
    const dLon = (destPort.lng - originPort.lng) * degToRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(originPort.lat * degToRad) * Math.cos(destPort.lat * degToRad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceNm = Math.round(6371 * c * 0.539957 * 1.18);
  }

  const totalHours = distanceNm / speedKnots;
  const transitDays = (totalHours / 24).toFixed(1);
  const totalFuelMT = (parseFloat(transitDays) * selectedVessel.dailyFuelMT).toFixed(1);
  const co2Emissions = (totalFuelMT * 3.114).toFixed(0);

  const handleInquire = () => {
    onOpenEnquiryWithData({
      loadPort: originPort.name,
      dischargePort: destPort.name,
      message: `Voyage Calculation: ${distanceNm} nm from ${originPort.name} to ${destPort.name} utilizing ${selectedVessel.name}. Estimated transit: ${transitDays} sea days @ ${speedKnots} kts.`
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-[#0A192F] text-white">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-specs font-bold block">
              OPERATIONAL COMPUTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-maritime">
              Nautical Distance, Transit Days & Fuel Estimator
            </h2>
            <p className="text-xs text-slate-300">
              Calculate sea legs, transit times, fuel consumption, and carbon emissions between major global shipping gateways based on GRAVITY SEA FLEETS engineering baselines.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#F8F9FA] text-slate-800">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5 bg-white p-6 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold uppercase text-[11px] mb-1.5 font-specs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Loading Port / Origin</span>
                </label>
                <select
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                >
                  {MAJOR_PORTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold uppercase text-[11px] mb-1.5 font-specs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Discharge Port / Dest</span>
                </label>
                <select
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                >
                  {MAJOR_PORTS.map(p => (
                    <option key={p.id} value={p.id} disabled={p.id === origin}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold uppercase text-[11px] mb-1.5 font-specs flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-[#0284C7]" />
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
              >
                {VESSEL_CLASSES.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.capacityNote}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-700 font-semibold font-specs uppercase text-[11px] flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Economical Operating Speed</span>
                </span>
                <span className="font-specs text-[#0A192F] font-bold text-sm">{speedKnots} Knots</span>
              </div>
              <input
                type="range"
                min="10.0"
                max="18.0"
                step="0.5"
                value={speedKnots}
                onChange={e => setSpeedKnots(parseFloat(e.target.value))}
                className="w-full accent-[#0A192F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-specs mt-1">
                <span>10.0 kts (Super Eco)</span>
                <span>13.5 kts (Standard Eco)</span>
                <span>18.0 kts (Full Speed)</span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-white p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs uppercase font-specs tracking-wider text-[#9A7B4F] font-bold">
                Voyage Summary Output
              </span>
              <span className="text-[11px] font-specs text-slate-500">
                Weather: Calm Sea Baseline
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 text-[11px] block uppercase font-specs">Sea Distance</span>
                <strong className="text-2xl font-specs font-bold text-[#0A192F] block mt-1">
                  {distanceNm.toLocaleString()} <span className="text-xs font-normal text-slate-500">nm</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block font-specs">
                  Approx. {Math.round(distanceNm * 1.852).toLocaleString()} km
                </span>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 text-[11px] block uppercase font-specs">Sea Transit Time</span>
                <strong className="text-2xl font-specs font-bold text-[#0A192F] block mt-1">
                  {transitDays} <span className="text-xs font-normal text-slate-500">days</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block font-specs">
                  At constant {speedKnots} kts speed
                </span>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 text-[11px] block uppercase font-specs">Fuel Consumption</span>
                <strong className="text-2xl font-specs font-bold text-[#9A7B4F] block mt-1">
                  {totalFuelMT} <span className="text-xs font-normal text-slate-500">MT</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block font-specs">
                  {selectedVessel.fuelType} bunker grade
                </span>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200">
                <span className="text-slate-500 text-[11px] block uppercase font-specs">Estimated CO2</span>
                <strong className="text-2xl font-specs font-bold text-emerald-700 block mt-1">
                  {co2Emissions} <span className="text-xs font-normal text-slate-500">MT</span>
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block font-specs">
                  IMO Tier III calculation
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleInquire}
                className="w-full py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
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
