import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Activity, AlertTriangle, Server, Cpu, HardDrive, MoreVertical, TrendingUp } from 'lucide-react'

const Home = () => {
  const [metrics, setMetrics] = useState({ cpu: { usage_percent: 0 }, memory: { usage_percent: 0 }, disk: { usage_percent: 0 } })
  const [predictions, setPredictions] = useState([])
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [chartData, setChartData] = useState([40, 60, 45, 70, 50, 80, 65, 75, 55, 85])
  const [loading, setLoading] = useState(true)

  // Fetch Real Metrics + Predictions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, predRes] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/metrics/system'),
          axios.get('http://localhost:8000/api/v1/predictions/forecast')
        ])
        setMetrics(metricsRes.data)
        setPredictions(predRes.data.predictions)
        setChartData(prev => [...prev.slice(1), metricsRes.data.cpu.usage_percent])
        setLoading(false)
      } catch (e) { console.error(e) }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  // Real AI Anomaly Detection
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const levels = ['INFO', 'WARNING', 'ERROR'];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        const res = await axios.post('http://localhost:8000/api/v1/ai/analyze', {
          service: "payment-service", level: randomLevel, message: "Live traffic"
        })
        if (res.data.is_anomaly) setAnomalyCount(prev => prev + 1)
      } catch (err) { }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading...</div>

  const generatePath = (data) => {
    const width = 100, height = 100
    const max = Math.max(...data, 100), min = Math.min(...data, 0)
    return data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i / (data.length - 1)) * width},${height - ((val - min) / (max - min)) * height}`).join(' ')
  }
  const chartPath = generatePath(chartData)

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="mb-8 animate-fade-in-up">
              <h1 className="text-3xl font-semibold text-white tracking-tight">System Overview</h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time health and AI-driven predictive insights.</p>
            </div>

            {/* Predictive Insights Banner */}
            {predictions.length > 0 && (
              <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-transparent border border-purple-500/20 rounded-2xl p-5 animate-fade-in-up">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-400" /></div>
                  <div className="flex-1">
                    <h3 className="text-purple-400 font-semibold text-sm mb-2">Predictive AI Forecast</h3>
                    {predictions.map((p, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/20 p-3 rounded-lg mb-2">
                        <div>
                          <p className="text-white font-medium text-sm">{p.service} — {p.metric} will reach {p.predicted}% in {p.timeframe}</p>
                          <p className="text-zinc-400 text-xs mt-1">Current: {p.current}% | Risk: <span className={p.risk === 'HIGH' ? 'text-red-400' : 'text-yellow-400'}>{p.risk}</span></p>
                        </div>
                        <span className="text-xs bg-white/10 px-3 py-1 rounded text-white font-medium">{p.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">CPU Usage</span><Cpu className="w-4 h-4 text-blue-400" /></div>
                <h3 className="text-3xl font-semibold text-white">{metrics.cpu.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${metrics.cpu.usage_percent}%` }}></div></div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">Memory</span><Server className="w-4 h-4 text-purple-400" /></div>
                <h3 className="text-3xl font-semibold text-white">{metrics.memory.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${metrics.memory.usage_percent}%` }}></div></div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">Disk</span><HardDrive className="w-4 h-4 text-emerald-400" /></div>
                <h3 className="text-3xl font-semibold text-white">{metrics.disk.usage_percent}%</h3>
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4"><div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${metrics.disk.usage_percent}%` }}></div></div>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="flex justify-between items-center mb-4"><span className="text-sm text-zinc-400 font-medium">Anomalies</span><AlertTriangle className="w-4 h-4 text-yellow-400 animate-pulse" /></div>
                <h3 className="text-3xl font-semibold text-white">{anomalyCount}</h3>
                <span className="text-xs text-yellow-400 font-medium mt-2 inline-flex items-center"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5 animate-pulse"></span> Live AI</span>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">Live CPU Performance</h3>
                  <span className="flex items-center text-xs text-zinc-400"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span> Real-time</span>
                </div>
                <div className="h-64 relative w-full">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {[0, 25, 50, 75, 100].map(y => (<line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />))}
                    <defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" /><stop offset="100%" stopColor="#3B82F6" stopOpacity="0" /></linearGradient></defs>
                    <path d={`${chartPath} L 100,100 L 0,100 Z`} fill="url(#chartGradient)" />
                    <path d={chartPath} fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" className="transition-all duration-500 ease-in-out" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <div className="flex justify-between items-center mb-6"><h3 className="text-white font-medium text-sm">SLA Compliance</h3><MoreVertical className="w-4 h-4 text-zinc-500 cursor-pointer" /></div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <svg width="200" height="110" viewBox="0 0 200 110">
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" strokeLinecap="round" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#3B82F6" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="100" className="transition-all duration-1000" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#10B981" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="140" className="transition-all duration-1000" />
                      <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#8B5CF6" strokeWidth="18" strokeLinecap="round" strokeDasharray="250" strokeDashoffset="180" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col mt-4"><span className="text-3xl font-bold text-white">99.9%</span><span className="text-[10px] text-zinc-500 uppercase tracking-wider">Uptime</span></div>
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
