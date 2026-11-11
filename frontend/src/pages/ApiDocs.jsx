import React from 'react'
import TopNavbar from '../components/Common/TopNavbar'
import Footer from '../components/Common/Footer'
import { Book, ExternalLink, Terminal } from 'lucide-react'

const ApiDocs = () => {
  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-white tracking-tight">API Documentation</h1>
              <p className="text-zinc-400 text-sm mt-1">Interactive Swagger UI for all backend endpoints.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-blue-500/10 rounded-xl w-max mb-4"><Book className="w-6 h-6 text-blue-400" /></div>
                <h3 className="text-white font-medium">Swagger UI</h3>
                <p className="text-zinc-500 text-sm mt-1">Test all REST API endpoints live.</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-purple-500/10 rounded-xl w-max mb-4"><Terminal className="w-6 h-6 text-purple-400" /></div>
                <h3 className="text-white font-medium">OpenAPI JSON</h3>
                <p className="text-zinc-500 text-sm mt-1">Standard OpenAPI 3.0 spec.</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl w-max mb-4"><ExternalLink className="w-6 h-6 text-emerald-400" /></div>
                <h3 className="text-white font-medium">WebSocket API</h3>
                <p className="text-zinc-500 text-sm mt-1">Real-time logs and notifications.</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">Interactive API Explorer</h2>
              <p className="text-zinc-400 mb-6">Click the button below to open the full Swagger UI in a new tab.</p>
              <a 
                href="http://localhost:8000/docs" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Open Swagger UI <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default ApiDocs
