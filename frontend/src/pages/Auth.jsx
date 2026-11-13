import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // Login logic (FormData format me kyunki backend OAuth2 use kar raha hai)
        const formData = new URLSearchParams()
        formData.append('username', email)
        formData.append('password', password)
        
        const res = await axios.post('http://localhost:8005/api/v1/login', formData)
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('role', res.data.role)
        navigate("/dashboard")
      } else {
        // Signup logic
        await axios.post('http://localhost:8005/api/v1/signup', { email, password, role: 'admin' })
        toast.success("Account created! Please login.")
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        
        {/* Logo/Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">OpsMind</h1>
          <p className="text-zinc-400 text-sm">{isLogin ? 'Sign in to your workspace' : 'Create a new account'}</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" 
              placeholder="admin@opsmind.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" 
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-6">
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-zinc-400 hover:text-white">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

      </div>
    </div>
  )
}
