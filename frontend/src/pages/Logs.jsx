import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'

const Logs = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">System Logs</h2>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
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
                <tr className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="px-4 py-3">10:45:21</td>
                  <td className="px-4 py-3">payment-service</td>
                  <td className="px-4 py-3 text-red-400">ERROR</td>
                  <td className="px-4 py-3">Timeout connecting to DB</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="px-4 py-3">10:46:02</td>
                  <td className="px-4 py-3">auth-service</td>
                  <td className="px-4 py-3 text-green-400">INFO</td>
                  <td className="px-4 py-3">User login successful</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Logs
