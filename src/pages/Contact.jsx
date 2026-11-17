import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building, 
  Radio, 
  CheckCircle2,
  Globe2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Contact({ onEnquirySubmitted }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Commercial Chartering Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [clocks, setClocks] = useState({
    dubai: '',
    singapore: '',
    rotterdam: '',
    houston: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setClocks({
        dubai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }),
        singapore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }),
        rotterdam: now.toLocaleTimeString('en-US', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit' }),
        houston: now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit' })
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `GSF-ENQ-2026-${randomNum}`;

    const newEnquiry = {
      id: refCode,
      createdAt: new Date().toISOString(),
      enquiryType: form.subject,
      status: 'New',
      assignedTo: 'Commercial Desk',
      vesselId: null,
      vesselName: null,
      contactName: form.name,
      company: form.company || 'Not Specified',
      email: form.email,
      phone: form.phone || 'Not Specified',
      cargoType: null,
      cargoVolume: null,
      loadPort: null,
      dischargePort: null,
      laycanStart: null,
      laycanEnd: null,
      message: form.message,
      internalNotes: 'Inbound transmission from website Contact Us form.',
      notificationStatus: 'Sent'
    };

    onEnquirySubmitted(newEnquiry);
    setSubmitted(true);
  };

  const hubs = [
    {
      city: "Dubai (Corporate Headquarters)",
      country: "United Arab Emirates",
      timezone: "UTC+4 (Gulf Standard Time)",
      localTime: clocks.dubai,
      address: "Almas Tower, Jumeirah Lakes Towers (JLT), Dubai, UAE",
      phone: "+971 4 889 4500",
      email: "dubai@gravityseafleets.com",
      focus: "Executive Directorate, Commercial Chartering Desk, Arabian Gulf & Red Sea Operations"
    },
    {
      city: "Singapore Operations Hub",
      country: "Republic of Singapore",
      timezone: "UTC+8 (Singapore Standard Time)",
      localTime: clocks.singapore,
      address: "Marina Bay Financial Centre, Tower 2, Singapore 018983",
      phone: "+65 6838 8800",
      email: "singapore@gravityseafleets.com",
      focus: "East Asia & Pacific Dry Bulker/Tanker Fixtures, Malacca Strait Husbandry & Bunkering"
    },
    {
      city: "Rotterdam Atlantic Desk",
      country: "The Netherlands",
      timezone: "UTC+1 (Central European Time)",
      localTime: clocks.rotterdam,
      address: "Willemskade 18, 3016 DL Rotterdam, Netherlands",
      phone: "+31 10 414 7720",
      email: "rotterdam@gravityseafleets.com",
      focus: "North Sea Clean Petroleum, European Terminal Vetting & EU ETS Compliance Management"
    },
    {
      city: "Houston Americas Desk",
      country: "United States of America",
      timezone: "UTC-5 (Central Time)",
      localTime: clocks.houston,
      address: "Memorial City Plaza, Houston, TX 77024, USA",
      phone: "+1 713 468 9000",
      email: "houston@gravityseafleets.com",
      focus: "US Gulf Crude & Petrochemical Fixtures, Panama Canal Transits & Americas Logistics"
    }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* Editorial Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF5EE] border border-[#E8DCC8] rounded text-[#9A7B4F] text-xs font-semibold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Worldwide Commercial Presence</span>
            </div>
            <h1 className="font-serif-maritime text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight leading-tight">
              Global Commercial Desks & Operations Command
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Positioned in the world’s key maritime and chartering hubs. Connect directly with our superintendents, chartering managers, and technical directors around the clock.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* 24/7 Duty Superintendent Watch Banner */}
        <div className="bg-[#0A192F] text-white rounded p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded bg-slate-900 border border-slate-800 text-[#C5A880] flex items-center justify-center shrink-0 mt-1">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-specs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Duty Superintendent Active (24/7/365)</span>
              </div>
              <h3 className="font-serif-maritime text-xl sm:text-2xl font-bold text-white">
                Urgent Vessel Assistance & Emergency Hotline
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                For master assistance, vessel port diversions, emergency bunker supply, or urgent technical casualty response.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+97148894500"
              className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#B39368] text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded transition-colors text-center shadow"
            >
              Emergency: +971 4 889 4500
            </a>
            <div className="text-xs text-slate-400 font-specs text-center sm:text-left px-2">
              VHF: Ch. 16 / 72
            </div>
          </div>
        </div>

        {/* Strategic Global Desks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubs.map((hub, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded p-8 shadow-sm hover:border-[#C5A880] transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif-maritime text-xl font-bold text-[#0A192F]">{hub.city}</h3>
                    <span className="text-xs text-slate-500 font-medium">{hub.country}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-specs font-bold text-[#0A192F] block">{hub.localTime || '14:00'}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-specs">{hub.timezone.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#9A7B4F] shrink-0 mt-0.5" />
                    <span className="text-slate-600 leading-relaxed">{hub.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#9A7B4F] shrink-0" />
                    <a href={`tel:${hub.phone}`} className="hover:text-[#0A192F] font-medium transition-colors">{hub.phone}</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#9A7B4F] shrink-0" />
                    <a href={`mailto:${hub.email}`} className="hover:text-[#0A192F] font-medium transition-colors">{hub.email}</a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-600">
                <strong className="text-[#0A192F] font-semibold">Desk Focus:</strong> {hub.focus}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Commercial Transmission Form */}
        <div className="bg-white border border-slate-200 rounded p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-[#9A7B4F] uppercase tracking-wider">
              Commercial Operations Direct Channel
            </span>
            <h2 className="font-serif-maritime text-2xl sm:text-3xl font-bold text-[#0A192F]">
              Direct Chartering & Management Transmission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inquiries submitted through this secure portal are routed directly to our senior chartering and technical directors. We provide indicative commercial feedback within 4 operational hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 text-center bg-[#FAF5EE] rounded border border-[#E8DCC8] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#9A7B4F] mx-auto" />
              <h3 className="font-serif-maritime text-xl font-bold text-[#0A192F]">Inquiry Transmitted Successfully</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your communication has been registered and assigned to our Commercial Desk. A transmission confirmation has been dispatched to your email address.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', company: '', email: '', phone: '', subject: 'Commercial Chartering Inquiry', message: '' });
                }}
                className="text-xs text-[#0A192F] hover:text-[#9A7B4F] underline font-semibold pt-3 block mx-auto"
              >
                Send Another Communication
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Capt. Julian Vance"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Principal / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Trafigura Maritime Pte Ltd"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. j.vance@principal.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Direct Telephone / Mobile</label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Inquiry Classification</label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-xs text-[#0A192F] bg-white focus:outline-none focus:border-[#0A192F] transition-colors"
                >
                  <option value="Commercial Chartering Inquiry">Commercial Chartering Inquiry (Spot Fixture / Time Charter)</option>
                  <option value="Technical Management RFP">Technical Management & Drydock Superintendency</option>
                  <option value="Offshore Marine Towage">Offshore Marine Towage & AHTS Supply</option>
                  <option value="Port Agency & Husbandry">Port Agency & Husbandry Services</option>
                  <option value="General Executive Inquiry">General Executive & Commercial Partnership Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Cargo / Vessel Specifications & Laycan Window *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Outline required vessel category, cargo commodity, intake volume (MT), load/discharge ports, laycan dates, or specific charter party terms..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F] transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B4F]" />
                  <span>Confidentiality guaranteed under standard BIMCO non-disclosure standards.</span>
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0A192F] hover:bg-[#142D4C] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
                >
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Transmit To Commercial Desk</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}