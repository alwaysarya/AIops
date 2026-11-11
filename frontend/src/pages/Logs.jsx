import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Search, Filter, Download } from 'lucide-react'
import axios from 'axios'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('ALL')

  // Fetch from Database (polling every 5s)
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/logs/', {
          params: { search: searchTerm, level: filterLevel }
        })
        setLogs(res.data.logs)
        setLoading(false)
      } catch (e) { console.error(e); setLoading(false) }
    }
    fetchLogs()
    const interval = setInterval(fetchLogs, 5000)
    return () => clearInterval(interval)
  }, [searchTerm, filterLevel])

  // WebSocket for real-time logs
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/v1/ws/ws')
    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data)
      setLogs(prev => [newLog, ...prev].slice(0, 100))
    }
    return () => ws.close()
  }, [])

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Service', 'Level', 'Message']
    const csvRows = logs.map(log => `"${log.timestamp}","${log.service}","${log.level}","${log.message}"`)
    const csvContent = [headers.join(','), ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Live System Logs</h1>
                <p className="text-zinc-400 text-sm mt-1 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Streaming via WebSocket + Database
                </p>
              </div>
              <button onClick={exportToCSV} className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </button>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                <input type="text" placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#0A0A0A] text-white border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500" />
              </div>
              <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="bg-[#0A0A0A] text-white border border-white/10 rounded-xl px-4 py-3 outline-none">
                <option value="ALL">All Levels</option>
                <option value="INFO">INFO</option>
                <option value="WARNING">WARNING</option>
                <option value="ERROR">ERROR</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="h-[calc(100vh-300px)] overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase bg-white/5 text-zinc-400 sticky top-0 backdrop-blur-md">
                    <tr>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Level</th>
                      <th className="px-6 py-4">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr><td colSpan="4"><LoadingSpinner text="Loading logs..." /></td></tr>
                    ) : logs.length === 0 ? (
                      <tr><td colSpan="4" className="text-center py-8 text-zinc-500">No logs found</td></tr>
                    ) : (
                      logs.map((log, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{new Date(log.timestamp).toLocaleTimeString()}</td>
                          <td className="px-6 py-4 font-medium text-white">{log.service}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                              log.level === 'ERROR' ? 'bg-red-500/10 text-red-400' : 
                              log.level === 'WARNING' ? 'bg-yellow-500/10 text-yellow-400' : 
                              log.level === 'CRITICAL' ? 'bg-purple-500/10 text-purple-400' :
                              'bg-green-500/10 text-green-400'
                            }`}>{log.level}</span>
                          </td>
                          <td className="px-6 py-4 text-zinc-300">{log.message}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Logs
