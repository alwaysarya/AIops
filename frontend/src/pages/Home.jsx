import React, { useState } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Activity, AlertTriangle, Shield, Zap, Database, Cloud, MoreVertical, ArrowUpRight, ArrowDownRight, Server, Globe } from 'lucide-react'

const Home = () => {
  const [timeRange, setTimeRange] = useState('1h')

  const chartData = [
    { cpu: 40, mem: 60 }, { cpu: 55, mem: 65 }, { cpu: 45, mem: 70 }, 
    { cpu: 70, mem: 75 }, { cpu: 65, mem: 80 }, { cpu: 85, mem: 85 }, 
    { cpu: 60, mem: 70 }, { cpu: 50, mem: 60 }, { cpu: 75, mem: 75 }, 
    { cpu: 90, mem: 90 }, { cpu: 70, mem: 80 }, { cpu: 60, mem: 70 }
  ]

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden relative selection:bg-purple-500/30">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-8 animate-slide-up">
              <div>
                <h1 className="text-4xl font-semibold text-white tracking-tight">System Overview</h1>
                <p className="text-zinc-400 text-sm mt-2">Real-time health and AI-driven infrastructure insights.</p>
              </div>
              
              <div className="flex bg-[#111113] border border-white/10 rounded-xl p-1 shadow-lg">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      timeRange === range ? 'bg-white text-black shadow-md' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              
              {/* Left Column: Clusters */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Cloud className="w-5 h-5 text-zinc-300" /></div>
                      <div>
                        <h3 className="text-white font-medium text-base">Production</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">AWS · us-east-1</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-md border border-green-500/20 tracking-wide">HEALTHY</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400 font-medium">CPU Usage</span>
                        <span className="text-white font-semibold">68%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400 font-medium">Memory</span>
                        <span className="text-white font-semibold">72%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Database className="w-5 h-5 text-zinc-300" /></div>
                      <div>
                        <h3 className="text-white font-medium text-base">Database</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">GCP · us-central1</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold rounded-md border border-yellow-500/20 tracking-wide">WARNING</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Chart */}
              <div className="lg:col-span-6">
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-lg">System Performance</h3>
                    <div className="flex items-center space-x-4 text-sm font-medium">
                       <span className="flex items-center text-zinc-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span> CPU</span>
                       <span className="flex items-center text-zinc-400"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-2 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span> Memory</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative min-h-[300px] w-full mt-4">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {[0, 25, 50, 75, 100].map((y) => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                      ))}
                      
                      <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <path d={`M 0,100 L 0,${100 - chartData[0].cpu} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.cpu}`).join(' ')} L 100,100 Z`} fill="url(#blueGradient)" />
                      <path d={`M 0,${100 - chartData[0].cpu} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.cpu}`).join(' ')}`} fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" className="animate-draw-line" />

                      <path d={`M 0,100 L 0,${100 - chartData[0].mem} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.mem}`).join(' ')} L 100,100 Z`} fill="url(#purpleGradient)" />
                      <path d={`M 0,${100 - chartData[0].mem} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - d.mem}`).join(' ')}`} fill="none" stroke="#8B5CF6" strokeWidth="2" vectorEffect="non-scaling-stroke" className="animate-draw-line" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-xs text-zinc-500 mt-6 pt-4 border-t border-white/5 font-medium">
                    <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
                  </div>
                </div>
              </div>

              {/* Right Column: SLA Gauge + Visual Globe */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass-card rounded-2xl p-6 flex flex-col animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-lg">SLA Compliance</h3>
                    <MoreVertical className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-10">
                      <svg width="220" height="120" viewBox="0 0 220 120">
                        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" strokeLinecap="round" />
                        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#3B82F6" strokeWidth="20" strokeLinecap="round" strokeDasharray="280" strokeDashoffset="100" className="animate-draw-line" />
                        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#10B981" strokeWidth="20" strokeLinecap="round" strokeDasharray="280" strokeDashoffset="140" className="animate-draw-line" />
                        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeLinecap="round" strokeDasharray="280" strokeDashoffset="180" className="animate-draw-line" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col mt-6">
                        <span className="text-4xl font-bold text-white tracking-tight">94%</span>
                        <span className="text-xs text-zinc-400 font-medium mt-1">Overall SLA</span>
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span><span className="text-zinc-300">Met SLA</span></div>
                        <span className="text-white font-semibold">49.5%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span><span className="text-zinc-300">Missed SLA</span></div>
                        <span className="text-white font-semibold">18.5%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-3 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span><span className="text-zinc-300">Data SLA</span></div>
                        <span className="text-white font-semibold">32.0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Globe Card */}
                <div className="glass-card rounded-2xl p-6 flex flex-col animate-slide-up" style={{ animationDelay: '500ms' }}>
                  <div className="flex items-center space-x-3 mb-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-medium text-lg">Global Nodes</h3>
                  </div>
                  <div className="relative w-full h-32 flex items-center justify-center mt-2">
                     {/* CSS Globe Visual */}
                     <div className="w-24 h-24 rounded-full border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-transparent relative shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-spin-slow" style={{ transform: 'rotateX(70deg)' }}></div>
                        <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-spin-slow-reverse" style={{ transform: 'rotateY(70deg)' }}></div>
                        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full shadow-[0_0_10px_#d8b4fe]"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full shadow-[0_0_10px_#d8b4fe]"></div>
                     </div>
                  </div>
                  <p className="text-center text-xs text-zinc-500 mt-2">14 Active Regions</p>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Uptime', val: '99.98%', trend: '+0.02%', icon: Activity, color: 'text-emerald-400', isUp: true },
                { title: 'Active Incidents', val: '12', trend: '-3.7%', icon: AlertTriangle, color: 'text-red-400', isUp: false },
                { title: 'Predicted Failures', val: '04', trend: '+4.04%', icon: Zap, color: 'text-yellow-400', isUp: true },
                { title: 'SLA Compliance', val: '94%', trend: '+2.1%', icon: Shield, color: 'text-blue-400', isUp: true },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 group animate-slide-up" style={{ animationDelay: `${600 + (i * 100)}ms` }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-zinc-400 font-medium">{item.title}</span>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-3">
                    <h3 className="text-3xl font-semibold text-white tracking-tight">{item.val}</h3>
                    <span className={`text-xs font-semibold flex items-center px-2 py-1 rounded-md ${item.isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {item.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home
