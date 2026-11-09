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
