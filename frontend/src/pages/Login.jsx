import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const endpoint = isLogin ? 'login' : 'register'
    
    try {
      const payload = isLogin 
        ? { username, password } 
        : { username, password, org_name: orgName }
        
      const response = await axios.post(`http://localhost:8000/api/v1/auth/${endpoint}`, payload)
      
      if (isLogin) {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('org_id', response.data.org_id)
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
    <div className="flex items-center justify-center h-screen bg-[#030303]">
      <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/10 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login to OpsMind' : 'Create Account'}
        </h2>
        
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-500/20">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none transition-colors" required />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-zinc-400 text-sm font-bold mb-2">Organization Name</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none transition-colors" placeholder="e.g. Acme Corp" required />
            </div>
          )}

          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-lg px-3 py-2.5 focus:border-blue-500 outline-none transition-colors" required />
          </div>
          
          <button type="submit" className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-2">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
