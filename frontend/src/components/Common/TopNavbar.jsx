import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Database, Server, Shield, Zap, AlertTriangle, MoreVertical, Search, LayoutDashboard, List, Map, ShieldAlert, BarChart2, HardDrive, User, Settings, ChevronDown, LogOut } from 'lucide-react'
import Logo from './Logo'

const TopNavbar = () => {
  const location = useLocation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  const moreMenuRef = useRef()
  const profileMenuRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false)
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
  ]

  return (
    <header className="h-20 flex items-center justify-between px-8 relative z-50 bg-[#030303] border-b border-white/5">
      
      {/* Left Side: Logo + Main Links */}
      <div className="flex items-center space-x-10">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 text-white font-semibold text-xl tracking-tight">
          <Logo className="w-10 h-10" />
          OpsMind
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-2">
          {mainLinks.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* More Dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button 
              onClick={() => setShowMoreMenu(!showMoreMenu)} 
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${
                showMoreMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showMoreMenu && (
              <div className="absolute top-12 left-0 w-56 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Intelligence</div>
                {dropdownLinks.slice(0, 4).map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setShowMoreMenu(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <item.icon className="w-4 h-4" /><span>{item.label}</span>
                  </Link>
                ))}
                <div className="px-3 py-2 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">System</div>
                {dropdownLinks.slice(4).map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setShowMoreMenu(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <item.icon className="w-4 h-4" /><span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all relative">
          <AlertTriangle className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#030303]"></span>
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 p-0.5 cursor-pointer hover:border-white/30 transition-all flex items-center justify-center overflow-hidden"
          >
            <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full rounded-full object-cover" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute top-12 right-0 w-48 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-sm font-medium text-white">Aryan Thakur</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <User className="w-4 h-4" /><span>Profile</span>
              </Link>
              <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="w-4 h-4" /><span>Settings</span>
              </Link>
              <div className="h-px bg-white/5 my-1"></div>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" /><span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
