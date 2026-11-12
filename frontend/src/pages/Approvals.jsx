import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { CheckCircle, XCircle, Clock, Plus } from 'lucide-react'

export default function Approvals() {
  const [approvals, setApprovals] = useState([])

  const fetchApprovals = () => {
    axios.get('http://localhost:8005/api/v1/approvals')
      .then(res => setApprovals(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => { fetchApprovals() }, [])

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:8005/api/v1/approvals/${id}?status=${status}`)
      fetchApprovals()
    } catch (err) { alert('Error updating approval') }
  }

  const createDummyRequest = async () => {
    try {
      await axios.post('http://localhost:8005/api/v1/approvals', { title: "Restart API Gateway", requested_by: "AI Copilot" })
      fetchApprovals()
    } catch (err) { alert('Error creating request') }
  }

  return (
    <PageLayout title="Approvals Workflow">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-medium flex items-center"><Clock className="w-5 h-5 mr-2 text-yellow-400"/> Pending Approvals</h3>
          <button onClick={createDummyRequest} className="bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded flex items-center hover:bg-yellow-500">
            <Plus className="w-3 h-3 mr-1"/> Simulate AI Request
          </button>
        </div>
        
        <div className="space-y-4">
          {approvals.length === 0 ? <p className="text-zinc-500 text-sm">No pending approvals.</p> : approvals.map(a => (
            <div key={a.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h4 className="text-white font-bold">{a.title}</h4>
                <p className="text-[10px] text-zinc-500 mt-1">Requested by: {a.requested_by}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                  a.status === 'Pending' ? 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10' : 
                  a.status === 'Approved' ? 'text-green-400 border-green-500/20 bg-green-500/10' : 
                  'text-red-400 border-red-500/20 bg-red-500/10'
                }`}>{a.status}</span>
                
                {a.status === 'Pending' && (
                  <div className="flex space-x-2">
                    <button onClick={() => handleAction(a.id, 'Approved')} className="bg-green-500/10 text-green-400 p-1.5 rounded hover:bg-green-500/20 border border-green-500/20" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                    <button onClick={() => handleAction(a.id, 'Rejected')} className="bg-red-500/10 text-red-400 p-1.5 rounded hover:bg-red-500/20 border border-red-500/20" title="Reject"><XCircle className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
