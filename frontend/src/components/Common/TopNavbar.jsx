import React from 'react'
import { Search, Globe, Settings, Menu } from 'lucide-react'

const TopNavbar = ({ setIsOpen }) => {
  return (
    <header className="h-[72px] flex items-center justify-between px-4 lg:px-6 bg-[#0A0A0A] border-b border-white/5 shrink-0">
      <div className="flex items-center space-x-3">
        <button className="lg:hidden text-zinc-400 hover:text-white mr-2" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold text-lg border-2 border-black">A</div>
        <div className="hidden sm:block">
          <div className="text-white font-medium text-sm">Aryan Thakur</div>
          <div className="text-[10px] text-zinc-400 bg-white/10 px-2 py-0.5 rounded border border-white/10 inline-block mt-0.5">Admin</div>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input type="text" placeholder="Search pages and actions..." className="w-full bg-[#111113] text-zinc-300 text-sm rounded-full pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-zinc-500" />
        </div>
        <button className="hidden sm:flex items-center text-sm text-zinc-400 hover:text-white space-x-1"><Globe className="w-4 h-4" /> <span>English</span></button>
        <button className="p-2 text-zinc-400 hover:text-white"><Settings className="w-4 h-4" /></button>
      </div>
    </header>
  )
}
export default TopNavbar
