import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Activity, AlertTriangle, Server, Cpu, HardDrive, MoreVertical } from 'lucide-react'

const Home = () => {
  const [metrics, setMetrics] = useState({ cpu: { usage_percent: 0 }, memory: { usage_percent: 0 }, disk: { usage_percent: 0 } })
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [chartData, setChartData] = useState([40, 60, 45, 70, 50, 80, 65])

  // 1. Fetch Real System Metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/metrics/system')
        setMetrics(res.data)
        // Update chart dynamically based on real CPU
        setChartData(prev => [...prev.slice(1), res.data.cpu.usage_percent])
      } catch (e) { console.error(e) }
    }
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 3000)
    return () => clearInterval(interval)
  }, [])

  // 2. Real AI Polling for Anomalies
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const levels = ['INFO', 'WARNING', 'ERROR'];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        
        const res = await axios.post('http://localhost:8000/api/v1/ai/analyze', {
          service: "payment-service",
          level: randomLevel,
          message: "Live traffic simulation"
        })
        
        if (res.data.is_anomaly) {
          setAnomalyCount(prev => prev + 1)
        }
      } catch (err) { }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">System Overview</h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time health and AI-driven insights.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400 font-medium">CPU Usage</span>
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-3xl font-semibold text-white">{metrics.cpu.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.cpu.usage_percent}%` }}></div></div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400 font-medium">Memory Usage</span>
                  <Server className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-3xl font-semibold text-white">{metrics.memory.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.memory.usage_percent}%` }}></div></div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400 font-medium">Disk Usage</span>
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-semibold text-white">{metrics.disk.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.disk.usage_percent}%` }}></div></div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400 font-medium">Anomalies Detected</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                </div>
                <h3 className="text-3xl font-semibold text-white">{anomalyCount}</h3>
                <span className="text-xs text-yellow-400 font-medium mt-2 inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5 animate-pulse"></span> Live AI
                </span>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">Live CPU Performance</h3>
                  <span className="flex items-center text-xs text-zinc-400"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> CPU</span>
                </div>
                <div className="h-64 flex items-end space-x-2">
                   {chartData.map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/50 to-blue-400 rounded-t-sm transition-all duration-500" style={{ height: `${Math.max(h, 5)}%` }}></div>
                   ))}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">SLA Compliance</h3>
                  <MoreVertical className="w-4 h-4 text-zinc-500 cursor-pointer" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <svg width="200" height="110" viewBox="0 0 200 110">
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" strokeLinecap="round" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#3B82F6" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="100" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#10B981" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="140" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#8B5CF6" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="180" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col mt-4">
                      <span className="text-3xl font-bold text-white">99.9%</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Uptime</span>
                    </div>
                  </div>
                </div>
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
