import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Server, Database, Globe, Activity, AlertTriangle, Shield } from 'lucide-react'
import axios from 'axios'

const Topology = () => {
  const [data, setData] = useState({ nodes: [], edges: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/topology/graph')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const getIcon = (type) => {
    switch(type) {
      case 'ui': return Globe
      case 'api': return Activity
      case 'db': return Database
      case 'cache': return Shield
      default: return Server
    }
  }

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">System Topology</h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time infrastructure dependency map.</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64 text-zinc-500">Loading topology...</div>
            ) : (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden min-h-[600px]">
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                {/* Visual Canvas */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-12">
                  
                  {/* Top: Frontend & API Gateway */}
                  <div className="flex space-x-24">
                    {data.nodes.filter(n => n.type === 'ui' || n.type === 'api').map(node => {
                      const Icon = getIcon(node.type);
                      return (
                        <div key={node.id} className="flex flex-col items-center">
                          <div className={`p-4 rounded-xl border ${getStatusColor(node.status)} bg-[#111113] shadow-lg`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <span className="mt-3 text-sm font-medium text-white">{node.label}</span>
                          <span className={`text-[10px] uppercase mt-1 font-bold ${node.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>{node.status}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Connection Line */}
                  <div className="w-px h-12 bg-white/20"></div>

                  {/* Middle: Microservices */}
                  <div className="flex flex-wrap justify-center gap-8 max-w-3xl">
                    {data.nodes.filter(n => n.type === 'service').map(node => {
                      const Icon = getIcon(node.type);
                      return (
                        <div key={node.id} className="flex flex-col items-center">
                          <div className={`p-3 rounded-xl border ${getStatusColor(node.status)} bg-[#111113] shadow-lg`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="mt-2 text-xs font-medium text-white">{node.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Connection Line */}
                  <div className="w-px h-12 bg-white/20"></div>

                  {/* Bottom: Databases */}
                  <div className="flex space-x-16">
                    {data.nodes.filter(n => n.type === 'db' || n.type === 'cache').map(node => {
                      const Icon = getIcon(node.type);
                      return (
                        <div key={node.id} className="flex flex-col items-center">
                          <div className={`p-4 rounded-xl border ${getStatusColor(node.status)} bg-[#111113] shadow-lg`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <span className="mt-3 text-sm font-medium text-white">{node.label}</span>
                          <span className={`text-[10px] uppercase mt-1 font-bold ${node.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>{node.status}</span>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Topology
