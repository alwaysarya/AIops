import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { Shield, ShieldAlert, ShieldCheck, Power } from 'lucide-react'

export default function Policies() {
  const [policies, setPolicies] = useState([])

  const fetchPolicies = () => {
    axios.get('http://localhost:8005/api/v1/policies')
      .then(res => setPolicies(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => { fetchPolicies() }, [])

  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:8005/api/v1/policies/${id}`)
      fetchPolicies()
    } catch (err) { alert('Error updating policy') }
  }

  return (
    <PageLayout title="Compliance Policies">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-6 flex items-center"><Shield className="w-5 h-5 mr-2 text-yellow-400"/> Policy Engine</h3>
        <div className="space-y-4">
          {policies.map(p => (
            <div key={p.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg mt-1 ${p.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {p.status === 'Active' ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-white font-bold">{p.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{p.desc}</p>
                </div>
              </div>
              <button onClick={() => toggleStatus(p.id)} className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors ${p.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                <Power className="w-4 h-4 mr-2" /> {p.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
