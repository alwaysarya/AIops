import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { AlertCircle, CheckCircle, Info, Filter, Plus, X } from 'lucide-react'
import axios from 'axios'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [showModal, setShowModal] = useState(false)
  const [newAlert, setNewAlert] = useState({ title: '', description: '', severity: 'warning', service: '' })

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/alerts/')
      setAlerts(res.data.alerts)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { 
    fetchAlerts() 
    const interval = setInterval(fetchAlerts, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleCreateAlert = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/v1/alerts/create', newAlert)
      setShowModal(false)
      setNewAlert({ title: '', description: '', severity: 'warning', service: '' })
      fetchAlerts()
    } catch (e) { console.error(e) }
  }

  const filteredAlerts = filter === 'ALL' ? alerts : alerts.filter(a => a.severity === filter.toLowerCase())

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Alert Management</h1>
                <p className="text-zinc-400 text-sm mt-1">Monitor and respond to system incidents.</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => setShowModal(true)} className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" /> Create Alert
                </button>
                <div className="relative">
                  <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-[#0A0A0A] text-white border border-white/10 rounded-xl pl-9 pr-8 py-2.5 outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors">
                    <option value="ALL">All Severities</option>
                    <option value="CRITICAL">Critical</option>
                    <option value="WARNING">Warning</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 glass-card rounded-2xl">No alerts found.</div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div key={alert.id} className={`glass-card rounded-2xl p-5 flex justify-between items-center border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' : 
                    alert.severity === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-500'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`mt-1 ${alert.severity === 'critical' ? 'text-red-400' : alert.severity === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {alert.severity === 'critical' ? <AlertCircle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">{alert.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{alert.description}</p>
                        <div className="flex space-x-4 mt-2 text-xs text-zinc-500">
                          <span>Service: {alert.service}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      alert.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      alert.severity === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Create Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/10 w-[500px] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Alert</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <input type="text" placeholder="Alert Title" required value={newAlert.title} onChange={(e) => setNewAlert({...newAlert, title: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <input type="text" placeholder="Description" required value={newAlert.description} onChange={(e) => setNewAlert({...newAlert, description: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <input type="text" placeholder="Service Name" required value={newAlert.service} onChange={(e) => setNewAlert({...newAlert, service: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <select value={newAlert.severity} onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
              </select>
              <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">Create Alert</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alerts
