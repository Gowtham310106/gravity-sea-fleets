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
  AlertCircle,
  ExternalLink,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-white tracking-wide">{vessel.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-specs font-semibold uppercase tracking-wider ${
                  vessel.availabilityStatus === 'Available for Charter'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                    : vessel.availabilityStatus === 'On Voyage'
                    ? 'bg-blue-950/80 text-blue-400 border border-blue-800'
                    : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                }`}>
                  ● {vessel.availabilityStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-specs">
                IMO: {vessel.imoNumber} • {vessel.subType} • {vessel.flag} Flag
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Print Vessel Specification Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Close particulars"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Main Visual & Key Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Image Showcase */}
            <div className="lg:col-span-7 space-y-2">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 group">
                <VesselImage 
                  src={images[activeImageIndex] || vessel.imageUrl} 
                  alt={vessel.name}
                  vesselType={vessel.subType || vessel.type}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-specs bg-slate-950/70 px-2 py-1 rounded backdrop-blur-sm border border-slate-700/60">
                    Built {vessel.builtYear} — {vessel.shipyard}
                  </span>
                  <span className="font-specs bg-slate-950/70 px-2 py-1 rounded backdrop-blur-sm border border-slate-700/60">
                    Class: {vessel.classification}
                  </span>
                </div>
              </div>

              {/* Thumbnails if multiple images */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 pt-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Commercial Metrics Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-specs uppercase text-cyan-400 tracking-wider font-semibold">
                  Primary Commercial Specs
                </span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block">Deadweight (DWT)</span>
                    <strong className="text-lg font-specs text-white">{vessel.dwt.toLocaleString()} MT</strong>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block">Summer Draft</span>
                    <strong className="text-lg font-specs text-white">{vessel.summerDraft} m</strong>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block">LOA / Beam</span>
                    <strong className="text-sm font-specs text-white">{vessel.loa}m x {vessel.beam}m</strong>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block">Eco Service Speed</span>
                    <strong className="text-sm font-specs text-white">{vessel.serviceSpeed} kts</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Trading Area:</span>
                  <span className="text-slate-200 font-medium text-right">{vessel.operatingRegion}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Next Availability:</span>
                  <span className="text-emerald-400 font-specs font-semibold">{vessel.availabilityDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Superintendent:</span>
                  <span className="text-slate-200">{vessel.commercialManager}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onEnquire(vessel);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Enquire About {vessel.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs for Technical Specifications */}
          <div className="border-b border-slate-800 flex items-center gap-2">
            {[
              { id: 'particulars', label: 'General Particulars' },
              { id: 'dimensions', label: 'Dimensions & Capacities' },
              { id: 'machinery', label: 'Machinery & Cargo Gear' },
              { id: 'compliance', label: 'Vetting & Special Features' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: General Particulars */}
          {activeTab === 'particulars' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Registry & Identity
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Vessel Name:</span>
                  <strong className="text-slate-200 font-specs">{vessel.name}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">IMO Number:</span>
                  <span className="text-slate-200 font-specs">{vessel.imoNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">MMSI:</span>
                  <span className="text-slate-200 font-specs">{vessel.mmsi}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Call Sign:</span>
                  <span className="text-slate-200 font-specs">{vessel.callSign}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Flag State:</span>
                  <span className="text-slate-200">{vessel.flag}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Port of Registry:</span>
                  <span className="text-slate-200">{vessel.portOfRegistry}</span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Classification & Build
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Classification Society:</span>
                  <strong className="text-cyan-400">{vessel.classification}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Class Notation:</span>
                  <span className="text-slate-300 font-specs text-[11px] text-right max-w-[220px]">{vessel.classNotation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Year of Build:</span>
                  <span className="text-slate-200 font-specs">{vessel.builtYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Shipbuilder:</span>
                  <span className="text-slate-200 text-right">{vessel.shipyard}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Ice Class:</span>
                  <span className="text-slate-200 font-specs">{vessel.iceClass}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Dimensions & Capacities */}
          {activeTab === 'dimensions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Hull Dimensions
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Length Overall (LOA):</span>
                  <span className="text-slate-200 font-specs">{vessel.loa} m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Beam (Moulded):</span>
                  <span className="text-slate-200 font-specs">{vessel.beam} m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Summer Draft:</span>
                  <strong className="text-cyan-400 font-specs">{vessel.summerDraft} m</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Depth Moulded:</span>
                  <span className="text-slate-200 font-specs">{vessel.depthMoulded} m</span>
                </div>
                {vessel.deckArea && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Clear Deck Area:</span>
                    <strong className="text-emerald-400 font-specs">{vessel.deckArea}</strong>
                  </div>
                )}
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Tonnage & Cubic Capacity
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Deadweight Tonnage (DWT):</span>
                  <strong className="text-slate-100 font-specs">{vessel.dwt.toLocaleString()} MT</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Gross Tonnage (GT):</span>
                  <span className="text-slate-200 font-specs">{vessel.grossTonnage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Net Tonnage (NT):</span>
                  <span className="text-slate-200 font-specs">{vessel.netTonnage.toLocaleString()}</span>
                </div>
                {vessel.grainCapacity > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Grain Cubic Capacity:</span>
                    <span className="text-slate-200 font-specs">{vessel.grainCapacity.toLocaleString()} m³</span>
                  </div>
                )}
                {vessel.liquidCapacity > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Liquid Cargo Capacity:</span>
                    <span className="text-cyan-400 font-specs">{vessel.liquidCapacity.toLocaleString()} m³</span>
                  </div>
                )}
                {vessel.teuCapacity && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">TEU Capacity:</span>
                    <span className="text-emerald-400 font-specs">{vessel.teuCapacity.toLocaleString()} TEU</span>
                  </div>
                )}
                {vessel.bollardPull && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Bollard Pull Continuous:</span>
                    <strong className="text-amber-400 font-specs">{vessel.bollardPull}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Machinery & Gear */}
          {activeTab === 'machinery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Propulsion & Performance
                </h4>
                <div className="py-1 border-b border-slate-800/50">
                  <span className="text-slate-400 block mb-0.5">Main Engine:</span>
                  <strong className="text-slate-200 font-specs">{vessel.mainEngine}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Design Speed:</span>
                  <span className="text-slate-200 font-specs">{vessel.serviceSpeed} Knots</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-400 block mb-0.5">Eco Consumption Profile:</span>
                  <span className="text-cyan-300 font-specs">{vessel.fuelConsumptionEco}</span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Cargo Gear & Equipment
                </h4>
                <div className="py-1 border-b border-slate-800/50">
                  <span className="text-slate-400 block mb-0.5">Cargo Gear / Cranes:</span>
                  <span className="text-slate-200 font-medium">{vessel.cargoGear}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-400 block mb-0.5">Holds & Hatches / Tanks:</span>
                  <span className="text-slate-200 font-medium">{vessel.holdsHatches}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Compliance & Features */}
          {activeTab === 'compliance' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
                  Operational Advantages & Vetting Approvals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {vessel.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/60 text-slate-300 text-xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>
                  This vessel possesses valid Document of Compliance (DOC), Safety Management Certificate (SMC), and International Ship Security Certificate (ISSC). Full class survey record available upon formal fixture enquiry.
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer at Bottom of Particulars */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
            * All particulars are believed to be correct but not guaranteed. Actual vessel performance, draft restrictions, and cargo compatibility are subject to formal charter party agreement (BIMCO standard terms).
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Internal ID: <span className="font-specs text-slate-300">{vessel.id}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(vessel);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-900/40 flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Request Charter / Fixture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
