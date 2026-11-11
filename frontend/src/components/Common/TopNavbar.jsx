import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Database, Server, Shield, Zap, AlertTriangle, MoreVertical, Search, LayoutDashboard, List, Map, ShieldAlert, BarChart2, HardDrive, User, Settings } from 'lucide-react'

const TopNavbar = () => {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  const mainLinks = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/logs', label: 'Logs', icon: List },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  ]

  const dropdownLinks = [
    { path: '/topology', label: 'Topology', icon: Map },
    { path: '/rca', label: 'Root Cause (AI)', icon: Zap },
    { path: '/incidents', label: 'Incidents', icon: ShieldAlert },
    { path: '/reports', label: 'Analytics', icon: BarChart2 },
    { path: '/backup', label: 'Backup', icon: HardDrive },
    { path: '/audit-logs', label: 'Audit Logs', icon: Shield },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  const getLinkClass = (path) => {
    const isActive = location.pathname === path
    return `px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${
      isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`
  }

  return (
    <header className="h-20 flex items-center justify-between px-8 relative z-50 bg-[#030303] border-b border-white/5">
      
      {/* Left Side: Logo + Main Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-full bg-[#151515] border border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#8b5cf6]"></div>
          </div>
          OpsMind
        </Link>
        
        <nav className="hidden lg:flex items-center bg-[#151515] border border-white/10 rounded-full p-1 space-x-1">
          {mainLinks.map((item) => (
            <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Dropdown Menu for all other links */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)} 
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${
                showMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
              <span>More</span>
            </button>
            
            {showMenu && (
              <div className="absolute top-12 left-0 w-56 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                {dropdownLinks.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                      location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Side: Search, Alert, Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors relative">
          <AlertTriangle className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
        <Link to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-900 border border-white/20 p-0.5 ml-2 cursor-pointer hover:border-white/40 transition-colors">
          <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full rounded-full object-cover" />
        </Link>
      </div>
    </header>
  )
}

export default TopNavbar
