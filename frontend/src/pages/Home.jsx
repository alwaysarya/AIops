import React, { useRef, useState } from 'react'
import Sidebar from '../components/Common/Sidebar'
import Footer from '../components/Common/Footer'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Cloud, Database, Activity, AlertTriangle, Shield, Zap, MoreVertical, Server } from 'lucide-react'

// Generate particle earth data (continents ka shape)
function generateEarthParticles(count) {
  const positions = new Float32Array(count * 3)
  let i = 0
  while (i < count) {
    // Random points on sphere surface
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    
    const x = Math.sin(phi) * Math.cos(theta)
    const y = Math.sin(phi) * Math.sin(theta)
    const z = Math.cos(phi)
    
    // Filter to simulate continents (dummy logic for now)
    // In real scenario, use a texture map to filter land vs water
    if (Math.random() > 0.3) {
      positions[i * 3] = x * 1.5
      positions[i * 3 + 1] = y * 1.5
      positions[i * 3 + 2] = z * 1.5
      i++
    }
  }
  return positions
}

function EarthParticles() {
  const ref = useRef()
  const [positions] = useState(() => generateEarthParticles(8000))

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c084fc" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

const Home = () => {
  return (
    <div className="flex h-screen bg-[#030303] font-sans text-gray-200 overflow-hidden relative">
      
      {/* Bottom Horizon Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none z-0"></div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 relative z-20">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400"></div>
              </div>
              OpsMind
            </div>
            
            <div className="hidden lg:flex items-center bg-[#151515] border border-white/10 rounded-full p-1">
              <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <div className="flex items-center px-2 space-x-1">
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Activity className="w-4 h-4" /></button>
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Database className="w-4 h-4" /></button>
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Server className="w-4 h-4" /></button>
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Shield className="w-4 h-4" /></button>
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Zap className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
            <button className="p-2.5 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors relative">
              <AlertTriangle className="w-4 h-4" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-900 border border-white/20 p-0.5">
              <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto px-8 pb-8 relative z-20">
          <div className="max-w-[1500px] mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-white tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 text-sm mt-1">Real-time system health and AI-powered insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/5 rounded-full border border-white/5"><Cloud className="w-5 h-5 text-gray-300" /></div>
                      <div>
                        <h3 className="text-white font-medium text-sm">Production Cluster</h3>
                        <p className="text-xs text-gray-500 mt-0.5">AWS · us-east-1</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">healthy</span>
                  </div>
                  <div className="space-y-4 mt-6 border-t border-white/5 pt-4">
                    <div className="flex justify-between text-xs text-gray-400 items-center">
                      <span className="font-medium">Nodes</span>
                      <div className="flex space-x-2">
                        <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md border border-green-400/20">10 healthy</span>
                        <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md border border-yellow-400/20">2 warning</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium"><span>CPU</span><span className="text-white">68%</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium"><span>Memory</span><span className="text-white">72%</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }}></div></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-5 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/5 rounded-full border border-white/5"><Database className="w-5 h-5 text-gray-300" /></div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Database Cluster</h3>
                      <p className="text-xs text-gray-500 mt-0.5">GCP · us-central1</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20">warning</span>
                </div>
              </div>

              {/* Center Column: Real 3D Globe */}
              <div className="lg:col-span-6 relative min-h-[350px] flex items-center justify-center">
                <div className="absolute inset-0">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.5} />
                    <EarthParticles />
                  </Canvas>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-5 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-sm">SLA Compliance</h3>
                    <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                  <div className="flex justify-center mb-8 relative mt-4">
                    <svg width="200" height="110" viewBox="0 0 200 110">
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#27272a" strokeWidth="18" strokeLinecap="round" />
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f59e0b" strokeWidth="18" strokeLinecap="round" strokeDasharray="85 250" strokeDashoffset="0" />
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#84cc16" strokeWidth="18" strokeLinecap="round" strokeDasharray="50 250" strokeDashoffset="-85" />
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#a855f7" strokeWidth="18" strokeLinecap="round" strokeDasharray="65 250" strokeDashoffset="-135" />
                    </svg>
                  </div>
                  <div className="space-y-3.5 text-xs text-gray-400 bg-[#151515] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between"><span>Met SLA</span><span className="text-white font-medium">49.5%</span></div>
                    <div className="flex justify-between"><span>Missed SLA</span><span className="text-white font-medium">18.5%</span></div>
                    <div className="flex justify-between"><span>Data SLA</span><span className="text-white font-medium">32%</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Production Cluster', val: '94%', trend: '↑ 2.1%', label: 'Stable', icon: Activity },
                { title: 'Active Incidents', val: '12', trend: '↑ 3.7%', label: '3 Critical, 7 Warnings', icon: AlertTriangle },
                { title: 'Predicted Failures', val: '04', trend: '↑ 4.04%', label: 'Next 24 hours', icon: Zap },
                { title: 'Uptime', val: '99.98%', trend: '↑ 0.02%', label: 'Last 30 Days', icon: Shield },
              ].map((item, i) => (
                <div key={i} className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-300 text-sm font-medium">{item.title}</h3>
                    <div className="p-1.5 bg-white/5 rounded-md border border-white/5"><item.icon className="w-4 h-4 text-gray-400" /></div>
                  </div>
                  <div className="flex items-baseline space-x-3 mb-1">
                    <h2 className="text-3xl font-medium text-white">{item.val}</h2>
                    <span className="text-xs text-green-400 font-medium">{item.trend}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{item.label}</p>
                  
                  <div className="mt-6 flex items-end justify-between h-12 opacity-80">
                    {[30,50,40,70,45,80,55,35,60,45,75,85,50,30,40].map((h, j) => (
                      <div key={j} className="w-1.5 bg-purple-500 rounded-full" style={{ height: `${h}%`, boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home
