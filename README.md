# GRAVITY SEA FLEETS — Combined Maritime Services Platform

[![Release](https://img.shields.io/badge/Release-v1.2--Production-0284c7.svg)](https://github.com/Gowtham310106/gravity-sea-fleets)
[![Standards](https://img.shields.io/badge/Maritime-ISM%20%7C%20ISPS%20%7C%20MLC%202006-emerald.svg)](https://github.com/Gowtham310106/gravity-sea-fleets)
[![Classification](https://img.shields.io/badge/Classification-DNV%20%7C%20Lloyd's%20%7C%20ABS-amber.svg)](https://github.com/Gowtham310106/gravity-sea-fleets)

A high-performance, responsive corporate maritime services platform engineered according to the **GRAVITY SEA FLEETS Business Requirements Document (BRD v1.2)**. 

Benchmarked against leading global maritime operators including **Fleet Management Limited** (`fleetship.com`), **Neptune Atlas** (`neptuneatlas.com`), and **Anglo-Eastern** (`angloeastern.com`), this platform delivers a bespoke, non-generic maritime UI/UX, authentic engineering particulars, interactive voyage calculations, and an integrated staff management dashboard.

---

## ⚓ Key Capabilities & Architecture

### 1. Corporate Identity & Credibility (BRD M01 / M02)
- **Real-Time Nautical Ticker**: Live Zulu Time (UTC clock), regional trading hub clocks (Dubai UTC+4, Singapore UTC+8, Rotterdam UTC+1, Houston UTC-5), 24/7 Operations Desk telephone dispatch, and active VHF Calling channels (Ch. 16/72).
- **Verified Capability Positioning**: 1.85M+ Total Managed DWT, 99.4% operational uptime, 0.00 LTI zero-harm safety record, and accredited Classification Society seals (DNV, Lloyd's Register, American Bureau of Shipping, ClassNK, Bureau Veritas).

### 2. Searchable Fleet Directory (BRD M03 / M04 / FR-004 to FR-008)
- **Multi-Faceted Vessel Discovery**:
  - Live search by vessel name, IMO number, sub-type, flag, and trading area.
  - Category filters: *Dry Bulk Carriers (Ultramax, Kamsarmax)*, *Crude Oil Tankers (Aframax)*, *Chemical & Product Tankers*, *Offshore Support (DP2 AHTS, PSV)*, and *Feeder Container Ships*.
  - Commercial availability filter (*Available for Charter*, *On Voyage*, *Scheduled Survey*).
  - Tonnage brackets (Sub-30k DWT, 30k-60k DWT, 60k-100k DWT, >100k DWT).
  - Dual Layout Switcher: High-res photography Grid View and technical matrix Table View (like Equasis / Clarksons).
- **Full Vessel Particulars Modal**:
  - High-res photo gallery with thumbnail switcher.
  - Tabbed engineering specs: General Identity, Dimensions & Capacities (DWT, GT, NT, LOA, Beam, Summer Draft, Cubic capacities), Machinery & Cargo Gear (Main Engine, Eco consumption, Cranes/Grabs SWL, Pumps), and Vetting Approvals (SIRE 2.0, RightShip 5-Star).
  - Printable Vessel Specification Sheet (`window.print()`).

### 3. Integrated Four Maritime Service Divisions (BRD M02 / FR-005)
1. **Commercial Vessel Chartering & Fixtures**: Spot voyage charters, period time charters, bareboat contracts, and Industrial Contracts of Affreightment (COA) under BIMCO standards (GENCON, NYPE, SHELLTIME, BPVOY).
2. **Technical Fleet Superintendency**: 24/7 engineering oversight, Planned Maintenance Systems (PMS), drydock tender negotiations and yard supervision, condition monitoring, and lube oil telemetry.
3. **Offshore Marine Support & Rig Logistics**: DP2 Anchor Handling Tug Supply (AHTS) up to 165t bollard pull, PSVs with liquid mud/drill water capacities, and round-the-clock port agency husbandry.
4. **QHSE, SIRE 2.0 & RightShip Vetting**: Zero-detention track record, OCIMF SIRE 2.0 pre-inspection mock audits, RightShip GHG A-rating optimization, and IMO decarbonization advisory (EEXI / CII / EU ETS).

### 4. Interactive Voyage & Fuel Consumption Calculator
- Real-time calculation between major global ports (Singapore, Fujairah, Ras Tanura, Rotterdam, Houston, Richards Bay, Mundra, Shanghai, Port Hedland).
- Sea distance (nautical miles), transit duration (days) at eco speed, bunker fuel consumed (MT VLSFO/MGO), and carbon footprint estimation (CII index).
- Direct prefill into commercial inquiry forms.

### 5. Multi-Step Request for Proposal (RFP) Engine (BRD M05 / FR-015 to FR-023)
- Contextual forms pre-populating selected vessel particulars.
- Laycan window (commencing / cancelling dates), load port, discharge port, and cargo volumes.
- Anti-spam honeypot defense and instant tracking reference generator (e.g. `GSF-ENQ-2026-8812`).
- 4-hour commercial SLA response guarantee.

### 6. Operations Management Dashboard (BRD M06 - M13)
- **Role-Based Access Control (RBAC)**: Administrator, Fleet Publisher, Commercial Manager, and Read-Only Viewer.
- **Executive Overview**: Total fleet metrics, publication states, new inbound leads, and recent activity logs.
- **Vessel CRUD & Lifecycle**: Create, edit, toggle publication (Draft, Published, Unpublished, Archived with deletion protection per TC-07).
- **Commercial Inquiry Management**: Full inquiry details, lifecycle status transitions (*New* → *In Review* → *Replied* → *Qualified* → *Closed*), officer assignment, and private superintendent internal notes.
- **Audit History Trail**: Timestamped immutable log of all operations and administrative changes.
- **Data Export**: One-click CSV export of fleet records and commercial inquiries.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (Custom Maritime Color Tokens & Grid Overlays)
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans (Headings/Body) + Space Grotesk (Engineering Metrics & Particulars)
- **Persistence**: Browser LocalStorage synchronization for offline persistence and demo states

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Gowtham310106/gravity-sea-fleets.git

# Navigate to project
cd gravity-sea-fleets

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Maritime Commercial Disclaimer
*All vessel records, tonnages, and availability indicators presented across this platform are published for commercial discovery, indicative voyage calculation, and qualified business evaluation. Submitting an enquiry does not constitute a legally binding fixture or availability guarantee. All fixtures are subject to formal charter party agreement (BIMCO standard forms) and commercial vetting approval.*
