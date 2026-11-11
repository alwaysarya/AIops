import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { AlertCircle, Info } from 'lucide-react'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/v1/alerts/ws')
    ws.onmessage = (event) => {
      const newAlert = JSON.parse(event.data)
      setAlerts(prev => [newAlert, ...prev].slice(0, 20))
    }
    return () => ws.close()
  }, [])

  const filteredAlerts = filter === 'ALL' ? alerts : alerts.filter(a => a.severity === filter.toLowerCase())

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Real-Time Alerts</h1>
                <p className="text-zinc-400 text-sm mt-1">Live WebSocket stream of critical alerts.</p>
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-[#0A0A0A] text-white border border-white/10 rounded-xl px-4 py-2 outline-none">
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="WARNING">Warning</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 bg-[#0A0A0A] rounded-2xl border border-white/10">Waiting for real-time alerts...</div>
              ) : (
                filteredAlerts.map((alert, i) => (
                  <div key={i} className={`bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex justify-between items-center border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`mt-1 ${alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {alert.severity === 'critical' ? <AlertCircle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg">{alert.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{alert.message}</p>
                        <div className="flex space-x-4 mt-2 text-xs text-zinc-500">
                          <span>Service: {alert.service}</span>
                          <span>ID: #{alert.id}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      alert.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
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
    </div>
  )
}

export default Alerts
