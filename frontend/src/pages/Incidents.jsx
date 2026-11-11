import React, { useState } from 'react'

import TopNavbar from '../components/Common/TopNavbar'
import { ShieldAlert, CheckCircle, Search, ExternalLink } from 'lucide-react'

const Incidents = () => {
  const [incidents] = useState([
    { id: 'INC-1024', title: 'Payment Service Timeout', severity: 'Critical', status: 'Investigating', time: '10 mins ago', assignee: 'Aryan' },
    { id: 'INC-1023', title: 'Database Connection Pool Full', severity: 'High', status: 'Resolved', time: '1 hour ago', assignee: 'Rahul' },
    { id: 'INC-1022', title: 'Auth Service High CPU', severity: 'Medium', status: 'Resolved', time: '3 hours ago', assignee: 'Aryan' },
  ])

  return (
    <div className="flex h-screen bg-slate-900">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Incident Command Center</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search incidents..." className="bg-slate-800 text-white border border-slate-700 rounded-lg pl-10 pr-4 py-2 outline-none w-64" />
            </div>
          </div>

          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex justify-between items-center hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${incident.status === 'Investigating' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {incident.status === 'Investigating' ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-slate-400">{incident.id}</span>
                      <h3 className="text-white font-bold">{incident.title}</h3>
                    </div>
                    <div className="flex space-x-4 mt-1 text-xs text-slate-400">
                      <span>Severity: <strong className={incident.severity === 'Critical' ? 'text-red-400' : 'text-yellow-400'}>{incident.severity}</strong></span>
                      <span>Assignee: {incident.assignee}</span>
                      <span>{incident.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${incident.status === 'Investigating' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                    {incident.status}
                  </span>
                  <ExternalLink className="w-5 h-5 text-slate-500 hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Incidents
