import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import axios from 'axios'
import { Save } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({ api_url: '', kafka_url: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch existing settings on load
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/settings/')
      .then(res => {
        setSettings({
          api_url: res.data.api_url || '',
          kafka_url: res.data.kafka_url || ''
        })
      })
      .catch(err => console.error("Error loading settings:", err))
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    try {
      await axios.post('http://localhost:8000/api/v1/settings/', { key: 'api_url', value: settings.api_url })
      await axios.post('http://localhost:8000/api/v1/settings/', { key: 'kafka_url', value: settings.kafka_url })
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error saving settings. Is backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">System Configuration</h2>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
            {message && (
              <div className={`mb-4 p-3 rounded font-bold ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {message}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-bold mb-2">API Gateway URL</label>
              <input 
                type="text" 
                value={settings.api_url} 
                onChange={(e) => setSettings({...settings, api_url: e.target.value})}
                placeholder="e.g. http://localhost:8000"
                className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-bold mb-2">Kafka Bootstrap Servers</label>
              <input 
                type="text" 
                value={settings.kafka_url} 
                onChange={(e) => setSettings({...settings, kafka_url: e.target.value})}
                placeholder="e.g. localhost:9092"
                className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded flex items-center transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings
