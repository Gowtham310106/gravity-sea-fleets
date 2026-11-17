import React, { useState } from 'react';
import VesselImage from './VesselImage';
import { 
  X, 
  Printer, 
  FileText, 
  ShieldCheck, 
  Anchor, 
  Navigation, 
  Calendar, 
  Gauge, 
  Compass, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';

export default function VesselModal({ vessel, onClose, onEnquire }) {
  const [activeTab, setActiveTab] = useState('particulars');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!vessel) return null;

  const images = vessel.imageGallery && vessel.imageGallery.length > 0 
    ? vessel.imageGallery 
    : [vessel.imageUrl];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-t-4 border-t-[#C5A880]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A192F] text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#071324] border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold tracking-wide font-serif-maritime">{vessel.name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-specs font-bold uppercase tracking-wider bg-emerald-700 text-white">
                  {vessel.availabilityStatus}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-specs">
                IMO: {vessel.imoNumber} • {vessel.subType} • {vessel.flag} Flag
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              title="Print Specification Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 text-slate-800 bg-[#F8F9FA]">
          
          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Image Preview */}
            <div className="lg:col-span-7 space-y-2">
              <div className="relative aspect-video bg-slate-900 border border-slate-300 overflow-hidden">
                <VesselImage 
                  src={images[activeImageIndex] || vessel.imageUrl} 
                  alt={vessel.name}
                  vesselType={vessel.subType || vessel.type}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-[#0A192F]/80 px-3 py-1 font-specs">
                  <span>Built {vessel.builtYear} — {vessel.shipyard}</span>
                  <span>Class: {vessel.classification}</span>
                </div>
              </div>
            </div>

            {/* Key Commercial Metrics Box */}
            <div className="lg:col-span-5 bg-white p-5 border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-specs uppercase text-[#9A7B4F] tracking-wider font-bold block border-b border-slate-200 pb-2">
                Commercial Specification Matrix
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-specs">Deadweight</span>
                  <strong className="text-base font-specs text-[#0A192F]">{vessel.dwt.toLocaleString()} MT</strong>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-specs">Summer Draft</span>
                  <strong className="text-base font-specs text-[#0A192F]">{vessel.summerDraft} m</strong>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-specs">LOA / Beam</span>
                  <strong className="text-xs font-specs text-[#0A192F]">{vessel.loa}m x {vessel.beam}m</strong>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-specs">Eco Speed</span>
                  <strong className="text-xs font-specs text-[#0A192F]">{vessel.serviceSpeed} kts</strong>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Trading Range:</span>
                  <span className="font-semibold text-slate-800 text-right">{vessel.operatingRegion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Available Date:</span>
                  <span className="text-emerald-700 font-specs font-bold">{vessel.availabilityDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Superintendent:</span>
                  <span className="text-slate-800">{vessel.commercialManager}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onEnquire(vessel);
                }}
                className="w-full py-3 bg-[#0A192F] hover:bg-[#0F223D] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>Request Fixture for {vessel.name}</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200 flex items-center gap-2 bg-white px-2 pt-2">
            {[
              { id: 'particulars', label: 'General Particulars' },
              { id: 'dimensions', label: 'Dimensions & Capacities' },
              { id: 'machinery', label: 'Machinery & Cargo Gear' },
              { id: 'compliance', label: 'Vetting & Special Features' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#0A192F] text-[#0A192F] bg-slate-50'
                    : 'border-transparent text-slate-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: General Particulars */}
          {activeTab === 'particulars' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Registry & Identity
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vessel Name:</span>
                  <strong className="text-slate-900 font-specs">{vessel.name}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">IMO Number:</span>
                  <span className="text-slate-900 font-specs">{vessel.imoNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">MMSI:</span>
                  <span className="text-slate-900 font-specs">{vessel.mmsi}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Call Sign:</span>
                  <span className="text-slate-900 font-specs">{vessel.callSign}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Flag State:</span>
                  <span className="text-slate-900 font-medium">{vessel.flag}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Port of Registry:</span>
                  <span className="text-slate-900">{vessel.portOfRegistry}</span>
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Classification & Build
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Classification Society:</span>
                  <strong className="text-[#0284C7] font-semibold">{vessel.classification}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Class Notation:</span>
                  <span className="text-slate-800 font-specs text-[11px] text-right max-w-[220px]">{vessel.classNotation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Year of Build:</span>
                  <span className="text-slate-900 font-specs">{vessel.builtYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Shipbuilder:</span>
                  <span className="text-slate-900 text-right">{vessel.shipyard}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Ice Class:</span>
                  <span className="text-slate-900 font-specs">{vessel.iceClass}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Dimensions & Capacities */}
          {activeTab === 'dimensions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Hull Dimensions
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Length Overall (LOA):</span>
                  <span className="text-slate-900 font-specs">{vessel.loa} m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Beam (Moulded):</span>
                  <span className="text-slate-900 font-specs">{vessel.beam} m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Summer Draft:</span>
                  <strong className="text-[#0284C7] font-specs">{vessel.summerDraft} m</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Depth Moulded:</span>
                  <span className="text-slate-900 font-specs">{vessel.depthMoulded} m</span>
                </div>
                {vessel.deckArea && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Clear Deck Area:</span>
                    <strong className="text-emerald-700 font-specs">{vessel.deckArea}</strong>
                  </div>
                )}
              </div>

              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Tonnage & Cubic Capacity
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Deadweight Tonnage (DWT):</span>
                  <strong className="text-slate-900 font-specs">{vessel.dwt.toLocaleString()} MT</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gross Tonnage (GT):</span>
                  <span className="text-slate-900 font-specs">{vessel.grossTonnage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Net Tonnage (NT):</span>
                  <span className="text-slate-900 font-specs">{vessel.netTonnage.toLocaleString()}</span>
                </div>
                {vessel.grainCapacity > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Grain Capacity:</span>
                    <span className="text-slate-900 font-specs">{vessel.grainCapacity.toLocaleString()} m³</span>
                  </div>
                )}
                {vessel.liquidCapacity > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Liquid Cargo Capacity:</span>
                    <span className="text-[#0284C7] font-specs">{vessel.liquidCapacity.toLocaleString()} m³</span>
                  </div>
                )}
                {vessel.teuCapacity && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">TEU Capacity:</span>
                    <span className="text-emerald-700 font-specs">{vessel.teuCapacity.toLocaleString()} TEU</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Machinery & Gear */}
          {activeTab === 'machinery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Propulsion & Fuel Profile
                </h4>
                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Main Engine:</span>
                  <strong className="text-slate-900 font-specs">{vessel.mainEngine}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Service Speed:</span>
                  <span className="text-slate-900 font-specs">{vessel.serviceSpeed} Knots</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-0.5">Eco Consumption:</span>
                  <span className="text-slate-900 font-specs">{vessel.fuelConsumptionEco}</span>
                </div>
              </div>

              <div className="bg-white p-5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                  Cargo Gear & Equipment
                </h4>
                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Cargo Gear / Cranes:</span>
                  <span className="text-slate-900 font-medium">{vessel.cargoGear}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-0.5">Holds & Hatches / Tanks:</span>
                  <span className="text-slate-900 font-medium">{vessel.holdsHatches}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Compliance & Features */}
          {activeTab === 'compliance' && (
            <div className="bg-white p-5 border border-slate-200 space-y-4 text-xs">
              <h4 className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200 font-specs">
                Operational Advantages & Vetting Approvals
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vessel.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Disclaimer */}
          <div className="p-3 bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
            * All particulars are believed to be correct but not guaranteed. Actual vessel performance, draft restrictions, and cargo compatibility are subject to formal charter party agreement (BIMCO standard terms).
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-specs">
            Record ID: <span className="font-bold text-[#0A192F]">{vessel.id}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(vessel);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0A192F] hover:bg-[#0F223D] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C5A880]" />
              <span>Request Charter Fixture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
