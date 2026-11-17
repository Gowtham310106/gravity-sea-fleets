import React, { useState } from 'react';
import VesselImage from '../components/VesselImage';
import { 
  Anchor, 
  Ship, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Search, 
  ChevronRight,
  Clock, 
  Globe2, 
  SlidersHorizontal,
  Award,
  FileText,
  Radio,
  CheckCircle2
} from 'lucide-react';
import VoyageCalculator from '../components/VoyageCalculator';

export default function Home({ 
  vessels, 
  onSelectVessel, 
  onOpenEnquiry, 
  setCurrentTab,
  onOpenEnquiryWithData,
  onApplyFleetFilter
}) {
  const [quickCategory, setQuickCategory] = useState('ALL');
  const [quickStatus, setQuickStatus] = useState('ALL');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onApplyFleetFilter({
      category: quickCategory,
      status: quickStatus
    });
    setCurrentTab('fleet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredVessels = vessels.slice(0, 4);

  return (
    <div className="space-y-0 text-slate-800 bg-[#F8F9FA]">
      
      {/* CINEMATIC EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#071324]">
        {/* Full-width Maritime Photography */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2200&q=85" 
            alt="Commercial Maritime Vessel at Sea" 
            className="w-full h-full object-cover object-center filter contrast-105"
          />
          {/* Deep Navy Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/85 to-[#0A192F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-[#071324]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Prestigious Statement */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#C5A880]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-specs font-semibold">
                  COMBINED MARITIME SERVICES PLATFORM
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-serif-maritime">
                Navigating Global Trade with Precision & Uncompromising Standards.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal font-sans">
                GRAVITY SEA FLEETS unites commercial vessel chartering, comprehensive technical superintendency, offshore marine logistics, and rigorous vetting compliance across international ocean corridors.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentTab('fleet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-[#C5A880] hover:bg-[#B39266] text-[#071324] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-md"
                >
                  <Ship className="w-4 h-4 text-[#071324]" />
                  <span>Explore Fleet Register</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenEnquiry}
                  className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white border border-slate-400 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#C5A880]" />
                  <span>Request Fixture / RFP</span>
                </button>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>ISM & ISPS Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C5A880]" />
                  <span>DNV / Lloyd's / ABS Classed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Operations Desk Active</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean White Fleet Finder Console */}
            <div className="lg:col-span-5">
              <div className="bg-white border-t-4 border-[#C5A880] p-6 sm:p-8 shadow-2xl space-y-5">
                
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A192F] uppercase tracking-wider font-specs">
                      Fleet Search Console
                    </h3>
                    <p className="text-xs text-slate-500">Discover active commercial tonnage</p>
                  </div>
                  <span className="text-xs font-specs font-bold text-[#0A192F] bg-slate-100 px-2.5 py-1 border border-slate-200">
                    {vessels.length} VESSELS
                  </span>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider text-[11px] mb-1.5 font-specs">
                      Vessel Category / Trade
                    </label>
                    <select
                      value={quickCategory}
                      onChange={e => setQuickCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0A192F] font-medium"
                    >
                      <option value="ALL">All Commercial Categories</option>
                      <option value="Bulk Carrier">Dry Bulk Carriers (Ultramax & Kamsarmax)</option>
                      <option value="Tanker">Crude Oil Tankers (Aframax)</option>
                      <option value="Chemical Tanker">Chemical & Product Tankers</option>
                      <option value="Offshore Support">Offshore Support & AHTS / PSV</option>
                      <option value="Container Carrier">Feeder Container Ships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider text-[11px] mb-1.5 font-specs">
                      Commercial Availability
                    </label>
                    <select
                      value={quickStatus}
                      onChange={e => setQuickStatus(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0A192F] font-medium"
                    >
                      <option value="ALL">Any Availability Status</option>
                      <option value="Available for Charter">Available for Charter (Prompt)</option>
                      <option value="On Voyage">On Voyage / Positioned</option>
                      <option value="Scheduled Survey">Scheduled Survey</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <strong className="text-[#0A192F] font-semibold block">Commercial Fixture Protocol:</strong>
                    <span>Direct enquiries are reviewed by our senior chartering superintendents. Indicative freight, draft constraints, and laycan windows delivered within 4 hours.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Search className="w-4 h-4 text-[#C5A880]" />
                    <span>Search Published Fleet</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS & VERIFIED BENCHMARKS STRIP */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="px-4 py-2 text-center md:text-left space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-specs font-semibold block">
                Total Managed Tonnage
              </span>
              <strong className="text-3xl lg:text-4xl font-specs font-bold text-[#0A192F] block">
                1.85M+ <span className="text-sm font-normal text-slate-500">DWT</span>
              </strong>
              <p className="text-[11px] text-slate-500">Commercial & technical scope</p>
            </div>

            <div className="px-4 py-2 text-center md:text-left space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-specs font-semibold block">
                Operational Uptime
              </span>
              <strong className="text-3xl lg:text-4xl font-specs font-bold text-[#0284C7] block">
                99.4%
              </strong>
              <p className="text-[11px] text-slate-500">Planned maintenance uptime</p>
            </div>

            <div className="px-4 py-2 text-center md:text-left space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-specs font-semibold block">
                Safety Track Record
              </span>
              <strong className="text-3xl lg:text-4xl font-specs font-bold text-emerald-700 block">
                0.00 <span className="text-sm font-normal text-slate-500">LTI</span>
              </strong>
              <p className="text-[11px] text-slate-500">Zero-harm Lost Time benchmark</p>
            </div>

            <div className="px-4 py-2 text-center md:text-left space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-specs font-semibold block">
                Global Operations
              </span>
              <strong className="text-3xl lg:text-4xl font-specs font-bold text-[#0A192F] block">
                5 Hubs
              </strong>
              <p className="text-[11px] text-slate-500">Dubai, Singapore, Rotterdam, Houston, Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FLEET REGISTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
              VERIFIED FLEET REGISTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif-maritime">
              Published Commercial Vessels
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Inspected, fully classed tonnage available for spot voyage charter, long-term time fixtures, and technical management.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentTab('fleet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A192F] hover:bg-[#0F223D] text-white font-semibold text-xs tracking-wider uppercase transition-colors self-start md:self-auto shadow-sm"
          >
            <span>View All {vessels.length} Vessels</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

        {/* Vessel Cards Grid: Clean White Cards with High-Res Ship Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVessels.map((vessel) => (
            <div 
              key={vessel.id}
              className="group bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectVessel(vessel)}>
                  <VesselImage 
                    src={vessel.imageUrl} 
                    alt={vessel.name} 
                    vesselType={vessel.subType || vessel.type}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#0A192F]/90 text-white text-[10px] font-specs font-semibold uppercase tracking-wider">
                      {vessel.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 text-[10px] font-specs font-semibold uppercase ${
                      vessel.availabilityStatus === 'Available for Charter'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-blue-800 text-white'
                    }`}>
                      {vessel.availabilityStatus === 'Available for Charter' ? 'PROMPT' : vessel.availabilityStatus}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectVessel(vessel)}
                      className="text-base font-bold text-[#0A192F] group-hover:text-[#0284C7] transition-colors cursor-pointer font-serif-maritime"
                    >
                      {vessel.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-specs mt-0.5">
                      IMO: {vessel.imoNumber} • {vessel.subType}
                    </p>
                  </div>

                  {/* Clean Spec Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Deadweight:</span>
                      <strong className="text-[#0A192F] font-specs text-xs">{vessel.dwt.toLocaleString()} MT</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Draft:</span>
                      <strong className="text-[#0A192F] font-specs text-xs">{vessel.summerDraft} m</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Built / Yard:</span>
                      <strong className="text-slate-700 font-specs truncate block">{vessel.builtYear} • {vessel.flag}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Classification:</span>
                      <strong className="text-[#0284C7] font-specs truncate block">{vessel.classification}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {vessel.features[0]}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectVessel(vessel)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold uppercase tracking-wider transition-colors text-center"
                >
                  Particulars
                </button>
                <button
                  onClick={() => onOpenEnquiry(vessel)}
                  className="py-2.5 px-4 bg-[#0A192F] hover:bg-[#0F223D] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Charter
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUR CORE MARITIME DIVISIONS */}
      <section className="bg-white border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl space-y-2 border-b border-slate-200 pb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
              INTEGRATED OPERATIONS ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif-maritime">
              Comprehensive Maritime Services
            </h2>
            <p className="text-sm text-slate-600">
              Structured to support shipowners, charterers, and industrial commodity shippers with complete operational assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Division 1 */}
            <div className="bg-[#F8F9FA] border border-slate-200 p-8 space-y-5 hover:border-slate-400 transition-all">
              <div className="w-12 h-12 bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                  DIVISION 01
                </span>
                <h3 className="text-xl font-bold text-[#0A192F] font-serif-maritime mt-1">
                  Commercial Vessel Chartering & Fixtures
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connecting global cargo principals with optimal tonnage across dry bulk, liquid energy, and containerized corridors under standard BIMCO charter parties (GENCON, NYPE, SHELLTIME, BPVOY).
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Spot Voyage Fixtures & Prompt Freight Indications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Period Time Charters & Bareboat Lease Arrangements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Industrial Contracts of Affreightment (COA)</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#0A192F] hover:text-[#0284C7] uppercase tracking-wider inline-flex items-center gap-1.5 pt-2"
              >
                <span>Read Full Chartering Scope</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Division 2 */}
            <div className="bg-[#F8F9FA] border border-slate-200 p-8 space-y-5 hover:border-slate-400 transition-all">
              <div className="w-12 h-12 bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                  DIVISION 02
                </span>
                <h3 className="text-xl font-bold text-[#0A192F] font-serif-maritime mt-1">
                  Technical Ship Superintendency & Engineering
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete engineering oversight led by career Chief Engineers and Master Mariners. Maintaining strict computerized Planned Maintenance Systems (PMS) to ensure 99.4% uptime and preserve asset capital value.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 Technical Superintendency & Diagnostic Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Drydocking Tender Specifications & On-Site Supervision</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Global Spare Parts Logistics & Bunker Quality Assurance</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#0A192F] hover:text-[#0284C7] uppercase tracking-wider inline-flex items-center gap-1.5 pt-2"
              >
                <span>Read Technical Scope</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Division 3 */}
            <div className="bg-[#F8F9FA] border border-slate-200 p-8 space-y-5 hover:border-slate-400 transition-all">
              <div className="w-12 h-12 bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                  DIVISION 03
                </span>
                <h3 className="text-xl font-bold text-[#0A192F] font-serif-maritime mt-1">
                  Offshore Marine Support & Rig Towage
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating high-bollard-pull DP2 AHTS vessels and multi-purpose Platform Supply Vessels (PSVs) supporting offshore oil & gas rigs, marine construction, and offshore energy projects in the Arabian Gulf and international waters.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jack-up Rig Relocation & Anchor Spread Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supply of Drill Water, Fuel, Brine & Liquid Mud</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Port Agency, Launch Husbandry & Crew Change Services</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#0A192F] hover:text-[#0284C7] uppercase tracking-wider inline-flex items-center gap-1.5 pt-2"
              >
                <span>Read Offshore Scope</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Division 4 */}
            <div className="bg-[#F8F9FA] border border-slate-200 p-8 space-y-5 hover:border-slate-400 transition-all">
              <div className="w-12 h-12 bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                  DIVISION 04
                </span>
                <h3 className="text-xl font-bold text-[#0A192F] font-serif-maritime mt-1">
                  QHSE, SIRE 2.0 & RightShip Vetting
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uncompromising compliance with international maritime safety codes and charterer vetting criteria. Preparing vessels for OCIMF SIRE 2.0 inspections and maintaining RightShip 5-Star ratings.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document of Compliance (DOC) & Safety Management Systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SIRE 2.0 Pre-Inspection Mock Audits & Root Cause Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>MARPOL Decarbonization Advisory (CII / EEXI / EU ETS)</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentTab('compliance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#0A192F] hover:text-[#0284C7] uppercase tracking-wider inline-flex items-center gap-1.5 pt-2"
              >
                <span>Read Safety & Vetting Charter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* VOYAGE CALCULATOR */}
      <section className="bg-[#F8F9FA] py-16 border-t border-slate-200">
        <VoyageCalculator onOpenEnquiryWithData={onOpenEnquiryWithData} />
      </section>

      {/* STRATEGIC MARITIME DESKS & GLOBAL REACH */}
      <section className="bg-white border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-2xl space-y-2 border-b border-slate-200 pb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
              OPERATIONAL ATTENDANCE
            </span>
            <h2 className="text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
              Strategic Gateway Desks
            </h2>
            <p className="text-xs text-slate-600">
              Immediate physical and commercial representation across primary global bunkering, transshipment, and chartering hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-specs text-[#9A7B4F] font-bold block">HEADQUARTERS</span>
              <h4 className="text-base font-bold text-[#0A192F] font-serif-maritime">Dubai Desk (UAE)</h4>
              <p className="text-xs text-slate-600">
                Executive management, commercial fixtures, Arabian Gulf offshore operations.
              </p>
              <div className="text-[11px] text-[#0A192F] font-specs font-semibold pt-2 border-t border-slate-200">UTC+4 • 24/7 Response</div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-specs text-[#9A7B4F] font-bold block">EAST ASIA GATEWAY</span>
              <h4 className="text-base font-bold text-white text-[#0A192F] font-serif-maritime">Singapore Hub</h4>
              <p className="text-xs text-slate-600">
                Pacific bulker and tanker fixtures, Malacca Strait port agency, bunker coordination.
              </p>
              <div className="text-[11px] text-[#0A192F] font-specs font-semibold pt-2 border-t border-slate-200">UTC+8 • Port Husbandry Active</div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-specs text-[#9A7B4F] font-bold block">EUROPE & ATLANTIC</span>
              <h4 className="text-base font-bold text-white text-[#0A192F] font-serif-maritime">Rotterdam Desk</h4>
              <p className="text-xs text-slate-600">
                North Sea clean petroleum trades, European terminal vetting, and EU ETS compliance.
              </p>
              <div className="text-[11px] text-[#0A192F] font-specs font-semibold pt-2 border-t border-slate-200">UTC+1 • Commercial Vetting</div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-specs text-[#9A7B4F] font-bold block">TECHNICAL HUB</span>
              <h4 className="text-base font-bold text-white text-[#0A192F] font-serif-maritime">Mumbai Operations</h4>
              <p className="text-xs text-slate-600">
                Marine technical superintendency, drydock engineering teams, and STCW crew crewing.
              </p>
              <div className="text-[11px] text-[#0A192F] font-specs font-semibold pt-2 border-t border-slate-200">UTC+5:30 • Engineering Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGH-LEVEL COMMERCIAL RFP BANNER */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-specs font-bold block">
              COMMERCIAL CHARTERING & SUPERINTENDENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-maritime">
              Ready to Discuss a Vessel Fixture or Technical Management Tender?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Our chartering superintendents respond within 4 hours with vetted tonnage options, indicative freight estimates, and technical feasibility reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#C5A880] hover:bg-[#B39266] text-[#071324] font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center"
            >
              Submit Commercial RFP
            </button>
            <a
              href="tel:+97148894500"
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-400 hover:border-white text-white font-semibold text-xs uppercase tracking-wider transition-all text-center"
            >
              Call Operations Desk
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
