import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const endpoint = isLogin ? 'login' : 'register'
    
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/auth/${endpoint}`, {
        username, password
      })
      
      if (isLogin) {
        localStorage.setItem('token', response.data.access_token)
        navigate('/')
      } else {
        alert('Registration successful! Please login.')
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login to AIOps' : 'Create Account'}
        </h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 focus:border-blue-500 outline-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 text-white border border-slate-700 rounded px-3 py-2 focus:border-blue-500 outline-none" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
