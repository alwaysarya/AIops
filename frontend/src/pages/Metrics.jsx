import React, { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { Activity } from 'lucide-react'

export default function Metrics() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    const fetchMetrics = () => {
      axios.get('http://localhost:8000/api/v1/system/metrics')
        .then(res => setMetrics(res.data))
        .catch(err => console.error(err))
    }
    fetchMetrics()
    const int = setInterval(fetchMetrics, 2000)
    return () => clearInterval(int)
  }, [])

  if (!metrics) return <PageLayout title="Metrics"><div className="text-white">Loading metrics...</div></PageLayout>

  return (
    <PageLayout title="System Metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><Activity className="w-4 h-4 mr-2"/> CPU Usage</h3>
          <div className="text-4xl font-bold text-white mb-4">{metrics.cpu_percent}%</div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${metrics.cpu_percent}%` }}></div></div>
        </div>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4 flex items-center"><Activity className="w-4 h-4 mr-2"/> Memory Usage</h3>
          <div className="text-4xl font-bold text-white mb-4">{metrics.memory_percent}%</div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${metrics.memory_percent}%` }}></div></div>
        </div>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 md:col-span-2">
          <h3 className="text-white font-medium mb-4 flex items-center"><Activity className="w-4 h-4 mr-2"/> Disk Usage</h3>
          <div className="text-4xl font-bold text-white mb-4">{metrics.disk_percent}%</div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${metrics.disk_percent}%` }}></div></div>
        </div>
      </div>
    </PageLayout>
  )
}
