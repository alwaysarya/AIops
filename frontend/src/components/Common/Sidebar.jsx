import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckCircle, Shield, Link as LinkIcon, Activity, FileText, Settings, HelpCircle, LogOut, Zap, Search, X, Globe } from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  
  const getLinkClass = (path) => {
    const base = "flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm font-medium mb-0.5 "
    return location.pathname === path ? base + "bg-yellow-400 text-black" : base + "text-zinc-400 hover:bg-white/5 hover:text-white"
  }
  
  const SectionTitle = ({ title }) => <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mt-6 mb-2">{title}</div>

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      
      <aside className={`fixed lg:static top-0 left-0 z-50 w-[260px] bg-[#0A0A0A] border-r border-white/10 flex-shrink-0 flex flex-col h-screen transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="pt-6 px-4 flex justify-between items-center shrink-0">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2"><Zap className="w-4 h-4 text-black" /></div>
            <span className="text-lg font-bold text-white tracking-wide">FinSight</span>
          </div>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        {/* User Profile (Moved from TopNavbar) */}
        <div className="px-4 mt-6 flex items-center space-x-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-lg border-2 border-black">A</div>
          <div>
            <div className="text-white font-medium text-sm">Aryan Thakur</div>
            <div className="text-[10px] text-zinc-400 bg-white/10 px-2 py-0.5 rounded border border-white/10 inline-block mt-0.5">Admin</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative px-4 mt-4 shrink-0">
          <Search className="w-4 h-4 absolute left-7 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input type="text" placeholder="Search..." className="w-full bg-[#111113] text-zinc-300 text-xs rounded-lg pl-9 pr-4 py-2 border border-white/5 focus:outline-none" />
        </div>

        {/* Scrollable Links */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <SectionTitle title="General" />
          <Link to="/" className={getLinkClass('/')}><span className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard</span></Link>
          
          <SectionTitle title="Workflow" />
          <Link to="/approvals" className={getLinkClass('/approvals')}><span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Approvals</span></Link>
          <Link to="/security" className={getLinkClass('/security')}><span className="flex items-center"><Shield className="w-4 h-4 mr-2" /> Policies</span></Link>
          
          <SectionTitle title="Report" />
          <Link to="/ai-copilot" className={getLinkClass('/cloud')}><span className="flex items-center"><LinkIcon className="w-4 h-4 mr-2" /> AI Copilot</span></Link>
          <Link to="/metrics" className={getLinkClass('/metrics')}><span className="flex items-center"><Activity className="w-4 h-4 mr-2" /> Runtimes</span></Link>
          <Link to="/audit-logs" className={getLinkClass('/audit-logs')}><span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Audit</span></Link>

          <SectionTitle title="Others" />
          <Link to="/settings" className={getLinkClass('/settings')}><span className="flex items-center"><Settings className="w-4 h-4 mr-2" /> Settings</span></Link>
          <Link to="/help" className={getLinkClass('/help')}><span className="flex items-center"><HelpCircle className="w-4 h-4 mr-2" /> Help</span></Link>
          
          {/* Language & Theme (Moved from TopNavbar) */}
          <div className="flex items-center px-3 py-2 text-zinc-400 hover:text-white cursor-pointer mt-1 text-sm font-medium">
            <Globe className="w-4 h-4 mr-2" /> English
          </div>
          <div className="flex items-center px-3 py-2 text-zinc-400 hover:text-white cursor-pointer text-sm font-medium">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="p-4 shrink-0">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/20 blur-2xl rounded-full"></div>
            <h4 className="text-white text-sm font-semibold mb-1">Trail Ending Soon!</h4>
            <p className="text-[10px] text-zinc-400 mb-3 leading-tight">Your access expires in 6 days. Upgrade now for access!</p>
            <button className="w-full bg-yellow-400 text-black text-xs font-bold py-1.5 rounded-md flex items-center justify-center hover:bg-yellow-500"><Zap className="w-3 h-3 mr-1" /> Upgrades to Pro</button>
          </div>
        </div>

      </aside>
    </>
  )
}
export default Sidebar
