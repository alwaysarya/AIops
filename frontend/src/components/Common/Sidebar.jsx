import React from 'react'
import { LayoutDashboard, Activity, AlertTriangle, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <span className="text-xl font-bold text-blue-400">AIOps Platform</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center px-4 py-2 text-slate-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <Activity className="w-5 h-5 mr-3" />
            Logs & Metrics
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <AlertTriangle className="w-5 h-5 mr-3" />
            Alerts
          </a>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
