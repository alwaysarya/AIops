import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Incidents from './pages/Incidents'
import AICopilot from './pages/AICopilot'
import Approvals from './pages/Approvals'
import Security from './pages/Security'
import FinOps from './pages/FinOps'
import ApiDocs from './pages/ApiDocs'
import Metrics from './pages/Metrics'
import NewAgent from './pages/actions/NewAgent'
import ConnectData from './pages/actions/ConnectData'
import Workspace from './pages/actions/Workspace'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/ai-copilot" element={<AICopilot />} />
        <Route path="/" element={<Home />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/security" element={<Security />} />
        <Route path="/finops" element={<FinOps />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/metrics" element={<Metrics />} />
        
        {/* Nayi Routes */}
        <Route path="/new-agent" element={<NewAgent />} />
        <Route path="/connect-data" element={<ConnectData />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </Router>
  )
}

export default App
