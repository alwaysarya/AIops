import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Shield, User, Clock } from 'lucide-react'
import axios from 'axios'

const AuditLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/audit/')
      setLogs(res.data.logs)
      setLoading(false)
    } catch (e) { 
      console.error(e)
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchLogs() 
    const interval = setInterval(fetchLogs, 5000)
    return () => clearInterval(interval)
  }, [])

  const getBadge = (action) => {
    if (action.toLowerCase().includes('delete')) return 'bg-red-500/10 text-red-400 border-red-500/20'
    if (action.toLowerCase().includes('create')) return 'bg-green-500/10 text-green-400 border-green-500/20'
    if (action.toLowerCase().includes('login')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center">
                <Shield className="w-8 h-8 mr-3 text-blue-400" /> Audit Logs
              </h1>
              <p className="text-zinc-400 text-sm mt-1">Immutable trail of all system actions and events.</p>
            </div>

            <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Action</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Resource</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-8 text-zinc-500">Loading audit trail...</td></tr>
                  ) : logs.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-zinc-500">No audit logs found.</td></tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center">
                          <User className="w-4 h-4 mr-2 text-zinc-500" /> {log.user_id || 'System'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getBadge(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 font-mono text-sm">{log.resource}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1.5" /> {new Date(log.timestamp).toLocaleString()}
                        </td>
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

export default AuditLogs
