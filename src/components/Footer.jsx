import React from 'react';
import { 
  Anchor, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Globe2, 
  ExternalLink,
  ChevronRight,
  Clock,
  Compass
} from 'lucide-react';

export default function Footer({ setCurrentTab, onOpenEnquiry }) {
  const handleNav = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 relative overflow-hidden">
      {/* Subtle background radar circles */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 top-10 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Credentials & Classification Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Certified Operational Standards & Vetting Quality
              </h4>
              <p className="text-xs text-slate-400">
                Operating strictly in compliance with IMO, Flag State, Classification Society & SIRE 2.0 regimes.
              </p>
            </div>
          </div>

          {/* Classification Societies Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-specs text-slate-300">
            <span className="px-3 py-1 rounded bg-slate-800/70 border border-slate-700/60">DNV CERTIFIED</span>
            <span className="px-3 py-1 rounded bg-slate-800/70 border border-slate-700/60">LLOYD'S REGISTER</span>
            <span className="px-3 py-1 rounded bg-slate-800/70 border border-slate-700/60">ABS CLASS</span>
            <span className="px-3 py-1 rounded bg-slate-800/70 border border-slate-700/60">CLASS NK</span>
            <span className="px-3 py-1 rounded bg-slate-800/70 border border-slate-700/60">ISM / ISPS / MLC 2006</span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 p-0.5 border border-cyan-400/40">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-wider text-white">
                  GRAVITY<span className="text-cyan-400">SEA</span> FLEETS
                </span>
                <p className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                  Combined Maritime Services Platform
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              GRAVITY SEA FLEETS is an international maritime services platform providing commercial vessel chartering, comprehensive technical superintendency, offshore marine support, and strict safety vetting compliance across major global trade corridors.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>24/7 Operations Desk: <strong className="text-white">+971 4 889 4500</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Commercial Inquiries: <strong className="text-white">chartering@gravityseafleets.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Superintendent On-Duty: <span className="text-emerald-400 font-medium">Available 24/7/365</span></span>
              </div>
            </div>
          </div>

          {/* Column 2: Fleet Sectors */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Fleet Sectors
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Dry Bulk (Ultramax & Kamsarmax)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Crude Oil Tankers (Aframax)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Chemical & Product Carriers</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Offshore Support & AHTS / PSV</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Geared Feeder Container Ships</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Maritime Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Commercial Vessel Chartering</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Technical Ship Management</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Offshore Logistics & Towage</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>QHSE & SIRE 2.0 Vetting</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>Nautical Distance & Fuel Estimator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Hubs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Strategic Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Dubai (HQ):</strong>
                  <div className="text-[11px] text-slate-400">Jumeirah Lakes Towers, Dubai, UAE</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Singapore Desk:</strong>
                  <div className="text-[11px] text-slate-400">Marina Bay Financial Centre, Singapore</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Rotterdam Hub:</strong>
                  <div className="text-[11px] text-slate-400">Willemskade, 3016 Rotterdam, Netherlands</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Houston Desk:</strong>
                  <div className="text-[11px] text-slate-400">Energy Corridor, Houston, TX, USA</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* BRD Prescribed Mandatory Maritime Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400">
            <strong className="text-slate-300 font-semibold block mb-1">
              MARITIME COMMERCIAL & VESSEL PARTICULAR DISCLAIMER:
            </strong>
            The vessel records, particulars, tonnages, and availability indicators presented across this platform are published for commercial discovery, indicative voyage calculation, and qualified business evaluation. All vessel representations, capacities, and availability timeframes are subject to prior commitments, operational scheduling, and formal charter party execution (BIMCO standard forms). Submitting an enquiry or request for proposal does not constitute a legally binding fixture or availability guarantee.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-4">
            <p>© {new Date().getFullYear()} GRAVITY SEA FLEETS. All rights reserved. International Maritime Services Platform.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => handleNav('compliance')} className="hover:text-slate-300">Privacy Policy</button>
              <button onClick={() => handleNav('compliance')} className="hover:text-slate-300">Terms of Fixture & Disclaimer</button>
              <button onClick={() => handleNav('compliance')} className="hover:text-slate-300">QHSE Safety Charter</button>
              <button onClick={() => handleNav('dashboard')} className="text-amber-400/80 hover:text-amber-300">Staff Portal</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
