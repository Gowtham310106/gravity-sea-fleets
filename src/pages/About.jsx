import React from 'react';
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
  ChevronRight,
  TrendingUp
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
          <Anchor className="w-3.5 h-3.5" />
          <span>Corporate Profile & Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About GRAVITY SEA FLEETS
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          A forward-thinking maritime enterprise founded on engineering discipline, commercial integrity, and an unyielding commitment to safety on the high seas.
        </p>
      </div>

      {/* Corporate Story & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
            FOUNDATION & PURPOSE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Navigating Modern Ocean Trade With Discipline & Transparency
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            GRAVITY SEA FLEETS was established to bridge the gap between traditional maritime operational rigour and modern digital fleet visibility. In an era of volatile freight markets and stringent decarbonization mandates, we provide charterers and shipowners with dependable, verified tonnage and rigorous technical superintendency.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Headquartered in Dubai with operational desks in Singapore, Rotterdam, Houston, and Mumbai, our multi-disciplinary superintendents manage commercial charters and technical workflows across all primary sea routes. We maintain absolute transparency in vessel performance, fuel consumption, and vetting inspection status.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <strong className="text-xl sm:text-2xl font-specs font-bold text-white block">1.85M+ MT</strong>
              <span className="text-xs text-slate-400">Total DWT Managed & Commercialized</span>
            </div>
            <div>
              <strong className="text-xl sm:text-2xl font-specs font-bold text-cyan-400 block">0.00 LTI</strong>
              <span className="text-xs text-slate-400">Zero-Harm Lost Time Incident Benchmark</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-4/3 bg-slate-950">
            <img 
              src="https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80" 
              alt="Bridge Navigation Systems" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs">
              <span className="text-cyan-400 font-specs font-semibold block mb-0.5">24/7 Global Vessel Tracking</span>
              <span className="text-slate-300">Continuous meteorological routing and propulsion monitoring across all active voyages.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-extrabold text-white">Our Operating Philosophy</h3>
          <p className="text-xs text-slate-400">
            Four non-negotiable standards that govern every fixture, technical decision, and offshore operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-specs font-bold">
              01
            </div>
            <h4 className="text-base font-bold text-white">Safety Beyond Compliance</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeting zero injuries, zero spills, and zero shipboard detentions through proactive safety audits and crew empowerment.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-specs font-bold">
              02
            </div>
            <h4 className="text-base font-bold text-white">Engineering Rigour</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Main engine telemetry, predictive vibration analysis, and precision drydock superintendence to preserve vessel market value.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center font-specs font-bold">
              03
            </div>
            <h4 className="text-base font-bold text-white">Commercial Certainty</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent charter party terms, realistic laycan commitments, and immediate post-fixture resolution of laytime and demurrage.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-specs font-bold">
              04
            </div>
            <h4 className="text-base font-bold text-white">Decarbonization Focus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipping tonnage with Becker Mewis ducts, high-efficiency rudders, and bio-fuel compatibility to secure top RightShip GHG ratings.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
            MARITIME EXECUTIVES & SUPERINTENDENTS
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Executive Leadership & Fleet Directors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Led by career maritime professionals with decades of sea-going command and commercial chartering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square bg-slate-950 overflow-hidden relative">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-white text-base">{leader.name}</h4>
                  <div className="text-xs text-cyan-400 font-medium">{leader.role}</div>
                  <div className="text-[11px] text-slate-500 font-specs border-b border-slate-800 pb-2">{leader.credentials}</div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">{leader.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Partner With GRAVITY SEA FLEETS</h3>
          <p className="text-xs text-slate-400 mt-1">
            Contact our executive commercial desk to discuss fleet representation or long-term charter partnerships.
          </p>
        </div>
        <button
          onClick={onOpenEnquiry}
          className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shrink-0"
        >
          Initiate Discussion
        </button>
      </div>

    </div>
  );
}
