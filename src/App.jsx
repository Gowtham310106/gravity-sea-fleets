import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VesselModal from './components/VesselModal';
import EnquiryModal from './components/EnquiryModal';

import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Services from './pages/Services';
import About from './pages/About';
import Compliance from './pages/Compliance';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import VoyageCalculator from './components/VoyageCalculator';

import { INITIAL_VESSELS, INITIAL_ENQUIRIES, AUDIT_LOGS } from './data/vessels';

export default function App() {
  // Primary state backed by localStorage
  const [vessels, setVessels] = useState(() => {
    const saved = localStorage.getItem('gsf_vessels');
    return saved ? JSON.parse(saved) : INITIAL_VESSELS;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('gsf_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('gsf_audit_logs');
    return saved ? JSON.parse(saved) : AUDIT_LOGS;
  });

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState('home');

  // Modals state
  const [selectedVesselForModal, setSelectedVesselForModal] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedVesselForEnquiry, setSelectedVesselForEnquiry] = useState(null);
  const [fleetFilterCategory, setFleetFilterCategory] = useState('ALL');
  const [fleetFilterStatus, setFleetFilterStatus] = useState('ALL');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('gsf_vessels', JSON.stringify(vessels));
  }, [vessels]);

  useEffect(() => {
    localStorage.setItem('gsf_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('gsf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Open Enquiry with custom context
  const handleOpenEnquiryWithData = (data) => {
    setSelectedVesselForEnquiry(null);
    setIsEnquiryModalOpen(true);
  };

  const handleOpenEnquiryForVessel = (vessel) => {
    setSelectedVesselForEnquiry(vessel);
    setIsEnquiryModalOpen(true);
  };

  const handleEnquirySubmitted = (newEnquiry) => {
    setEnquiries(prev => [newEnquiry, ...prev]);

    // Add audit trail entry per BRD FR-016 & M11
    const newAudit = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: `${newEnquiry.contactName} (${newEnquiry.company})`,
      action: 'ENQUIRY_SUBMISSION',
      entity: `Enquiry Ref: ${newEnquiry.id}`,
      summary: `Commercial request submitted for ${newEnquiry.enquiryType} ${newEnquiry.vesselName ? `(${newEnquiry.vesselName})` : ''}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  };

  const handleApplyHeroFilter = ({ category, status }) => {
    setFleetFilterCategory(category);
    setFleetFilterStatus(status);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenEnquiry={() => {
          setSelectedVesselForEnquiry(null);
          setIsEnquiryModalOpen(true);
        }}
        vesselsCount={vessels.filter(v => v.publicationStatus === 'Published').length}
      />

      {/* Main Content Render */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            vessels={vessels}
            onSelectVessel={v => setSelectedVesselForModal(v)}
            onOpenEnquiry={v => handleOpenEnquiryForVessel(v)}
            setCurrentTab={setCurrentTab}
            onOpenEnquiryWithData={handleOpenEnquiryWithData}
            onApplyFleetFilter={handleApplyHeroFilter}
          />
        )}

        {currentTab === 'fleet' && (
          <Fleet
            vessels={vessels}
            onSelectVessel={v => setSelectedVesselForModal(v)}
            onOpenEnquiry={v => handleOpenEnquiryForVessel(v)}
            initialCategory={fleetFilterCategory}
            initialStatus={fleetFilterStatus}
          />
        )}

        {currentTab === 'services' && (
          <Services
            onOpenEnquiryWithData={handleOpenEnquiryWithData}
          />
        )}

        {currentTab === 'calculator' && (
          <div className="py-10">
            <VoyageCalculator onOpenEnquiryWithData={handleOpenEnquiryWithData} />
          </div>
        )}

        {currentTab === 'about' && (
          <About
            onOpenEnquiry={() => {
              setSelectedVesselForEnquiry(null);
              setIsEnquiryModalOpen(true);
            }}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'compliance' && (
          <Compliance
            onOpenEnquiry={() => {
              setSelectedVesselForEnquiry(null);
              setIsEnquiryModalOpen(true);
            }}
          />
        )}

        {currentTab === 'contact' && (
          <Contact
            onEnquirySubmitted={handleEnquirySubmitted}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            vessels={vessels}
            setVessels={setVessels}
            enquiries={enquiries}
            setEnquiries={setEnquiries}
            auditLogs={auditLogs}
            setAuditLogs={setAuditLogs}
          />
        )}
      </main>

      {/* Global Maritime Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenEnquiry={() => {
          setSelectedVesselForEnquiry(null);
          setIsEnquiryModalOpen(true);
        }}
      />

      {/* Full Vessel Particulars Modal */}
      <VesselModal
        vessel={selectedVesselForModal}
        onClose={() => setSelectedVesselForModal(null)}
        onEnquire={vessel => handleOpenEnquiryForVessel(vessel)}
      />

      {/* Structured Commercial Enquiry RFP Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        selectedVessel={selectedVesselForEnquiry}
        onEnquirySubmitted={handleEnquirySubmitted}
      />

    </div>
  );
}
