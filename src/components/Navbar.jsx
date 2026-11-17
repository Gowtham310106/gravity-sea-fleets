import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Clock, 
  PhoneCall, 
  Radio, 
  SlidersHorizontal, 
  Menu, 
  X, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onOpenEnquiry, 
  vesselsCount 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().replace('GMT', 'UTC');
      setUtcTime(utcString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'fleet', label: 'Fleet Register', badge: `${vesselsCount}` },
    { id: 'services', label: 'Commercial & Technical Services' },
    { id: 'calculator', label: 'Voyage Estimator' },
    { id: 'about', label: 'Corporate' },
    { id: 'compliance', label: 'QHSE & Vetting' },
    { id: 'contact', label: 'Global Desks' },
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Top Professional Maritime Utility Strip */}
      <div className="hidden lg:block bg-[#071324] text-slate-300 text-[11px] font-sans px-8 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-specs text-[#C5A880]">
              <Clock className="w-3.5 h-3.5" />
              <span>{utcTime || 'ZULU TIME (UTC)'}</span>
            </div>
            <div className="h-3 w-px bg-slate-700/60" />
            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-slate-400 uppercase text-[10px] tracking-wider">Trading Hubs:</span>
              <span>Dubai <strong className="text-slate-200">UTC+4</strong></span>
              <span>Singapore <strong className="text-slate-200">UTC+8</strong></span>
              <span>Rotterdam <strong className="text-slate-200">UTC+1</strong></span>
              <span>Houston <strong className="text-slate-200">UTC-5</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>VHF Marine Calling Ch. 16 / 72</span>
            </div>
            <div className="h-3 w-px bg-slate-700/60" />
            <a 
              href="tel:+97148894500" 
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#C5A880] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>24/7 Operations Desk: +971 4 889 4500</span>
            </a>
            <div className="h-3 w-px bg-slate-700/60" />
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                currentTab === 'dashboard' 
                  ? 'bg-[#C5A880] text-[#071324] font-bold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-[#C5A880]" />
              <span>Staff Management Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Corporate Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Corporate Crest */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#0A192F] text-white flex items-center justify-center border-t-2 border-[#C5A880] shadow-md group-hover:bg-[#0F223D] transition-colors">
              <Anchor className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-wider text-[#0A192F] font-serif-maritime">
                  GRAVITY<span className="text-[#0284C7] font-sans font-bold">SEA</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#0A192F] font-semibold border-l border-slate-300 pl-2 uppercase font-specs">
                  FLEETS
                </span>
              </div>
              <p className="text-[9px] tracking-[0.2em] text-slate-500 uppercase font-semibold">
                Combined Maritime Services Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-xs font-semibold tracking-wide transition-all uppercase flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#0A192F]'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-specs border border-slate-200">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0A192F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="px-5 py-2.5 bg-[#0A192F] hover:bg-[#0F223D] text-white font-semibold text-xs tracking-wider uppercase border-b-2 border-[#C5A880] transition-all flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Request Charter / RFP</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEnquiry}
              className="px-3 py-1.5 bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider"
            >
              RFP
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-black border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-3 space-y-1">
            <div className="flex items-center justify-between text-[#0A192F] font-specs font-semibold">
              <span>{utcTime || 'ZULU TIME (UTC)'}</span>
              <span className="text-emerald-600">● Active Watch</span>
            </div>
            <div>Direct Line: +971 4 889 4500</div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold tracking-wider uppercase flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-100 text-[#0A192F] border-l-4 border-[#0A192F]' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-800 font-specs">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full py-2.5 px-4 bg-slate-100 border border-slate-300 text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span>Staff Management Dashboard</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 px-4 bg-[#0A192F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C5A880]" />
              <span>Request Charter / Technical RFP</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
