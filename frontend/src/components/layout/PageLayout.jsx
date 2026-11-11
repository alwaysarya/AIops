import React, { useState } from 'react'
import Sidebar from '../Common/Sidebar'
import TopNavbar from '../Common/TopNavbar'
import Footer from '../Common/Footer'

const PageLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-6">{title}</h1>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default PageLayout
