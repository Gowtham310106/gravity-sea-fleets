import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Compass, 
  Clock, 
  PhoneCall, 
  Radio, 
  ShieldCheck, 
  SlidersHorizontal, 
  Menu, 
  X, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Ship,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onOpenEnquiry, 
  vesselsCount,
  onOpenCalculator,
  onSelectCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Update live UTC time every second
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
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Our Fleet', badge: `${vesselsCount} Ships` },
    { id: 'services', label: 'Services' },
    { id: 'calculator', label: 'Voyage Estimator' },
    { id: 'about', label: 'About Us' },
    { id: 'compliance', label: 'Safety & Compliance' },
    { id: 'contact', label: 'Global Hubs' },
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Maritime Utility Ticker */}
      <div className="hidden lg:block border-b border-slate-800/50 bg-slate-900/60 px-6 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cyan-400 font-specs font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{utcTime || 'ZULU TIME (UTC)'}</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="flex items-center gap-4 text-slate-300">
              <span className="text-slate-400">Hubs:</span>
              <span>Dubai <strong className="text-slate-200">UTC+4</strong></span>
              <span>Singapore <strong className="text-slate-200">UTC+8</strong></span>
              <span>Rotterdam <strong className="text-slate-200">UTC+1</strong></span>
              <span>Houston <strong className="text-slate-200">UTC-5</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>VHF Ch. 16 / 72 Active</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <a 
              href="tel:+97148894500" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>24/7 Operations: +971 4 889 4500</span>
            </a>
            <div className="h-3 w-px bg-slate-700" />
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs transition-all ${
                currentTab === 'dashboard' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Staff Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 p-0.5 shadow-lg shadow-cyan-900/20 group-hover:shadow-cyan-600/30 transition-all border border-cyan-400/30">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-cyan-500/20 via-transparent to-transparent opacity-60" />
                <Anchor className="w-6 h-6 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-wider text-white">
                  GRAVITY<span className="text-cyan-400">SEA</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-blue-900/50 text-cyan-300 font-semibold tracking-wider rounded border border-blue-700/50 uppercase">
                  Fleets
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                Combined Maritime Services
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
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cyan-300 bg-slate-900/80 shadow-inner border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-800/80 font-specs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="lg:hidden xl:flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg bg-slate-900/40 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={onOpenEnquiry}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-md shadow-cyan-900/30 hover:shadow-cyan-600/40 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-100" />
              <span>Request Charter / RFP</span>
              <ChevronRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEnquiry}
              className="px-3 py-1.5 rounded-md bg-cyan-600 text-white text-xs font-semibold"
            >
              RFP Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2">
          <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-800 text-xs text-slate-400 mb-3 space-y-1">
            <div className="flex items-center justify-between text-cyan-400 font-specs">
              <span>{utcTime || 'ZULU TIME (UTC)'}</span>
              <span className="text-emerald-400">● 24/7 Operations</span>
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
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                    isActive 
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60' 
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 bg-cyan-900/60 text-cyan-300 rounded font-specs">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full py-2.5 px-4 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Operations Management Dashboard</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Request Charter / Technical RFP</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
