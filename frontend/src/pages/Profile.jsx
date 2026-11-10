import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { User, Mail, Shield, Key } from 'lucide-react'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState({ name: 'Aryan Thakur', email: 'aryan@aiops.com', role: 'Administrator' })
  const [passwords, setPasswords] = useState({ old: '', new: '' })
  const [message, setMessage] = useState('')

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/v1/profile/change-password/aryan', {
        old_password: passwords.old,
        new_password: passwords.new
      })
      setMessage('✅ Password updated successfully!')
      setPasswords({ old: '', new: '' })
    } catch (err) {
      setMessage('❌ Error updating password. Check old password.')
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">User Profile</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
            {/* Profile Info */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                  <p className="text-slate-400">{profile.role}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-slate-300 bg-slate-900 p-3 rounded border border-slate-700">
                  <User className="w-5 h-5 mr-3 text-slate-500" /> {profile.name}
                </div>
                <div className="flex items-center text-slate-300 bg-slate-900 p-3 rounded border border-slate-700">
                  <Mail className="w-5 h-5 mr-3 text-slate-500" /> {profile.email}
                </div>
                <div className="flex items-center text-slate-300 bg-slate-900 p-3 rounded border border-slate-700">
                  <Shield className="w-5 h-5 mr-3 text-slate-500" /> {profile.role}
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-yellow-400" /> Security Settings
              </h3>
              
              {message && <div className="mb-4 text-sm font-bold text-green-400">{message}</div>}
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Current Password</label>
                  <input type="password" required value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">New Password</label>
                  <input type="password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 outline-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
