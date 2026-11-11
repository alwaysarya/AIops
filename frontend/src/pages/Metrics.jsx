import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Activity, Cpu, HardDrive, Server } from 'lucide-react'

const Metrics = () => {
  const [metrics, setMetrics] = useState({ cpu: { usage_percent: 0 }, memory: { usage_percent: 0 }, disk: { usage_percent: 0 } })
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/metrics/system')
        setMetrics(res.data)
        setHistory(prev => [...prev, res.data.cpu.usage_percent].slice(-20)) // Keep last 20 points
      } catch (e) { console.error(e) }
    }
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 2000)
    return () => clearInterval(interval)
  }, [])

  const generatePath = (data) => {
    if (data.length === 0) return ''
    const width = 100, height = 100
    const max = Math.max(...data, 100), min = Math.min(...data, 0)
    return data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (data.length - 1)) * width},${height - ((val - min) / (max - min)) * height}`).join(' ')
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center">
                <Activity className="w-8 h-8 mr-3 text-blue-400" /> Live Metrics (Prometheus Style)
              </h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time scraping of system metrics every 2 seconds.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">CPU Usage</span><Cpu className="w-5 h-5 text-blue-400" /></div>
                <h3 className="text-4xl font-semibold text-white">{metrics.cpu.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-2 mt-4"><div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${metrics.cpu.usage_percent}%` }}></div></div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">Memory Usage</span><Server className="w-5 h-5 text-purple-400" /></div>
                <h3 className="text-4xl font-semibold text-white">{metrics.memory.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-2 mt-4"><div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${metrics.memory.usage_percent}%` }}></div></div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">Disk Usage</span><HardDrive className="w-5 h-5 text-emerald-400" /></div>
                <h3 className="text-4xl font-semibold text-white">{metrics.disk.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-2 mt-4"><div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${metrics.disk.usage_percent}%` }}></div></div>
              </div>
            </div>

            {/* Live Chart */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-medium text-sm">CPU Usage (Last 40 seconds)</h3>
                <span className="flex items-center text-xs text-zinc-400"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span> Scraping</span>
              </div>
              <div className="h-64 w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {[0, 25, 50, 75, 100].map(y => (<line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />))}
                  <defs><linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" /><stop offset="100%" stopColor="#3B82F6" stopOpacity="0" /></linearGradient></defs>
                  <path d={`${generatePath(history)} L 100,100 L 0,100 Z`} fill="url(#metricGrad)" />
                  <path d={generatePath(history)} fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Metrics
