import React, { useState } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Brain, Activity, TrendingUp, Server, AlertTriangle } from 'lucide-react'
import axios from 'axios'

const RCA = () => {
  const [service, setService] = useState('payment-service')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')

  const runAnalysis = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const res = await axios.post('http://localhost:8000/api/v1/rca/analyze', { service })
      const aiData = JSON.parse(res.data.ai_analysis)
      setAnalysis(aiData)
    } catch (err) {
      setError('Failed to analyze. Check backend connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1000px] mx-auto">

            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">AI Root Cause Analysis</h1>
              <p className="text-zinc-400 text-sm mt-1">Analyze logs and infrastructure to detect the probable root cause.</p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 mb-8">
              <form onSubmit={runAnalysis} className="flex space-x-4">
                <select value={service} onChange={(e) => setService(e.target.value)} className="flex-1 bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                  <option value="payment-service">payment-service</option>
                  <option value="auth-service">auth-service</option>
                  <option value="user-service">user-service</option>
                  <option value="api-gateway">api-gateway</option>
                </select>
                <button type="submit" disabled={loading} className="bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center">
                  {loading ? 'Analyzing...' : 'Run AI Analysis'}
                </button>
              </form>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-8">{error}</div>}

            {analysis && (
              <div className="space-y-6">
                <div className="bg-[#0A0A0A] border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Brain className="w-32 h-32 text-purple-500" /></div>
                  <div className="relative z-10">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-md border border-purple-500/20 uppercase tracking-wider mb-4 inline-block">AI Analysis Complete</span>
                    <h2 className="text-2xl font-semibold text-white mb-2">{service}</h2>
                    <div className="bg-[#111113] rounded-xl p-5 border border-white/5 mb-6">
                      <h3 className="text-sm font-medium text-zinc-400 mb-2">Probable Root Cause</h3>
                      <p className="text-lg text-white font-medium">{analysis.root_cause}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div>
                        <h3 className="text-xs font-medium text-zinc-500 uppercase">Confidence Score</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-2xl font-bold ${analysis.confidence > 70 ? 'text-green-400' : 'text-yellow-400'}`}>{analysis.confidence}%</span>
                          <TrendingUp className="w-4 h-4 ml-2 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-blue-400 font-medium flex items-center mb-2"><Activity className="w-5 h-5 mr-2" /> AI Recommendation</h3>
                  <p className="text-white text-lg">{analysis.recommendation}</p>
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

export default RCA
