import React, { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import { Play, Terminal, CheckCircle, Loader } from 'lucide-react'

export default function Runbooks() {
  const [logs, setLogs] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const runbookList = [
    { id: 1, name: 'Restart API Gateway', desc: 'Fixes 504 Timeout errors on the gateway.', command: 'kubectl rollout restart deployment/api-gateway' },
    { id: 2, name: 'Clear Redis Cache', desc: 'Fixes stale data and memory leaks.', command: 'redis-cli FLUSHALL' },
    { id: 3, name: 'Scale Node Cluster', desc: 'Adds 2 more nodes if CPU > 80%.', command: 'aws autoscaling set-desired-capacity --desired-capacity +2' }
  ]

  const handleExecute = (rb) => {
    setIsRunning(true)
    setLogs([`[INFO] Initializing runbook: ${rb.name}...`])
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[EXEC] Running command: ${rb.command}`])
    }, 800)

    setTimeout(() => {
      setLogs(prev => [...prev, `[SUCCESS] ${rb.name} completed successfully! System stabilized.`])
      setIsRunning(false)
    }, 2000)
  }

  return (
    <PageLayout title="Automation & Runbooks">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Runbooks List */}
        <div className="space-y-4">
          <h3 className="text-white font-medium mb-4">Available Runbooks</h3>
          {runbookList.map(rb => (
            <div key={rb.id} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold">{rb.name}</h4>
                <p className="text-xs text-zinc-400 mt-1">{rb.desc}</p>
              </div>
              <button 
                onClick={() => handleExecute(rb)} 
                disabled={isRunning}
                className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center disabled:opacity-50"
              >
                <Play className="w-4 h-4 mr-2" /> Execute
              </button>
            </div>
          ))}
        </div>

        {/* Execution Terminal */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 flex flex-col h-[400px]">
          <h3 className="text-white font-medium mb-4 flex items-center"><Terminal className="w-4 h-4 mr-2"/> Execution Logs</h3>
          <div className="flex-1 bg-black rounded-lg p-4 font-mono text-xs overflow-y-auto border border-white/5">
            {logs.length === 0 ? (
              <span className="text-zinc-600">Waiting to execute runbook...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={`mb-2 ${log.includes('SUCCESS') ? 'text-green-400' : log.includes('EXEC') ? 'text-yellow-400' : 'text-blue-400'}`}>
                  {log}
                </div>
              ))
            )}
            {isRunning && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
          </div>
        </div>

      </div>
    </PageLayout>
  )
}
