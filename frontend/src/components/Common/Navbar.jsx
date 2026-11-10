import React, { useState } from 'react'
import { Bell, Search, User } from 'lucide-react'
import SystemStatus from './SystemStatus'

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="apple-glass h-16 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center flex-1">
        <div className="relative w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white/5 text-gray-200 text-sm rounded-lg pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <SystemStatus />
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-gray-300 cursor-pointer hover:border-white/30 transition-all">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
