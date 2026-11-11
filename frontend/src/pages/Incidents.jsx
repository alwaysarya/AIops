import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { ShieldAlert, CheckCircle, Plus, X } from 'lucide-react'
import axios from 'axios'

const Incidents = () => {
  const [incidents, setIncidents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newIncident, setNewIncident] = useState({ title: '', description: '', severity: 'P1', assignee: '' })

  const fetchIncidents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/incidents/')
      setIncidents(res.data.incidents)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { 
    fetchIncidents() 
    const interval = setInterval(fetchIncidents, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/v1/incidents/create', newIncident)
      setShowModal(false)
      setNewIncident({ title: '', description: '', severity: 'P1', assignee: '' })
      fetchIncidents()
    } catch (e) { console.error(e) }
  }

  const handleResolve = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/incidents/resolve/${id}`)
      fetchIncidents()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Incident Command Center</h1>
                <p className="text-zinc-400 text-sm mt-1">Manage and resolve production incidents.</p>
              </div>
              <button onClick={() => setShowModal(true)} className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Create Incident
              </button>
            </div>

            <div className="space-y-4">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 glass-card rounded-2xl">No active incidents. System is healthy.</div>
              ) : (
                incidents.map((inc) => (
                  <div key={inc.id} className="glass-card rounded-2xl p-5 flex justify-between items-center">
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
                        <p className="text-zinc-400 text-sm mt-1">{inc.description}</p>
                        <div className="flex space-x-4 mt-2 text-xs text-zinc-500">
                          <span>Assignee: {inc.assignee}</span>
                          <span>{new Date(inc.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        inc.status === 'open' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>{inc.status.toUpperCase()}</span>
                      {inc.status === 'open' && (
                        <button onClick={() => handleResolve(inc.id)} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Create Incident Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/10 w-[500px] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Create Incident</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input type="text" placeholder="Incident Title" required value={newIncident.title} onChange={(e) => setNewIncident({...newIncident, title: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <input type="text" placeholder="Description" required value={newIncident.description} onChange={(e) => setNewIncident({...newIncident, description: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <input type="text" placeholder="Assignee" required value={newIncident.assignee} onChange={(e) => setNewIncident({...newIncident, assignee: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
              <select value={newIncident.severity} onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                <option value="P0">P0 - Critical</option>
                <option value="P1">P1 - High</option>
                <option value="P2">P2 - Medium</option>
                <option value="P3">P3 - Low</option>
                <option value="P4">P4 - Info</option>
              </select>
              <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">Create Incident</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Incidents
