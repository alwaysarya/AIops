import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import SystemHealth from '../components/Dashboard/SystemHealth'
import AlertTimeline from '../components/Dashboard/AlertTimeline'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Brain, TrendingUp, Clock } from 'lucide-react'

const Home = () => {
  const [healthData, setHealthData] = useState({ status: 'loading' })
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [timeRange, setTimeRange] = useState('1h')
  const [chartData, setChartData] = useState([40, 30, 60, 20, 80, 50, 90, 30, 40, 70, 20, 50])
  const [prediction, setPrediction] = useState(null)

  // Change chart data based on time range
  useEffect(() => {
    if (timeRange === '1h') setChartData([40, 30, 60, 20, 80, 50, 90, 30, 40, 70, 20, 50])
    if (timeRange === '24h') setChartData([10, 45, 30, 80, 20, 90, 50, 60, 30, 70, 40, 55])
    if (timeRange === '7d') setChartData([60, 20, 80, 40, 30, 70, 90, 10, 50, 60, 20, 40])
  }, [timeRange])

  useEffect(() => {
    axios.get('http://localhost:8081/api/v1/health/')
      .then(response => setHealthData(response.data))
      .catch(() => setHealthData({ status: 'error' }))

    const interval = setInterval(async () => {
      try {
        const res = await axios.post('http://localhost:8081/api/v1/ai/analyze', {
          service: "payment-service",
          level: Math.random() > 0.5 ? "ERROR" : "INFO",
          message: "Periodic check"
        })
        if (res.data.is_anomaly) {
          setAnomalyCount(prev => prev + 1)
          setChartData(prev => [...prev.slice(1), Math.min(100, Math.floor(Math.random() * 40) + 60)])
          
          if (Math.random() > 0.7) {
            setPrediction({
              message: "Traffic spike detected in payment-service.",
              forecast: "CPU usage will exceed 90% in 15 minutes.",
              action: "Recommendation: Enable auto-scaling."
            })
          }
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
                Backend: <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${healthData.status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{healthData.status.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <SystemHealth title="Active Services" value="7" status="healthy" />
              <SystemHealth title="Anomalies Detected" value={anomalyCount.toString()} status={anomalyCount > 0 ? 'warning' : 'healthy'} />
              <SystemHealth title="Critical Alerts" value="1" status="critical" />
            </div>

            {prediction && (
              <div className="mb-6 bg-purple-500/10 border border-purple-500/50 rounded-lg p-4 flex items-start">
                <Brain className="w-6 h-6 text-purple-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-purple-400 font-bold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" /> AI Predictive Insight
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">{prediction.message}</p>
                  <p className="text-white font-medium text-sm mt-2">Forecast: {prediction.forecast}</p>
                  <p className="text-green-400 text-xs mt-2 font-bold bg-green-500/10 inline-block px-2 py-1 rounded">{prediction.action}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Live Anomaly Trend</h3>
                  <div className="flex items-center text-xs text-slate-400 bg-slate-900 rounded p-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <select 
                      value={timeRange} 
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="bg-transparent outline-none cursor-pointer text-white"
                    >
                      <option value="1h">Last 1 Hour</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                    </select>
                  </div>
                </div>
                <div className="w-full h-64 flex items-end space-x-2">
                  {chartData.map((height, i) => (
                    <div key={i} className={`flex-1 rounded-t transition-all duration-500 ${height > 70 ? 'bg-red-500/80' : 'bg-blue-500/60'}`} style={{ height: `${height}%` }}></div>
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
        <Footer />
      </div>
    </div>
  )
}

export default Home
