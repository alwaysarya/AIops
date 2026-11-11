import React, { useState } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Activity, AlertTriangle, Shield, Zap, Server, Database, Cloud, TrendingUp, MoreVertical } from 'lucide-react'

const Home = () => {
  const [timeRange, setTimeRange] = useState('1h')

  // Fake data for professional chart
  const chartData = [40, 65, 30, 80, 45, 90, 60, 35, 70, 55, 85, 40, 95, 50, 75, 60, 40, 80, 55, 70]
  
  return (
    <div className="flex h-screen bg-[#000000] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Header Section */}
            <div className="flex justify-between items-end mb-8 animate-fadeIn">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Real-time system health and AI-powered insights</p>
              </div>
              
              {/* Time Range Selector */}
              <div className="flex bg-[#0A0A0A] border border-white/10 rounded-lg p-1">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      timeRange === range ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              
              {/* Left Column: Infrastructure */}
              <div className="lg:col-span-3 space-y-6">
                {/* Cluster Card */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all animate-slideUp">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/5 rounded-lg"><Cloud className="w-5 h-5 text-blue-400" /></div>
                      <div>
                        <h3 className="text-white font-medium text-sm">Production Cluster</h3>
                        <p className="text-xs text-gray-500">AWS · us-east-1</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 uppercase">Healthy</span>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">CPU Usage</span>
                        <span className="text-white font-medium">68%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white font-medium">72%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Card */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all animate-slideUp" style={{ animationDelay: '0.1s' }}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/5 rounded-lg"><Database className="w-5 h-5 text-yellow-400" /></div>
                      <div>
                        <h3 className="text-white font-medium text-sm">Database Cluster</h3>
                        <p className="text-xs text-gray-500">GCP · us-central1</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold rounded border border-yellow-500/20 uppercase">Warning</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Real Chart */}
              <div className="lg:col-span-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 h-full flex flex-col animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-sm">System Performance</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                       <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span> CPU</span>
                       <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1.5"></span> Memory</span>
                    </div>
                  </div>
                  
                  {/* Bar Chart Container */}
                  <div className="flex-1 flex items-end justify-between space-x-1.5 min-h-[250px]">
                    {chartData.map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end group">
                        <div 
                          className="w-full bg-blue-500/20 rounded-t-sm group-hover:bg-blue-500 transition-all duration-300 relative"
                          style={{ height: `${height}%` }}
                        >
                          {/* Inner Bar for double column effect */}
                          <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ height: '50%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-4 border-t border-white/5 pt-4">
                    <span>00:00</span>
                    <span>04:00</span>
                    <span>08:00</span>
                    <span>12:00</span>
                    <span>16:00</span>
                    <span>20:00</span>
                  </div>
                </div>
              </div>

              {/* Right Column: SLA Gauge */}
              <div className="lg:col-span-3">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 h-full flex flex-col animate-slideUp" style={{ animationDelay: '0.3s' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-sm">SLA Compliance</h3>
                    <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                  
                  <div className="flex justify-center mb-6 relative">
                    <svg width="180" height="100" viewBox="0 0 180 100">
                      <path d="M 15 90 A 75 75 0 0 1 165 90" fill="none" stroke="#1A1A1A" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 15 90 A 75 75 0 0 1 165 90" fill="none" stroke="#3B82F6" strokeWidth="16" strokeLinecap="round" strokeDasharray="60 250" strokeDashoffset="-10" />
                      <path d="M 15 90 A 75 75 0 0 1 165 90" fill="none" stroke="#10B981" strokeWidth="16" strokeLinecap="round" strokeDasharray="50 250" strokeDashoffset="-75" />
                      <path d="M 15 90 A 75 75 0 0 1 165 90" fill="none" stroke="#8B5CF6" strokeWidth="16" strokeLinecap="round" strokeDasharray="45 250" strokeDashoffset="-130" />
                    </svg>
                  </div>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span><span className="text-gray-400">Met SLA</span></div>
                      <span className="text-white font-medium">49.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span><span className="text-gray-400">Missed SLA</span></div>
                      <span className="text-white font-medium">18.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span><span className="text-gray-400">Data SLA</span></div>
                      <span className="text-white font-medium">32.0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Uptime', val: '99.98%', trend: '+0.02%', icon: Activity, color: 'text-green-400' },
                { title: 'Active Incidents', val: '12', trend: '+3.7%', icon: AlertTriangle, color: 'text-red-400' },
                { title: 'Predicted Failures', val: '04', trend: '+4.04%', icon: Zap, color: 'text-yellow-400' },
                { title: 'SLA Compliance', val: '94%', trend: '+2.1%', icon: Shield, color: 'text-blue-400' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group animate-slideUp" style={{ animationDelay: `${0.4 + (i * 0.1)}s` }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400 font-medium">{item.title}</span>
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-semibold text-white tracking-tight">{item.val}</h3>
                    <span className={`text-xs font-medium ${item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.trend}</span>
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
