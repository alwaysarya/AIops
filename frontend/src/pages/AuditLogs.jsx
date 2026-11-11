import React, { useState } from 'react'

import TopNavbar from '../components/Common/TopNavbar'
import { Shield, User, Clock } from 'lucide-react'

const AuditLogs = () => {
  const [logs] = useState([
    { id: 1, user: 'Aryan', action: 'Restarted Pod (payment-service)', time: '10:45 AM', type: 'remediation' },
    { id: 2, user: 'Rahul', action: 'Changed API Gateway URL in Settings', time: '10:30 AM', type: 'config' },
    { id: 3, user: 'Aryan', action: 'Added new user (Viewer role)', time: '09:15 AM', type: 'rbac' },
    { id: 4, user: 'System', action: 'Auto-Fix triggered for High CPU', time: '08:00 AM', type: 'auto' },
    { id: 5, user: 'Aryan', action: 'Exported Logs to CSV', time: 'Yesterday', type: 'export' },
  ])

  const getBadge = (type) => {
    switch(type) {
      case 'remediation': return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold">REMEDIATION</span>
      case 'config': return <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">CONFIG</span>
      case 'rbac': return <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-bold">SECURITY</span>
      case 'auto': return <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">AUTO-FIX</span>
      default: return <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs font-bold">SYSTEM</span>
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-400" /> Security Audit Logs
            </h2>
            <span className="text-sm text-slate-400">Last updated: Just now</span>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full text-left text-slate-300">
              <thead className="text-xs uppercase bg-slate-700 text-slate-400">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action Performed</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-white flex items-center">
                      <User className="w-4 h-4 mr-2 text-slate-500" /> {log.user}
                    </td>
                    <td className="px-6 py-4">{log.action}</td>
                    <td className="px-6 py-4">{getBadge(log.type)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {log.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuditLogs
