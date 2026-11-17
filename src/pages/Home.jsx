import React, { useState } from 'react';
import { 
  Anchor, 
  Ship, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  FileText,
  Radio,
  Award
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
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        {/* Background Image with Deep Oceanic Tint */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=85" 
            alt="Commercial Maritime Vessel at Sea" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 nautical-grid opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>COMBINED MARITIME SERVICES & FLEET SOLUTIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Ocean Trade</span>. Trusted Across Global Waters.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                GRAVITY SEA FLEETS unites commercial vessel chartering, technical superintendency, offshore marine logistics, and strict vetting compliance to ensure seamless, reliable maritime transport across international corridors.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentTab('fleet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950 flex items-center gap-2.5 transition-all group"
                >
                  <Ship className="w-4 h-4 text-cyan-100" />
                  <span>Discover Published Fleet</span>
                  <ChevronRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Request Charter / RFP</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISM & ISPS Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>DNV / Lloyd's / ABS Class</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>24/7 Operations Desk</span>
                </div>
              </div>
            </div>

            {/* Right Quick Fleet Search Console */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Search className="w-4 h-4 text-cyan-400" />
                    <span>Quick Fleet Finder</span>
                  </div>
                  <span className="text-[11px] font-specs text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    {vessels.length} Active Records
                  </span>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Vessel Category / Trade
                    </label>
                    <select
                      value={quickCategory}
                      onChange={e => setQuickCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
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
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Commercial Availability
                    </label>
                    <select
                      value={quickStatus}
                      onChange={e => setQuickStatus(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                    >
                      <option value="ALL">Any Availability Status</option>
                      <option value="Available for Charter">Available for Charter (Prompt)</option>
                      <option value="On Voyage">On Voyage / Positioned</option>
                      <option value="Scheduled Survey">Scheduled Survey</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Radio className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Commercial Chartering Protocol</span>
                    </div>
                    <p>
                      Direct inquiries are routed to senior superintendents. Laycan windows, draft constraints, and fixture indications provided promptly.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Fleet Directory</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Key Metric Ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
              <div className="px-4 py-1 text-center md:text-left">
                <span className="text-[11px] text-slate-400 uppercase font-specs block">Total Managed DWT</span>
                <strong className="text-xl sm:text-2xl font-specs font-bold text-white">1.85M+ MT</strong>
              </div>
              <div className="px-4 py-1 text-center md:text-left">
                <span className="text-[11px] text-slate-400 uppercase font-specs block">Technical Uptime</span>
                <strong className="text-xl sm:text-2xl font-specs font-bold text-cyan-400">99.4%</strong>
              </div>
              <div className="px-4 py-1 text-center md:text-left">
                <span className="text-[11px] text-slate-400 uppercase font-specs block">Zero-Harm Record</span>
                <strong className="text-xl sm:text-2xl font-specs font-bold text-emerald-400">0.00 LTI</strong>
              </div>
              <div className="px-4 py-1 text-center md:text-left">
                <span className="text-[11px] text-slate-400 uppercase font-specs block">Global Hubs</span>
                <strong className="text-xl sm:text-2xl font-specs font-bold text-white">5 Strategic Ports</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FLEET SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
              <Ship className="w-3.5 h-3.5" />
              <span>Verified Fleet Discovery</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Published Commercial Vessels
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Inspected, certified tonnage available for spot fixtures, period time charter, and technical representation.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentTab('fleet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 font-semibold text-xs transition-colors self-start md:self-auto"
          >
            <span>View Complete Fleet Directory ({vessels.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Vessel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVessels.map((vessel) => (
            <div 
              key={vessel.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/60 shadow-lg hover:shadow-cyan-950/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Vessel Image */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img 
                    src={vessel.imageUrl} 
                    alt={vessel.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-specs font-semibold uppercase bg-slate-950/80 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                      {vessel.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-specs font-semibold uppercase backdrop-blur-sm ${
                      vessel.availabilityStatus === 'Available for Charter'
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
                        : 'bg-blue-950/90 text-blue-300 border border-blue-700'
                    }`}>
                      ● {vessel.availabilityStatus}
                    </span>
                  </div>
                </div>

                {/* Vessel Summary */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {vessel.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-specs">
                      {vessel.subType}
                    </p>
                  </div>

                  {/* Quick specs matrix */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block">DWT:</span>
                      <strong className="text-slate-200 font-specs">{vessel.dwt.toLocaleString()} MT</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Draft:</span>
                      <strong className="text-slate-200 font-specs">{vessel.summerDraft} m</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Built:</span>
                      <strong className="text-slate-200 font-specs">{vessel.builtYear}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Flag:</span>
                      <strong className="text-slate-200 truncate block">{vessel.flag}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {vessel.features[0]}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-800/50 mt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectVessel(vessel)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors text-center"
                >
                  Particulars
                </button>
                <button
                  onClick={() => onOpenEnquiry(vessel)}
                  className="py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                >
                  Charter
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUR CORE MARITIME PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Maritime Service Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Integrated Solutions From Stem to Stern
          </h2>
          <p className="text-sm text-slate-400">
            Engineered according to international maritime conventions, industry vetting criteria, and commercial chartering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1: Commercial Chartering */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all space-y-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
                DIVISION 01
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Commercial Vessel Chartering & Fixtures
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matching cargo requirements with optimal tonnage across dry bulk, crude oil, clean petroleum, and specialized chemical markets. Operating under BIMCO standard charter parties (Gencon, NYPE, Shelltime, BPVOY).
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Voyage Charters (Spot Fixtures) & Freight Indication</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Period Time Charters & Bareboat Contracts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Contracts of Affreightment (COA) for Industrial Shippers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Laytime, Demurrage & Post-Fixture Commercial Management</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <span>Explore Commercial Scope</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Technical Ship Management */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all space-y-5">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-specs text-blue-400 uppercase tracking-wider font-bold">
                DIVISION 02
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Technical Fleet Superintendency & Maintenance
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete engineering oversight by certified Master Mariners and Chief Engineers. Implementing computerized Planned Maintenance Systems (PMS) to maximize vessel uptime, minimize off-hire, and control drydock budgets.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>24/7 Technical Superintendency & Remote Diagnostic Support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Drydocking Tender Preparation, Yard Supervision & Cost Control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Condition Monitoring, Lube Oil Analysis & Hull Performance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Global Marine Spare Parts Procurement & Bunkering Quality Audit</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
            >
              <span>Explore Technical Scope</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: Offshore Marine Logistics */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all space-y-5">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-specs text-amber-400 uppercase tracking-wider font-bold">
                DIVISION 03
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Offshore Marine Support & Rig Towage
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized offshore marine operations supporting oil & gas exploration, offshore wind, and marine construction. Operating DP2 AHTS, PSVs, tugs, and crew transfer vessels in the Arabian Gulf and international fields.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Anchor Handling & Heavy Jack-up Rig Relocation Towage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Platform Supply (Fuel, Potable Water, Drill Mud, Dry Bulk)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FiFi 1 External Firefighting & Emergency Oil Spill Standby</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Harbor Towage, Barge Transport & Port Husbandry Agency</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5"
            >
              <span>Explore Offshore Scope</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4: QHSE & Vetting */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all space-y-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-specs text-emerald-400 uppercase tracking-wider font-bold">
                DIVISION 04
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                QHSE, SIRE 2.0 & RightShip Vetting Compliance
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uncompromising adherence to international maritime safety codes and major oil/commodity vetting standards. Protecting shipowners, charterers, and cargo interests against detentions and reputational risk.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISM Code, ISPS Code & MLC 2006 Audits and Certification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>OCIMF SIRE 2.0 Inspection Preparation & Root-Cause Remediation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RightShip Safety Score (5-Star) & GHG Rating Optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MARPOL Decarbonization Advisory (CII, EEXI & EU ETS Management)</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setCurrentTab('compliance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5"
            >
              <span>Explore Safety Charter</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* EMBEDDED INTERACTIVE VOYAGE ESTIMATOR */}
      <VoyageCalculator onOpenEnquiryWithData={onOpenEnquiryWithData} />

      {/* STRATEGIC MARITIME CORRIDORS & GLOBAL HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Operating Desks</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Strategic Gateway Desks & Marine Logistics
            </h2>
            <p className="text-xs text-slate-400">
              Positioned in the world's primary bunkering, chartering, and transshipment corridors to provide rapid physical and commercial attendance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-specs text-cyan-400 font-bold block">HEADQUARTERS</span>
              <h4 className="text-base font-bold text-white">Dubai Hub (UAE)</h4>
              <p className="text-xs text-slate-400">
                Commercial chartering desk, Arabian Gulf offshore operations, and bunker coordination.
              </p>
              <div className="text-[11px] text-cyan-300 font-specs pt-2">UTC+4 • 24/7 Response</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-specs text-cyan-400 font-bold block">EAST ASIA GATEWAY</span>
              <h4 className="text-base font-bold text-white">Singapore Hub</h4>
              <p className="text-xs text-slate-400">
                Trans-Pacific tanker & bulker fixtures, Malacca Strait agency, and crew logistics.
              </p>
              <div className="text-[11px] text-cyan-300 font-specs pt-2">UTC+8 • Port Agency Active</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-specs text-cyan-400 font-bold block">EUROPE & ATLANTIC</span>
              <h4 className="text-base font-bold text-white">Rotterdam Desk</h4>
              <p className="text-xs text-slate-400">
                North Sea clean petroleum trades, European terminal vetting, and EU ETS compliance.
              </p>
              <div className="text-[11px] text-cyan-300 font-specs pt-2">UTC+1 • Commercial Vetting</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-specs text-cyan-400 font-bold block">TECHNICAL HUB</span>
              <h4 className="text-base font-bold text-white">Mumbai Operations</h4>
              <p className="text-xs text-slate-400">
                Marine technical superintendency, drydock engineering teams, and STCW crew crewing.
              </p>
              <div className="text-[11px] text-cyan-300 font-specs pt-2">UTC+5:30 • Engineering Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* CHARTERER ENDORSEMENTS & CORPORATE TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-800 bg-slate-950/80 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "GRAVITY SEA FLEETS fixed our 58,000 MT coal stem from Richards Bay to Mundra with flawless dispatch. Vessel gears and grabs were maintained to the highest Japanese standards, achieving record discharge rates."
              </p>
              <div className="text-xs text-slate-400">
                <strong className="text-white block">Senior Chartering Manager</strong>
                <span>Global Commodities Trading Conglomerate, Geneva</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Their DP2 AHTS vessel GRAVITY SENTINEL executed our jack-up rig repositioning in the Arabian Gulf under extreme weather conditions without a single safety incident. Flawless dynamic positioning."
              </p>
              <div className="text-xs text-slate-400">
                <strong className="text-white block">Offshore Marine Superintendent</strong>
                <span>Major National Oil Company, UAE</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "In technical management, their superintendents managed our drydocking in Zhoushan with zero cost overruns and completed class renewal 3 days ahead of schedule. Truly professional partner."
              </p>
              <div className="text-xs text-slate-400">
                <strong className="text-white block">Fleet Director</strong>
                <span>Aegean Shipowners Alliance, Piraeus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-cyan-700/50 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-specs tracking-wider text-cyan-300 font-bold">
              COMMERCIAL CHARTERING & FLEET PARTNERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Discuss Your Next Vessel Fixture or Technical RFP?
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100/80">
              Our chartering superintendents respond within 4 hours with vetted tonnage options, indicative freight estimates, and technical feasibility reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-cyan-50 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-700" />
              <span>Submit Commercial RFP</span>
            </button>
            <a
              href="tel:+97148894500"
              className="px-6 py-3.5 rounded-xl bg-slate-950/60 text-white hover:bg-slate-950 border border-white/20 font-semibold text-xs transition-all flex items-center gap-2"
            >
              <span>Call Duty Superintendent</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
