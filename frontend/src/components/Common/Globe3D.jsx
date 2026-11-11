import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function EarthParticles() {
  const ref = useRef()
  const [positions] = useState(() => {
    const count = 15000
    const positions = new Float32Array(count * 3)
    let i = 0
    while (i < count) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)
      
      // Simulate land masses (denser points on continents)
      // In real app, use texture map. For demo, we use random filter.
      if (Math.random() > 0.4) {
        positions[i * 3] = x * 1.5
        positions[i * 3 + 1] = y * 1.5
        positions[i * 3 + 2] = z * 1.5
        i++
      }
    }
    return positions
  })

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c084fc" size={0.015} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

const Globe3D = () => {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <EarthParticles />
        {/* Glow effect behind */}
        <mesh scale={1.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default Globe3D
