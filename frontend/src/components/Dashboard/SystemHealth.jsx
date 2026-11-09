import React from 'react'

const SystemHealth = ({ title, value, status }) => {
  const getStatusColor = () => {
    if (status === 'healthy') return 'text-green-400 bg-green-400/10'
    if (status === 'warning') return 'text-yellow-400 bg-yellow-400/10'
    if (status === 'critical') return 'text-red-400 bg-red-400/10'
    return 'text-slate-400 bg-slate-400/10'
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${getStatusColor()}`}>
          <span className="font-semibold">{status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

export default SystemHealth
