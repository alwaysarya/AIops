import React from 'react'

import TopNavbar from '../components/Common/TopNavbar'
import { Server, Database, Globe, Activity } from 'lucide-react'

const Topology = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">System Topology Map</h2>
            <span className="text-sm text-slate-400">Live Architecture View</span>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 h-[calc(100vh-200px)] relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Network Map */}
            <div className="relative z-10 flex flex-col items-center space-y-12">
              
              {/* Load Balancer Layer */}
              <div className="flex items-center space-x-4 bg-slate-900/80 border border-blue-500/50 p-4 rounded-lg shadow-lg shadow-blue-500/20">
                <Globe className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-bold">Load Balancer</h3>
                  <p className="text-xs text-green-400">Status: Active</p>
                </div>
              </div>

              {/* Connection Line */}
              <div className="w-0.5 h-12 bg-slate-600"></div>

              {/* API Layer */}
              <div className="flex space-x-8">
                <div className="flex items-center space-x-3 bg-slate-900/80 border border-green-500/50 p-4 rounded-lg shadow-lg shadow-green-500/20">
                  <Activity className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-white font-bold">API Gateway</h3>
                    <p className="text-xs text-slate-400">Port 8000</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-900/80 border border-purple-500/50 p-4 rounded-lg shadow-lg shadow-purple-500/20">
                  <Server className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="text-white font-bold">AI Detector</h3>
                    <p className="text-xs text-slate-400">Port 8001</p>
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              <div className="flex space-x-32">
                <div className="w-0.5 h-12 bg-slate-600"></div>
                <div className="w-0.5 h-12 bg-slate-600"></div>
              </div>

              {/* Database Layer */}
              <div className="flex space-x-16">
                <div className="flex items-center space-x-3 bg-slate-900/80 border border-yellow-500/50 p-4 rounded-lg shadow-lg shadow-yellow-500/20">
                  <Database className="w-6 h-6 text-yellow-400" />
                  <div>
                    <h3 className="text-white font-bold">PostgreSQL</h3>
                    <p className="text-xs text-yellow-400">High Load</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-900/80 border border-slate-600 p-4 rounded-lg">
                  <Database className="w-6 h-6 text-slate-400" />
                  <div>
                    <h3 className="text-white font-bold">Redis Cache</h3>
                    <p className="text-xs text-green-400">Connected</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Topology
