import React, { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import axios from 'axios'
import { Bot, User, Send } from 'lucide-react'

export default function AICopilot() {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello Aryan, I am your AI Copilot. Ask me about system health, incidents, or fixes.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8005/api/v1/ai/chat', { message: userMsg })
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to AI service.' }])
    }
    setLoading(false)
  }

  return (
    <PageLayout title="AI Copilot">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl h-[75vh] flex flex-col max-w-3xl mx-auto">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-yellow-400 text-black' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-xl text-sm ${m.role === 'user' ? 'bg-yellow-400/10 border border-yellow-400/20 text-white' : 'bg-[#111113] border border-white/5 text-zinc-300'}`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {loading && <div className="text-zinc-500 text-xs ml-12">AI is thinking...</div>}
        </div>
        
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-3 bg-[#0A0A0A] rounded-b-xl">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything (e.g. 'system health')..." 
            className="flex-1 bg-[#111113] text-white text-sm rounded-lg px-4 py-3 border border-white/10 focus:outline-none focus:border-yellow-400"
          />
          <button type="submit" disabled={loading} className="bg-yellow-400 text-black p-3 rounded-lg hover:bg-yellow-500 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </PageLayout>
  )
}
