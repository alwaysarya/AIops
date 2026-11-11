import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Activity, AlertTriangle, Shield, Zap, Database, Cloud, MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const Home = () => {
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [timeRange, setTimeRange] = useState('1h')
  
  // Fake chart data (baad mein real karenge)
  const chartData = [
    { cpu: 40, mem: 60 }, { cpu: 55, mem: 65 }, { cpu: 45, mem: 70 }, 
    { cpu: 70, mem: 75 }, { cpu: 65, mem: 80 }, { cpu: 85, mem: 85 }, 
    { cpu: 60, mem: 70 }, { cpu: 50, mem: 60 }, { cpu: 75, mem: 75 }, 
    { cpu: 90, mem: 90 }, { cpu: 70, mem: 80 }, { cpu: 60, mem: 70 }
  ]

  // Poll AI Detector for real anomalies
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Randomly send ERROR logs to AI to simulate real traffic
        const levels = ['INFO', 'WARNING', 'ERROR'];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        
        const res = await axios.post('http://localhost:8000/api/v1/ai/analyze', {
          service: "payment-service",
          level: randomLevel,
          message: "Traffic simulation check"
        })
        
        if (res.data.is_anomaly) {
          setAnomalyCount(prev => prev + 1)
        }
      } catch (err) {
        console.error("AI check failed", err)
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden relative">
      
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">System Overview</h1>
                <p className="text-zinc-400 text-sm mt-1">Real-time health and AI-driven infrastructure insights.</p>
              </div>
              
              <div className="flex bg-[#111113] border border-white/10 rounded-xl p-1 shadow-lg">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                      timeRange === range ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Uptime', val: '99.98%', trend: '+0.02%', icon: Activity, color: 'text-emerald-400', isUp: true },
                { title: 'Anomalies Detected', val: anomalyCount.toString(), trend: 'Live', icon: AlertTriangle, color: 'text-yellow-400', isUp: true },
                { title: 'Predicted Failures', val: '04', trend: '+4.04%', icon: Zap, color: 'text-red-400', isUp: true },
                { title: 'SLA Compliance', val: '94%', trend: '+2.1%', icon: Shield, color: 'text-blue-400', isUp: true },
              ].map((item, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-zinc-400 font-medium">{item.title}</span>
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-semibold text-white tracking-tight">{item.val}</h3>
                    <span className={`text-xs font-semibold flex items-center ${item.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.isUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left: Cluster Info */}
              <div className="space-y-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/5"><Cloud className="w-5 h-5 text-zinc-300" /></div>
                      <div>
                        <h3 className="text-white font-medium text-sm">Production</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">AWS · us-east-1</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 tracking-wide">HEALTHY</span>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs mb-2"><span className="text-zinc-400 font-medium">CPU Usage</span><span className="text-white font-semibold">68%</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: '68%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-2"><span className="text-zinc-400 font-medium">Memory</span><span className="text-white font-semibold">72%</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><div className="bg-purple-500 h-full rounded-full" style={{ width: '72%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5"><Database className="w-5 h-5 text-zinc-300" /></div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Database</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">GCP · us-central1</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold rounded border border-yellow-500/20 tracking-wide">WARNING</span>
                </div>
              </div>

              {/* Center: Chart */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">System Performance</h3>
                  <div className="flex items-center space-x-4 text-xs font-medium">
                     <span className="flex items-center text-zinc-400"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span> CPU</span>
                     <span className="flex items-center text-zinc-400"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1.5"></span> Memory</span>
                  </div>
                </div>
                
                <div className="flex-1 relative min-h-[250px] w-full">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    ))}
                    
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path d={`M 0,100 L 0,${100 - chartData[0].cpu} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.cpu}`).join(' ')} L 100,100 Z`} fill="url(#blueGradient)" />
                    <path d={`M 0,${100 - chartData[0].cpu} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.cpu}`).join(' ')}`} fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" />

                    <path d={`M 0,100 L 0,${100 - chartData[0].mem} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.mem}`).join(' ')} L 100,100 Z`} fill="url(#purpleGradient)" />
                    <path d={`M 0,${100 - chartData[0].mem} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.mem}`).join(' ')}`} fill="none" stroke="#8B5CF6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>

                <div className="flex justify-between text-xs text-zinc-500 mt-6 pt-4 border-t border-white/5 font-medium">
                  <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
                </div>
              </div>

              {/* Right: SLA Gauge */}
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
                      <span className="text-3xl font-bold text-white">94%</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Overall</span>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span><span className="text-zinc-400">Met SLA</span></div>
                      <span className="text-white font-medium">49.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span><span className="text-zinc-400">Missed SLA</span></div>
                      <span className="text-white font-medium">18.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span><span className="text-zinc-400">Data SLA</span></div>
                      <span className="text-white font-medium">32.0%</span>
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
