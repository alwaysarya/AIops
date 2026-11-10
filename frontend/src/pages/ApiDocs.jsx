import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { Book, ExternalLink } from 'lucide-react'

const ApiDocs = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Book className="w-6 h-6 mr-3 text-blue-400" /> API Documentation
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-medium text-white mb-4">Interactive Swagger UI</h3>
            <p className="text-slate-400 text-sm mb-6">
              Tera FastAPI auto-generated documentation yahan hai. Yahan se tu saare API endpoints (Logs, AI, Remediation) live test kar sakta hai.
            </p>
            <a 
              href="http://localhost:8000/docs" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Open Swagger UI <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ApiDocs
