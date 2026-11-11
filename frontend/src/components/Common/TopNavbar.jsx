import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Bell, User, Settings, Globe } from 'lucide-react'

const TopNavbar = () => {
  return (
    <header className="h-[72px] flex items-center justify-between px-6 bg-[#0A0A0A] border-b border-white/5">
      {/* Left: User Info */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
          A
        </div>
        <div>
          <div className="text-white font-medium text-sm">Aryan Thakur</div>
          <div className="text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded inline-block mt-0.5">Admin</div>
        </div>
      </div>

      {/* Right: Search, Lang, Theme, Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search pages and actions..." 
            className="w-full bg-[#111113] text-zinc-300 text-sm rounded-lg pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-zinc-500" 
          />
        </div>
        <button className="flex items-center text-sm text-zinc-400 hover:text-white space-x-1">
          <Globe className="w-4 h-4" /> <span>English</span>
        </button>
        <button className="p-2 text-zinc-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white ml-2">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
