import React from 'react'

const Logo = ({ size = 32, showText = true }) => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="relative flex items-center justify-center">
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
        
        {/* Image Logo */}
        <img 
          src="/logo.png" 
          alt="OpsMind Logo" 
          style={{ width: size, height: size }}
          className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" 
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black text-white tracking-widest leading-none">
            OPS<span className="text-yellow-400">MIND</span>
          </span>
          <span className="text-[8px] text-zinc-500 font-bold tracking-[0.3em] uppercase mt-1">
            Intelligence
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
