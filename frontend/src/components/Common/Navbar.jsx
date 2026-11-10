import React, { useState } from 'react'
import { Bell, Search, User } from 'lucide-react'

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 relative">
      <div className="flex items-center">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs, metrics..." 
            className="bg-slate-900 text-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 border border-slate-700"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-400 hover:text-white relative p-2"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-800"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-slate-700 font-semibold text-white">Notifications</div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer">
                  <p className="text-sm text-white font-medium">High CPU Usage</p>
                  <p className="text-xs text-slate-400">Node-01 reached 95% CPU</p>
                  <p className="text-xs text-slate-500 mt-1">2 mins ago</p>
                </div>
                <div className="p-3 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer">
                  <p className="text-sm text-white font-medium">New Service Deployed</p>
                  <p className="text-xs text-slate-400">Payment Service v1.2 is live</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-xs font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">PROD</div>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
