import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import axios from 'axios'

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/logs/')
      .then(response => {
        // API se data aa raha hai
        setLogs(response.data.logs || [])
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching logs:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">System Logs</h2>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            {loading ? (
              <p className="text-slate-400">Loading logs...</p>
            ) : logs.length === 0 ? (
              <p className="text-slate-400">No logs found. Backend is ready to receive logs.</p>
            ) : (
              <table className="w-full text-left text-slate-300">
                <thead className="text-xs uppercase bg-slate-700 text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3">{log.timestamp}</td>
                      <td className="px-4 py-3">{log.service}</td>
                      <td className={`px-4 py-3 ${log.level === 'ERROR' ? 'text-red-400' : 'text-green-400'}`}>{log.level}</td>
                      <td className="px-4 py-3">{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Logs
