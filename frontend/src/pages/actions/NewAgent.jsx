import React from 'react'
import PageLayout from '../../components/layout/PageLayout'

export default function NewAgent() {
  return (
    <PageLayout title="Create New Agent">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <p className="text-zinc-400 mb-4">Configure your new AI agent here.</p>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">Save Agent</button>
      </div>
    </PageLayout>
  )
}
