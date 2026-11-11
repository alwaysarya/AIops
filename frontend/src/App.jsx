import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import Login from './pages/Login'
import Organizations from './pages/Organizations'
import Security from './pages/Security'
import FinOps from './pages/FinOps'
import Approvals from './pages/Approvals'
import ApiDocs from './pages/ApiDocs'
import Copilot from './components/Common/Copilot'
import CommandPalette from './components/Common/CommandPalette'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030303] text-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/topology" element={<ProtectedRoute><Topology /></ProtectedRoute>} />
          <Route path="/rca" element={<ProtectedRoute><RCA /></ProtectedRoute>} />
          <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/backup" element={<ProtectedRoute><Backup /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
          <Route path="/organizations" element={<ProtectedRoute><Organizations /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/finops" element={<ProtectedRoute><FinOps /></ProtectedRoute>} />
          <Route path="/approvals" element={<ProtectedRoute><Approvals /></ProtectedRoute>} />
          <Route path="/api-docs" element={<ProtectedRoute><ApiDocs /></ProtectedRoute>} />
        </Routes>
        <Copilot />
        <CommandPalette />
      </div>
    </Router>
  )
}

export default App
