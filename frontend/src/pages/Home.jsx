import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import SystemHealth from '../components/Dashboard/SystemHealth'
import AlertTimeline from '../components/Dashboard/AlertTimeline'
import axios from 'axios'

const Home = () => {
  const [healthData, setHealthData] = useState({ status: 'loading' })
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [chartData, setChartData] = useState([40, 30, 60, 20, 80, 50, 90, 30, 40, 70, 20, 50])

  useEffect(() => {
    // 1. Fetch initial health status
    axios.get('http://localhost:8000/api/v1/health/')
      .then(response => setHealthData(response.data))
      .catch(() => setHealthData({ status: 'error' }))

    // 2. Poll AI Anomaly Detector every 5 seconds
    const interval = setInterval(async () => {
      try {
        // Simulate sending a random log to AI
        const res = await axios.post('http://localhost:8000/api/v1/ai/analyze', {
          service: "payment-service",
          level: Math.random() > 0.5 ? "ERROR" : "INFO",
          message: "Periodic check"
        })
        if (res.data.is_anomaly) {
          setAnomalyCount(prev => prev + 1)
          // Update chart data dynamically
          setChartData(prev => [...prev.slice(1), Math.min(100, Math.floor(Math.random() * 40) + 60)])
        }
      } catch (err) {
        console.error("AI check failed", err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">System Overview</h2>
              <div className="text-sm text-slate-400 flex items-center">
                Backend Status: 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${healthData.status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {healthData.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <SystemHealth title="Active Services" value="7" status="healthy" />
              <SystemHealth title="Anomalies Detected" value={anomalyCount.toString()} status={anomalyCount > 0 ? 'warning' : 'healthy'} />
              <SystemHealth title="Critical Alerts" value="1" status="critical" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Live Anomaly Trend</h3>
                  <span className="text-xs text-blue-400 animate-pulse">● Updating...</span>
                </div>
                <div className="w-full h-64 flex items-end space-x-2">
                  {chartData.map((height, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t transition-all duration-500 ${height > 70 ? 'bg-red-500/80' : 'bg-blue-500/60'}`}
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
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
