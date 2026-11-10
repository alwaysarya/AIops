import React from 'react'
import { LayoutDashboard, Activity, AlertTriangle, Settings, User, Map, Zap, BarChart2, Shield, HardDrive, ShieldAlert } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path) => {
    const baseClass = "flex items-center px-4 py-2 rounded-lg transition-colors mb-2 "
    return location.pathname === path 
      ? baseClass + "bg-slate-700/50 text-white" 
      : baseClass + "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
  }

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <span className="text-xl font-bold text-blue-400">AIOps Platform</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <Link to="/" className={getLinkClass('/')}><LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard</Link>
          <Link to="/logs" className={getLinkClass('/logs')}><Activity className="w-5 h-5 mr-3" /> Logs & Metrics</Link>
          <Link to="/topology" className={getLinkClass('/topology')}><Map className="w-5 h-5 mr-3" /> Topology Map</Link>
          <Link to="/rca" className={getLinkClass('/rca')}><Zap className="w-5 h-5 mr-3" /> Root Cause (RCA)</Link>
          <Link to="/incidents" className={getLinkClass('/incidents')}><ShieldAlert className="w-5 h-5 mr-3" /> Incidents</Link>
          <Link to="/alerts" className={getLinkClass('/alerts')}><AlertTriangle className="w-5 h-5 mr-3" /> Alerts</Link>
          <Link to="/reports" className={getLinkClass('/reports')}><BarChart2 className="w-5 h-5 mr-3" /> Analytics & Reports</Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <Link to="/backup" className={getLinkClass('/backup')}><HardDrive className="w-5 h-5 mr-3" /> Backup & Restore</Link>
          <Link to="/audit-logs" className={getLinkClass('/audit-logs')}><Shield className="w-5 h-5 mr-3" /> Audit Logs</Link>
          <Link to="/profile" className={getLinkClass('/profile')}><User className="w-5 h-5 mr-3" /> Profile</Link>
          <Link to="/settings" className={getLinkClass('/settings')}><Settings className="w-5 h-5 mr-3" /> Settings</Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
