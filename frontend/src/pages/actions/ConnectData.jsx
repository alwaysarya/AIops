import React, { useState, useEffect } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import axios from 'axios'
import { Cloud, Plus, CheckCircle } from 'lucide-react'

export default function ConnectData() {
  const [connectors, setConnectors] = useState([])
  const [formData, setFormData] = useState({ provider: 'AWS', access_key: '', region: 'us-east-1' })
  const [loading, setLoading] = useState(false)

  const fetchConnectors = () => {
    axios.get('http://localhost:8005/api/v1/connectors')
      .then(res => setConnectors(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchConnectors()
  }, [])

  const handleConnect = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8005/api/v1/connectors', formData)
      setFormData({ provider: 'AWS', access_key: '', region: 'us-east-1' })
      fetchConnectors()
      alert('Cloud Connected!')
    } catch (err) {
      alert('Error connecting cloud')
    }
    setLoading(false)
  }

  return (
    <PageLayout title="Cloud Connectors">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><Cloud className="w-4 h-4 mr-2"/> Connect New Cloud</h3>
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Cloud Provider</label>
              <select value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400">
                <option value="AWS">Amazon Web Services (AWS)</option>
                <option value="GCP">Google Cloud Platform (GCP)</option>
                <option value="Azure">Microsoft Azure</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Access Key ID</label>
              <input type="text" value={formData.access_key} onChange={e => setFormData({...formData, access_key: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" placeholder="AKIAXXXXXXXXXXXXXXXX" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Region</label>
              <input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" placeholder="us-east-1" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg text-sm hover:bg-yellow-500">
              {loading ? 'Connecting...' : 'Connect Cloud'}
            </button>
          </form>
        </div>

        {/* Connected List */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><CheckCircle className="w-4 h-4 mr-2"/> Connected Clouds ({connectors.length})</h3>
          <div className="space-y-3">
            {connectors.length === 0 ? <p className="text-zinc-500 text-sm">No clouds connected yet.</p> : connectors.map(c => (
              <div key={c.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h4 className="text-white font-medium">{c.provider}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Region: {c.region} | Key: {c.access_key}</p>
                </div>
                <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold border border-green-500/20">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
