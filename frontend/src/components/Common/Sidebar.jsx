import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckCircle, Shield, ShieldCheck, Link as LinkIcon, Activity, FileText, Users, Settings, HelpCircle, LogOut, Zap } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path) => {
    const baseClass = "flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm font-medium mb-0.5 "
    return location.pathname === path 
      ? baseClass + "bg-yellow-400 text-black" 
      : baseClass + "text-zinc-400 hover:bg-white/5 hover:text-white"
  }

  const SectionTitle = ({ title }) => (
    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mt-6 mb-2">{title}</div>
  )

  return (
    <aside className="w-[240px] bg-[#0A0A0A] border-r border-white/10 flex-shrink-0 hidden lg:flex flex-col h-screen">
      <div className="h-[72px] flex items-center px-6 border-b border-white/5">
        <Zap className="w-6 h-6 text-yellow-400" />
        <span className="ml-3 text-lg font-bold text-white">OpsMind</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <SectionTitle title="General" />
        <Link to="/" className={getLinkClass('/')}><span className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard</span></Link>
        
        <SectionTitle title="Workflow" />
        <Link to="/approvals" className={getLinkClass('/approvals')}><span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Approvals</span></Link>
        <Link to="/incidents" className={getLinkClass('/incidents')}><span className="flex items-center"><Shield className="w-4 h-4 mr-2" /> Incidents</span></Link>
        <Link to="/security" className={getLinkClass('/security')}><span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Policies</span></Link>
        <Link to="/compliance" className={getLinkClass('/compliance')}><span className="flex items-center"><Shield className="w-4 h-4 mr-2" /> Compliance</span></Link>

        <SectionTitle title="Report" />
        <Link to="/cloud" className={getLinkClass('/cloud')}><span className="flex items-center"><LinkIcon className="w-4 h-4 mr-2" /> Connectors</span></Link>
        <Link to="/metrics" className={getLinkClass('/metrics')}><span className="flex items-center"><Activity className="w-4 h-4 mr-2" /> Runtimes</span></Link>
        <Link to="/audit-logs" className={getLinkClass('/audit-logs')}><span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Audit</span></Link>

        <SectionTitle title="Others" />
        <Link to="/organizations" className={getLinkClass('/organizations')}><span className="flex items-center"><Users className="w-4 h-4 mr-2" /> Users</span></Link>
        <Link to="/settings" className={getLinkClass('/settings')}><span className="flex items-center"><Settings className="w-4 h-4 mr-2" /> Settings</span></Link>
      </div>
    </aside>
  )
}

export default Sidebar
