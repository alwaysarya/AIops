import React, { useState, useEffect } from "react"
import Sidebar from "../components/Common/Sidebar"
import Navbar from "../components/Common/Navbar"
import axios from "axios"

const Settings = () => {
  const [settings, setSettings] = useState({ api_url: "", kafka_url: "" })
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/settings/").then(res => {
      setSettings(res.data)
    }).catch(err => console.error(err))
  }, [])

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/settings/", { key: "api_url", value: settings.api_url })
      await axios.post("http://localhost:8000/api/v1/settings/", { key: "kafka_url", value: settings.kafka_url })
      setMessage("Settings saved successfully!")
    } catch (err) {
      setMessage("Error saving settings")
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
            {message && <div className="mb-4 text-green-400 font-bold">{message}</div>}
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">API Gateway URL</label>
              <input type="text" value={settings.api_url || ""} onChange={(e) => setSettings({...settings, api_url: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">Kafka Bootstrap Servers</label>
              <input type="text" value={settings.kafka_url || ""} onChange={(e) => setSettings({...settings, kafka_url: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2" />
            </div>
            <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Save Configuration
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings
