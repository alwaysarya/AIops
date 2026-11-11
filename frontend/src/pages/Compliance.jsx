import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react'
import axios from 'axios'

const Compliance = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/compliance/status')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if (loading) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading compliance data...</div>
  if (!data) return <div className="text-red-400">Failed to load compliance data.</div>

  const getIcon = (status) => {
    if (status === 'PASS') return <ShieldCheck className="w-5 h-5 text-green-400" />
    if (status === 'WARNING') return <AlertTriangle className="w-5 h-5 text-yellow-400" />
    return <XCircle className="w-5 h-5 text-red-400" />
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center">
                <ShieldCheck className="w-8 h-8 mr-3 text-green-400" /> Compliance Center
              </h1>
              <p className="text-zinc-400 text-sm mt-1">SOC 2, ISO 27001, GDPR, and India DPDP compliance status.</p>
            </div>

            {/* Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Compliance Score</p>
                <h3 className="text-4xl font-bold text-white mt-2">{data.compliance_score}%</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-green-500/20 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Passed</p>
                <h3 className="text-4xl font-bold text-green-400 mt-2">{data.passed}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-yellow-500/20 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Warnings</p>
                <h3 className="text-4xl font-bold text-yellow-400 mt-2">{data.warning}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-red-500/20 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm font-medium">Failed</p>
                <h3 className="text-4xl font-bold text-red-400 mt-2">{data.failed}</h3>
              </div>
            </div>

            {/* Controls Table */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Framework</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Control</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.controls.map((c, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{c.framework}</td>
                      <td className="px-6 py-4 text-zinc-300">{c.control}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getIcon(c.status)}
                          <span className={`text-xs font-bold ${
                            c.status === 'PASS' ? 'text-green-400' : c.status === 'WARNING' ? 'text-yellow-400' : 'text-red-400'
                          }`}>{c.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">{c.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Compliance
