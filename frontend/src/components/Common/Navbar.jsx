import React from 'react'
import { Bell, Search, User } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6">
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
        <button className="text-slate-400 hover:text-white relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
