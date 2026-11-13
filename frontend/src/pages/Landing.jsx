import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, Shield, Activity, Cloud, Bot } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-widest">OPSMIND</span>
        </div>
        <button onClick={() => navigate('/auth')} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center relative">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-zinc-300 font-medium">AI-Powered Observability is Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          The Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Autonomous Operations
          </span>
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Observe, understand, predict, and automate your entire infrastructure with OpsMind. The enterprise-grade AI control room.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <button onClick={() => navigate('/auth')} className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-all flex items-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            Launch Dashboard <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button className="bg-white/5 border border-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-all">
            View Documentation
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 text-left">
          {[
            { icon: <Activity className="w-6 h-6 text-cyan-400" />, title: 'Real-Time Metrics', desc: 'Monitor CPU, RAM, and Disk usage live from your servers.' },
            { icon: <Bot className="w-6 h-6 text-purple-400" />, title: 'AI Copilot', desc: 'Chat with your infrastructure. Get instant RCA and fixes.' },
            { icon: <Cloud className="w-6 h-6 text-blue-400" />, title: 'Cloud Connectors', desc: 'Securely connect AWS, GCP, and Azure accounts.' },
            { icon: <Shield className="w-6 h-6 text-green-400" />, title: 'Zero Trust Security', desc: 'Enterprise-grade policies, audit logs, and approvals.' },
          ].map((f, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-bold mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-zinc-600 text-sm">
        © 2026 OpsMind Intelligent Observability Platform. Built for Enterprise.
      </footer>
    </div>
  )
}
