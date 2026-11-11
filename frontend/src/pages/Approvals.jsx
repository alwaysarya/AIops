import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { CheckCircle, Clock } from 'lucide-react'
import axios from 'axios'

const Approvals = () => {
  const [runbooks, setRunbooks] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/runbooks/pending')
      setRunbooks(res.data.runbooks)
      setLoading(false)
    } catch (e) { console.error(e); setLoading(false) }
  }

  useEffect(() => { 
    fetchPending()
    const interval = setInterval(fetchPending, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleApprove = async (run_id) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/runbooks/approve/${run_id}`)
      setMessage(res.data.message)
      fetchPending()
      setTimeout(() => setMessage(''), 5000)
    } catch (e) { setMessage('❌ Failed to approve runbook') }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">Approvals & Runbooks</h1>
              <p className="text-zinc-400 text-sm mt-1">Human-in-the-loop approval for autonomous actions.</p>
            </div>

            {message && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-medium">{message}</div>}

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-zinc-500">Loading pending approvals...</div>
              ) : runbooks.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 glass-card rounded-2xl">No pending approvals. All systems autonomous.</div>
              ) : (
                runbooks.map((rb) => (
                  <div key={rb.id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-500/10 rounded-xl"><Clock className="w-6 h-6 text-yellow-400" /></div>
                      <div>
                        <h3 className="text-white font-semibold">Action: {rb.action}</h3>
                        <p className="text-zinc-400 text-sm">Incident ID: #{rb.incident_id} | Requested by: {rb.requested_by}</p>
                        <p className="text-zinc-500 text-xs mt-1">Run ID: {rb.run_id} | {new Date(rb.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <button onClick={() => handleApprove(rb.run_id)} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                    </button>
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

export default Approvals
