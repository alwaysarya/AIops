import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'

const Logs = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // WebSocket connection
    const token = localStorage.getItem('token')
    const ws = new WebSocket(`ws://localhost:8000/api/v1/ws/ws?token=${token}`)

    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data)
      setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 50)) // Keep last 50 logs
    }

    return () => ws.close()
  }, [])

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Real-time System Logs</h2>
            <span className="text-green-400 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Stream
            </span>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 h-[calc(100vh-180px)] overflow-y-auto">
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
                {logs.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4">Waiting for logs...</td></tr>
                ) : (
                  logs.map((log, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
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
