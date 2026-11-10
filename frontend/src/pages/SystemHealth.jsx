import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import { CheckCircle, XCircle, Server, Database, Activity } from 'lucide-react'
import axios from 'axios'

const SystemHealth = () => {
  const [services, setServices] = useState([
    { name: 'API Gateway', url: 'http://localhost:8081/api/v1/health/', icon: Server, status: 'checking' },
    { name: 'AI Detector', url: 'http://localhost:8001/api/v1/health', icon: Activity, status: 'checking' },
    { name: 'Frontend', url: window.location.origin, icon: Database, status: 'up' }
  ])

  useEffect(() => {
    services.forEach((service, index) => {
      if (service.name === 'Frontend') return
      axios.get(service.url)
        .then(() => {
          setServices(prev => prev.map((s, i) => i === index ? { ...s, status: 'up' } : s))
        })
        .catch(() => {
          setServices(prev => prev.map((s, i) => i === index ? { ...s, status: 'down' } : s))
        })
    })
  }, [])

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">System Health Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <service.icon className={`w-8 h-8 ${service.status === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                  <div>
                    <h3 className="text-white font-bold">{service.name}</h3>
                    <p className="text-xs text-slate-400">{service.url}</p>
                  </div>
                </div>
                {service.status === 'up' ? <CheckCircle className="w-6 h-6 text-green-400" /> : <XCircle className="w-6 h-6 text-red-400" />}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default SystemHealth
