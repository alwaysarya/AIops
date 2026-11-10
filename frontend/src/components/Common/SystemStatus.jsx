import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SystemStatus = () => {
  const [status, setStatus] = useState('checking...')
  const [color, setColor] = useState('bg-yellow-500')

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get('http://localhost:8000/api/v1/health/')
        setStatus('All Systems Operational')
        setColor('bg-green-500')
      } catch (e) {
        setStatus('System Outage')
        setColor('bg-red-500')
      }
    }
    check()
    const interval = setInterval(check, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center text-xs text-slate-400">
      <span className={`w-2 h-2 rounded-full ${color} mr-2 animate-pulse`}></span>
      {status}
    </div>
  )
}

export default SystemStatus
