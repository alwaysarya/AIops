import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Building2, Plus } from 'lucide-react'
import axios from 'axios'

const Organizations = () => {
  const [orgs, setOrgs] = useState([])
  const [newOrgName, setNewOrgName] = useState('')
  const [message, setMessage] = useState('')

  const fetchOrgs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/orgs/list')
      setOrgs(res.data.organizations)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { fetchOrgs() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newOrgName) return
    try {
      await axios.post('http://localhost:8000/api/v1/orgs/create', { name: newOrgName })
      setMessage(`✅ Organization '${newOrgName}' created!`)
      setNewOrgName('')
      fetchOrgs()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('❌ Failed to create organization')
    }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Organizations (Tenants)</h1>
            <p className="text-zinc-400 text-sm mb-8">Manage enterprise customers and their isolated environments.</p>

            {message && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm font-medium">{message}</div>}

            {/* Create Form */}
            <div className="glass-card rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Create New Organization</h2>
              <form onSubmit={handleCreate} className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder="Company Name (e.g., Acme Corp)" 
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="flex-1 bg-[#0A0A0A] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                  <Plus className="w-5 h-5 mr-2" /> Create
                </button>
              </form>
            </div>

            {/* List */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-zinc-400">Organization Name</th>
                    <th className="px-6 py-4 text-sm font-medium text-zinc-400">Plan</th>
                    <th className="px-6 py-4 text-sm font-medium text-zinc-400">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.length === 0 ? (
                    <tr><td colSpan="3" className="text-center py-8 text-zinc-500">No organizations found.</td></tr>
                  ) : (
                    orgs.map((org) => (
                      <tr key={org.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center">
                          <Building2 className="w-5 h-5 mr-3 text-blue-400" /> {org.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-md border border-purple-500/20 uppercase">{org.plan}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{new Date(org.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Organizations
