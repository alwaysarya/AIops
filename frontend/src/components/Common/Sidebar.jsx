import React from 'react'
import { LayoutDashboard, Activity, AlertTriangle, Settings, User, Map, Zap, BarChart2, Shield, HardDrive, ShieldAlert } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path) => {
    const baseClass = "flex items-center px-3 py-2 rounded-lg transition-all duration-200 mb-0.5 text-[13px] font-medium "
    return location.pathname === path 
      ? baseClass + "bg-white/10 text-white shadow-sm" 
      : baseClass + "text-gray-400 hover:bg-white/5 hover:text-gray-100"
  }

  return (
    <aside className="w-[240px] apple-glass border-r border-white/5 flex-shrink-0 hidden md:flex flex-col relative z-40">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-white font-semibold tracking-tight text-lg">
          AIOps <span className="text-gray-500 font-normal">Pro</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Overview</div>
        <Link to="/" className={getLinkClass('/')}><LayoutDashboard className="w-4 h-4 mr-2.5" /> Dashboard</Link>
        <Link to="/logs" className={getLinkClass('/logs')}><Activity className="w-4 h-4 mr-2.5" /> Live Logs</Link>
        <Link to="/topology" className={getLinkClass('/topology')}><Map className="w-4 h-4 mr-2.5" /> Topology</Link>
        <Link to="/alerts" className={getLinkClass('/alerts')}><AlertTriangle className="w-4 h-4 mr-2.5" /> Alerts</Link>
        
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-3">Intelligence</div>
        <Link to="/rca" className={getLinkClass('/rca')}><Zap className="w-4 h-4 mr-2.5" /> Root Cause</Link>
        <Link to="/reports" className={getLinkClass('/reports')}><BarChart2 className="w-4 h-4 mr-2.5" /> Analytics</Link>
        <Link to="/incidents" className={getLinkClass('/incidents')}><ShieldAlert className="w-4 h-4 mr-2.5" /> Incidents</Link>
      </nav>
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link to="/backup" className={getLinkClass('/backup')}><HardDrive className="w-4 h-4 mr-2.5" /> Backup</Link>
        <Link to="/audit-logs" className={getLinkClass('/audit-logs')}><Shield className="w-4 h-4 mr-2.5" /> Audit Logs</Link>
        <Link to="/profile" className={getLinkClass('/profile')}><User className="w-4 h-4 mr-2.5" /> Profile</Link>
        <Link to="/settings" className={getLinkClass('/settings')}><Settings className="w-4 h-4 mr-2.5" /> Settings</Link>
      </div>
    </aside>
  )
}

export default Sidebar
