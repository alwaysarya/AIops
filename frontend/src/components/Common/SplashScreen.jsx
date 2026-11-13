import React, { useEffect, useState } from 'react'
import { Code2, GitBranch, FlaskConical, Layers, Rocket, Flag } from 'lucide-react'

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Progress bar animation (0 to 100 in 3 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 200)

    // After 3.5 seconds, finish and hide
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onFinish, 800)
    }, 3500)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onFinish])

  const steps = [
    { icon: <Code2 className="w-6 h-6" />, label: 'Dev' },
    { icon: <GitBranch className="w-6 h-6" />, label: 'Build' },
    { icon: <FlaskConical className="w-6 h-6" />, label: 'Test' },
    { icon: <Layers className="w-6 h-6" />, label: 'Staging' },
    { icon: <Rocket className="w-6 h-6" />, label: 'Deploy' },
    { icon: <Flag className="w-6 h-6" />, label: 'Release' },
  ]

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#050B14] flex flex-col items-center justify-center transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}`}>
      
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>

      {/* Top Header */}
      <div className="absolute top-12 left-12 flex items-center space-x-4 text-white/50 text-sm font-bold tracking-widest">
        <span className="border border-yellow-500/50 text-yellow-500 px-3 py-1 rounded-md">05</span>
        <span className="w-12 h-[1px] bg-yellow-500/50"></span>
        <span>RELEASE TRAIN</span>
      </div>

      {/* Animated Train Track */}
      <div className="relative w-full max-w-4xl mb-24 animate-[trainEnter_1.5s_ease-out_forwards]">
        
        {/* The Rails */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)]"></div>
        <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white/10"></div>

        {/* The Train Coaches */}
        <div className="flex justify-between items-end pb-4 relative z-10 px-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center animate-[popIn_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className={`w-20 h-24 rounded-xl flex flex-col items-center justify-center space-y-3 border transition-all duration-300 relative overflow-hidden group ${index === steps.length - 1 ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/10 border-yellow-500/50 text-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'bg-[#0A111A] border-white/10 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400'}`}>
                {/* Glass reflection effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
                {step.icon}
                <span className="text-xs font-bold">{step.label}</span>
              </div>
              {/* Train Wheels */}
              <div className="flex space-x-6 mt-2">
                <div className="w-4 h-4 rounded-full bg-[#0A111A] border-2 border-zinc-600 shadow-inner"></div>
                <div className="w-4 h-4 rounded-full bg-[#0A111A] border-2 border-zinc-600 shadow-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Infinity Logo & Text */}
      <div className="text-center animate-[fadeIn_1s_ease-out_forwards] relative z-10">
        <div className="flex justify-center mb-6">
          <svg width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            <defs>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            <path d="M 50 25 C 65 5, 95 5, 95 25 C 95 45, 65 45, 50 25 C 35 5, 5 5, 5 25 C 5 45, 35 45, 50 25" stroke="url(#gold)" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
          </svg>
        </div>
        <h1 className="text-5xl font-black text-white tracking-[0.2em] mb-2">OPSMIND</h1>
        <p className="text-zinc-400 text-xs tracking-[0.4em] font-bold uppercase">Continuous Integration & Delivery</p>
      </div>

      {/* Loading Bar & Percentage */}
      <div className="absolute bottom-16 w-full max-w-xl flex flex-col items-center animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>
        <div className="flex justify-between w-full text-white font-mono text-sm mb-2 px-2">
          <span className="text-yellow-500">{progress}%</span>
          <span className="text-zinc-500 animate-pulse">Initializing Automation Pipeline...</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 relative transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-md"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trainEnter {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
