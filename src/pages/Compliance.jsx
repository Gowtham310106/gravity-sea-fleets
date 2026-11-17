import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Award, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Leaf,
  Lock,
  Globe2,
  Anchor,
  FileCheck,
  Compass
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
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* Editorial Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF5EE] border border-[#E8DCC8] rounded text-[#9A7B4F] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Statutory Governance & Vetting Assurance</span>
            </div>
            <h1 className="font-serif-maritime text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight leading-tight">
              Safety, Regulatory Integrity & Technical Vetting
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              GRAVITY SEA FLEETS enforces uncompromising safety regimes across all managed and commercial tonnage. Our governance framework conforms to IMO conventions, Flag State statutory mandates, and the most exacting vetting standards required by international energy majors and commodity traders.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* Statutory Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:border-[#C5A880] transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-maritime text-lg font-bold text-[#0A192F]">ISM Code Certified</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Full Document of Compliance (DOC) audited annually by DNV, Lloyd's Register, and Flag Administrations.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-specs text-[#9A7B4F]">
              <span>Ref: DNV-GL-DOC-2026</span>
              <span className="font-semibold text-emerald-700">100% Active</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:border-[#C5A880] transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-maritime text-lg font-bold text-[#0A192F]">ISPS Security Plans</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Verified International Ship Security Certificates (ISSC) with hardened physical defense and anti-piracy protocols.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-specs text-[#9A7B4F]">
              <span>ISSC Level 1 Standard</span>
              <span className="font-semibold text-emerald-700">Flag Validated</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:border-[#C5A880] transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-maritime text-lg font-bold text-[#0A192F]">MARPOL VI & Decarb</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Compliance with 0.50% VLSFO mandates, UV Ballast Water treatment, and CII / EEXI telemetry tracking.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-specs text-[#9A7B4F]">
              <span>CII Fleet Rating: A/B</span>
              <span className="font-semibold text-emerald-700">Tier III NOx</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded shadow-sm hover:border-[#C5A880] transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-[#0A192F] text-[#C5A880] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-maritime text-lg font-bold text-[#0A192F]">SIRE 2.0 & RightShip</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Tanker tonnage pre-vetted for OCIMF SIRE 2.0 audits. Dry bulk units maintain 5-Star RightShip safety scores.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-specs text-[#9A7B4F]">
              <span>PSC Detention Record</span>
              <span className="font-semibold text-emerald-700">0 Detentions</span>
            </div>
          </div>
        </div>

        {/* Pre-Fixture Vetting Methodology */}
        <div className="bg-white border border-slate-200 rounded p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-[#9A7B4F] uppercase tracking-wider">
              Systematic Risk Mitigation
            </span>
            <h2 className="font-serif-maritime text-2xl sm:text-3xl font-bold text-[#0A192F]">
              Pre-Fixture Vetting Methodology
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In international shipping, a single vetting rejection can halt supply chains and trigger costly charter party disputes. Our superintendent team executes a three-stage verification process prior to presenting tonnage to major charterers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F9FA] border border-slate-200 rounded space-y-3">
              <div className="text-2xl font-serif-maritime font-bold text-[#C5A880]">01</div>
              <h3 className="font-bold text-[#0A192F] text-sm">Pre-Inspection Internal Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Superintendents board vessels ahead of scheduled terminal inspections to execute simulated SIRE 2.0 and RightShip drills, auditing navigation logs, inert gas systems, and cargo manifold integrity.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] border border-slate-200 rounded space-y-3">
              <div className="text-2xl font-serif-maritime font-bold text-[#C5A880]">02</div>
              <h3 className="font-bold text-[#0A192F] text-sm">72-Hour Rapid Observation Closeout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Any minor observation noted during Port State Control (PSC) or terminal inspections is subjected to a formal 5-Why root cause analysis and resolved with photographic verification within 72 hours.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] border border-slate-200 rounded space-y-3">
              <div className="text-2xl font-serif-maritime font-bold text-[#C5A880]">03</div>
              <h3 className="font-bold text-[#0A192F] text-sm">Transparent Charterer Dossiers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chartering principals receive instant access to full vetting dossiers: updated Q88/VPQ, Officer Matrix, Last 10 Cargoes record, and Class Survey Status to expedite commercial approval.
              </p>
            </div>
          </div>
        </div>

        {/* Official Governance & Policy Charters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#9A7B4F] uppercase tracking-wider">
                Corporate Governance Charters
              </span>
              <h2 className="font-serif-maritime text-2xl sm:text-3xl font-bold text-[#0A192F] mt-1">
                Statutory Policies & Procedures
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Controlled documents maintained by the GRAVITY SEA FLEETS Technical Compliance Committee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded border border-slate-200 hover:border-[#C5A880] transition-colors shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-specs">
                    <span className="text-[#0A192F] font-bold">{p.code}</span>
                    <span className="text-slate-500">{p.rev}</span>
                  </div>
                  <h3 className="font-serif-maritime text-base font-bold text-[#0A192F]">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 flex items-center gap-1.5 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Board Approved</span>
                  </span>
                  <button
                    onClick={() => onOpenEnquiry()}
                    className="text-[#0A192F] hover:text-[#9A7B4F] font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Request Full Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Society Recognition Strip */}
        <div className="bg-[#0A192F] text-white rounded p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
                Recognized Organizations (RO)
              </span>
              <h3 className="font-serif-maritime text-2xl font-bold mt-1">
                International Classification Societies
              </h3>
            </div>
            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#B39368] text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded transition-colors self-start sm:self-auto"
            >
              Request Class Records
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            All vessels under management hold valid classification certificates issued by leading members of the International Association of Classification Societies (IACS). Class notations include ESP, *IWS (In-Water Survey), and certified Ballast Water Management.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-center">
            <div className="p-4 rounded bg-slate-900/60 border border-slate-800">
              <span className="font-serif-maritime text-lg font-bold text-white block">DNV</span>
              <span className="text-[11px] text-slate-400">Det Norske Veritas</span>
            </div>
            <div className="p-4 rounded bg-slate-900/60 border border-slate-800">
              <span className="font-serif-maritime text-lg font-bold text-white block">Lloyd's Register</span>
              <span className="text-[11px] text-slate-400">LR Quality Assurance</span>
            </div>
            <div className="p-4 rounded bg-slate-900/60 border border-slate-800">
              <span className="font-serif-maritime text-lg font-bold text-white block">ABS</span>
              <span className="text-[11px] text-slate-400">American Bureau of Shipping</span>
            </div>
            <div className="p-4 rounded bg-slate-900/60 border border-slate-800">
              <span className="font-serif-maritime text-lg font-bold text-white block">ClassNK</span>
              <span className="text-[11px] text-slate-400">Nippon Kaiji Kyokai</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}