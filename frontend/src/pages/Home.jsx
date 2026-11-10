import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Brain, TrendingUp, Clock, Server, AlertTriangle, Activity, ShieldCheck, MoreHorizontal } from 'lucide-react'

const Home = () => {
  const [anomalyCount, setAnomalyCount] = useState(11)
  const [timeRange, setTimeRange] = useState('1h')
  const [chartData, setChartData] = useState([40, 30, 60, 20, 80, 50, 90, 30, 40, 70, 20, 50])
  const [prediction, setPrediction] = useState({ message: "Traffic spike detected in payment-service.", forecast: "CPU usage will exceed 90% in 15 minutes.", action: "Enable auto-scaling." })

  return (
    <div className="flex h-screen bg-black font-sans selection:bg-blue-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>

        <Navbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-8 animate-apple-fade">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Command Center</h1>
                <p className="text-gray-400 text-sm mt-1">Real-time observability & AI-driven intelligence.</p>
              </div>
              <div className="flex items-center apple-glass rounded-lg px-1 py-1">
                <Clock className="w-4 h-4 text-gray-400 ml-2 mr-2" />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-200 outline-none cursor-pointer pr-2 py-1.5"
                >
                  <option value="1h" className="bg-gray-900">Last 1 Hour</option>
                  <option value="24h" className="bg-gray-900">Last 24 Hours</option>
                  <option value="7d" className="bg-gray-900">Last 7 Days</option>
                </select>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
              <div className="apple-glass apple-card rounded-xl p-5 animate-apple-fade" style={{ animationDelay: '0ms' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-[13px] font-medium">Active Services</p>
                    <div className="flex items-baseline mt-2">
                      <h3 className="text-3xl font-semibold text-white">7</h3>
                      <span className="ml-2 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">HEALTHY</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Server className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="apple-glass apple-card rounded-xl p-5 animate-apple-fade" style={{ animationDelay: '50ms' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-[13px] font-medium">Anomalies Detected</p>
                    <div className="flex items-baseline mt-2">
                      <h3 className="text-3xl font-semibold text-white">{anomalyCount}</h3>
                      <span className="ml-2 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">LIVE</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="apple-glass apple-card rounded-xl p-5 animate-apple-fade" style={{ animationDelay: '100ms' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-[13px] font-medium">Critical Alerts</p>
                    <div className="flex items-baseline mt-2">
                      <h3 className="text-3xl font-semibold text-white">1</h3>
                      <span className="ml-2 text-[11px] font-semibold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20">ACTION REQ</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Activity className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </div>

              <div className="apple-glass apple-card rounded-xl p-5 animate-apple-fade" style={{ animationDelay: '150ms' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-[13px] font-medium">Uptime SLA</p>
                    <div className="flex items-baseline mt-2">
                      <h3 className="text-3xl font-semibold text-white">99.9%</h3>
                      <span className="ml-2 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">SLA</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight Banner */}
            <div className="apple-glass apple-card rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent border-indigo-500/20 p-5 mb-8 flex items-start animate-apple-fade" style={{ animationDelay: '200ms' }}>
              <div className="bg-indigo-500/20 p-2.5 rounded-lg mr-4 border border-indigo-500/30">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-indigo-400 text-[13px] font-bold tracking-wide uppercase flex items-center">
                      Predictive AI Insight <TrendingUp className="w-4 h-4 ml-2" />
                    </h3>
                    <p className="text-gray-200 text-[15px] font-medium mt-1">{prediction.message}</p>
                    <div className="flex items-center mt-3 space-x-3">
                      <p className="text-gray-400 text-[13px] bg-black/40 px-3 py-1 rounded-md border border-white/5">Forecast: {prediction.forecast}</p>
                      <p className="text-emerald-400 text-[13px] font-semibold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">{prediction.action}</p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 apple-glass apple-card rounded-xl p-6 animate-apple-fade" style={{ animationDelay: '250ms' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[15px] font-semibold text-white">Live Anomaly Trend</h3>
                  <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-lg border border-white/5">
                    {['1h', '24h', '7d'].map((range) => (
                      <button 
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-[12px] font-medium rounded-md transition-all ${timeRange === range ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[260px] flex items-end space-x-2">
                  {chartData.map((height, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-sm transition-all duration-300 ease-out ${
                        height > 70 
                          ? 'bg-gradient-to-t from-red-500/80 to-red-400' 
                          : 'bg-gradient-to-t from-blue-500/80 to-blue-400'
                      }`} 
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="apple-glass apple-card rounded-xl p-6 animate-apple-fade" style={{ animationDelay: '300ms' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[15px] font-semibold text-white">Recent Activity</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View All</button>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500 mr-3"></div>
                    <div>
                      <p className="text-[13px] text-gray-200 font-medium">High CPU usage on node-01</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">2 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-amber-500 mr-3"></div>
                    <div>
                      <p className="text-[13px] text-gray-200 font-medium">Latency spike in payment-service</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">15 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500 mr-3"></div>
                    <div>
                      <p className="text-[13px] text-gray-200 font-medium">Pod restarted successfully</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500 mr-3"></div>
                    <div>
                      <p className="text-[13px] text-gray-200 font-medium">Database connection failed</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">3 hours ago</p>
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
