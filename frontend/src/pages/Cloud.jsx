import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Cloud, Server } from 'lucide-react'
import axios from 'axios'

const CloudResources = () => {
  const [data, setData] = useState({ resources: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/cloud/resources')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if (loading) return <div className="flex h-screen bg-[#030303] text-white items-center justify-center">Loading cloud resources...</div>

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center">
                <Cloud className="w-8 h-8 mr-3 text-blue-400" /> Cloud Infrastructure
              </h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time multi-cloud resource monitoring (AWS, GCP, Azure).</p>
            </div>

            <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Provider</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Resource ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Region</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">CPU</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Memory</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.resources.map((res) => (
                    <tr key={res.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center">
                        <Server className="w-4 h-4 mr-2 text-zinc-500" /> {res.provider}
                      </td>
                      <td className="px-6 py-4 text-zinc-400 font-mono text-sm">{res.id}</td>
                      <td className="px-6 py-4 text-zinc-400">{res.region}</td>
                      <td className="px-6 py-4 text-zinc-300">{res.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-white text-sm w-10">{res.cpu}%</span>
                          <div className="w-16 bg-white/5 rounded-full h-1.5 ml-2"><div className="bg-blue-500 h-full rounded-full" style={{ width: `${res.cpu}%` }}></div></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-white text-sm w-10">{res.memory}%</span>
                          <div className="w-16 bg-white/5 rounded-full h-1.5 ml-2"><div className="bg-purple-500 h-full rounded-full" style={{ width: `${res.memory}%` }}></div></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          res.status === 'running' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                          res.status === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {res.status}
                        </span>
                      </td>
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

export default CloudResources
