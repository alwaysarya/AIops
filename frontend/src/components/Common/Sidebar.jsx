import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Activity, List, AlertTriangle, Map, Zap, ShieldAlert, BarChart2, HardDrive, Shield, User, Settings, DollarSign, Building2, CheckCircle, Book, Cloud, ShieldCheck } from 'lucide-react'
import Logo from './Logo'

const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path) => {
    const baseClass = "flex items-center px-3 py-2 rounded-lg transition-all text-sm font-medium mb-1 "
    return location.pathname === path 
      ? baseClass + "bg-yellow-400 text-black" 
      : baseClass + "text-zinc-400 hover:bg-white/5 hover:text-white"
  }

  const SectionTitle = ({ title }) => (
    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mt-6 mb-2">{title}</div>
  )

  return (
    <aside className="w-[240px] bg-[#0A0A0A] border-r border-white/10 flex-shrink-0 hidden lg:flex flex-col h-screen">
      <div className="h-16 flex items-center px-6">
        <Logo className="w-8 h-8" />
        <span className="ml-3 text-lg font-bold text-white">OpsMind</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <SectionTitle title="General" />
        <Link to="/" className={getLinkClass('/')}><LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard</Link>
        
        <SectionTitle title="Workflow" />
        <Link to="/approvals" className={getLinkClass('/approvals')}><CheckCircle className="w-4 h-4 mr-2" /> Approvals</Link>
        <Link to="/incidents" className={getLinkClass('/incidents')}><ShieldAlert className="w-4 h-4 mr-2" /> Incidents</Link>
        <Link to="/security" className={getLinkClass('/security')}><Shield className="w-4 h-4 mr-2" /> Policies</Link>
        <Link to="/compliance" className={getLinkClass('/compliance')}><ShieldCheck className="w-4 h-4 mr-2" /> Compliance</Link>

        <SectionTitle title="Report" />
        <Link to="/cloud" className={getLinkClass('/cloud')}><Cloud className="w-4 h-4 mr-2" /> Connectors</Link>
        <Link to="/metrics" className={getLinkClass('/metrics')}><Activity className="w-4 h-4 mr-2" /> Runtimes</Link>
        <Link to="/audit-logs" className={getLinkClass('/audit-logs')}><Book className="w-4 h-4 mr-2" /> Audit</Link>

        <SectionTitle title="Others" />
        <Link to="/organizations" className={getLinkClass('/organizations')}><Building2 className="w-4 h-4 mr-2" /> Users</Link>
        <Link to="/settings" className={getLinkClass('/settings')}><Settings className="w-4 h-4 mr-2" /> Settings</Link>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
          <h4 className="text-yellow-400 font-bold text-sm">Upgrade to Pro</h4>
          <p className="text-xs text-zinc-400 mt-1">Unlock unlimited agents and advanced features.</p>
          <button className="w-full bg-yellow-400 text-black font-bold text-xs py-2 rounded-lg mt-3">Upgrade Now</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
