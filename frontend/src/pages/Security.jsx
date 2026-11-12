import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Security() {
  const [threats, setThreats] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8005/api/v1/security/threats')
      .then(res => setThreats(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <PageLayout title="Security Center">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-6 flex items-center"><ShieldAlert className="w-5 h-5 mr-2 text-red-400"/> Active Threats & Vulnerabilities</h3>
        <div className="space-y-4">
          {threats.map(t => (
            <div key={t.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  t.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                  t.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.type}</h4>
                  <p className="text-xs text-zinc-400 mt-1">Resource: {t.resource}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                  t.status === 'Open' ? 'text-red-400 border-red-500/20 bg-red-500/10' : 
                  t.status === 'In Progress' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 
                  'text-green-400 border-green-500/20 bg-green-500/10'
                }`}>{t.status}</span>
                <button className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-white/20">Fix Issue</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
