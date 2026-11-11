import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Copilot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm OpsMind Copilot. Ask me about system status, errors, or cost optimization." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8000/api/v1/copilot/chat', { message: userMsg })
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: res.data.reply, 
        action: res.data.action, 
        path: res.data.path 
      }])
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I couldn't connect to the backend." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col mb-4 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-purple-500/20 rounded-lg"><Bot className="w-4 h-4 text-purple-400" /></div>
              <span className="text-white font-medium">OpsMind AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white/5 text-zinc-200 rounded-bl-none border border-white/5'
                }`}>
                  <p>{msg.text}</p>
                  {msg.action && (
                    <button 
                      onClick={() => { navigate(msg.path); setIsOpen(false) }}
                      className="mt-2 flex items-center text-xs font-bold text-blue-400 hover:text-blue-300"
                    >
                      {msg.action} <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-zinc-500 animate-pulse">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex space-x-2 bg-[#0A0A0A]">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..." 
              className="flex-1 bg-[#111113] text-white border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button type="submit" className="p-2 bg-white text-black rounded-lg hover:bg-gray-200"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  )
}

export default Copilot
