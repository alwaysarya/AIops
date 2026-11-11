import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Lightbulb } from 'lucide-react'
import axios from 'axios'

const FinOps = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/finops/costs')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if (loading) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading FinOps Data...</div>
  if (!data) return <div className="text-red-400">Failed to load cost data.</div>

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">Cloud FinOps</h1>
              <p className="text-zinc-400 text-sm mt-1">Monitor your cloud spending and optimize costs.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign className="w-24 h-24 text-green-400" /></div>
                <p className="text-zinc-400 text-sm font-medium">Total Monthly Spend</p>
                <h3 className="text-4xl font-semibold text-white mt-2">${data.total_monthly_spend.toLocaleString()}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-24 h-24 text-blue-400" /></div>
                <p className="text-zinc-400 text-sm font-medium">Forecasted Spend (Next Month)</p>
                <h3 className="text-4xl font-semibold text-white mt-2">${data.forecasted_spend.toLocaleString()}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cost Breakdown */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-6">Cost by Service</h3>
                <div className="space-y-4">
                  {data.services.map((s, i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          s.status === 'critical' ? 'bg-red-500' : s.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="text-zinc-300 font-medium">{s.name}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-white font-semibold">${s.cost.toFixed(2)}</span>
                        <span className={`text-xs font-medium w-12 text-right ${
                          s.trend.includes('+') ? 'text-red-400' : 'text-green-400'
                        }`}>{s.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Recommendations */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-6 flex items-center"><Lightbulb className="w-4 h-4 mr-2 text-yellow-400"/> Savings Recommendations</h3>
                <div className="space-y-4">
                  {data.recommendations.map((rec) => (
                    <div key={rec.id} className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                      <p className="text-sm text-zinc-300 font-medium">{rec.title}</p>
                      <p className="text-green-400 text-lg font-bold mt-1">Save {rec.savings}</p>
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

export default FinOps
