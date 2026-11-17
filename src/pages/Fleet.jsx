import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Ship, 
  Grid, 
  List, 
  X, 
  FileText, 
  ChevronRight, 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  Download
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

  // Filter and sort logic
  const filteredVessels = useMemo(() => {
    return vessels.filter(vessel => {
      // Must be published for public view (BRD requirement 8.3)
      if (vessel.publicationStatus !== 'Published') return false;

      // Search term
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

      // Category filter
      if (categoryFilter !== 'ALL' && vessel.type !== categoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && vessel.availabilityStatus !== statusFilter) {
        return false;
      }

      // DWT Range filter
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
          <Ship className="w-3.5 h-3.5" />
          <span>Vessel Register & Chartering Availability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Commercial Fleet Directory
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          Discover verified commercial vessels available for spot voyage charter, long-term time charter, or bareboat fixtures. Detailed engineering particulars, cubic capacities, and vetting certificates verified by GRAVITY SEA FLEETS superintendents.
        </p>
      </div>

      {/* Search and Control Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
        
        {/* Row 1: Search Input & View Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by vessel name, IMO number, type, flag, or trading region..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center justify-between sm:justify-end gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="dwt_desc">DWT (High to Low)</option>
                <option value="dwt_asc">DWT (Low to High)</option>
                <option value="year_desc">Built Year (Newest)</option>
                <option value="name_asc">Name (A to Z)</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-700/80">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Technical Matrix Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Secondary Filters (Availability, DWT Range, Active Tags) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Availability Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Availability:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Available for Charter">Available for Charter (Prompt)</option>
                <option value="On Voyage">On Voyage</option>
                <option value="Scheduled Survey">Scheduled Survey</option>
              </select>
            </div>

            {/* DWT Range Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Capacity (DWT):</span>
              <select
                value={dwtRange}
                onChange={e => setDwtRange(e.target.value)}
                className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500 font-specs"
              >
                <option value="ALL">All Capacities</option>
                <option value="sub30">&lt; 30,000 MT</option>
                <option value="30to60">30,000 - 60,000 MT (Handy/Ultramax)</option>
                <option value="60to100">60,000 - 100,000 MT (Kamsarmax/Aframax)</option>
                <option value="above100">&gt; 100,000 MT (Capesize/Suezmax)</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Action */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <strong className="text-white font-specs">{filteredVessels.length}</strong> of{' '}
          <strong className="text-slate-300 font-specs">{vessels.length}</strong> published vessels
        </div>
        <div className="text-[11px] text-slate-500">
          Last reviewed: Today • BIMCO Standard Fixture Terms
        </div>
      </div>

      {/* Empty State */}
      {filteredVessels.length === 0 && (
        <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Ship className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Matching Vessels Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No published vessels match your active search and filter parameters. Try clearing your filters or contact our commercial desk for private/off-market tonnage.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredVessels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVessels.map(vessel => (
            <div
              key={vessel.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/70 shadow-lg hover:shadow-cyan-950/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectVessel(vessel)}>
                  <img
                    src={vessel.imageUrl}
                    alt={vessel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-specs font-semibold uppercase bg-slate-950/80 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                      {vessel.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-specs font-semibold uppercase backdrop-blur-sm ${
                      vessel.availabilityStatus === 'Available for Charter'
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700'
                        : 'bg-blue-950/90 text-blue-300 border border-blue-700'
                    }`}>
                      ● {vessel.availabilityStatus}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectVessel(vessel)}
                      className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {vessel.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-specs">
                      IMO: {vessel.imoNumber} • {vessel.subType}
                    </p>
                  </div>

                  {/* Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block">Deadweight:</span>
                      <strong className="text-white font-specs text-xs">{vessel.dwt.toLocaleString()} MT</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Summer Draft:</span>
                      <strong className="text-white font-specs text-xs">{vessel.summerDraft} m</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Built / Yard:</span>
                      <strong className="text-slate-200 font-specs truncate block">{vessel.builtYear} • {vessel.flag}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Classification:</span>
                      <strong className="text-cyan-400 font-specs truncate block">{vessel.classification}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Trading Area:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[170px]">{vessel.operatingRegion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Available From:</span>
                      <span className="text-emerald-400 font-specs font-semibold">{vessel.availabilityDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-slate-800/60 mt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectVessel(vessel)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Particulars</span>
                </button>
                <button
                  onClick={() => onOpenEnquiry(vessel)}
                  className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-950 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Charter</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE MATRIX VIEW */}
      {viewMode === 'table' && filteredVessels.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-specs text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Vessel Name / IMO</th>
                  <th className="py-3.5 px-4 font-semibold">Type</th>
                  <th className="py-3.5 px-4 font-semibold">DWT (MT)</th>
                  <th className="py-3.5 px-4 font-semibold">Draft (m)</th>
                  <th className="py-3.5 px-4 font-semibold">Built</th>
                  <th className="py-3.5 px-4 font-semibold">Flag / Class</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredVessels.map(vessel => (
                  <tr key={vessel.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white hover:text-cyan-400 cursor-pointer" onClick={() => onSelectVessel(vessel)}>
                        {vessel.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-specs">
                        IMO: {vessel.imoNumber} • {vessel.subType}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {vessel.type}
                    </td>
                    <td className="py-3 px-4 font-specs font-bold text-white">
                      {vessel.dwt.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-specs text-slate-300">
                      {vessel.summerDraft} m
                    </td>
                    <td className="py-3 px-4 font-specs text-slate-300">
                      {vessel.builtYear}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div>{vessel.flag}</div>
                      <div className="text-[10px] text-cyan-400 font-specs">{vessel.classification}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-specs font-semibold uppercase ${
                        vessel.availabilityStatus === 'Available for Charter'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}>
                        {vessel.availabilityStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectVessel(vessel)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                          title="View Particulars"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => onOpenEnquiry(vessel)}
                          className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
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
