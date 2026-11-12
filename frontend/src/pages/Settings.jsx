import React, { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import { User, Bell, Moon, Lock } from 'lucide-react'

export default function Settings() {
  const [name, setName] = useState('Aryan Thakur')
  const [email, setEmail] = useState('aryan@opsmind.com')
  const [notifications, setNotifications] = useState(true)

  const handleSave = (e) => {
    e.preventDefault()
    alert('Settings Saved Successfully!')
  }

  return (
    <PageLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        
        {/* Profile Settings */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><User className="w-4 h-4 mr-2"/> Profile Settings</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" />
            </div>
            <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg text-sm hover:bg-yellow-500">Save Changes</button>
          </form>
        </div>

        {/* Preferences */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><Bell className="w-4 h-4 mr-2"/> Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white">Email Notifications</p>
                <p className="text-xs text-zinc-500">Receive alerts for critical incidents</p>
              </div>
              <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-yellow-400' : 'bg-zinc-700'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white">Dark Mode</p>
                <p className="text-xs text-zinc-500">Currently enabled by default</p>
              </div>
              <button className="bg-white/10 text-zinc-400 px-3 py-1.5 rounded-lg text-xs cursor-not-allowed"><Moon className="w-4 h-4 inline mr-1"/> Always On</button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><Lock className="w-4 h-4 mr-2"/> Security</h3>
          <button onClick={() => alert('Password reset link sent to email!')} className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10">Change Password</button>
        </div>

      </div>
    </PageLayout>
  )
}
