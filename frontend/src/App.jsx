import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Logs from './pages/Logs'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Topology from './pages/Topology'
import RCA from './pages/RCA'
import Incidents from './pages/Incidents'
import Reports from './pages/Reports'
import Backup from './pages/Backup'
import AuditLogs from './pages/AuditLogs'
import Organizations from './pages/Organizations'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030303] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/topology" element={<Topology />} />
          <Route path="/rca" element={<RCA />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
