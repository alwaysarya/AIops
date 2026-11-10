import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { Database, Download, Upload, HardDrive } from 'lucide-react'
import axios from 'axios'

const Backup = () => {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchBackups = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/v1/backup/list')
      setBackups(res.data.backups)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { fetchBackups() }, [])

  const handleBackup = async () => {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8081/api/v1/backup/create')
      setMessage(`✅ Backup created: ${res.data.backup_name} (${res.data.size_kb})`)
      fetchBackups()
    } catch (e) {
      setMessage('❌ Backup failed')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <HardDrive className="w-6 h-6 mr-3 text-blue-400" /> Backup & Disaster Recovery
            </h2>
            <button onClick={handleBackup} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-colors disabled:opacity-50">
              <Database className="w-4 h-4 mr-2" /> {loading ? 'Creating...' : 'Create Backup Now'}
            </button>
          </div>

          {message && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded">{message}</div>}

          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full text-left text-slate-300">
              <thead className="text-xs uppercase bg-slate-700 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Backup Name</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No backups found. Create your first backup.</td></tr>
                ) : (
                  backups.map((b, i) => (
                    <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-mono text-sm text-white">{b.name}</td>
                      <td className="px-6 py-4 text-slate-400">{b.size_kb}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm"><Download className="w-4 h-4 inline mr-1" />Download</button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm"><Upload className="w-4 h-4 inline mr-1" />Restore</button>
                      </td>
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

export default Backup
