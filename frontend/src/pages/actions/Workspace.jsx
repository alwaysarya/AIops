import React, { useState, useEffect } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import axios from 'axios'

export default function Workspace() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8005/api/v1/agents')
      .then(res => setAgents(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <PageLayout title="Your Workspace">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-medium mb-4">Saved Agents ({agents.length})</h3>
        {agents.length === 0 ? (
          <p className="text-zinc-400">No agents found. Create one first!</p>
        ) : (
          <div className="space-y-3">
            {agents.map(a => (
              <div key={a.id} className="bg-[#111113] border border-white/5 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h4 className="text-white font-medium">{a.name}</h4>
                  <p className="text-xs text-zinc-500 mt-1">Type: {a.type} | Status: {a.status}</p>
                </div>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded text-xs font-bold border border-green-500/20">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
