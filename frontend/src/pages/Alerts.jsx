import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { AlertCircle, CheckCircle, Info, Filter, Wrench } from 'lucide-react'

const Alerts = () => {
  const [filter, setFilter] = useState('ALL')
  const [fixStatus, setFixStatus] = useState({})
  
  const allAlerts = [
    { id: 1, type: 'critical', title: 'High CPU Usage', desc: 'Node-01 is at 95% CPU utilization.', time: '2 mins ago', service: 'infra' },
    { id: 2, type: 'warning', title: 'High Latency', desc: 'Payment service response time is above 2s.', time: '15 mins ago', service: 'payment-service' },
    { id: 3, type: 'resolved', title: 'Pod Restarted', desc: 'Auto-remediation restarted auth-service pod.', time: '1 hour ago', service: 'auth-service' },
    { id: 4, type: 'critical', title: 'Database Connection Failed', desc: 'Could not connect to PostgreSQL instance.', time: '5 mins ago', service: 'db' },
    { id: 5, type: 'warning', title: 'Memory Leak Detected', desc: 'User service memory growing steadily.', time: '30 mins ago', service: 'user-service' }
  ]

  const filteredAlerts = filter === 'ALL' ? allAlerts : allAlerts.filter(a => a.type === filter.toLowerCase())

  const handleAutoFix = async (alert) => {
    setFixStatus(prev => ({ ...prev, [alert.id]: 'Fixing...' }))
    try {
      const res = await fetch('http://localhost:8000/api/v1/remediation/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restart_pod', service: alert.service })
      })
      if (res.ok) {
        setFixStatus(prev => ({ ...prev, [alert.id]: '✅ Fixed successfully!' }))
      } else {
        setFixStatus(prev => ({ ...prev, [alert.id]: '❌ Failed' }))
      }
    } catch (e) {
      setFixStatus(prev => ({ ...prev, [alert.id]: '❌ Backend not running' }))
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Alert Management</h2>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 text-white border border-slate-700 rounded-lg pl-10 pr-8 py-2 outline-none appearance-none cursor-pointer"
              >
                <option value="ALL">All Alerts</option>
                <option value="CRITICAL">Critical</option>
                <option value="WARNING">Warning</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`bg-slate-800 border rounded-lg p-4 flex justify-between items-center ${
                alert.type === 'critical' ? 'border-red-500/50' : 
                alert.type === 'warning' ? 'border-yellow-500/50' : 
                'border-green-500/50'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`mt-1 ${
                    alert.type === 'critical' ? 'text-red-400' : 
                    alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {alert.type === 'critical' ? <AlertCircle className="w-6 h-6" /> : 
                     alert.type === 'warning' ? <Info className="w-6 h-6" /> : 
                     <CheckCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className={`font-bold ${
                      alert.type === 'critical' ? 'text-red-400' : 
                      alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'
                    }`}>{alert.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{alert.desc}</p>
                    <div className="flex space-x-4 mt-2 text-xs text-slate-500">
                      <span>Service: {alert.service}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {alert.type !== 'resolved' && (
                    <button 
                      onClick={() => handleAutoFix(alert)}
                      className="flex items-center text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded transition-colors"
                    >
                      <Wrench className="w-3 h-3 mr-1" />
                      Auto-Fix
                    </button>
                  )}
                  {fixStatus[alert.id] && (
                    <span className={`text-xs font-bold ${fixStatus[alert.id].includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                      {fixStatus[alert.id]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Alerts
