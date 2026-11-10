import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { Save, Mail, Bell, Shield, UserPlus, Trash2 } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('config')
  const [settings, setSettings] = useState({ api_url: 'http://localhost:8000', kafka_url: 'localhost:9092', slack_webhook: '', email: '' })
  const [users, setUsers] = useState([
    { id: 1, name: 'Aryan Thakur', email: 'aryan@aiops.com', role: 'Admin' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@aiops.com', role: 'Viewer' }
  ])
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' })

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: Date.now(), ...newUser }])
      setNewUser({ name: '', email: '', role: 'Viewer' })
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

          <div className="flex space-x-4 mb-6 border-b border-slate-700 pb-2">
            <button onClick={() => setActiveTab('config')} className={`pb-2 px-1 font-medium ${activeTab === 'config' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}>System Config</button>
            <button onClick={() => setActiveTab('notifications')} className={`pb-2 px-1 font-medium ${activeTab === 'notifications' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}>Notifications</button>
            <button onClick={() => setActiveTab('users')} className={`pb-2 px-1 font-medium ${activeTab === 'users' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}>User Management (RBAC)</button>
          </div>
          
          {activeTab === 'config' && (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
              <div className="mb-6">
                <label className="block text-slate-400 text-sm font-bold mb-2">API Gateway URL</label>
                <input type="text" value={settings.api_url} onChange={(e) => setSettings({...settings, api_url: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
              </div>
              <div className="mb-6">
                <label className="block text-slate-400 text-sm font-bold mb-2">Kafka Bootstrap Servers</label>
                <input type="text" value={settings.kafka_url} onChange={(e) => setSettings({...settings, kafka_url: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center transition-colors">
                <Save className="w-4 h-4 mr-2" /> Save Config
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
              <div className="mb-6 flex items-center">
                <Mail className="w-5 h-5 text-slate-400 mr-3" />
                <div className="flex-1">
                  <label className="block text-slate-400 text-sm font-bold mb-2">Alert Email Address</label>
                  <input type="email" placeholder="admin@company.com" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                </div>
              </div>
              <div className="mb-6 flex items-center">
                <Bell className="w-5 h-5 text-slate-400 mr-3" />
                <div className="flex-1">
                  <label className="block text-slate-400 text-sm font-bold mb-2">Slack Webhook URL</label>
                  <input type="text" placeholder="https://hooks.slack.com/..." value={settings.slack_webhook} onChange={(e) => setSettings({...settings, slack_webhook: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center transition-colors">
                <Save className="w-4 h-4 mr-2" /> Save Notifications
              </button>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">Add New User</h3>
                <div className="flex space-x-4">
                  <input type="text" placeholder="Full Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="flex-1 bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                  <input type="email" placeholder="Email Address" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="flex-1 bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                  <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none">
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors"><UserPlus className="w-4 h-4 mr-2" /> Add</button>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full text-left text-slate-300">
                  <thead className="text-xs uppercase bg-slate-700 text-slate-400">
                    <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th><th className="px-6 py-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold flex items-center w-max ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-600/50 text-slate-300'}`}><Shield className="w-3 h-3 mr-1" /> {user.role}</span></td>
                        <td className="px-6 py-4 text-right"><button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Settings
