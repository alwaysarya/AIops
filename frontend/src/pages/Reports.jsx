import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Download, TrendingUp, AlertTriangle, Activity } from 'lucide-react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Reports = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/analytics/summary')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading Analytics...</div>
  if (!data) return <div className="text-red-400">Failed to load data.</div>

  const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6']

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">System Analytics</h1>
                <p className="text-zinc-400 text-sm mt-1">Deep dive into your infrastructure health.</p>
              </div>
              <button className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" /> Export PDF
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Total Logs Processed</p>
                <h3 className="text-4xl font-semibold text-white mt-2">{data.total_logs.toLocaleString()}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Total Errors</p>
                <h3 className="text-4xl font-semibold text-red-400 mt-2">{data.total_errors.toLocaleString()}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Total Warnings</p>
                <h3 className="text-4xl font-semibold text-yellow-400 mt-2">{data.total_warnings.toLocaleString()}</h3>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Bar Chart: Weekly Trend */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-6 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-blue-400"/> Error Trend (Recent Days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.weekly_trend}>
                      <XAxis dataKey="date" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#111113', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart: Service Breakdown */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-6 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-red-400"/> Errors by Service</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.service_breakdown} dataKey="count" nameKey="service" cx="50%" cy="50%" outerRadius={80} label>
                        {data.service_breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#111113', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
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

export default Reports
