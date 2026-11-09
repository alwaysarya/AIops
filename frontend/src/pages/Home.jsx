import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import SystemHealth from '../components/Dashboard/SystemHealth'
import AnomalyChart from '../components/Dashboard/AnomalyChart'
import AlertTimeline from '../components/Dashboard/AlertTimeline'

const Home = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">System Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <SystemHealth title="Active Services" value="7" status="healthy" />
              <SystemHealth title="Anomalies Detected" value="3" status="warning" />
              <SystemHealth title="Critical Alerts" value="1" status="critical" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">Anomaly Trend (Last 24h)</h3>
                <AnomalyChart />
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">Recent Alerts</h3>
                <AlertTimeline />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
