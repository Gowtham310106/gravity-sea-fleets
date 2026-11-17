import React from 'react';
import { 
  Anchor, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Clock
} from 'lucide-react';

export default function Footer({ setCurrentTab, onOpenEnquiry }) {
  const handleNav = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071324] text-slate-300 border-t border-slate-800">
      
      {/* Top Credentials & Classification Banner */}
      <div className="border-b border-slate-800/80 bg-[#0A192F] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#071324] border border-[#C5A880]/50 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-specs">
                STATUTORY COMPLIANCE & CLASSIFICATION ASSURANCE
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Operations certified under IMO, Flag State, Classification Society & OCIMF SIRE 2.0 regimes.
              </p>
            </div>
          </div>

          {/* Classification Societies Stamps */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-specs text-slate-300">
            <span className="px-3 py-1 bg-[#071324] border border-slate-700/80 uppercase tracking-wider">DNV CERTIFIED</span>
            <span className="px-3 py-1 bg-[#071324] border border-slate-700/80 uppercase tracking-wider">LLOYD'S REGISTER</span>
            <span className="px-3 py-1 bg-[#071324] border border-slate-700/80 uppercase tracking-wider">ABS CLASS</span>
            <span className="px-3 py-1 bg-[#071324] border border-slate-700/80 uppercase tracking-wider">CLASS NK</span>
            <span className="px-3 py-1 bg-[#071324] border border-slate-700/80 uppercase tracking-wider">ISM • ISPS • MLC 2006</span>
          </div>
        </div>
      </div>

      {/* Main Corporate Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0A192F] border-t-2 border-[#C5A880] flex items-center justify-center">
                <Anchor className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-white font-serif-maritime">
                  GRAVITY<span className="text-[#0284C7] font-sans font-bold">SEA</span> FLEETS
                </span>
                <p className="text-[9px] tracking-[0.2em] text-slate-400 uppercase font-semibold">
                  Combined Maritime Services Platform
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              GRAVITY SEA FLEETS provides integrated commercial vessel chartering, comprehensive technical superintendency, offshore marine support, and strict safety vetting compliance across major international trading corridors.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>24/7 Operations Duty Line: <strong className="text-white">+971 4 889 4500</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Commercial Inquiries: <strong className="text-white">chartering@gravityseafleets.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Duty Superintendent: <span className="text-emerald-400 font-medium">Continuous Watch</span></span>
              </div>
            </div>
          </div>

          {/* Column 2: Fleet Sectors */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-specs border-b border-slate-800 pb-2">
              Fleet Sectors
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Dry Bulk (Ultramax & Kamsarmax)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Crude Oil Tankers (Aframax)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Chemical & Clean Product Tankers</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Offshore Support (DP2 AHTS / PSV)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fleet')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Feeder Container Vessels</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Maritime Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-specs border-b border-slate-800 pb-2">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Commercial Vessel Chartering</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Technical Ship Superintendency</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Offshore Marine Towage & Logistics</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('compliance')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>QHSE & SIRE 2.0 Vetting Audits</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                  <span>Nautical Distance & Fuel Estimator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Hubs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-specs border-b border-slate-800 pb-2">
              Strategic Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans">Dubai HQ (UAE):</strong>
                  <span className="text-[11px] text-slate-400">Jumeirah Lakes Towers, Dubai</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans">Singapore Hub:</strong>
                  <span className="text-[11px] text-slate-400">Marina Bay Financial Centre</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans">Rotterdam Desk:</strong>
                  <span className="text-[11px] text-slate-400">Willemskade, 3016 DL Rotterdam</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans">Houston Office:</strong>
                  <span className="text-[11px] text-slate-400">Energy Corridor, Houston, TX</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* BRD Prescribed Mandatory Maritime Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <div className="p-4 bg-[#0A192F]/60 border border-slate-800 text-slate-400">
            <strong className="text-slate-300 font-semibold uppercase tracking-wider block mb-1 font-specs text-[10px]">
              MARITIME COMMERCIAL POLICY & VESSEL PARTICULAR DISCLAIMER:
            </strong>
            The vessel records, particulars, tonnages, and availability indicators presented across this platform are published for commercial discovery, indicative voyage calculation, and qualified business evaluation. All vessel representations, capacities, and availability timeframes are subject to prior commitments, operational scheduling, and formal charter party execution (BIMCO standard forms). Submitting an enquiry or request for proposal does not constitute a legally binding fixture or availability guarantee.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-4">
            <p>© {new Date().getFullYear()} GRAVITY SEA FLEETS. All rights reserved. International Combined Maritime Services Platform.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => handleNav('compliance')} className="hover:text-white">Privacy Notice</button>
              <button onClick={() => handleNav('compliance')} className="hover:text-white">Terms of Fixture</button>
              <button onClick={() => handleNav('compliance')} className="hover:text-white">Safety Charter</button>
              <button onClick={() => handleNav('dashboard')} className="text-[#C5A880] hover:underline">Internal Staff Portal</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
