import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { Search, Filter } from 'lucide-react'
import axios from 'axios'

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('ALL')

  useEffect(() => {
    // Poll backend every 2 seconds for new logs
    const fetchLogs = () => {
      axios.get('http://localhost:8000/api/v1/logs/')
        .then(res => setLogs(res.data.logs.reverse()))
        .catch(err => console.error(err))
    }
    fetchLogs()
    const interval = setInterval(fetchLogs, 2000)
    return () => clearInterval(interval)
  }, [])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel
    return matchesSearch && matchesLevel
  })

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">System Logs</h2>
            <span className="text-green-400 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Polling
            </span>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg pl-10 pr-4 py-2 outline-none" 
              />
            </div>
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 outline-none"
            >
              <option value="ALL">All Levels</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 h-[calc(100vh-240px)] overflow-y-auto">
            <table className="w-full text-left text-slate-300">
              <thead className="text-xs uppercase bg-slate-700 text-slate-400 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4">Waiting for logs...</td></tr>
                ) : (
                  filteredLogs.map((log, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="px-4 py-3 font-medium">{log.service}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          log.level === 'ERROR' ? 'bg-red-500/20 text-red-400' : 
                          log.level === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{log.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Logs
