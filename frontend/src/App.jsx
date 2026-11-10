import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Logs from './pages/Logs'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import RCA from './pages/RCA'
import Topology from './pages/Topology'
import Reports from './pages/Reports'
import Incidents from './pages/Incidents'
import AuditLogs from './pages/AuditLogs'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/rca" element={<RCA />} />
          <Route path="/topology" element={<Topology />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
