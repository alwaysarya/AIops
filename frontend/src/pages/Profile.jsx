import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { User, Mail, Shield, Save } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Aryan Thakur',
    email: 'aryan@aiops.com',
    role: 'Administrator'
  })

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">User Profile</h2>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                <p className="text-slate-400">{profile.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Full Name</label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-3 py-2">
                  <User className="w-5 h-5 text-slate-500 mr-3" />
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className="bg-transparent text-white w-full outline-none disabled:opacity-50" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Email Address</label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-3 py-2">
                  <Mail className="w-5 h-5 text-slate-500 mr-3" />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className="bg-transparent text-white w-full outline-none disabled:opacity-50" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2">Role</label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-3 py-2">
                  <Shield className="w-5 h-5 text-slate-500 mr-3" />
                  <input 
                    type="text" 
                    value={profile.role} 
                    disabled
                    className="bg-transparent text-slate-500 w-full outline-none cursor-not-allowed" 
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-4">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center transition-colors">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded transition-colors">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
