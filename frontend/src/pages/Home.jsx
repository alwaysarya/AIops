import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { Activity, AlertTriangle, DollarSign, Server, CheckCircle, ArrowUpRight, Play, UserPlus, Link as LinkIcon, FileText, Settings } from 'lucide-react'

const Home = () => {
  const [metrics, setMetrics] = useState({ cpu: { usage_percent: 0 }, memory: { usage_percent: 0 } })
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/metrics/system').then(res => setMetrics(res.data)).catch(() => {})
    axios.get('http://localhost:8000/api/v1/incidents/').then(res => setIncidents(res.data.incidents)).catch(() => {})
  }, [])

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
                <button className="bg-yellow-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-500 flex items-center"><Play className="w-4 h-4 mr-2"/> Launch Demo</button>
              </div>
            </div>

            {/* Top KPI Grid (4 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Success Rate</p>
                <h3 className="text-3xl font-bold text-white mt-1">97.3%</h3>
                <p className="text-xs text-green-400 mt-2">↑ 2.4% <span className="text-zinc-500">from last month</span></p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">P95 Latency</p>
                <h3 className="text-3xl font-bold text-white mt-1">234ms</h3>
                <p className="text-xs text-red-400 mt-2">↓ 12% <span className="text-zinc-500">from last month</span></p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Token Usage</p>
                <h3 className="text-3xl font-bold text-white mt-1">2.4M</h3>
                <p className="text-xs text-green-400 mt-2">↑ 18% <span className="text-zinc-500">from last 24hrs</span></p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <p className="text-zinc-400 text-sm">Total Cost</p>
                <h3 className="text-3xl font-bold text-white mt-1">$127</h3>
                <p className="text-xs text-green-400 mt-2">↑ 15% <span className="text-zinc-500">from last 24hrs</span></p>
              </div>
            </div>

            {/* Main Grid (3 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left: Cost Forecast (2 columns wide) */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-zinc-400 text-sm">30-day Cost Forecast</p>
                    <h3 className="text-4xl font-bold text-white mt-1">$3,890</h3>
                    <p className="text-xs text-green-400 mt-1">↑ 12% Projected spend for next 30 days</p>
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

              {/* Right: Getting Started */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Getting Started</h3>
                <div className="space-y-3">
                  {['Create your first workspace', 'Deploy an AI agent', 'Configure data connectors', 'Set up approval workflows', 'Review audit logs'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                      <span className="text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Left: Live Runs Stream (2 columns wide) */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Live Runs Stream</h3>
                  <span className="text-xs text-zinc-500">Last 50</span>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-zinc-500 uppercase border-b border-white/10">
                    <tr><th className="pb-3">Name</th><th className="pb-3">Latency</th><th className="pb-3">Status</th></tr>
                  </thead>
                  <tbody>
                    {['Claims-Checker', 'KYC-Validator', 'Fraud-Monitor', 'Swift-Analyzer'].map((name, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="py-3 text-white font-medium">{name}</td>
                        <td className="py-3 text-zinc-400">{(Math.random() * 2).toFixed(1)}s</td>
                        <td className="py-3"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Live</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Right: Compliance Pulse */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5">
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
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-zinc-400">{item}</span>
                      <span className="text-green-400">Active</span>
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
