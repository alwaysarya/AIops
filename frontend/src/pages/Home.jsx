import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Play, UserPlus, Link as LinkIcon, CheckCircle, Check, FileText, Settings, MoreHorizontal } from 'lucide-react'

const Home = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = () => {
      axios.get('http://localhost:8000/api/v1/dashboard/stats')
        .then(res => setStats(res.data))
        .catch(err => console.error(err))
    }
    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!stats) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading Real Data...</div>

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Header + Quick Actions */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white">Welcome Back, Aryan</h1>
                <p className="text-zinc-400 text-sm mt-1">Your AI control room — monitoring agents, costs, and compliance.</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-[#151515] border border-white/10 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-white/5"><UserPlus className="w-4 h-4 mr-2"/> New Agent</button>
                <button className="bg-[#151515] border border-white/10 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-white/5"><LinkIcon className="w-4 h-4 mr-2"/> Connect Data</button>
                <button onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))} className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg hover:bg-yellow-500 flex items-center"><Play className="w-4 h-4 mr-2"/> Launch Demo</button>
              </div>
            </div>

            {/* Top KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-zinc-400 text-sm">Success Rate</p>
                  <MoreHorizontal className="w-4 h-4 text-zinc-600" />
                </div>
                <h3 className="text-3xl font-bold text-white">{stats.success_rate}%</h3>
                <p className="text-xs text-green-400 mt-2 flex items-center"><Check className="w-3 h-3 mr-1"/> Based on {stats.resolved_incidents} resolved incidents</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-zinc-400 text-sm">P95 Latency</p>
                  <MoreHorizontal className="w-4 h-4 text-zinc-600" />
                </div>
                <h3 className="text-3xl font-bold text-white">{stats.p95_latency}ms</h3>
                <p className="text-xs text-zinc-400 mt-2">CPU Load: {stats.cpu_usage}%</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-zinc-400 text-sm">Token Usage</p>
                  <MoreHorizontal className="w-4 h-4 text-zinc-600" />
                </div>
                <h3 className="text-3xl font-bold text-white">{stats.token_usage}</h3>
                <p className="text-xs text-zinc-400 mt-2">From {stats.total_logs.toLocaleString()} logs</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-zinc-400 text-sm">Total Cost</p>
                  <MoreHorizontal className="w-4 h-4 text-zinc-600" />
                </div>
                <h3 className="text-3xl font-bold text-white">{stats.total_cost}</h3>
                <p className="text-xs text-zinc-400 mt-2">Estimated spend</p>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Cost Forecast */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-zinc-400 text-sm">30-day Cost Forecast</p>
                    <h3 className="text-4xl font-bold text-white mt-1">{stats.cost_forecast}</h3>
                    <p className="text-xs text-green-400 mt-1">Projected spend for next 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Confidence</p>
                    <p className="text-2xl font-bold text-white">87%</p>
                  </div>
                </div>
                <div className="flex space-x-1 h-4 rounded-full overflow-hidden mb-2">
                  <div className="bg-blue-500 w-[60%]"></div>
                  <div className="bg-orange-500 w-[30%]"></div>
                  <div className="bg-green-500 w-[10%]"></div>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Unused (60%)</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>Used (30%)</span>
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Reserved (10%)</span>
                </div>
              </div>

              {/* Getting Started */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-medium mb-4">Getting Started</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Create your first workspace', active: true },
                    { label: 'Deploy an AI agent', active: true },
                    { label: 'Configure data connectors', active: false },
                    { label: 'Set up approval workflows', active: false },
                    { label: 'Review audit logs', active: false }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center text-sm p-2 rounded-lg border ${item.active ? 'bg-green-500/5 border-green-500/20 text-zinc-200' : 'border-white/5 text-zinc-400'}`}>
                      {item.active ? <CheckCircle className="w-4 h-4 text-green-500 mr-3 shrink-0" /> : <div className="w-4 h-4 border border-zinc-600 rounded-full mr-3 shrink-0"></div>}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Runs Stream */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Live Runs Stream</h3>
                  <span className="text-xs text-zinc-500">Last 50</span>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-zinc-500 uppercase border-b border-white/10">
                    <tr><th className="pb-3">Name</th><th className="pb-3">Time</th><th className="pb-3">Latency</th><th className="pb-3">Status</th></tr>
                  </thead>
                  <tbody>
                    {stats.live_runs.map((run, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="py-3 text-white font-medium">{run.name}</td>
                        <td className="py-3 text-zinc-400">just now</td>
                        <td className="py-3 text-zinc-400">{run.latency}</td>
                        <td className="py-3"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold">Live</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Compliance Pulse */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Compliance Pulse</h3>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <svg width="150" height="80" viewBox="0 0 150 80">
                      <path d="M 15 70 A 60 60 0 0 1 135 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
                      <path d="M 15 70 A 60 60 0 0 1 135 70" fill="none" stroke="#EAB308" strokeWidth="12" strokeLinecap="round" strokeDasharray="180" strokeDashoffset="20" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col mt-4">
                      <span className="text-2xl font-bold text-white">94%</span>
                      <span className="text-[10px] text-zinc-500">Coverage</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Data Privacy', 'Approval Gates', 'Security Training'].map((item, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-zinc-300">{item}</span>
                      <span className="text-green-400 font-medium">Active</span>
                    </div>
                  ))}
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
