import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building, 
  Radio, 
  ShieldAlert, 
  CheckCircle2,
  ChevronRight,
  Globe2
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
      internalNotes: 'Inbound message from website Contact Us form.',
      notificationStatus: 'Sent'
    };

    onEnquirySubmitted(newEnquiry);
    setSubmitted(true);
  };

  const hubs = [
    {
      city: "Dubai (Headquarters)",
      country: "United Arab Emirates",
      timezone: "UTC+4",
      localTime: clocks.dubai,
      address: "Almas Tower, Jumeirah Lakes Towers (JLT), Dubai, UAE",
      phone: "+971 4 889 4500",
      email: "dubai@gravityseafleets.com",
      focus: "Executive Management, Commercial Chartering Desk, Arabian Gulf Operations"
    },
    {
      city: "Singapore Operations Hub",
      country: "Republic of Singapore",
      timezone: "UTC+8",
      localTime: clocks.singapore,
      address: "Marina Bay Financial Centre, Tower 2, Singapore 018983",
      phone: "+65 6838 8800",
      email: "singapore@gravityseafleets.com",
      focus: "East Asia & Pacific Bulker/Tanker Fixtures, Malacca Strait Husbandry"
    },
    {
      city: "Rotterdam Atlantic Desk",
      country: "The Netherlands",
      timezone: "UTC+1",
      localTime: clocks.rotterdam,
      address: "Willemskade 18, 3016 DL Rotterdam, Netherlands",
      phone: "+31 10 414 7720",
      email: "rotterdam@gravityseafleets.com",
      focus: "North Sea Clean Petroleum, European Terminal Vetting, EU ETS Management"
    },
    {
      city: "Houston Americas Desk",
      country: "United States",
      timezone: "UTC-5",
      localTime: clocks.houston,
      address: "Memorial City Plaza, Houston, TX 77024, USA",
      phone: "+1 713 468 9000",
      email: "houston@gravityseafleets.com",
      focus: "US Gulf Light Crude & Chemical Chartering, Transatlantic Logistics"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Global Operations Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact Our Global Commercial Desks
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          Positioned across the primary financial and port centers of the global maritime industry. Direct access to superintendents, chartering brokers, and technical managers 24 hours a day.
        </p>
      </div>

      {/* 24/7 Emergency & Duty Superintendent Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-cyan-900/60 text-cyan-300 border border-cyan-700">
            <Radio className="w-7 h-7 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-specs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Duty Superintendent On Watch (24/7/365)</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Urgent Operational Vessel Assistance & Emergency Hotline
            </h3>
            <p className="text-xs text-slate-400">
              For master assistance, vessel port diversions, emergency bunker requests, or urgent incident response.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href="tel:+97148894500"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call +971 4 889 4500</span>
          </a>
          <div className="text-xs text-slate-400 font-specs text-center sm:text-left">
            VHF: Ch. 16 / 72
          </div>
        </div>
      </div>

      {/* Strategic Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hubs.map((hub, idx) => (
          <div 
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{hub.city}</h3>
                <span className="text-xs text-slate-400 font-medium">{hub.country}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-specs text-cyan-400 font-bold block">{hub.localTime || '14:00'}</span>
                <span className="text-[10px] text-slate-500 uppercase font-specs">{hub.timezone}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{hub.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${hub.phone}`} className="hover:text-white transition-colors">{hub.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${hub.email}`} className="hover:text-white transition-colors">{hub.email}</a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
              <strong className="text-slate-300">Desk Focus:</strong> {hub.focus}
            </div>
          </div>
        ))}
      </div>

      {/* Direct Transmission Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-specs text-cyan-400 uppercase tracking-wider font-bold">
            COMMERCIAL DESK INQUIRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Transmit Direct Inquiry
          </h2>
          <p className="text-xs text-slate-400">
            Send an instant message to our central commercial and technical directors. We respond within 4 operational business hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Message Transmitted</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your inquiry has been received and routed to our Senior Chartering Superintendent. A copy has been delivered to your email.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: '', company: '', email: '', phone: '', subject: 'Commercial Chartering Inquiry', message: '' });
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold pt-2"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Morrison"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Principal</label>
                <input
                  type="text"
                  placeholder="e.g. Vitol Maritime"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Telephone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+971 50 000 0000"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Topic</label>
              <select
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Commercial Chartering Inquiry">Commercial Chartering Inquiry (Spot / Time Charter)</option>
                <option value="Technical Management RFP">Technical Management & Drydock Superintendency</option>
                <option value="Offshore Marine Towage">Offshore Marine Towage & AHTS Supply</option>
                <option value="Port Agency & Husbandry">Port Agency & Husbandry Services</option>
                <option value="General Executive Inquiry">General Executive Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Message / Requirements *</label>
              <textarea
                required
                rows="4"
                placeholder="Please outline vessel types, laycan window, cargo volumes, ports of call, or specific engineering requirements..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit To Operations Desk</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
