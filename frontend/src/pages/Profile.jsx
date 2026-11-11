import React, { useState, useEffect } from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { User, Mail, Shield, Key, Save } from 'lucide-react'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState({ username: 'Loading...', email: '' })
  const [passwords, setPasswords] = useState({ old: '', new: '' })
  const [message, setMessage] = useState('')

  // Fetch real user data
  useEffect(() => {
    const username = 'aryan' // In real app, get from localStorage/JWT
    axios.get(`http://localhost:8000/api/v1/profile/${username}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
  }, [])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/api/v1/profile/change-password/${profile.username}`, {
        old_password: passwords.old,
        new_password: passwords.new
      })
      setMessage('✅ Password updated successfully!')
      setPasswords({ old: '', new: '' })
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('❌ Error: Invalid old password')
    }
  }

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">User Profile</h1>
              <p className="text-zinc-400 text-sm mt-1">Manage your account settings and security.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Profile Info Card */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">{profile.username}</h2>
                <p className="text-zinc-500 text-sm mt-1 flex items-center"><Shield className="w-3 h-3 mr-1"/> Administrator</p>
                
                <div className="w-full space-y-4 mt-8">
                  <div className="flex items-center bg-[#111113] p-4 rounded-xl border border-white/5">
                    <User className="w-5 h-5 text-zinc-500 mr-3" />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Username</p>
                      <p className="text-white text-sm font-medium">{profile.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#111113] p-4 rounded-xl border border-white/5">
                    <Mail className="w-5 h-5 text-zinc-500 mr-3" />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Email Address</p>
                      <p className="text-white text-sm font-medium">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Change Card */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Key className="w-5 h-5 mr-2 text-yellow-400" /> Security Settings
                </h3>
                
                {message && <div className={`p-3 rounded-lg mb-6 text-sm font-medium ${message.includes('✅') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{message}</div>}
                
                <form onSubmit={handlePasswordChange} className="space-y-5">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" required value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center mt-4">
                    <Save className="w-4 h-4 mr-2" /> Update Password
                  </button>
                </form>
              </div>

            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Profile
