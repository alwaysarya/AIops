import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AlertCircle, Plus, Download } from 'lucide-react'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [formData, setFormData] = useState({ title: '', severity: 'P2', description: '' })
  const [loading, setLoading] = useState(false)

  const fetchIncidents = () => {
    axios.get('http://localhost:8005/api/v1/incidents')
      .then(res => setIncidents(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchIncidents()
    const int = setInterval(fetchIncidents, 5000)
    return () => clearInterval(int)
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8005/api/v1/incidents', formData)
      setFormData({ title: '', severity: 'P2', description: '' })
      fetchIncidents()
      toast.success('Incident created successfully!')
    } catch (err) {
      toast.error('Error creating incident')
    }
    setLoading(false)
  }

  const exportToCSV = () => {
    if (incidents.length === 0) return toast.error('No incidents to export')
    const headers = ['ID,Title,Severity,Description,Status,Created At\n']
    const csvData = incidents.map(i => `${i.id},"${i.title}","${i.severity}","${i.description}","${i.status}","${i.created_at}"`).join('\n')
    const blob = new Blob([headers + csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'incidents_report.csv'
    a.click()
    toast.success('Report Downloaded!')
  }

  const getSeverityColor = (sev) => {
    if (sev === 'P0') return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (sev === 'P1') return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    if (sev === 'P2') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }

  return (
    <PageLayout title="Incidents & Alerts">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 h-fit">
          <h3 className="text-white font-medium mb-4 flex items-center"><Plus className="w-4 h-4 mr-2"/> Report Incident</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" placeholder="e.g. API Gateway Down" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Severity</label>
              <select value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400">
                <option value="P0">P0 - Critical</option>
                <option value="P1">P1 - High</option>
                <option value="P2">P2 - Medium</option>
                <option value="P3">P3 - Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 h-24 resize-none" placeholder="Details..."></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg text-sm hover:bg-yellow-500">
              {loading ? 'Reporting...' : 'Report Incident'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium flex items-center"><AlertCircle className="w-4 h-4 mr-2"/> Active Incidents ({incidents.length})</h3>
            <button onClick={exportToCSV} className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 flex items-center transition-colors">
              <Download className="w-3 h-3 mr-2"/> Export CSV
            </button>
          </div>
          <div className="space-y-3">
            {incidents.length === 0 ? <p className="text-zinc-500 text-sm">No incidents reported yet.</p> : incidents.map(inc => (
              <div key={inc.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start"><h4 className="text-white font-medium">{inc.title}</h4><span className={`text-[10px] font-bold px-2 py-1 rounded border ${getSeverityColor(inc.severity)}`}>{inc.severity}</span></div>
                <p className="text-xs text-zinc-400">{inc.description}</p>
                <div className="flex justify-between items-center mt-2"><span className="text-[10px] text-zinc-500">{new Date(inc.created_at).toLocaleString()}</span><span className="text-[10px] text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded">{inc.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
