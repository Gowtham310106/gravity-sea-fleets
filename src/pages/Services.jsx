import React, { useState } from 'react';
import { 
  Ship, 
  SlidersHorizontal, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Wrench, 
  ChevronRight
} from 'lucide-react';

export default function Services({ onOpenEnquiryWithData }) {
  const [activeDivision, setActiveDivision] = useState('chartering');

  const divisions = [
    {
      id: 'chartering',
      title: 'Commercial Vessel Chartering',
      icon: Ship,
      subtitle: 'Spot Voyage Fixtures, Time Charters & Freight Solutions',
      description: 'Connecting global cargo principals with optimal tonnage across dry bulk, liquid energy, and containerized corridors under standard BIMCO charter parties.'
    },
    {
      id: 'technical',
      title: 'Technical Ship Superintendency',
      icon: SlidersHorizontal,
      subtitle: '24/7 Superintendency, Planned Maintenance & Drydocking',
      description: 'Comprehensive engineering oversight led by career Chief Engineers and Master Mariners to ensure 99.4% fleet uptime and capital asset preservation.'
    },
    {
      id: 'offshore',
      title: 'Offshore Marine Support',
      icon: Compass,
      subtitle: 'DP2 AHTS Towage, PSV Logistics & Port Husbandry',
      description: 'High-capability offshore support vessels and round-the-clock port agency services supporting oil & gas exploration and offshore marine projects.'
    },
    {
      id: 'qhse',
      title: 'QHSE & Vetting Compliance',
      icon: ShieldCheck,
      subtitle: 'ISM / ISPS, SIRE 2.0 Vetting & RightShip Optimization',
      description: 'Rigorous maritime safety, environmental stewardship, and quality assurance framework ensuring zero detentions and highest vetting ratings.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#F8F9FA] text-slate-800">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
          OPERATIONAL SCOPE & CAPABILITIES
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif-maritime">
          Combined Maritime Services
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          GRAVITY SEA FLEETS delivers end-to-end maritime services tailored to shipowners, charterers, and industrial commodity shippers. Engineered to comply with IMO codes, Classification Society standards, and major charterer vetting regimes.
        </p>
      </div>

      {/* Division Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {divisions.map((div) => {
          const Icon = div.icon;
          const isActive = activeDivision === div.id;
          return (
            <button
              key={div.id}
              onClick={() => setActiveDivision(div.id)}
              className={`p-6 border text-left transition-all relative ${
                isActive
                  ? 'bg-white border-[#0A192F] shadow-md border-t-4 border-t-[#C5A880]'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center mb-3 ${
                isActive ? 'bg-[#0A192F] text-[#C5A880]' : 'bg-slate-100 text-[#0A192F]'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#0A192F] font-serif-maritime">
                {div.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {div.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* DIVISION 1: Commercial Chartering */}
      {activeDivision === 'chartering' && (
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-10 shadow-sm animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                DIVISION 01 — COMMERCIAL OPERATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
                Commercial Vessel Chartering & Fixtures
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our commercial desk handles spot voyage fixtures, period time charters, bareboat contracts, and Industrial Contracts of Affreightment (COA). We provide cargo charterers with verified, well-positioned tonnage that matches strict terminal draft constraints and loading rates.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenEnquiryWithData({
                  enquiryType: 'Vessel Chartering',
                  message: 'Commercial Chartering RFP: Inquiring regarding available tonnage, freight indications, and laycan windows.'
                })}
                className="px-6 py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>Submit Charter RFP</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Voyage Charter (Spot Fixtures)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prompt freight rate indications on Worldscale, Lump Sum, or $/MT basis. Full cargo calculation for grain, thermal coal, iron ore, crude oil, and clean petroleum products.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• BIMCO GENCON / SHELLTIME standard contracts</li>
                <li>• Real-time vessel position tracking</li>
                <li>• Comprehensive laytime & demurrage settlement</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Period Time Charter</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Short-term (3-6 months) and long-term (1-5 years) period charters for commodity trading desks requiring dedicated supply chain control and predictable transportation economics.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Guaranteed speed and consumption warranties</li>
                <li>• Vetting clearances with major oil/mining houses</li>
                <li>• Flexible delivery / redelivery port ranges</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Post-Fixture & Commercial Claims</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated post-fixture superintendents overseeing statement of facts (SOF), notice of readiness (NOR) validation, laytime accounts, bunker reconciliation, and freight collection.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• 24/7 Voyage operational monitoring</li>
                <li>• Proactive bunker optimization advisory</li>
                <li>• Rapid demurrage dispute resolution</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DIVISION 2: Technical Ship Management */}
      {activeDivision === 'technical' && (
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-10 shadow-sm animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                DIVISION 02 — ENGINEERING & SUPERINTENDENCY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
                Technical Ship Superintendency & Engineering
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our technical team of veteran Chief Engineers and Naval Architects delivers uncompromising maintenance, planned maintenance system (PMS) governance, and drydock project execution. We keep vessels in prime operating condition with minimal off-hire.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenEnquiryWithData({
                  enquiryType: 'Technical Management',
                  message: 'Technical Management Proposal: Requesting formal management quote for fleet superintendency and drydock oversight.'
                })}
                className="px-6 py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#C5A880]" />
                <span>Request Technical Proposal</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Planned Maintenance Systems (PMS)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cloud-synchronized maintenance routines covering Main Propulsion, Auxiliary Generators, Cargo Pumps, and Navigation Bridge systems with full Class society type-approval.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Condition-based vibration monitoring</li>
                <li>• Continuous lube oil analysis programs</li>
                <li>• 99.4% historical fleet uptime record</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Drydock Planning & Supervision</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tender specification generation, shipyard selection across Asia, Europe, and Middle East, and round-the-clock on-site superintendent attendance to prevent budget overruns.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Hull hydro-blasting and silicone foul-release coating</li>
                <li>• Tailshaft, rudder, and sea valve class renewals</li>
                <li>• Average 12% shipyard tender savings achieved</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Marine Spares & Bunker Quality</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centralized global purchasing power for OEM machinery spares (MAN Energy Solutions, Wärtsilä, Yanmar) and ISO 8217 compliant bunker fuels (VLSFO, LSMGO, Biofuel blends).
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Bonded warehouse hubs in Singapore & Dubai</li>
                <li>• Pre-delivery bunker fuel testing (viscosity & sulfur)</li>
                <li>• Rapid emergency air-freight dispatch</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DIVISION 3: Offshore Marine Support */}
      {activeDivision === 'offshore' && (
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-10 shadow-sm animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                DIVISION 03 — OFFSHORE & LOGISTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
                Offshore Marine Support & Rig Towage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Supporting offshore energy exploration, offshore wind development, and marine construction with advanced Dynamic Positioning (DP2) Anchor Handling Tug Supply (AHTS) vessels and specialized Platform Supply Vessels (PSVs).
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenEnquiryWithData({
                  enquiryType: 'Offshore Support',
                  message: 'Offshore Marine Support RFP: Requirement for DP2 AHTS / PSV tonnage and port agency logistics.'
                })}
                className="px-6 py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C5A880]" />
                <span>Submit Offshore RFP</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Anchor Handling & Rig Towage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bollard pull ratings up to 165 MT continuous with high-capacity double-drum waterfall winches. Specialized in jack-up rig shifts, semi-submersible mooring spreads, and deepwater anchor deployment.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Kongsberg DP2 positioning systems</li>
                <li>• 500t shark jaws & towing pins</li>
                <li>• Experienced offshore tow masters</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Platform Supply & Liquid Mud</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                PSVs equipped with large clear deck areas (up to 840 m²) and specialized tanks for drill water, brine, liquid mud, base oil, and dry bulk cement transfer to offshore rigs.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Agitator systems in liquid mud tanks</li>
                <li>• Clean Design & Low Emission notations</li>
                <li>• Accommodations for offshore client specialists</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Port Agency & Husbandry Services</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full physical port representation across Arabian Gulf and Singapore terminals. Managing port clearances, customs formalities, bunker coordination, crew changes, and medical emergencies.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• In-house port agents in Dubai & Singapore</li>
                <li>• Competitive Disbursement Accounts (DA)</li>
                <li>• Fast launch boat transfers</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DIVISION 4: QHSE & Vetting */}
      {activeDivision === 'qhse' && (
        <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-10 shadow-sm animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
                DIVISION 04 — QUALITY, HEALTH, SAFETY & ENVIRONMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
                QHSE, SIRE 2.0 & RightShip Vetting Compliance
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating vessels in full alignment with the highest standards of international maritime legislation. We guarantee zero PSC detentions, continuous DOC/SMC validity, and high commercial acceptance by oil majors and charterers.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenEnquiryWithData({
                  enquiryType: 'General Maritime RFP',
                  message: 'QHSE & Vetting Inquiry: Inquiring regarding SIRE 2.0 vetting inspection audit records and RightShip GHG ratings.'
                })}
                className="px-6 py-3.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Request Compliance Dossier</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">OCIMF SIRE 2.0 Inspection Prep</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete pre-inspection audit preparation under the new OCIMF SIRE 2.0 tablet-based vetting regime. Training crew on human factors, behavioral questions, and process verification.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Pre-vetting mock audits by ex-vettors</li>
                <li>• Comprehensive Root Cause Analysis (RCA)</li>
                <li>• 100% acceptance with Shell, BP, ExxonMobil</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">RightShip 5-Star & GHG Management</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintaining dry bulk and container tonnage at top RightShip safety tier (Safety Score 5/5) and optimum GHG Emissions ratings (A/B tier) to secure premium charter rates.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Energy efficiency upgrades (Becker Mewis, PBCF)</li>
                <li>• RightShip inspection management</li>
                <li>• Direct liaison with charterer vetting teams</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">Decarbonization & Environmental ESG</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guiding shipowners through the complex regulatory landscape of Carbon Intensity Indicator (CII), Energy Efficiency Existing Ship Index (EEXI), and the EU Emissions Trading System (EU ETS).
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Real-time voyage fuel telemetry</li>
                <li>• Biofuel and alternative fuel trial programs</li>
                <li>• ISO 14001:2015 environmental certification</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
