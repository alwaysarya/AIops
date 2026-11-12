import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/Common/ProtectedRoute'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Incidents from './pages/Incidents'
import AICopilot from './pages/AICopilot'
import Runbooks from './pages/Runbooks'
import Settings from './pages/Settings'
import AuditLogs from './pages/AuditLogs'
import Security from './pages/Security'
import Policies from './pages/Policies'
import Approvals from './pages/Approvals'
import Metrics from './pages/Metrics'
import FinOps from './pages/FinOps'
import ApiDocs from './pages/ApiDocs'
import NewAgent from './pages/actions/NewAgent'
import ConnectData from './pages/actions/ConnectData'
import Workspace from './pages/Workspace'

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#111113', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
        <Route path="/ai-copilot" element={<ProtectedRoute><AICopilot /></ProtectedRoute>} />
        <Route path="/runbooks" element={<ProtectedRoute><Runbooks /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
        <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
        <Route path="/approvals" element={<ProtectedRoute><Approvals /></ProtectedRoute>} />
        <Route path="/metrics" element={<ProtectedRoute><Metrics /></ProtectedRoute>} />
        <Route path="/finops" element={<ProtectedRoute><FinOps /></ProtectedRoute>} />
        <Route path="/api-docs" element={<ProtectedRoute><ApiDocs /></ProtectedRoute>} />
        <Route path="/new-agent" element={<ProtectedRoute><NewAgent /></ProtectedRoute>} />
        <Route path="/connect-data" element={<ProtectedRoute><ConnectData /></ProtectedRoute>} />
        <Route path="/workspace" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
