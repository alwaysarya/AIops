cd frontend

cat > src/pages/Dashboard.jsx << 'EOF'
import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Navbar from '../components/Common/Navbar'
import SystemHealth from '../components/Dashboard/SystemHealth'
import AnomalyChart from '../components/Dashboard/AnomalyChart'
import AlertTimeline from '../components/Dashboard/AlertTimeline'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">System Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <SystemHealth title="Active Services" value="7" status="healthy" />
              <SystemHealth title="Anomalies Detected" value="3" status="warning" />
              <SystemHealth title="Critical Alerts" value="1" status="critical" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">Anomaly Trend (Last 24h)</h3>
                <AnomalyChart />
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">Recent Alerts</h3>
                <AlertTimeline />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
EOF

cat > src/components/Common/Sidebar.jsx << 'EOF'
import React from 'react'
import { LayoutDashboard, Activity, AlertTriangle, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <span className="text-xl font-bold text-blue-400">AIOps Platform</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center px-4 py-2 text-slate-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <Activity className="w-5 h-5 mr-3" />
            Logs & Metrics
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <AlertTriangle className="w-5 h-5 mr-3" />
            Alerts
          </a>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <a href="#" className="flex items-center px-4 py-2 text-slate-400 hover:bg-slate-700/50 rounded-lg hover:text-slate-200 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
EOF

cat > src/components/Common/Navbar.jsx << 'EOF'
import React from 'react'
import { Bell, Search, User } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search logs, metrics..." 
            className="bg-slate-900 text-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 border border-slate-700"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-slate-400 hover:text-white relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
EOF

cat > src/components/Dashboard/SystemHealth.jsx << 'EOF'
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
EOF

cat > src/components/Dashboard/AnomalyChart.jsx << 'EOF'
import React from 'react'

const AnomalyChart = () => {
  // Placeholder for a chart library like recharts
  return (
    <div className="w-full h-64 flex items-end space-x-2">
      {[40, 30, 60, 20, 80, 50, 90, 30, 40, 70, 20, 50].map((height, i) => (
        <div 
          key={i} 
          className="flex-1 bg-blue-500/50 hover:bg-blue-400 transition-all rounded-t"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
  )
}

export default AnomalyChart
EOF

cat > src/components/Dashboard/AlertTimeline.jsx << 'EOF'
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
EOF

echo "✅ Dashboard UI Ready!"
