import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { FileText } from 'lucide-react'

export default function AuditLogs() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('http://localhost:8005/api/v1/audit-logs')
        .then(res => setLogs(res.data))
        .catch(err => console.error(err))
    }
    fetchLogs()
    const int = setInterval(fetchLogs, 5000)
    return () => clearInterval(int)
  }, [])

  return (
    <PageLayout title="Audit Logs">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-4 flex items-center"><FileText className="w-4 h-4 mr-2"/> System Audit Trail ({logs.length})</h3>
        <div className="space-y-3">
          {logs.length === 0 ? <p className="text-zinc-500 text-sm">No audit logs found.</p> : logs.map(log => (
            <div key={log.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold text-xs">{log.action}</span>
                <span className="text-[10px] text-zinc-500">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-sm text-zinc-300">{log.details}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
