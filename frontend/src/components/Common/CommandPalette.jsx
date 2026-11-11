import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutDashboard, List, AlertTriangle, Map, Zap, ShieldAlert, BarChart2, HardDrive, Shield, User, Settings, DollarSign, Building2, X } from 'lucide-react'

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const commands = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Live Logs', path: '/logs', icon: List },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
    { name: 'Topology', path: '/topology', icon: Map },
    { name: 'Root Cause (AI)', path: '/rca', icon: Zap },
    { name: 'Incidents', path: '/incidents', icon: ShieldAlert },
    { name: 'Analytics & Reports', path: '/reports', icon: BarChart2 },
    { name: 'Backup', path: '/backup', icon: HardDrive },
    { name: 'Audit Logs', path: '/audit-logs', icon: Shield },
    { name: 'Organizations', path: '/organizations', icon: Building2 },
    { name: 'Security Center', path: '/security', icon: ShieldAlert },
    { name: 'Cloud Costs', path: '/finops', icon: DollarSign },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  // Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path) => {
    navigate(path)
    setIsOpen(false)
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-[15vh]">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-500 mr-3" />
          <input 
            type="text" 
            autoFocus
            placeholder="Type a command or search..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white py-4 outline-none placeholder-zinc-500 text-lg"
          />
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">No results found.</div>
          ) : (
            filteredCommands.map((cmd, i) => (
              <button 
                key={i}
                onClick={() => handleSelect(cmd.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
              >
                <cmd.icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-zinc-300 group-hover:text-white font-medium">{cmd.name}</span>
              </button>
            ))
          )}
        </div>
        
        <div className="bg-white/5 px-4 py-2 text-xs text-zinc-500 flex justify-between">
          <span>Navigate with ↑ ↓</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
