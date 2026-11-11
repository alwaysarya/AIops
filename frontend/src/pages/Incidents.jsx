import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { ShieldAlert, CheckCircle } from 'lucide-react'

const Incidents = () => {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/v1/incidents/ws')
    ws.onmessage = (event) => {
      const newIncident = JSON.parse(event.data)
      setIncidents(prev => [newIncident, ...prev].slice(0, 20))
    }
    return () => ws.close()
  }, [])

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">Real-Time Incidents</h1>
              <p className="text-zinc-400 text-sm mt-1">Live WebSocket stream of active incidents.</p>
            </div>

            <div className="space-y-4">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 bg-[#0A0A0A] rounded-2xl border border-white/10">Waiting for real-time incidents...</div>
              ) : (
                incidents.map((inc, i) => (
                  <div key={i} className={`bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex justify-between items-center ${
                    inc.status === 'open' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${inc.status === 'open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {inc.status === 'open' ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            inc.severity === 'P0' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                            inc.severity === 'P1' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          }`}>{inc.severity}</span>
                          <h3 className="text-white font-bold">{inc.title}</h3>
                        </div>
                        <div className="flex space-x-4 mt-2 text-xs text-zinc-500">
                          <span>Assignee: {inc.assignee}</span>
                          <span>{new Date(inc.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      inc.status === 'open' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                    }`}>{inc.status.toUpperCase()}</span>
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

export default Incidents
