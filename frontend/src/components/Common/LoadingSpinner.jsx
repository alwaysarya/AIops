import React from 'react'

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-8 h-8 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
      <p className="text-zinc-400 text-sm font-medium">{text}</p>
    </div>
  )
}
export default LoadingSpinner;
