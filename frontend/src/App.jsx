import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Incidents from './pages/Incidents'
import AICopilot from './pages/AICopilot'
import Runbooks from './pages/Runbooks'
import NewAgent from './pages/actions/NewAgent'
import ConnectData from './pages/actions/ConnectData'
import Approvals from './pages/Approvals'
import Security from './pages/Security'
import FinOps from './pages/FinOps'
import ApiDocs from './pages/ApiDocs'
import Metrics from './pages/Metrics'
import Workspace from './pages/Workspace'
import OldApprovals from './pages/actions/Approvals'
import OldWorkspace from './pages/actions/Workspace'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/ai-copilot" element={<AICopilot />} />
        <Route path="/runbooks" element={<Runbooks />} />
        <Route path="/new-agent" element={<NewAgent />} />
        <Route path="/connect-data" element={<ConnectData />} />
        
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/security" element={<Security />} />
        <Route path="/finops" element={<FinOps />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/workspace" element={<Workspace />} />
        
        {/* Purane routes */}
        <Route path="/old-approvals" element={<OldApprovals />} />
        <Route path="/old-workspace" element={<OldWorkspace />} />
      </Routes>
    </Router>
  )
}

export default App
