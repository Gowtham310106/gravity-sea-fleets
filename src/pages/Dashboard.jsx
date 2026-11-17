import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Ship, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Archive, 
  CheckCircle2, 
  X, 
  Clock, 
  Search, 
  Download, 
  Filter, 
  UserCheck, 
  Radio, 
  AlertCircle,
  Eye,
  RefreshCw,
  Send,
  Lock,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone
} from 'lucide-react';

export default function Dashboard({ 
  vessels, 
  setVessels, 
  enquiries, 
  setEnquiries, 
  auditLogs, 
  setAuditLogs 
}) {
  const [currentRole, setCurrentRole] = useState('Administrator'); // Administrator | Fleet Publisher | Commercial Manager | Viewer
  const [activeTab, setActiveTab] = useState('overview'); // overview | vessels | enquiries | audit
  
  // Vessel CRUD modal state
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [editingVessel, setEditingVessel] = useState(null);
  const [vesselForm, setVesselForm] = useState({
    name: '',
    type: 'Bulk Carrier',
    subType: 'Ultramax Bulk Carrier',
    dwt: 63000,
    grossTonnage: 36000,
    builtYear: 2023,
    shipyard: 'Imabari Shipbuilding, Japan',
    flag: 'Marshall Islands',
    imoNumber: '',
    summerDraft: 13.3,
    serviceSpeed: 13.5,
    classification: 'DNV',
    operatingRegion: 'Global Trading',
    availabilityStatus: 'Available for Charter',
    publicationStatus: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80',
    commercialManager: 'Capt. Tariq Al-Mansoor'
  });

  // Enquiry detail drawer state
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newInternalNote, setNewInternalNote] = useState('');

  // Filters
  const [vesselStatusFilter, setVesselStatusFilter] = useState('ALL');
  const [vesselSearch, setVesselSearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('ALL');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Permission checks per BRD Section 9
  const canEditVessel = currentRole === 'Administrator' || currentRole === 'Fleet Publisher';
  const canPublishVessel = currentRole === 'Administrator' || currentRole === 'Fleet Publisher';
  const canManageEnquiry = currentRole === 'Administrator' || currentRole === 'Commercial Manager';
  const canViewAudit = currentRole === 'Administrator' || currentRole === 'Fleet Publisher';
  const canExport = currentRole === 'Administrator' || currentRole === 'Commercial Manager';

  // Helper to add audit event
  const logAudit = (action, entity, summary) => {
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: `${currentRole} (Active Session)`,
      action,
      entity,
      summary
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Vessel CRUD Handlers
  const handleOpenAddVessel = () => {
    setEditingVessel(null);
    setVesselForm({
      name: '',
      type: 'Bulk Carrier',
      subType: 'Ultramax Bulk Carrier',
      dwt: 63000,
      grossTonnage: 36000,
      builtYear: 2023,
      shipyard: 'Imabari Shipbuilding, Japan',
      flag: 'Marshall Islands',
      imoNumber: `${Math.floor(9800000 + Math.random() * 190000)}`,
      summerDraft: 13.3,
      serviceSpeed: 13.5,
      classification: 'DNV',
      operatingRegion: 'Global Trading',
      availabilityStatus: 'Available for Charter',
      publicationStatus: 'Draft',
      imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80',
      commercialManager: 'Capt. Tariq Al-Mansoor'
    });
    setIsVesselModalOpen(true);
  };

  const handleOpenEditVessel = (v) => {
    setEditingVessel(v);
    setVesselForm({ ...v });
    setIsVesselModalOpen(true);
  };

  const handleSaveVessel = (e) => {
    e.preventDefault();
    if (!vesselForm.name.trim()) return;

    if (editingVessel) {
      setVessels(prev => prev.map(item => item.id === editingVessel.id ? { ...item, ...vesselForm, updatedAt: new Date().toISOString() } : item));
      logAudit('VESSEL_UPDATE', `Vessel: ${vesselForm.name}`, `Updated technical particulars and configuration for ${vesselForm.name}`);
    } else {
      const newId = `GSF-VES-00${vessels.length + 1}`;
      const newVessel = {
        ...vesselForm,
        id: newId,
        slug: vesselForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        mmsi: `53800${Math.floor(1000 + Math.random() * 9000)}`,
        callSign: `V7${Math.floor(100 + Math.random() * 900)}`,
        classNotation: '1A Commercial, ESP, *IWS, BWM',
        netTonnage: Math.round(vesselForm.grossTonnage * 0.6),
        loa: 199.9,
        beam: 32.2,
        depthMoulded: 19.1,
        grainCapacity: 75000,
        baleCapacity: 71000,
        liquidCapacity: 0,
        holdsHatches: '5 Holds / 5 Hatches',
        cargoGear: '4 x 30.5t Cranes',
        mainEngine: 'MAN B&W 6S50ME Tier III',
        fuelConsumptionEco: '18.0 MT/day VLSFO at 13 kts',
        iceClass: '1C',
        availabilityDate: 'Immediate',
        availabilityUpdatedAt: new Date().toISOString(),
        imageGallery: [vesselForm.imageUrl],
        features: ['Modern fuel-saving duct', 'RightShip verified'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setVessels(prev => [newVessel, ...prev]);
      logAudit('VESSEL_CREATE', `Vessel: ${newVessel.name}`, `Created draft record ${newId} (${newVessel.name})`);
    }
    setIsVesselModalOpen(false);
  };

  const handleTogglePublish = (vessel) => {
    if (!canPublishVessel) return;
    const newStatus = vessel.publicationStatus === 'Published' ? 'Unpublished' : 'Published';
    setVessels(prev => prev.map(v => v.id === vessel.id ? { ...v, publicationStatus: newStatus, updatedAt: new Date().toISOString() } : v));
    logAudit('VESSEL_PUBLICATION_CHANGE', `Vessel: ${vessel.name}`, `Changed publication state to ${newStatus}`);
  };

  const handleArchiveVessel = (vessel) => {
    if (!canEditVessel) return;
    if (window.confirm(`Are you sure you want to archive ${vessel.name}? Historical enquiry references will be retained.`)) {
      setVessels(prev => prev.map(v => v.id === vessel.id ? { ...v, publicationStatus: 'Archived', updatedAt: new Date().toISOString() } : v));
      logAudit('VESSEL_ARCHIVED', `Vessel: ${vessel.name}`, `Archived record ${vessel.id}. Hidden from public discovery.`);
    }
  };

  const handleUpdateEnquiryStatus = (enquiryId, newStatus) => {
    if (!canManageEnquiry) return;
    setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
    if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
      setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
    }
    logAudit('ENQUIRY_STATUS_UPDATE', `Enquiry: ${enquiryId}`, `Status changed to ${newStatus}`);
  };

  const handleAddInternalNote = () => {
    if (!newInternalNote.trim() || !selectedEnquiry) return;
    const updatedNotes = selectedEnquiry.internalNotes 
      ? `${selectedEnquiry.internalNotes} | [${currentRole} ${new Date().toLocaleTimeString()}]: ${newInternalNote}`
      : `[${currentRole}]: ${newInternalNote}`;

    setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, internalNotes: updatedNotes } : e));
    setSelectedEnquiry(prev => ({ ...prev, internalNotes: updatedNotes }));
    setNewInternalNote('');
    logAudit('ENQUIRY_NOTE_ADDED', `Enquiry: ${selectedEnquiry.id}`, 'Added private commercial superintendent note');
  };

  const handleExportVessels = () => {
    const headers = "ID,Name,Type,DWT,BuiltYear,Flag,IMO,Classification,AvailabilityStatus,PublicationStatus\n";
    const rows = vessels.map(v => `"${v.id}","${v.name}","${v.type}",${v.dwt},${v.builtYear},"${v.flag}","${v.imoNumber}","${v.classification}","${v.availabilityStatus}","${v.publicationStatus}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gravity_fleet_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAudit('DATA_EXPORT', 'Fleet Directory', 'Exported full fleet register to CSV format');
  };

  const handleExportEnquiries = () => {
    const headers = "ID,CreatedAt,Type,Status,Company,Contact,Email,Phone,Vessel,Cargo,Notification\n";
    const rows = enquiries.map(e => `"${e.id}","${e.createdAt}","${e.enquiryType}","${e.status}","${e.company}","${e.contactName}","${e.email}","${e.phone}","${e.vesselName || 'N/A'}","${e.cargoType || 'N/A'}","${e.notificationStatus}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gravity_enquiries_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAudit('DATA_EXPORT', 'Commercial Enquiries', 'Exported commercial enquiry database to CSV format');
  };

  const filteredVessels = vessels.filter(v => {
    if (vesselStatusFilter !== 'ALL' && v.publicationStatus !== vesselStatusFilter) return false;
    if (vesselSearch.trim()) {
      const q = vesselSearch.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.imoNumber.includes(q) || v.type.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredEnquiries = enquiries.filter(e => {
    if (enquiryStatusFilter !== 'ALL' && e.status !== enquiryStatusFilter) return false;
    if (enquirySearch.trim()) {
      const q = enquirySearch.toLowerCase();
      return e.id.toLowerCase().includes(q) || e.company.toLowerCase().includes(q) || e.contactName.toLowerCase().includes(q) || (e.vesselName && e.vesselName.toLowerCase().includes(q));
    }
    return true;
  });

  const publishedCount = vessels.filter(v => v.publicationStatus === 'Published').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const qualifiedEnquiriesCount = enquiries.filter(e => e.status === 'Qualified').length;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* Top Operations Header Bar */}
      <div className="bg-[#0A192F] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 text-[#C5A880] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif-maritime text-xl font-bold tracking-tight text-white">
                Operations & Management Portal
              </h1>
              <p className="text-xs text-slate-400">
                Authorised Personnel Interface • Fleet Register & Commercial RFPs
              </p>
            </div>
          </div>

          {/* RBAC Role Switcher */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Simulate Role:</span>
            </div>
            <select
              value={currentRole}
              onChange={e => {
                setCurrentRole(e.target.value);
                logAudit('ROLE_SWITCH', 'Auth Context', `Switched active role to ${e.target.value}`);
              }}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-[#C5A880] focus:outline-none focus:border-[#C5A880]"
            >
              <option value="Administrator">Administrator (Full Access)</option>
              <option value="Fleet Publisher">Fleet Editor & Publisher</option>
              <option value="Commercial Manager">Commercial Enquiry Manager</option>
              <option value="Viewer">Read-Only Viewer</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Telemetry', count: null },
            { id: 'vessels', label: 'Fleet Register (CRUD)', count: vessels.length },
            { id: 'enquiries', label: 'Commercial Inquiries', count: enquiries.length },
            { id: 'audit', label: 'System Audit History', count: auditLogs.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#C5A880] text-[#C5A880] bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/30'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-specs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metric Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Published Vessels</span>
                <strong className="text-3xl font-specs font-bold text-[#0A192F] mt-2 block">
                  {publishedCount} <span className="text-xs text-slate-400 font-normal">/ {vessels.length} Total</span>
                </strong>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Live on Public Register</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Draft / Unpublished</span>
                <strong className="text-3xl font-specs font-bold text-amber-700 mt-2 block">
                  {vessels.length - publishedCount}
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">Under Internal Review</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">New Inbound Inquiries</span>
                <strong className="text-3xl font-specs font-bold text-[#0A192F] mt-2 block">
                  {newEnquiriesCount}
                </strong>
                <span className="text-[11px] text-[#9A7B4F] font-semibold mt-1 block">Requires Commercial Action</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded shadow-sm">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Qualified RFPs</span>
                <strong className="text-3xl font-specs font-bold text-emerald-700 mt-2 block">
                  {qualifiedEnquiriesCount}
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">Fixture Negotiations</span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white border border-slate-200 p-5 rounded shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
                Management Commands:
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {canEditVessel && (
                  <button
                    onClick={handleOpenAddVessel}
                    className="px-4 py-2 bg-[#0A192F] hover:bg-[#142D4C] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow"
                  >
                    <Plus className="w-4 h-4 text-[#C5A880]" />
                    <span>Create Vessel Record</span>
                  </button>
                )}
                {canExport && (
                  <>
                    <button
                      onClick={handleExportVessels}
                      className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-slate-100 text-[#0A192F] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Export Fleet CSV</span>
                    </button>
                    <button
                      onClick={handleExportEnquiries}
                      className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-slate-100 text-[#0A192F] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Export Inquiries CSV</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Two Columns: Recent Inquiries & Recent Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Inquiries */}
              <div className="bg-white border border-slate-200 rounded p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif-maritime font-bold text-[#0A192F] text-base">Recent Commercial Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#9A7B4F] hover:text-[#0A192F] font-semibold"
                  >
                    View All ({enquiries.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 4).map(e => (
                    <div 
                      key={e.id}
                      onClick={() => {
                        setSelectedEnquiry(e);
                        setActiveTab('enquiries');
                      }}
                      className="p-4 rounded border border-slate-200 hover:border-[#C5A880] transition-colors cursor-pointer space-y-2 bg-[#F8F9FA]"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-specs font-bold text-[#0A192F]">{e.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-specs uppercase font-semibold ${
                          e.status === 'New' ? 'bg-[#FAF5EE] text-[#9A7B4F] border border-[#E8DCC8]' :
                          e.status === 'Qualified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {e.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#0A192F]">
                        {e.company} — <span className="font-normal text-slate-600">{e.contactName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>{e.enquiryType} {e.vesselName ? `• ${e.vesselName}` : ''}</span>
                        <span className="font-specs">{new Date(e.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Snapshot */}
              <div className="bg-white border border-slate-200 rounded p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif-maritime font-bold text-[#0A192F] text-base">Operational Audit Trail</h3>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="text-xs text-[#9A7B4F] hover:text-[#0A192F] font-semibold"
                  >
                    View Full Trail ({auditLogs.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="p-3.5 rounded border border-slate-200 bg-[#F8F9FA] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-specs font-bold text-[#9A7B4F]">{log.action}</span>
                        <span className="font-specs text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-[#0A192F] font-semibold">{log.entity}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-1">{log.summary}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: FLEET REGISTER (CRUD) */}
        {activeTab === 'vessels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search fleet records..."
                    value={vesselSearch}
                    onChange={e => setVesselSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F]"
                  />
                </div>

                <select
                  value={vesselStatusFilter}
                  onChange={e => setVesselStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-xs text-[#0A192F] bg-white focus:outline-none"
                >
                  <option value="ALL">All Publication States</option>
                  <option value="Published">Published (Public)</option>
                  <option value="Draft">Draft (Internal)</option>
                  <option value="Unpublished">Unpublished</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {canEditVessel && (
                <button
                  onClick={handleOpenAddVessel}
                  className="w-full sm:w-auto px-4 py-2 rounded bg-[#0A192F] hover:bg-[#142D4C] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <Plus className="w-4 h-4 text-[#C5A880]" />
                  <span>Create Vessel Record</span>
                </button>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF5EE] text-[#0A192F] uppercase font-specs text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Vessel Name / ID</th>
                      <th className="py-3 px-4 font-bold">Type</th>
                      <th className="py-3 px-4 font-bold">DWT / Draft</th>
                      <th className="py-3 px-4 font-bold">Flag / Built</th>
                      <th className="py-3 px-4 font-bold">Commercial Status</th>
                      <th className="py-3 px-4 font-bold">Publication State</th>
                      <th className="py-3 px-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVessels.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#0A192F]">{v.name}</div>
                          <div className="text-[11px] text-slate-500 font-specs">{v.id} • IMO: {v.imoNumber}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {v.subType || v.type}
                        </td>
                        <td className="py-3 px-4 font-specs">
                          <span className="text-[#0A192F] font-bold">{v.dwt.toLocaleString()} MT</span>
                          <span className="text-slate-500 text-[11px] block">{v.summerDraft}m draft</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          <div>{v.flag}</div>
                          <div className="text-[11px] text-slate-500 font-specs">{v.builtYear}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-specs bg-slate-100 text-slate-700 font-medium">
                            {v.availabilityStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-specs font-semibold uppercase ${
                            v.publicationStatus === 'Published'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : v.publicationStatus === 'Draft'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            ● {v.publicationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {canEditVessel && (
                              <button
                                onClick={() => handleOpenEditVessel(v)}
                                className="p-1.5 rounded border border-slate-200 hover:border-[#0A192F] text-slate-600 hover:text-[#0A192F] transition-colors"
                                title="Edit Particulars"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {canPublishVessel && (
                              <button
                                onClick={() => handleTogglePublish(v)}
                                className={`px-2 py-1 rounded text-[11px] font-medium border ${
                                  v.publicationStatus === 'Published'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                }`}
                              >
                                {v.publicationStatus === 'Published' ? 'Unpublish' : 'Publish'}
                              </button>
                            )}
                            {canEditVessel && v.publicationStatus !== 'Archived' && (
                              <button
                                onClick={() => handleArchiveVessel(v)}
                                className="p-1.5 rounded border border-slate-200 hover:border-rose-400 text-slate-500 hover:text-rose-600 transition-colors"
                                title="Archive Record"
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMERCIAL ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded border border-slate-200 shadow-sm">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by company, contact or reference..."
                    value={enquirySearch}
                    onChange={e => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded border border-slate-300 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#0A192F]"
                  />
                </div>

                <select
                  value={enquiryStatusFilter}
                  onChange={e => setEnquiryStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-xs text-[#0A192F] bg-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Replied">Replied</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="space-y-3">
                {filteredEnquiries.map(e => {
                  const isSelected = selectedEnquiry && selectedEnquiry.id === e.id;
                  return (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEnquiry(e)}
                      className={`p-5 rounded border transition-all cursor-pointer space-y-2.5 ${
                        isSelected
                          ? 'bg-[#FAF5EE] border-[#C5A880] ring-1 ring-[#C5A880]'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-specs font-bold text-[#0A192F]">{e.id}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-specs">{new Date(e.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-specs uppercase font-semibold ${
                          e.status === 'New' ? 'bg-[#FAF5EE] text-[#9A7B4F] border border-[#E8DCC8]' :
                          e.status === 'Qualified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {e.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <strong className="text-[#0A192F] text-sm">{e.company}</strong>
                        <span className="text-xs text-slate-600">{e.contactName}</span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center justify-between">
                        <span>{e.enquiryType} {e.vesselName ? `(Vessel: ${e.vesselName})` : ''}</span>
                        <span className="text-[11px] text-slate-400 font-specs">Desk: {e.assignedTo || 'Unassigned'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enquiry Detail Drawer */}
            <div className="lg:col-span-5">
              {selectedEnquiry ? (
                <div className="bg-white border border-slate-200 rounded p-6 space-y-6 sticky top-24 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-specs text-[#9A7B4F] font-bold">{selectedEnquiry.id}</span>
                      <h3 className="font-serif-maritime text-lg font-bold text-[#0A192F]">{selectedEnquiry.company}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="p-1 rounded text-slate-400 hover:text-[#0A192F]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Lifecycle Switcher */}
                  {canManageEnquiry && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A192F] block">Commercial Lifecycle Status:</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['New', 'In Review', 'Replied', 'Qualified', 'Closed'].map(st => (
                          <button
                            key={st}
                            onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, st)}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-all border ${
                              selectedEnquiry.status === st
                                ? 'bg-[#0A192F] text-white border-[#0A192F]'
                                : 'bg-[#F8F9FA] text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Particulars */}
                  <div className="bg-[#F8F9FA] p-4 rounded border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Contact:</span>
                      <strong className="text-[#0A192F]">{selectedEnquiry.contactName}</strong>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Email:</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-[#0A192F] hover:text-[#9A7B4F] underline">{selectedEnquiry.email}</a>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Phone:</span>
                      <span className="text-[#0A192F] font-specs">{selectedEnquiry.phone}</span>
                    </div>
                  </div>

                  {/* Cargo / Specs */}
                  {(selectedEnquiry.vesselName || selectedEnquiry.cargoType || selectedEnquiry.loadPort) && (
                    <div className="bg-[#F8F9FA] p-4 rounded border border-slate-200 space-y-2 text-xs">
                      <span className="text-[10px] font-specs uppercase text-[#9A7B4F] font-bold block mb-1">
                        Voyage & Cargo Particulars
                      </span>
                      {selectedEnquiry.vesselName && (
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Vessel Requested:</span>
                          <strong className="text-[#0A192F]">{selectedEnquiry.vesselName}</strong>
                        </div>
                      )}
                      {selectedEnquiry.cargoType && (
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Cargo:</span>
                          <span className="text-[#0A192F]">{selectedEnquiry.cargoType}</span>
                        </div>
                      )}
                      {selectedEnquiry.cargoVolume && (
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-500">Volume:</span>
                          <span className="text-[#0A192F] font-specs">{selectedEnquiry.cargoVolume}</span>
                        </div>
                      )}
                      {selectedEnquiry.loadPort && (
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Ports:</span>
                          <span className="text-[#0A192F]">{selectedEnquiry.loadPort} → {selectedEnquiry.dischargePort}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Client Message */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-[#0A192F]">Client Specifications:</span>
                    <div className="p-3.5 rounded bg-[#F8F9FA] border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      {selectedEnquiry.message || 'No additional specifications provided.'}
                    </div>
                  </div>

                  {/* Private Internal Notes */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-xs font-semibold text-[#9A7B4F] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Private Commercial Notes (Internal Staff Only):</span>
                    </span>
                    <div className="p-3 rounded bg-[#FAF5EE] border border-[#E8DCC8] text-[11px] text-[#0A192F] leading-relaxed font-mono">
                      {selectedEnquiry.internalNotes || 'No notes added.'}
                    </div>

                    {canManageEnquiry && (
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Add private note (e.g. Indicating WS 115)..."
                          value={newInternalNote}
                          onChange={e => setNewInternalNote(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded border border-slate-300 text-xs text-[#0A192F] focus:outline-none focus:border-[#0A192F]"
                        />
                        <button
                          onClick={handleAddInternalNote}
                          className="px-3.5 py-1.5 rounded bg-[#0A192F] hover:bg-[#142D4C] text-white font-bold text-xs"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-400 text-xs shadow-sm">
                  Select an inquiry from the register to review requirements, update lifecycle status, and record private superintendent notes.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM AUDIT HISTORY */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded border border-slate-200 text-xs shadow-sm">
              <span className="text-[#0A192F] font-semibold">
                Immutable Statutory Audit Trail (Conforming to BRD Module M11)
              </span>
              <span className="text-slate-500 font-specs">
                {auditLogs.length} Events Logged
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF5EE] text-[#0A192F] uppercase font-specs text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Timestamp (UTC)</th>
                      <th className="py-3 px-4 font-bold">Action</th>
                      <th className="py-3 px-4 font-bold">Entity</th>
                      <th className="py-3 px-4 font-bold">Actor</th>
                      <th className="py-3 px-4 font-bold">Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-[#9A7B4F] font-bold">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 text-[#0A192F] font-semibold">
                          {log.entity}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {log.actor}
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-sans text-xs">
                          {log.summary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT VESSEL */}
        {isVesselModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white border-t-4 border-[#C5A880] rounded shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-[#0A192F] text-white">
                <h3 className="font-serif-maritime font-bold text-base">
                  {editingVessel ? `Edit Vessel: ${editingVessel.name}` : 'Create New Fleet Record'}
                </h3>
                <button
                  onClick={() => setIsVesselModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVessel} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Vessel Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GRAVITY RESOLUTE"
                      value={vesselForm.name}
                      onChange={e => setVesselForm({ ...vesselForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] focus:outline-none focus:border-[#0A192F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">IMO Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9924819"
                      value={vesselForm.imoNumber}
                      onChange={e => setVesselForm({ ...vesselForm, imoNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] focus:outline-none focus:border-[#0A192F] font-specs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Vessel Type</label>
                    <select
                      value={vesselForm.type}
                      onChange={e => setVesselForm({ ...vesselForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] bg-white focus:outline-none"
                    >
                      <option value="Bulk Carrier">Bulk Carrier</option>
                      <option value="Tanker">Crude Oil Tanker</option>
                      <option value="Chemical Tanker">Chemical & Product Tanker</option>
                      <option value="Offshore Support">Offshore Support (AHTS / PSV)</option>
                      <option value="Container Carrier">Container Feeder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Sub-Type Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Ultramax Geared Dry Bulker"
                      value={vesselForm.subType}
                      onChange={e => setVesselForm({ ...vesselForm, subType: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Deadweight (DWT)</label>
                    <input
                      type="number"
                      value={vesselForm.dwt}
                      onChange={e => setVesselForm({ ...vesselForm, dwt: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] font-specs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Summer Draft (m)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={vesselForm.summerDraft}
                      onChange={e => setVesselForm({ ...vesselForm, summerDraft: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] font-specs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Built Year</label>
                    <input
                      type="number"
                      value={vesselForm.builtYear}
                      onChange={e => setVesselForm({ ...vesselForm, builtYear: parseInt(e.target.value) || 2024 })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] font-specs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Flag State</label>
                    <input
                      type="text"
                      value={vesselForm.flag}
                      onChange={e => setVesselForm({ ...vesselForm, flag: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Classification Society</label>
                    <input
                      type="text"
                      value={vesselForm.classification}
                      onChange={e => setVesselForm({ ...vesselForm, classification: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Commercial Status</label>
                    <select
                      value={vesselForm.availabilityStatus}
                      onChange={e => setVesselForm({ ...vesselForm, availabilityStatus: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] bg-white"
                    >
                      <option value="Available for Charter">Available for Charter</option>
                      <option value="On Voyage">On Voyage</option>
                      <option value="Scheduled Survey">Scheduled Survey</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#0A192F] font-semibold mb-1">Publication State</label>
                    <select
                      value={vesselForm.publicationStatus}
                      onChange={e => setVesselForm({ ...vesselForm, publicationStatus: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 text-[#0A192F] bg-white"
                    >
                      <option value="Published">Published (Public)</option>
                      <option value="Draft">Draft (Internal)</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVesselModalOpen(false)}
                    className="px-4 py-2 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-[#0A192F] hover:bg-[#142D4C] text-white text-xs font-bold shadow"
                  >
                    {editingVessel ? 'Save Changes' : 'Create Vessel Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}