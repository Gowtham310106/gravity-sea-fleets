import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ExternalLink,
  Leaf,
  Lock,
  Globe2
} from 'lucide-react';

export default function Compliance({ onOpenEnquiry }) {
  const policies = [
    {
      title: "Safety Management System (SMS) Charter",
      code: "GSF-SMS-POL-01",
      rev: "Rev 4.2 / 2026",
      desc: "Mandatory shipboard operating procedures, emergency muster drills, enclosed space entry protocols, and master's overriding authority under IMO ISM Code."
    },
    {
      title: "Environmental Stewardship & Decarbonization Policy",
      code: "GSF-ENV-POL-02",
      rev: "Rev 3.0 / 2026",
      desc: "Zero-discharge of plastics and oily waste, MARPOL Annex VI compliance, CII/EEXI telemetry tracking, and biofuel voyage adoption standards."
    },
    {
      title: "Drug & Alcohol Zero-Tolerance Policy",
      code: "GSF-HR-POL-03",
      rev: "Rev 5.1 / 2026",
      desc: "Strict zero-tolerance policy on all managed and represented vessels with mandatory unannounced third-party breathalyzer and urine testing."
    },
    {
      title: "Shipboard Cyber Security & OT Defense",
      code: "GSF-CYB-POL-04",
      rev: "Rev 2.0 / 2026",
      desc: "Protection of ECDIS, automated engine control networks, and satellite comms against ransomware and unauthorized access conforming to IMO Resolution MSC.428(98)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Statutory Governance & Vetting Assurance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Maritime Safety, Quality & Environmental Standards
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          GRAVITY SEA FLEETS upholds zero-tolerance safety regimes. All operations conform to IMO conventions, Flag State statutory regulations, and the most exacting charterer vetting standards in international shipping.
        </p>
      </div>

      {/* Main Credentials Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-cyan-950 text-cyan-400 rounded-xl w-fit border border-cyan-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">ISM Code Certified</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Full Document of Compliance (DOC) audited and renewed annually by DNV and Lloyd's Register.
          </p>
          <div className="text-[11px] font-specs text-cyan-400">DOC Ref: DNV-GL-DOC-2026</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-blue-950 text-blue-400 rounded-xl w-fit border border-blue-800">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">ISPS Security Plans</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vessels maintain verified International Ship Security Certificates (ISSC) with hardened anti-piracy protocols.
          </p>
          <div className="text-[11px] font-specs text-blue-400">Security Level: Level 1 Default</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl w-fit border border-emerald-800">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">MARPOL VI & Decarb</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Full compliance with low-sulfur 0.50% VLSFO mandates, Ballast Water UV treatment, and Tier III NOx standards.
          </p>
          <div className="text-[11px] font-specs text-emerald-400">GHG Rating: A/B Industry Tier</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-950 text-amber-400 rounded-xl w-fit border border-amber-800">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">SIRE 2.0 & RightShip</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tanker fleet ready for OCIMF SIRE 2.0 tablet audits. Dry bulk fleet maintains RightShip 5-Star safety scores.
          </p>
          <div className="text-[11px] font-specs text-amber-400">Detention Record: 0 PSC Detentions</div>
        </div>
      </div>

      {/* Vetting Process Detail */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
            VETTING METHODOLOGY
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Pre-Fixture Vetting Clearances & Risk Mitigation
          </h3>
          <p className="text-xs text-slate-400">
            We understand that a single vetting rejection can disrupt multi-million dollar supply chains. Our superintendents conduct rigorous internal audits before presenting tonnage to oil and commodity majors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <strong className="text-white text-sm block">1. Pre-Inspection Internal Audit</strong>
            <p className="text-slate-400 leading-relaxed">
              Ex-vetting superintendents board vessels ahead of scheduled inspections to conduct mock SIRE 2.0 and RightShip drills, inspecting all safety gear, inert gas plants, and navigational logs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <strong className="text-white text-sm block">2. Rapid Observation Remediation</strong>
            <p className="text-slate-400 leading-relaxed">
              Any minor observation flagged during a Port State Control (PSC) or charterer inspection is immediately analyzed with formal 5-Why Root Cause Analysis and closed within 72 hours.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <strong className="text-white text-sm block">3. Transparent Vetting Dossiers</strong>
            <p className="text-slate-400 leading-relaxed">
              Charterers receive immediate access to the vessel's Q88 questionnaire, Crew Matrix, Last 10 Cargoes, Class Status Report, and recent inspection reports to expedite commercial fixture approvals.
            </p>
          </div>
        </div>
      </div>

      {/* Downloadable Statutory Policies */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
            PUBLIC GOVERNANCE DOCUMENTS
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            Official Maritime Policies & Declarations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((p, idx) => (
            <div 
              key={idx}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-specs text-cyan-400">
                  <span>{p.code}</span>
                  <span className="text-slate-500">{p.rev}</span>
                </div>
                <h4 className="text-base font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved by Board of Directors</span>
                </span>
                <button
                  onClick={() => onOpenEnquiry()}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Request Full Copy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
