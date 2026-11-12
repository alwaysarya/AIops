import React, { useState } from 'react'
import { Search, Globe, Sun, Bell, Menu, LogOut, User, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TopNavbar = ({ setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.toLowerCase().includes('agent')) navigate('/new-agent')
    else if (searchQuery.toLowerCase().includes('incident')) navigate('/incidents')
    else if (searchQuery.toLowerCase().includes('runbook')) navigate('/runbooks')
    else if (searchQuery.toLowerCase().includes('cloud')) navigate('/connect-data')
    else alert('No results found for: ' + searchQuery)
  }

  return (
    <header className="h-[72px] flex items-center justify-between px-4 lg:px-6 bg-[#0A0A0A] border-b border-white/5 shrink-0 relative">
      <div className="flex items-center space-x-3 w-full max-w-md">
        <button className="lg:hidden text-zinc-400 hover:text-white mr-2" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <form onSubmit={handleSearch} className="relative w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search pages and actions..." 
            className="w-full bg-[#111113] text-zinc-300 text-sm rounded-full pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-zinc-500" 
          />
        </form>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
        <button className="hidden sm:flex items-center text-sm text-zinc-400 hover:text-white space-x-1">
          <Globe className="w-4 h-4" /> <span>English</span>
        </button>
        <button className="p-2 text-zinc-400 hover:text-white">
          <Sun className="w-4 h-4" />
        </button>
        
        <button onClick={() => setShowNotif(!showNotif)} className="p-2 text-zinc-400 hover:text-white relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {showNotif && (
          <div className="absolute top-16 right-20 bg-[#111113] border border-white/10 rounded-lg p-4 w-64 shadow-xl z-50">
            <p className="text-white text-sm font-bold mb-2">Notifications</p>
            <div className="text-xs text-zinc-400 mb-2">🔴 1 P1 Incident: API Gateway Down</div>
            <div className="text-xs text-zinc-400">🟢 All services are healthy.</div>
          </div>
        )}

        <div className="relative">
          <div onClick={() => setShowProfile(!showProfile)} className="flex items-center space-x-3 pl-2 sm:pl-4 sm:border-l border-white/10 ml-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-sm border-2 border-black">A</div>
            <div className="hidden sm:block">
              <div className="text-white font-medium text-sm">Aryan Thakur</div>
              <div className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded inline-block mt-0.5 border border-white/10">Admin</div>
            </div>
          </div>
          {showProfile && (
            <div className="absolute top-14 right-0 bg-[#111113] border border-white/10 rounded-lg p-2 w-48 shadow-xl z-50">
              <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 rounded flex items-center"><Settings className="w-4 h-4 mr-2"/> Settings</button>
              <button onClick={() => { localStorage.removeItem('token'); navigate('/auth'); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded flex items-center"><LogOut className="w-4 h-4 mr-2"/> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
