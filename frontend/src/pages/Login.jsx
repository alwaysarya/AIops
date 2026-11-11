import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const endpoint = isLogin ? 'login' : 'register'
    
    try {
      const payload = isLogin ? { username, password } : { username, password, org_name: orgName }
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
      setError(err.response?.data?.detail || 'Authentication failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#000000] relative overflow-hidden font-sans">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg mb-4">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            {isLogin ? 'Welcome back to OpsMind' : 'Create your Organization'}
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            {isLogin ? 'Enter your credentials to access the console' : 'Start monitoring your infrastructure today'}
          </p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm font-medium text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="johndoe" required />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Organization Name</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Acme Corp" required />
            </div>
          )}

          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111113] text-white border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" required />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 mt-4">
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span className="text-blue-400 font-semibold">{isLogin ? 'Register' : 'Login'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
