import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Play, UserPlus, Link as LinkIcon, CheckCircle, ArrowUpRight, ArrowDownRight, ClipboardCheck, Layout, MoreHorizontal, X } from 'lucide-react'

const Home = () => {
  const [stats, setStats] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = () => axios.get('http://localhost:8000/api/v1/dashboard/stats').then(r => setStats(r.data)).catch(e => console.error(e))
    fetch(); const int = setInterval(fetch, 5000); return () => clearInterval(int)
  }, [])
  if (!stats) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading Real Data...</div>

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-8 gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-white">Welcome Back, Aryan</h1>
                <p className="text-zinc-400 text-xs lg:text-sm mt-1">Your AI control room — monitoring agents, costs, and compliance.</p>
              </div>
              
              <div className="grid grid-cols-4 lg:flex items-center gap-2 lg:gap-3 w-full lg:w-auto">
                <div onClick={() => navigate('/new-agent')} className="flex flex-col items-center text-zinc-400 hover:text-white cursor-pointer py-1">
                  <div className="w-10 h-10 lg:w-8 lg:h-8 rounded bg-[#151515] border border-white/10 flex items-center justify-center mb-1"><UserPlus className="w-4 h-4" /></div>
                  <span className="text-[9px] lg:text-[10px] text-center">New Agent</span>
                </div>
                <div onClick={() => navigate('/connect-data')} className="flex flex-col items-center text-zinc-400 hover:text-white cursor-pointer py-1">
                  <div className="w-10 h-10 lg:w-8 lg:h-8 rounded bg-[#151515] border border-white/10 flex items-center justify-center mb-1"><LinkIcon className="w-4 h-4" /></div>
                  <span className="text-[9px] lg:text-[10px] text-center">Connect Data</span>
                </div>
                <div onClick={() => navigate('/approvals')} className="flex flex-col items-center text-zinc-400 hover:text-white cursor-pointer py-1">
                  <div className="w-10 h-10 lg:w-8 lg:h-8 rounded bg-[#151515] border border-white/10 flex items-center justify-center mb-1"><ClipboardCheck className="w-4 h-4" /></div>
                  <span className="text-[9px] lg:text-[10px] text-center">Review Approval</span>
                </div>
                <div onClick={() => navigate('/workspace')} className="flex flex-col items-center text-zinc-400 hover:text-white cursor-pointer py-1">
                  <div className="w-10 h-10 lg:w-8 lg:h-8 rounded bg-[#151515] border border-white/10 flex items-center justify-center mb-1"><Layout className="w-4 h-4" /></div>
                  <span className="text-[9px] lg:text-[10px] text-center">View Workspace</span>
                </div>
                <button onClick={() => setShowDemoModal(true)} className="col-span-4 lg:col-span-1 mt-2 lg:mt-0 bg-yellow-400 text-black font-bold px-4 lg:px-5 py-3 lg:py-2 rounded-lg hover:bg-yellow-500 flex items-center justify-center lg:ml-2 h-10 lg:h-9 text-xs lg:text-sm w-full"><Play className="w-4 h-4 mr-2"/> Launch Demo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-5">
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {[{t:'Success Rate', v:`${stats.success_rate}%`, d:'2.4% Compare from last month', c:'text-green-500', i:ArrowUpRight}, {t:'P95 Latency', v:`${stats.p95_latency}ms`, d:'12% Compare from last month', c:'text-red-500', i:ArrowDownRight}, {t:'Token', v:stats.token_usage, d:'18% Compare from last 24hrs', c:'text-green-500', i:ArrowUpRight}, {t:'Cost', v:stats.total_cost, d:'15% Compare from last 24hrs', c:'text-green-500', i:ArrowUpRight}].map((k,i)=>(
                  <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 lg:p-5">
                    <div className="flex justify-between items-start mb-4"><p className="text-zinc-400 text-xs lg:text-sm">{k.t}</p><MoreHorizontal className="w-4 h-4 text-zinc-600" /></div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">{k.v}</h3>
                    <p className={`text-[10px] lg:text-xs ${k.c} mt-2 flex items-center font-medium`}><k.i className="w-3 h-3 mr-1"/> {k.d}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 lg:p-6 flex flex-col justify-between">
                <div>
                  <p className="text-zinc-400 text-xs lg:text-sm mb-1">30-day Cost Forecast</p>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mt-1">{stats.cost_forecast}</h3>
                  <p className="text-[10px] lg:text-xs text-green-500 mt-1 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 12% Projected spend for next 30 days</p>
                </div>
                <div className="my-6 overflow-x-auto pb-2">
                  <div className="min-w-[250px]">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2"><span>60%</span><span>30%</span><span>45%</span></div>
                    <div className="flex h-8 items-end space-x-[2px]">
                      {[...Array(20)].map((_, i) => <div key={`u${i}`} className="flex-1 bg-blue-600/50 rounded-sm h-full"></div>)}
                      {[...Array(6)].map((_, i) => <div key={`o${i}`} className="flex-1 bg-orange-500 h-full rounded-sm"></div>)}
                      {[...Array(3)].map((_, i) => <div key={`g${i}`} className="flex-1 bg-green-500 h-full rounded-sm"></div>)}
                    </div>
                  </div>
                  <div className="flex space-x-4 text-[10px] text-zinc-400 mt-3">
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>Unused</span>
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>Used</span>
                    <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>Reserved</span>
                  </div>
                </div>
                <div className="bg-[#151515] border border-white/5 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center text-[10px] lg:text-xs text-zinc-300"><div className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2"><span className="text-yellow-500 text-[10px] font-bold">!</span></div>Confidence:</div>
                  <div className="text-xs lg:text-sm font-bold text-white">87% <span className="text-[10px] text-zinc-500 font-normal">vs last month</span></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 lg:p-5">
                <div className="flex justify-between items-center mb-4"><h3 className="text-white font-medium flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>Live Runs Stream</h3><span className="text-[10px] text-zinc-500">Last 50</span></div>
                <table className="w-full text-left text-xs hidden sm:table">
                  <thead className="text-[10px] text-zinc-500 uppercase border-b border-white/10"><tr><th className="pb-3">Name</th><th className="pb-3">Time</th><th className="pb-3">Latency</th><th className="pb-3">Status</th></tr></thead>
                  <tbody>
                    {stats.live_runs.map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0"><td className="py-3 text-white font-medium">{r.name}</td><td className="py-3 text-zinc-400">just now</td><td className="py-3 text-zinc-400">{r.latency}</td><td className="py-3"><span className="bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded text-[9px] font-bold">Live</span></td></tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col gap-3 sm:hidden">
                  {stats.live_runs.map((r, i) => (
                    <div key={i} className="bg-[#111113] border border-white/5 rounded-lg p-3 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">{r.name}</span>
                        <span className="bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded text-[9px] font-bold">Live</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Time: <span className="text-zinc-300">just now</span></span>
                        <span>Latency: <span className="text-zinc-300">{r.latency}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 lg:p-5 flex flex-col">
                <div className="flex justify-between items-center mb-2"><h3 className="text-white font-medium">Compliance pulse</h3><MoreHorizontal className="w-4 h-4 text-zinc-600" /></div>
                <div className="flex-1 flex flex-col items-center justify-center relative mt-4 mb-2">
                  <div className="relative w-[180px] h-[90px]">
                    <svg width="100%" height="100%" viewBox="0 0 200 100" className="overflow-visible">
                      <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#F97316" strokeWidth="16" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="50" />
                      <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#22C55E" strokeWidth="16" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="130" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                      <span className="text-[10px] text-zinc-400 mb-0.5">Policy Coverage</span>
                      <span className="text-2xl lg:text-3xl font-bold text-white leading-none">94%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 mt-2">
                  {[{n:'Data Privacy (DAT-001)', s:'Active', c:'text-green-400 bg-green-500/10'}, {n:'Approval Gates (APR-002)', s:'Active', c:'text-green-400 bg-green-500/10'}, {n:'Security Training (SEC-003)', s:'1 Draft', c:'text-orange-400 bg-orange-500/10'}, {n:'Incident Response Plan (IRP-004)', s:'Under Review', c:'text-blue-400 bg-blue-500/10'}].map((it, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-[#111113] rounded border border-white/5"><span className="text-zinc-300">{it.n}</span><span className={`${it.c} px-2 py-0.5 rounded font-medium`}>{it.s}</span></div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 lg:p-5">
                <h3 className="text-white font-medium mb-4">Getting Started</h3>
                <div className="space-y-2">
                  {[{l:'Create your first workspace', a:true}, {l:'Deploy an AI agent', a:true}, {l:'Configure data connectors', a:false}, {l:'Set up approval workflows', a:false}, {l:'Review audit logs', a:false}, {l:'Optimize data visualizations', a:false}, {l:'Train team on best practices', a:false}].map((it, i) => (
                    <div key={i} className={`flex items-center text-[10px] lg:text-xs p-3 lg:p-2.5 rounded-lg border ${it.a ? 'bg-green-500/5 border-green-500/20 text-zinc-200' : 'border-white/5 text-zinc-400'}`}>
                      {it.a ? <CheckCircle className="w-4 h-4 text-green-500 mr-3 shrink-0" /> : <div className="w-4 h-4 border border-zinc-600 rounded-full mr-3 shrink-0"></div>}<span>{it.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>

      {showDemoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#111113] border border-white/10 rounded-xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowDemoModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-white mb-2">Launch AI Demo</h2>
            <p className="text-xs text-zinc-400 mb-6">This will start a simulated AI agent workflow in your environment.</p>
            <div className="space-y-3">
              <input type="text" placeholder="Agent Name (e.g. Security Bot)" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-400" />
              <button onClick={() => { setShowDemoModal(false); alert('Demo Started!'); }} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500">Start Workflow</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Home
