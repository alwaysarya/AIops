import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { AlertCircle, CheckCircle, Info, Filter, Wrench, Plus, X } from 'lucide-react'

const Alerts = () => {
  const [filter, setFilter] = useState('ALL')
  const [fixStatus, setFixStatus] = useState({})
  const [showCreateRule, setShowCreateRule] = useState(false)
  const [newRule, setNewRule] = useState({ service: 'payment-service', level: 'ERROR', action: 'Slack' })
  
  const [allAlerts, setAllAlerts] = useState([
    { id: 1, type: 'critical', title: 'High CPU Usage', desc: 'Node-01 is at 95% CPU utilization.', time: '2 mins ago', service: 'infra' },
    { id: 2, type: 'warning', title: 'High Latency', desc: 'Payment service response time is above 2s.', time: '15 mins ago', service: 'payment-service' },
    { id: 3, type: 'resolved', title: 'Pod Restarted', desc: 'Auto-remediation restarted auth-service pod.', time: '1 hour ago', service: 'auth-service' },
    { id: 4, type: 'critical', title: 'Database Connection Failed', desc: 'Could not connect to PostgreSQL instance.', time: '5 mins ago', service: 'db' },
    { id: 5, type: 'warning', title: 'Memory Leak Detected', desc: 'User service memory growing steadily.', time: '30 mins ago', service: 'user-service' }
  ])

  const filteredAlerts = filter === 'ALL' ? allAlerts : allAlerts.filter(a => a.type === filter.toLowerCase())

  const handleAutoFix = async (alert) => {
    setFixStatus(prev => ({ ...prev, [alert.id]: 'Fixing...' }))
    setTimeout(() => {
      setFixStatus(prev => ({ ...prev, [alert.id]: '✅ Fixed successfully!' }))
      setAllAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, type: 'resolved', title: a.title + ' (Resolved)' } : a))
    }, 1500)
  }

  const handleCreateRule = () => {
    setAllAlerts([{ id: Date.now(), type: 'warning', title: `Custom Rule: ${newRule.service} ${newRule.level}`, desc: `Action: Send to ${newRule.action}`, time: 'Just now', service: newRule.service }, ...allAlerts])
    setShowCreateRule(false)
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Alert Management</h2>
            <div className="flex space-x-4">
              <button onClick={() => setShowCreateRule(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors">
                <Plus className="w-4 h-4 mr-2" /> Create Alert Rule
              </button>
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-slate-800 text-white border border-slate-700 rounded-lg pl-10 pr-8 py-2 outline-none appearance-none cursor-pointer">
                  <option value="ALL">All Alerts</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="WARNING">Warning</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Create Alert Rule Modal */}
          {showCreateRule && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-96 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Create Custom Alert Rule</h3>
                  <button onClick={() => setShowCreateRule(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Target Service</label>
                    <input type="text" value={newRule.service} onChange={(e) => setNewRule({...newRule, service: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Condition (Log Level)</label>
                    <select value={newRule.level} onChange={(e) => setNewRule({...newRule, level: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none">
                      <option value="ERROR">ERROR</option>
                      <option value="WARNING">WARNING</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Action</label>
                    <select value={newRule.action} onChange={(e) => setNewRule({...newRule, action: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none">
                      <option value="Slack">Send Slack Message</option>
                      <option value="Email">Send Email</option>
                      <option value="Auto-Fix">Trigger Auto-Fix</option>
                    </select>
                  </div>
                  <button onClick={handleCreateRule} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2">Create Rule</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`bg-slate-800 border rounded-lg p-4 flex justify-between items-center ${alert.type === 'critical' ? 'border-red-500/50' : alert.type === 'warning' ? 'border-yellow-500/50' : 'border-green-500/50'}`}>
                <div className="flex items-start space-x-4">
                  <div className={`mt-1 ${alert.type === 'critical' ? 'text-red-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {alert.type === 'critical' ? <AlertCircle className="w-6 h-6" /> : alert.type === 'warning' ? <Info className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className={`font-bold ${alert.type === 'critical' ? 'text-red-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>{alert.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{alert.desc}</p>
                    <div className="flex space-x-4 mt-2 text-xs text-slate-500">
                      <span>Service: {alert.service}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {alert.type !== 'resolved' && (
                    <button onClick={() => handleAutoFix(alert)} className="flex items-center text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded transition-colors">
                      <Wrench className="w-3 h-3 mr-1" /> Auto-Fix
                    </button>
                  )}
                  {fixStatus[alert.id] && (
                    <span className={`text-xs font-bold ${fixStatus[alert.id].includes('✅') ? 'text-green-400' : 'text-red-400'}`}>{fixStatus[alert.id]}</span>
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
