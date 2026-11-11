import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Database, Server, Shield, Zap, AlertTriangle, MoreVertical, Search, LayoutDashboard, List, Map, ShieldAlert, BarChart2, HardDrive, User, Settings, ChevronDown, LogOut, Building2, DollarSign, Bell } from 'lucide-react'
import Logo from './Logo'

const TopNavbar = () => {
  const location = useLocation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showNotifPanel, setShowNotifPanel] = useState(false)
  
  const moreMenuRef = useRef()
  const profileMenuRef = useRef()
  const notifRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) setShowMoreMenu(false)
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) setShowProfileMenu(false)
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifPanel(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Connect to Notification WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/v1/notifications/ws')
    ws.onmessage = (event) => {
      const alert = JSON.parse(event.data)
      setNotifications(prev => [alert, ...prev].slice(0, 10))
    }
    return () => ws.close()
  }, [])

  const mainLinks = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/logs', label: 'Logs', icon: List },
    { path: '/metrics', label: 'Metrics', icon: Activity },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  ]

  const dropdownLinks = [
    { path: '/topology', label: 'Topology', icon: Map },
    { path: '/rca', label: 'Root Cause (AI)', icon: Zap },
    { path: '/incidents', label: 'Incidents', icon: ShieldAlert },
    { path: '/reports', label: 'Analytics', icon: BarChart2 },
    { path: '/backup', label: 'Backup', icon: HardDrive },
    { path: '/audit-logs', label: 'Audit Logs', icon: Shield },
    { path: '/organizations', label: 'Organizations', icon: Building2 },
    { path: '/security', label: 'Security', icon: ShieldAlert },
    { path: '/finops', label: 'FinOps', icon: DollarSign },
  ]

  return (
    <header className="h-20 flex items-center justify-between px-8 relative z-50 bg-[#030303] border-b border-white/5">
      
      <div className="flex items-center space-x-10">
        <Link to="/" className="flex items-center gap-3 text-white font-semibold text-xl tracking-tight">
          <Logo className="w-10 h-10" />
          OpsMind
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-2">
          {mainLinks.map((item) => (
            <Link key={item.path} to={item.path} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <item.icon className="w-4 h-4" /><span>{item.label}</span>
            </Link>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <div className="relative" ref={moreMenuRef}>
            <button onClick={() => setShowMoreMenu(!showMoreMenu)} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${showMoreMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span>More</span><ChevronDown className={`w-4 h-4 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
            </button>
            {showMoreMenu && (
              <div className="absolute top-12 left-0 w-56 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                {dropdownLinks.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setShowMoreMenu(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <item.icon className="w-4 h-4" /><span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white"><Search className="w-4 h-4" /></button>
        
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifPanel(!showNotifPanel)} className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white relative">
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#030303]"></span>}
          </button>
          
          {showNotifPanel && (
            <div className="absolute top-12 right-0 w-80 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-4 z-50">
              <h4 className="text-white font-medium mb-3">Live Alerts</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? <p className="text-xs text-zinc-500">No new alerts.</p> : 
                  notifications.map((n, i) => (
                    <div key={i} className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <p className={`text-xs font-bold ${n.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>{n.title}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{n.message}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 p-0.5 cursor-pointer hover:border-white/30">
            <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full rounded-full object-cover" />
          </button>
          {showProfileMenu && (
            <div className="absolute top-12 right-0 w-48 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-2 z-50">
              <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5"><User className="w-4 h-4" /><span>Profile</span></Link>
              <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5"><Settings className="w-4 h-4" /><span>Settings</span></Link>
              <div className="h-px bg-white/5 my-1"></div>
              <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"><LogOut className="w-4 h-4" /><span>Log out</span></button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
