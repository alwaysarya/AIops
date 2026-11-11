import React from 'react'
import { Menu, Search } from 'lucide-react'

const TopNavbar = ({ setIsOpen }) => {
  return (
    <header className="h-[72px] flex items-center justify-between px-4 lg:px-6 bg-[#0A0A0A] border-b border-white/5 shrink-0">
      <div className="flex items-center space-x-3">
        <button className="lg:hidden text-zinc-400 hover:text-white mr-2" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input type="text" placeholder="Search pages and actions..." className="w-full bg-[#111113] text-zinc-300 text-sm rounded-full pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-zinc-500" />
        </div>
      </div>
    </header>
  )
}
export default TopNavbar
