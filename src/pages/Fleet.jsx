import React, { useState, useMemo } from 'react';
import VesselImage from '../components/VesselImage';
import { 
  Search, 
  Grid, 
  List, 
  X, 
  ChevronRight, 
  ArrowUpDown, 
  Eye,
  Ship,
  FileText
} from 'lucide-react';

export default function Fleet({ 
  vessels, 
  onSelectVessel, 
  onOpenEnquiry,
  initialCategory = 'ALL',
  initialStatus = 'ALL'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [dwtRange, setDwtRange] = useState('ALL');
  const [sortBy, setSortBy] = useState('dwt_desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredVessels = useMemo(() => {
    return vessels.filter(vessel => {
      if (vessel.publicationStatus !== 'Published') return false;

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = vessel.name.toLowerCase().includes(query);
        const matchesImo = vessel.imoNumber.includes(query);
        const matchesType = vessel.type.toLowerCase().includes(query);
        const matchesSubType = vessel.subType.toLowerCase().includes(query);
        const matchesFlag = vessel.flag.toLowerCase().includes(query);
        const matchesRegion = vessel.operatingRegion.toLowerCase().includes(query);
        if (!matchesName && !matchesImo && !matchesType && !matchesSubType && !matchesFlag && !matchesRegion) {
          return false;
        }
      }

      if (categoryFilter !== 'ALL' && vessel.type !== categoryFilter) {
        return false;
      }

      if (statusFilter !== 'ALL' && vessel.availabilityStatus !== statusFilter) {
        return false;
      }

      if (dwtRange === 'sub30') {
        if (vessel.dwt >= 30000) return false;
      } else if (dwtRange === '30to60') {
        if (vessel.dwt < 30000 || vessel.dwt > 60000) return false;
      } else if (dwtRange === '60to100') {
        if (vessel.dwt < 60000 || vessel.dwt > 100000) return false;
      } else if (dwtRange === 'above100') {
        if (vessel.dwt <= 100000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'dwt_desc') return b.dwt - a.dwt;
      if (sortBy === 'dwt_asc') return a.dwt - b.dwt;
      if (sortBy === 'year_desc') return b.builtYear - a.builtYear;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [vessels, searchTerm, categoryFilter, statusFilter, dwtRange, sortBy]);

  const categories = [
    { id: 'ALL', label: 'All Fleet Types' },
    { id: 'Bulk Carrier', label: 'Dry Bulk Carriers' },
    { id: 'Tanker', label: 'Crude Oil Tankers' },
    { id: 'Chemical Tanker', label: 'Chemical & Product' },
    { id: 'Offshore Support', label: 'Offshore Support & AHTS' },
    { id: 'Container Carrier', label: 'Container Feeders' }
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setDwtRange('ALL');
    setSortBy('dwt_desc');
  };

  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'ALL' || statusFilter !== 'ALL' || dwtRange !== 'ALL';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-[#F8F9FA] text-slate-800">
      
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9A7B4F] font-specs font-bold block">
          VESSEL REGISTER & AVAILABILITY
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif-maritime">
          Commercial Fleet Register
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Discover verified commercial vessels available for spot voyage charter, long-term time charter, or bareboat lease. Detailed engineering particulars, cubic capacities, and vetting certificates verified by GRAVITY SEA FLEETS superintendents.
        </p>
      </div>

      {/* Search and Control Console */}
      <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-5">
        
        {/* Row 1: Search Input & View Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by vessel name, IMO number, type, flag, or trading region..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0A192F]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center justify-between sm:justify-end gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-2.5 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0A192F]"
              >
                <option value="dwt_desc">DWT (High to Low)</option>
                <option value="dwt_asc">DWT (Low to High)</option>
                <option value="year_desc">Built Year (Newest)</option>
                <option value="name_asc">Name (A to Z)</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#0A192F] text-white' : 'text-slate-600 hover:text-black'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 ${viewMode === 'table' ? 'bg-[#0A192F] text-white' : 'text-slate-600 hover:text-black'}`}
                title="Technical Matrix Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[#0A192F] text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Secondary Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold uppercase text-[11px] font-specs">Availability:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="Available for Charter">Available for Charter (Prompt)</option>
                <option value="On Voyage">On Voyage</option>
                <option value="Scheduled Survey">Scheduled Survey</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold uppercase text-[11px] font-specs">Capacity (DWT):</span>
              <select
                value={dwtRange}
                onChange={e => setDwtRange(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none font-specs"
              >
                <option value="ALL">All Capacities</option>
                <option value="sub30">&lt; 30,000 MT</option>
                <option value="30to60">30,000 - 60,000 MT (Handy/Ultramax)</option>
                <option value="60to100">60,000 - 100,000 MT (Kamsarmax/Aframax)</option>
                <option value="above100">&gt; 100,000 MT (Capesize/Suezmax)</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-specs">
        <div>
          Displaying <strong className="text-slate-900 font-bold">{filteredVessels.length}</strong> of{' '}
          <strong className="text-slate-900">{vessels.length}</strong> published vessel records
        </div>
        <div>
          BIMCO Standard Commercial Fixture Terms Apply
        </div>
      </div>

      {/* Empty State */}
      {filteredVessels.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 p-8 space-y-4">
          <div className="w-14 h-14 bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Ship className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 font-serif-maritime">No Matching Vessels Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No published vessels match your active filter criteria. Clear your filters or contact our commercial desk for private or off-market tonnage.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#0A192F] text-white font-semibold text-xs uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredVessels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVessels.map(vessel => (
            <div
              key={vessel.id}
              className="group bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectVessel(vessel)}>
                  <VesselImage
                    src={vessel.imageUrl}
                    alt={vessel.name}
                    vesselType={vessel.subType || vessel.type}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-[#0A192F]/90 text-white text-[10px] font-specs font-semibold uppercase tracking-wider">
                      {vessel.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 text-[10px] font-specs font-semibold uppercase ${
                      vessel.availabilityStatus === 'Available for Charter'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-blue-800 text-white'
                    }`}>
                      {vessel.availabilityStatus === 'Available for Charter' ? 'PROMPT' : vessel.availabilityStatus}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectVessel(vessel)}
                      className="text-lg font-bold text-[#0A192F] group-hover:text-[#0284C7] transition-colors cursor-pointer font-serif-maritime"
                    >
                      {vessel.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-specs mt-0.5">
                      IMO: {vessel.imoNumber} • {vessel.subType}
                    </p>
                  </div>

                  {/* Spec Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Deadweight:</span>
                      <strong className="text-slate-900 font-specs text-xs">{vessel.dwt.toLocaleString()} MT</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Summer Draft:</span>
                      <strong className="text-slate-900 font-specs text-xs">{vessel.summerDraft} m</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Built / Flag:</span>
                      <strong className="text-slate-700 font-specs truncate block">{vessel.builtYear} • {vessel.flag}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Classification:</span>
                      <strong className="text-[#0284C7] font-specs truncate block">{vessel.classification}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Trading Area:</span>
                      <span className="font-medium text-slate-800 truncate max-w-[170px]">{vessel.operatingRegion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Available Date:</span>
                      <span className="text-emerald-700 font-specs font-bold">{vessel.availabilityDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectVessel(vessel)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#9A7B4F]" />
                  <span>Particulars</span>
                </button>
                <button
                  onClick={() => onOpenEnquiry(vessel)}
                  className="flex-1 py-2.5 px-3 bg-[#0A192F] hover:bg-[#0F223D] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Request Fixture</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE MATRIX VIEW */}
      {viewMode === 'table' && filteredVessels.length > 0 && (
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A192F] text-white uppercase font-specs text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Vessel Name / IMO</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">DWT (MT)</th>
                  <th className="py-3.5 px-4 font-semibold">Draft (m)</th>
                  <th className="py-3.5 px-4 font-semibold">Built</th>
                  <th className="py-3.5 px-4 font-semibold">Flag / Class</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredVessels.map(vessel => (
                  <tr key={vessel.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0A192F] hover:text-[#0284C7] cursor-pointer font-serif-maritime text-sm" onClick={() => onSelectVessel(vessel)}>
                        {vessel.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-specs">
                        IMO: {vessel.imoNumber} • {vessel.subType}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {vessel.type}
                    </td>
                    <td className="py-3 px-4 font-specs font-bold text-slate-900">
                      {vessel.dwt.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-specs text-slate-700">
                      {vessel.summerDraft} m
                    </td>
                    <td className="py-3 px-4 font-specs text-slate-700">
                      {vessel.builtYear}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div>{vessel.flag}</div>
                      <div className="text-[10px] text-[#0284C7] font-specs font-semibold">{vessel.classification}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-[10px] font-specs font-semibold uppercase ${
                        vessel.availabilityStatus === 'Available for Charter'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {vessel.availabilityStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectVessel(vessel)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-semibold uppercase"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => onOpenEnquiry(vessel)}
                          className="px-3 py-1 bg-[#0A192F] hover:bg-[#0F223D] text-white text-xs font-semibold uppercase"
                        >
                          Charter
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
