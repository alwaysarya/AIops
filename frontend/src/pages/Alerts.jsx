import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'

const Alerts = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Active Alerts</h2>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-red-400 font-bold">Critical: High CPU Usage</h3>
                <p className="text-slate-400 text-sm">Node-01 is at 95% CPU utilization.</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Resolve</button>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-yellow-400 font-bold">Warning: High Latency</h3>
                <p className="text-slate-400 text-sm">Payment service response time is above 2s.</p>
              </div>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">Acknowledge</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Alerts
