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
  Copy,
  Check,
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
    honeypot: ''
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
    if (formData.honeypot) return;
    if (!validate()) return;

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
      internalNotes: 'New inbound commercial enquiry received via portal. Awaiting qualification.',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden border-t-4 border-t-[#C5A880]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A192F] text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#071324] border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-maritime">Commercial Enquiry & Charter RFP</h3>
              <p className="text-[11px] text-slate-300">
                Direct transmission to GRAVITY SEA FLEETS Commercial Operations Desk
              </p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#F8F9FA] text-slate-800">
          {submittedRef ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-600 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-[#0A192F] font-serif-maritime">Enquiry Successfully Logged</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your commercial requirement has been registered into our queue. A confirmation receipt has been dispatched.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 p-3 bg-white border border-slate-300 shadow-sm">
                <span className="text-xs text-slate-500 font-specs uppercase">Tracking Reference:</span>
                <span className="font-specs font-bold text-[#0A192F] text-sm">{submittedRef}</span>
                <button
                  onClick={handleCopyRef}
                  className="p-1 text-slate-500 hover:text-black"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 bg-white border border-slate-200 text-xs text-slate-600 text-left max-w-md mx-auto space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-[#0A192F] font-semibold font-specs uppercase text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#9A7B4F]" />
                  <span>Commercial Turnaround SLA:</span>
                </div>
                <p>
                  Our senior chartering superintendent will evaluate vessel positioning, draft constraints, and market freight rate indications, responding within <strong>4 operational business hours</strong>.
                </p>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
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
                <label className="block text-slate-700 font-semibold uppercase text-[11px] mb-1.5 font-specs">
                  Enquiry Category *
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
                      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-all ${
                        formData.enquiryType === type
                          ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preselected Vessel Indicator */}
              {formData.vesselName && (
                <div className="p-3 bg-white border border-slate-300 flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-[#9A7B4F]" />
                    <span>Requested Vessel: <strong className="text-[#0A192F]">{formData.vesselName}</strong> ({formData.vesselId})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, vesselId: '', vesselName: '' })}
                    className="text-slate-500 hover:text-black text-[11px] underline"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Capt. Marcus Sterling"
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border text-xs text-slate-900 focus:outline-none focus:border-[#0A192F] ${
                      errors.contactName ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.contactName && <span className="text-[11px] text-rose-600">{errors.contactName}</span>}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Trafigura / Glencore"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border text-xs text-slate-900 focus:outline-none focus:border-[#0A192F] ${
                      errors.company ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.company && <span className="text-[11px] text-rose-600">{errors.company}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border text-xs text-slate-900 focus:outline-none focus:border-[#0A192F] ${
                      errors.email ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <span className="text-[11px] text-rose-600">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Direct Telephone / Mobile *
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border text-xs text-slate-900 focus:outline-none focus:border-[#0A192F] ${
                      errors.phone ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <span className="text-[11px] text-rose-600">{errors.phone}</span>}
                </div>
              </div>

              {/* Conditional Fields for Chartering */}
              {(formData.enquiryType === 'Vessel Chartering' || formData.enquiryType === 'Offshore Support') && (
                <div className="p-4 bg-white border border-slate-300 space-y-3 shadow-sm">
                  <span className="text-[10px] uppercase font-specs tracking-wider text-[#9A7B4F] font-bold block border-b border-slate-200 pb-1">
                    Voyage & Cargo Particulars (Optional)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Cargo Commodity & Grade</label>
                      <input
                        type="text"
                        placeholder="e.g. Thermal Coal / Gas Oil"
                        value={formData.cargoType}
                        onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Volume / Quantity (MT)</label>
                      <input
                        type="text"
                        placeholder="e.g. 55,000 MT +/- 10%"
                        value={formData.cargoVolume}
                        onChange={e => setFormData({ ...formData, cargoVolume: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Load Port / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Richards Bay / Ras Tanura"
                        value={formData.loadPort}
                        onChange={e => setFormData({ ...formData, loadPort: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Discharge Port / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Singapore / Rotterdam"
                        value={formData.dischargePort}
                        onChange={e => setFormData({ ...formData, dischargePort: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#0A192F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Laycan Commencing Date</label>
                      <input
                        type="date"
                        value={formData.laycanStart}
                        onChange={e => setFormData({ ...formData, laycanStart: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none font-specs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Laycan Cancelling Date</label>
                      <input
                        type="date"
                        value={formData.laycanEnd}
                        onChange={e => setFormData({ ...formData, laycanEnd: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none font-specs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Specific Commercial / Technical Requirements
                </label>
                <textarea
                  rows="3"
                  placeholder="Detail your charter terms (Time charter / Voyage / COA), gear preferences, discharge rate, or management scope..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="text-[11px] text-slate-500 leading-tight">
                By transmitting this form, you acknowledge that this enquiry represents a preliminary request for indication or proposal, and does not constitute a confirmed charter party fixture.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
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
