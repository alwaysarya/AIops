import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, TrendingUp, ShieldCheck, Clock } from 'lucide-react'

const Reports = () => {
  const anomalyData = [
    { name: 'Mon', count: 4 }, { name: 'Tue', count: 7 }, { name: 'Wed', count: 12 },
    { name: 'Thu', count: 5 }, { name: 'Fri', count: 18 }, { name: 'Sat', count: 3 }, { name: 'Sun', count: 6 }
  ]

  const serviceData = [
    { name: 'Payment Service', value: 45, color: '#ef4444' },
    { name: 'Auth Service', value: 30, color: '#eab308' },
    { name: 'User Service', value: 25, color: '#3b82f6' }
  ]

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">System Analytics & Reports</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors">
              <Download className="w-4 h-4 mr-2" /> Export Report (PDF)
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Platform Uptime</p>
                  <h3 className="text-3xl font-bold text-green-400 mt-2">99.9%</h3>
                </div>
                <ShieldCheck className="w-10 h-10 text-green-500/50" />
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Anomalies (Week)</p>
                  <h3 className="text-3xl font-bold text-yellow-400 mt-2">55</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-yellow-500/50" />
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg. Recovery Time (MTTR)</p>
                  <h3 className="text-3xl font-bold text-blue-400 mt-2">2m 15s</h3>
                </div>
                <Clock className="w-10 h-10 text-blue-500/50" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Anomalies Chart */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h3 className="text-lg font-medium text-white mb-6">Weekly Anomaly Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={anomalyData}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Services Breakdown */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h3 className="text-lg font-medium text-white mb-6">Anomalies by Service</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={serviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reports
