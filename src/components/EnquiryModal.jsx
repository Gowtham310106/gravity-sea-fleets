import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Ship, 
  Calendar, 
  MapPin, 
  Building, 
  Mail, 
  Phone, 
  User, 
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, selectedVessel, onEnquirySubmitted }) {
  const [formData, setFormData] = useState({
    enquiryType: 'Vessel Chartering',
    vesselId: '',
    vesselName: '',
    contactName: '',
    company: '',
    email: '',
    phone: '',
    cargoType: '',
    cargoVolume: '',
    loadPort: '',
    dischargePort: '',
    laycanStart: '',
    laycanEnd: '',
    message: '',
    honeypot: '' // Anti-spam trap
  });

  const [submittedRef, setSubmittedRef] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedVessel) {
      setFormData(prev => ({
        ...prev,
        enquiryType: 'Vessel Chartering',
        vesselId: selectedVessel.id,
        vesselName: selectedVessel.name
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        vesselId: '',
        vesselName: ''
      }));
    }
  }, [selectedVessel]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.contactName.trim()) errs.contactName = 'Full name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (formData.enquiryType === 'Vessel Chartering' && !formData.cargoType.trim() && !formData.message.trim()) {
      errs.cargoType = 'Please specify cargo or vessel requirements';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Spam trapped silently
      return;
    }

    if (!validate()) return;

    // Generate reference code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `GSF-ENQ-2026-${randomNum}`;

    const newEnquiry = {
      id: refCode,
      createdAt: new Date().toISOString(),
      enquiryType: formData.enquiryType,
      status: 'New',
      assignedTo: 'Commercial Desk',
      vesselId: formData.vesselId || null,
      vesselName: formData.vesselName || null,
      contactName: formData.contactName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      cargoType: formData.cargoType || null,
      cargoVolume: formData.cargoVolume || null,
      loadPort: formData.loadPort || null,
      dischargePort: formData.dischargePort || null,
      laycanStart: formData.laycanStart || null,
      laycanEnd: formData.laycanEnd || null,
      message: formData.message,
      internalNotes: 'New inbound enquiry received via website form. Awaiting commercial qualification.',
      notificationStatus: 'Sent'
    };

    onEnquirySubmitted(newEnquiry);
    setSubmittedRef(refCode);
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      enquiryType: 'Vessel Chartering',
      vesselId: '',
      vesselName: '',
      contactName: '',
      company: '',
      email: '',
      phone: '',
      cargoType: '',
      cargoVolume: '',
      loadPort: '',
      dischargePort: '',
      laycanStart: '',
      laycanEnd: '',
      message: '',
      honeypot: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Commercial Enquiry & Charter RFP</h3>
              <p className="text-xs text-slate-400">
                Direct submission to GRAVITY SEA FLEETS Commercial Operations Desk
              </p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedRef ? (
            /* Success confirmation screen */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Enquiry Successfully Logged</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your requirement has been entered into the commercial operations management queue. A confirmation email has been dispatched.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Official Tracking Reference:</span>
                <span className="font-specs font-bold text-cyan-400 text-sm">{submittedRef}</span>
                <button
                  onClick={handleCopyRef}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Turnaround SLA Guarantee:</span>
                </div>
                <p>
                  Our commercial chartering superintendent will evaluate vessel positioning, draft constraints, and market freight rate indications, responding within <strong>4 operational hours</strong>.
                </p>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Honey pot input for bots */}
              <input 
                type="text" 
                name="user_token_trap" 
                value={formData.honeypot} 
                onChange={e => setFormData({ ...formData, honeypot: e.target.value })} 
                className="hidden" 
                tabIndex="-1" 
                autoComplete="off" 
              />

              {/* Enquiry Category Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Enquiry Category <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Vessel Chartering',
                    'Technical Management',
                    'Offshore Support',
                    'General Maritime RFP'
                  ].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, enquiryType: type })}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                        formData.enquiryType === type
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contextual Preselected Vessel Indicator */}
              {formData.vesselName && (
                <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-cyan-400" />
                    <span>Selected Vessel: <strong className="text-white">{formData.vesselName}</strong> ({formData.vesselId})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, vesselId: '', vesselName: '' })}
                    className="text-slate-400 hover:text-white text-[11px] underline"
                  >
                    Clear Vessel
                  </button>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Capt. Marcus Sterling"
                      value={formData.contactName}
                      onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                        errors.contactName ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.contactName && <span className="text-[11px] text-rose-400">{errors.contactName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Organization <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Trafigura / Glencore"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                        errors.company ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.company && <span className="text-[11px] text-rose-400">{errors.company}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[11px] text-rose-400">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Telephone / Mobile <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                  </div>
                  {errors.phone && <span className="text-[11px] text-rose-400">{errors.phone}</span>}
                </div>
              </div>

              {/* Conditional Fields for Chartering / Offshore */}
              {(formData.enquiryType === 'Vessel Chartering' || formData.enquiryType === 'Offshore Support') && (
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                  <span className="text-[10px] uppercase font-specs tracking-wider text-cyan-400 font-bold block">
                    Voyage & Cargo Parameters (Optional)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Cargo Commodity & Grade</label>
                      <input
                        type="text"
                        placeholder="e.g. Iron Ore / Gas Oil / Grain"
                        value={formData.cargoType}
                        onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Volume / Quantity (MT)</label>
                      <input
                        type="text"
                        placeholder="e.g. 55,000 MT +/- 10%"
                        value={formData.cargoVolume}
                        onChange={e => setFormData({ ...formData, cargoVolume: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Load Port / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Richards Bay / Ras Tanura"
                        value={formData.loadPort}
                        onChange={e => setFormData({ ...formData, loadPort: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Discharge Port / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Singapore / Rotterdam"
                        value={formData.dischargePort}
                        onChange={e => setFormData({ ...formData, dischargePort: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Laycan Commencing Date</label>
                      <input
                        type="date"
                        value={formData.laycanStart}
                        onChange={e => setFormData({ ...formData, laycanStart: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-cyan-500 font-specs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Laycan Cancelling Date</label>
                      <input
                        type="date"
                        value={formData.laycanEnd}
                        onChange={e => setFormData({ ...formData, laycanEnd: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-cyan-500 font-specs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Requirement Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Commercial / Technical Requirements
                </label>
                <textarea
                  rows="3"
                  placeholder="Detail your charter terms (Time charter / Voyage / COA), gear preferences, discharge rate, or management scope..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Disclaimer */}
              <div className="text-[11px] text-slate-400 leading-tight">
                By submitting this form, you agree that this enquiry represents a preliminary request for indication or proposal, and does not constitute a confirmed charter party fixture.
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Commercial RFP</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
