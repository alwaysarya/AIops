import React, { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CheckCircle, Cloud } from 'lucide-react'

export default function ConnectData() {
  const [formData, setFormData] = useState({ provider: 'AWS', access_key: '', secret_key: '', region: 'us-east-1' })
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [resources, setResources] = useState(null)

  const handleConnect = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Validate credentials first
      const res = await axios.post('http://localhost:8005/api/v1/aws/connect', {
        access_key: formData.access_key,
        secret_key: formData.secret_key,
        region: formData.region
      })
      
      // If valid, fetch resources
      const resourceRes = await axios.post('http://localhost:8005/api/v1/aws/resources', {
        access_key: formData.access_key,
        secret_key: formData.secret_key,
        region: formData.region
      })
      
      setResources(resourceRes.data)
      toast.success(`Connected to AWS: ${res.data.account_id}`)
      setConnected(true)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Connection failed. Check your keys.')
    }
    setLoading(false)
  }

  return (
    <PageLayout title="Cloud Connectors">
      <div className="max-w-3xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-6 flex items-center"><Cloud className="w-4 h-4 mr-2"/> Connect Cloud Account</h3>
        
        {!connected ? (
          <form onSubmit={handleConnect} className="space-y-6">
            <div>
              <label className="block text-xs text-zinc-400 mb-3">Select Cloud Provider</label>
              <select value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400">
                <option value="AWS">Amazon Web Services (AWS)</option>
                <option value="GCP">Google Cloud (Coming Soon)</option>
                <option value="Azure">Microsoft Azure (Coming Soon)</option>
              </select>
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
              {loading ? 'Connecting...' : 'Connect Account'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-400" /></div>
            <h3 className="text-white font-bold text-lg">Successfully Connected!</h3>
            <p className="text-zinc-400 text-sm mt-2 mb-6">Your AWS resources are now syncing.</p>
            
            {resources && (
              <div className="bg-[#111113] border border-white/10 rounded-xl p-6 text-left max-w-md mx-auto">
                <h4 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Fetched Resources</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">EC2 Instances:</span>
                    <span className="text-white font-bold bg-white/10 px-2 py-1 rounded">{resources.ec2_instances_count}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-sm block mb-2">S3 Buckets:</span>
                    <div className="flex flex-wrap gap-2">
                      {resources.s3_buckets.length > 0 ? resources.s3_buckets.map(b => (
                        <span key={b} className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs">{b}</span>
                      )) : <span className="text-xs text-zinc-500">No buckets found</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
