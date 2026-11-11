import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Database, Download, Upload, HardDrive } from 'lucide-react'
import axios from 'axios'

const Backup = () => {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchBackups = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/backup/list')
      setBackups(res.data.backups)
      setLoading(false)
    } catch (e) { console.error(e); setLoading(false) }
  }

  useEffect(() => { fetchBackups() }, [])

  const handleBackup = async () => {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/api/v1/backup/create')
      setMessage(`✅ Backup created: ${res.data.backup_name} (${res.data.size_kb})`)
      fetchBackups()
    } catch (e) {
      setMessage('❌ Backup failed')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleRestore = async (name) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/backup/restore/${name}`)
      setMessage(`✅ Database restored from ${name}`)
      setTimeout(() => setMessage(''), 5000)
    } catch (e) {
      setMessage('❌ Restore failed')
    }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center">
                  <HardDrive className="w-8 h-8 mr-3 text-blue-400" /> Backup & Disaster Recovery
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Create and restore database backups.</p>
              </div>
              <button onClick={handleBackup} disabled={loading} className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center disabled:opacity-50">
                <Database className="w-4 h-4 mr-2" /> {loading ? 'Creating...' : 'Create Backup'}
              </button>
            </div>

            {message && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-medium">{message}</div>}

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Backup Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Size</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {backups.length === 0 ? (
                    <tr><td colSpan="3" className="text-center py-8 text-zinc-500">No backups found. Create your first backup.</td></tr>
                  ) : (
                    backups.map((b, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-white">{b.name}</td>
                        <td className="px-6 py-4 text-zinc-400">{b.size_kb}</td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <button onClick={() => handleRestore(b.name)} className="text-yellow-400 hover:text-yellow-300 text-sm font-medium inline-flex items-center">
                            <Upload className="w-4 h-4 mr-1" /> Restore
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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

export default Backup
