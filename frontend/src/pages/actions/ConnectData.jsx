import React, { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CheckCircle } from 'lucide-react'

export default function ConnectData() {
  const [formData, setFormData] = useState({ provider: 'AWS', access_key: '', secret_key: '', region: 'us-east-1' })
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnect = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (formData.provider === 'AWS') {
        const res = await axios.post('http://localhost:8005/api/v1/aws/connect', {
          access_key: formData.access_key,
          secret_key: formData.secret_key,
          region: formData.region
        })
        toast.success(`Connected to AWS Account: ${res.data.account_id}`)
        setConnected(true)
      } else {
        toast.success(`${formData.provider} Connected Successfully! (Simulation)`)
        setConnected(true)
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Connection failed. Check your keys.')
    }
    setLoading(false)
  }

  const providers = [
    { 
      id: 'AWS', 
      name: 'Amazon Web Services', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      color: 'bg-[#FF9900]/5 border-[#FF9900]/30 hover:border-[#FF9900]/80',
      activeColor: 'ring-2 ring-[#FF9900] bg-[#FF9900]/15 shadow-[0_0_20px_rgba(255,153,0,0.3)]'
    },
    { 
      id: 'GCP', 
      name: 'Google Cloud', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
      color: 'bg-[#4285F4]/5 border-[#4285F4]/30 hover:border-[#4285F4]/80',
      activeColor: 'ring-2 ring-[#4285F4] bg-[#4285F4]/15 shadow-[0_0_20px_rgba(66,133,244,0.3)]'
    },
    { 
      id: 'Azure', 
      name: 'Microsoft Azure', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
      color: 'bg-[#0078D4]/5 border-[#0078D4]/30 hover:border-[#0078D4]/80',
      activeColor: 'ring-2 ring-[#0078D4] bg-[#0078D4]/15 shadow-[0_0_20px_rgba(0,120,212,0.3)]'
    }
  ]

  return (
    <PageLayout title="Cloud Connectors">
      <div className="max-w-3xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-6 flex items-center">Connect Cloud Account</h3>
        
        {!connected ? (
          <form onSubmit={handleConnect} className="space-y-6">
            
            <div>
              <label className="block text-xs text-zinc-400 mb-3">Select Cloud Provider</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {providers.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => setFormData({...formData, provider: p.id})}
                    className={`cursor-pointer group rounded-xl border p-6 flex flex-col items-center justify-center transition-all duration-300 ${p.color} ${formData.provider === p.id ? p.activeColor : ''}`}
                  >
                    {/* No white box, just the logo */}
                    <div className="h-12 w-full flex items-center justify-center mb-2">
                      <img src={p.logo} alt={p.id} className="max-h-10 max-w-full object-contain transition-transform group-hover:scale-110 drop-shadow-lg" />
                    </div>
                    
                    <span className={`text-sm font-bold ${formData.provider === p.id ? 'text-white' : 'text-zinc-200'}`}>{p.id}</span>
                    <span className={`text-[10px] mt-1 text-center ${formData.provider === p.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Access Key ID</label>
              <input type="text" value={formData.access_key} onChange={e => setFormData({...formData, access_key: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" placeholder="AKIA..." />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Secret Access Key</label>
              <input type="password" value={formData.secret_key} onChange={e => setFormData({...formData, secret_key: e.target.value})} required className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" placeholder="******************" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Region</label>
              <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400">
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                <option value="eu-west-1">Europe (Ireland)</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-lg text-sm hover:bg-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all">
              {loading ? 'Verifying...' : 'Connect Account'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-400" /></div>
            <h3 className="text-white font-bold text-lg">Successfully Connected!</h3>
            <p className="text-zinc-400 text-sm mt-2">Your {formData.provider} resources are now syncing.</p>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
