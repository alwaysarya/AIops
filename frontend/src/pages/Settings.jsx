import React, { useState } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Save, Mail, Bell, Shield, UserPlus, Trash2, MessageSquare } from 'lucide-react'
import axios from 'axios'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('config')
  const [settings, setSettings] = useState({ api_url: 'http://localhost:8000', kafka_url: 'localhost:9092', slack_webhook: '', alert_email: '' })
  const [users, setUsers] = useState([
    { id: 1, name: 'Aryan Thakur', email: 'aryan@opsmind.com', role: 'Admin' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@opsmind.com', role: 'Viewer' }
  ])
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' })
  const [message, setMessage] = useState('')

  const handleSaveConfig = () => {
    setMessage('✅ Configuration saved successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleTestNotification = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/notifications/test-alert')
      setMessage(`✅ Notification Triggered: ${res.data.message}`)
      setTimeout(() => setMessage(''), 5000)
    } catch (e) { setMessage('❌ Failed to trigger notification') }
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: Date.now(), ...newUser }])
      setNewUser({ name: '', email: '', role: 'Viewer' })
    }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-8">Settings</h1>

            <div className="flex space-x-6 mb-8 border-b border-white/10">
              <button onClick={() => setActiveTab('config')} className={`pb-3 font-medium text-sm transition-colors ${activeTab === 'config' ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'}`}>System Config</button>
              <button onClick={() => setActiveTab('notifications')} className={`pb-3 font-medium text-sm transition-colors ${activeTab === 'notifications' ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Notifications</button>
              <button onClick={() => setActiveTab('users')} className={`pb-3 font-medium text-sm transition-colors ${activeTab === 'users' ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'}`}>User Management (RBAC)</button>
            </div>

            {message && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-medium">{message}</div>}

            {activeTab === 'config' && (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-2xl">
                <div className="mb-6">
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">API Gateway URL</label>
                  <input type="text" value={settings.api_url} onChange={(e) => setSettings({...settings, api_url: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                </div>
                <div className="mb-6">
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Kafka Bootstrap Servers</label>
                  <input type="text" value={settings.kafka_url} onChange={(e) => setSettings({...settings, kafka_url: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                </div>
                <button onClick={handleSaveConfig} className="bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" /> Save Configuration
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-2xl">
                <div className="mb-6 flex items-start space-x-4">
                  <div className="p-3 bg-white/5 rounded-xl"><Bell className="w-6 h-6 text-yellow-400" /></div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">Alert Notifications</h3>
                    <p className="text-zinc-500 text-sm mb-4">Send critical alerts to Slack or Email.</p>
                    <div className="space-y-4">
                      <input type="text" placeholder="Slack Webhook URL (https://hooks.slack.com/...)" value={settings.slack_webhook} onChange={(e) => setSettings({...settings, slack_webhook: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                      <input type="email" placeholder="Alert Email (admin@company.com)" value={settings.alert_email} onChange={(e) => setSettings({...settings, alert_email: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 mt-8 pt-6 border-t border-white/5">
                  <button onClick={handleSaveConfig} className="bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                    <Save className="w-4 h-4 mr-2" /> Save Notifications
                  </button>
                  <button onClick={handleTestNotification} className="bg-white/10 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-colors flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Test Notification
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-lg font-medium text-white mb-4">Add New User</h3>
                  <div className="flex space-x-4">
                    <input type="text" placeholder="Full Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="flex-1 bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                    <input type="email" placeholder="Email Address" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="flex-1 bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
                    <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                      <option value="Admin">Admin</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <button onClick={handleAddUser} className="bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center"><UserPlus className="w-4 h-4 mr-2" /> Add</button>
                  </div>
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr><th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Name</th><th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Email</th><th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">Role</th><th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase text-right">Actions</th></tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                          <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                          <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>{user.role}</span></td>
                          <td className="px-6 py-4 text-right"><button onClick={() => setUsers(users.filter(u => u.id !== user.id))} className="text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Settings
