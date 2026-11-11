import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { ShieldCheck, ShieldAlert, AlertTriangle, RefreshCw } from 'lucide-react'
import axios from 'axios'

const Security = () => {
  const [findings, setFindings] = useState([])
  const [loading, setLoading] = useState(false)

  const runScan = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:8000/api/v1/security/scan')
      setFindings(res.data.findings)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  useEffect(() => { runScan() }, [])

  const getIcon = (severity) => {
    if (severity === 'CRITICAL') return <ShieldAlert className="w-6 h-6 text-red-500" />
    if (severity === 'HIGH') return <ShieldAlert className="w-6 h-6 text-orange-500" />
    if (severity === 'MEDIUM') return <AlertTriangle className="w-6 h-6 text-yellow-500" />
    return <ShieldCheck className="w-6 h-6 text-green-500" />
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Security Center</h1>
                <p className="text-zinc-400 text-sm mt-1">Real-time vulnerability and compliance scanning.</p>
              </div>
              <button onClick={runScan} disabled={loading} className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Scanning...' : 'Run Scan'}
              </button>
            </div>

            <div className="space-y-4">
              {findings.map((f) => (
                <div key={f.id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex items-start space-x-4">
                  <div className="mt-1">{getIcon(f.severity)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-semibold text-lg">{f.title}</h3>
                      <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        f.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                        f.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                        f.severity === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                        'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>{f.severity}</span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2">{f.description}</p>
                    <div className="mt-4 bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-zinc-500 font-medium uppercase mb-1">Remediation</p>
                      <p className="text-sm text-zinc-300">{f.remediation}</p>
                    </div>
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

export default Security
