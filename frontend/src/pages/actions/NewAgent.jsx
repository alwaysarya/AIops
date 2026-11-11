import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import axios from 'axios'

export default function NewAgent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', type: 'Monitoring' })
  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.name) return alert('Please enter agent name')
    setLoading(true)
    try {
      await axios.post('http://localhost:8005/api/v1/agents', formData)
      alert('Agent Saved Successfully!')
      navigate('/')
    } catch (err) {
      alert('Error saving agent')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <PageLayout title="Create New Agent">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Agent Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400" 
              placeholder="e.g. Security Bot"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Agent Type</label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400"
            >
              <option>Monitoring</option>
              <option>Security</option>
              <option>Cost Optimization</option>
              <option>Incident Response</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors w-full">
            {loading ? 'Saving...' : 'Save Agent'}
          </button>
        </form>
      </div>
    </PageLayout>
  )
}
