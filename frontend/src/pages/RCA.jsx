import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { Activity, Server, Database, Network, AlertTriangle } from 'lucide-react'

const RCA = () => {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const runAnalysis = () => {
    setLoading(true)
    setAnalysis(null)
    // Simulate AI Root Cause Analysis
    setTimeout(() => {
      setAnalysis({
        issue: "High Latency in Payment Service",
        rootCause: "Database Connection Pool Exhaustion",
        confidence: "94%",
        impactedServices: ["payment-service", "checkout-service"],
        dependencyChain: [
          { name: "Frontend", status: "healthy", icon: Network },
          { name: "Payment Service", status: "critical", icon: Server },
          { name: "PostgreSQL DB", status: "warning", icon: Database },
        ],
        recommendation: "Increase DB max_connections from 100 to 200 and restart the payment service pods."
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">AI Root Cause Analysis (RCA)</h2>
            <button 
              onClick={runAnalysis}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50"
            >
              <Activity className="w-5 h-5 mr-2" /> 
              {loading ? 'Analyzing System...' : 'Run Analysis'}
            </button>
          </div>

          {!analysis && !loading && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
              <Server className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">Click "Run Analysis" to detect root causes using AI.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-purple-400 font-medium animate-pulse">Scanning dependency graphs and logs...</p>
            </div>
          )}

          {analysis && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Result Card */}
              <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-red-500/20 rounded-lg text-red-400">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{analysis.issue}</h3>
                    <p className="text-red-400 font-medium">Root Cause: {analysis.rootCause}</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">AI Confidence Score</span>
                    <span className="text-green-400 font-bold">{analysis.confidence}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: analysis.confidence }}></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-300 font-medium mb-3">Recommended Fix</h4>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg text-blue-300 text-sm">
                    {analysis.recommendation}
                  </div>
                </div>
              </div>

              {/* Dependency Graph */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h4 className="text-slate-300 font-medium mb-4">Dependency Chain</h4>
                <div className="space-y-4">
                  {analysis.dependencyChain.map((node, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        node.status === 'critical' ? 'bg-red-500/20 text-red-400' : 
                        node.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-green-500/20 text-green-400'
                      }`}>
                        <node.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{node.name}</p>
                        <p className={`text-xs uppercase ${
                          node.status === 'critical' ? 'text-red-400' : 
                          node.status === 'warning' ? 'text-yellow-400' : 
                          'text-green-400'
                        }`}>{node.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default RCA
