import React from 'react';
import VesselImage from '../components/VesselImage';
import { 
  Anchor, 
  ShieldCheck, 
  Award, 
  Users, 
  Globe2, 
  Compass, 
  Ship, 
  CheckCircle2, 
  Leaf,
  ChevronRight
} from 'lucide-react';

export default function About({ onOpenEnquiry, setCurrentTab }) {
  const leadership = [
    {
      name: "Capt. Alexander Vance",
      role: "Managing Director & Chief Executive Officer",
      credentials: "Master Mariner (FG) • Fellow of Institute of Chartered Shipbrokers (FICS)",
      bio: "Over 28 years of global maritime leadership encompassing command of Capesize bulkers and executive commercial leadership across Singapore, London, and Dubai.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Eng. Tariq Al-Mansoor",
      role: "Technical Fleet Director",
      credentials: "Chief Engineer (Unlimited) • B.Eng Naval Architecture • DNV Certified Auditor",
      bio: "24 years specializing in propulsion systems, shipyard drydock management, and computerized planned maintenance systems for Japanese-built bulkers and tankers.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Elena Rostova",
      role: "Head of Commercial Chartering & Liquid Bulk",
      credentials: "M.Sc Maritime Economics • Ex-Senior Chartering Officer, Geneva",
      bio: "Specialist in Aframax and MR2 tanker fixtures, clean petroleum product arbitrations, and complex Contracts of Affreightment (COA) across Atlantic and Middle East corridors.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Capt. Rajesh Nair",
      role: "Director of Offshore Marine Operations",
      credentials: "Master Mariner • Kongsberg Dynamic Positioning (DP2) Certified",
      bio: "22 years spearheading deepwater anchor handling, rig moves, and supply operations for national oil companies in the Arabian Gulf, Red Sea, and Southeast Asia.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#F8F9FA] text-slate-800">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
          CORPORATE PROFILE & GOVERNANCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif-maritime">
          About GRAVITY SEA FLEETS
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          A forward-thinking maritime enterprise founded on engineering discipline, commercial integrity, and an unyielding commitment to safety on the high seas.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold">
            FOUNDATION & PURPOSE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif-maritime">
            Navigating Modern Ocean Trade With Discipline & Transparency
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            GRAVITY SEA FLEETS was established to bridge the gap between traditional maritime operational rigour and modern digital fleet visibility. In an era of volatile freight markets and stringent decarbonization mandates, we provide charterers and shipowners with dependable, verified tonnage and rigorous technical superintendency.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered in Dubai with operational desks in Singapore, Rotterdam, Houston, and Mumbai, our multi-disciplinary superintendents manage commercial charters and technical workflows across all primary sea routes. We maintain absolute transparency in vessel performance, fuel consumption, and vetting inspection status.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <strong className="text-2xl font-specs font-bold text-[#0A192F] block">1.85M+ MT</strong>
              <span className="text-xs text-slate-500">Total DWT Managed & Commercialized</span>
            </div>
            <div>
              <strong className="text-2xl font-specs font-bold text-emerald-700 block">0.00 LTI</strong>
              <span className="text-xs text-slate-500">Zero-Harm Lost Time Incident Benchmark</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative border border-slate-300 shadow-md aspect-4/3 bg-[#0A192F] overflow-hidden">
            <VesselImage 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Container_ship_CMA_CGM_Amerigo_Vespucci.jpg/1280px-Container_ship_CMA_CGM_Amerigo_Vespucci.jpg" 
              alt="Global Commercial Fleet Operations" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 border border-slate-200 text-xs shadow-md">
              <span className="text-[#0A192F] font-specs font-bold block mb-0.5 uppercase tracking-wider">24/7 Global Fleet Operations</span>
              <span className="text-slate-600">Continuous meteorological routing, speed optimization, and bunker telemetry across all active voyages.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-white border border-slate-200 p-8 sm:p-12 space-y-8 shadow-sm">
        <div className="max-w-2xl space-y-1 border-b border-slate-200 pb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
            CORE VALUES
          </span>
          <h3 className="text-2xl font-extrabold text-[#0A192F] font-serif-maritime">Our Operating Philosophy</h3>
          <p className="text-xs text-slate-500">
            Four non-negotiable standards that govern every fixture, technical decision, and offshore operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 border border-slate-200 space-y-2">
            <span className="text-sm font-specs font-bold text-[#9A7B4F] block">01 / SAFETY</span>
            <h4 className="text-base font-bold text-[#0A192F] font-serif-maritime">Safety Beyond Compliance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeting zero injuries, zero spills, and zero shipboard detentions through proactive safety audits and crew empowerment.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 space-y-2">
            <span className="text-sm font-specs font-bold text-[#9A7B4F] block">02 / RIGOUR</span>
            <h4 className="text-base font-bold text-[#0A192F] font-serif-maritime">Engineering Precision</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Main engine telemetry, predictive vibration analysis, and precision drydock superintendence to preserve vessel market value.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 space-y-2">
            <span className="text-sm font-specs font-bold text-[#9A7B4F] block">03 / CERTAINTY</span>
            <h4 className="text-base font-bold text-[#0A192F] font-serif-maritime">Commercial Certainty</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent charter party terms, realistic laycan commitments, and immediate post-fixture resolution of laytime and demurrage.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 space-y-2">
            <span className="text-sm font-specs font-bold text-[#9A7B4F] block">04 / ESG</span>
            <h4 className="text-base font-bold text-[#0A192F] font-serif-maritime">Decarbonization Focus</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipping tonnage with Becker Mewis ducts, high-efficiency rudders, and bio-fuel compatibility to secure top RightShip GHG ratings.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-specs text-[#9A7B4F] uppercase tracking-wider font-bold block">
            EXECUTIVE DIRECTORS & SUPERINTENDENTS
          </span>
          <h2 className="text-3xl font-extrabold text-[#0A192F] font-serif-maritime mt-1">
            Executive Leadership Team
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Led by career maritime professionals with decades of sea-going command and commercial chartering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square bg-slate-900 overflow-hidden relative">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-[#0A192F] text-base font-serif-maritime">{leader.name}</h4>
                  <div className="text-xs text-[#0284C7] font-semibold">{leader.role}</div>
                  <div className="text-[11px] text-slate-500 font-specs border-b border-slate-100 pb-2">{leader.credentials}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{leader.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
