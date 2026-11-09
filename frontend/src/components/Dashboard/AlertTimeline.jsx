import React from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

const alerts = [
  { id: 1, type: 'critical', message: 'High CPU usage on node-01', time: '2 mins ago', icon: AlertCircle, color: 'text-red-400' },
  { id: 2, type: 'warning', message: 'Latency spike in payment-service', time: '15 mins ago', icon: Info, color: 'text-yellow-400' },
  { id: 3, type: 'resolved', message: 'Pod restarted successfully', time: '1 hour ago', icon: CheckCircle, color: 'text-green-400' },
]

const AlertTimeline = () => {
  return (
    <div className="space-y-4">
      {alerts.map(alert => {
        const Icon = alert.icon;
        return (
          <div key={alert.id} className="flex items-start space-x-3 p-3 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className={`mt-0.5 ${alert.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200">{alert.message}</p>
              <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AlertTimeline
