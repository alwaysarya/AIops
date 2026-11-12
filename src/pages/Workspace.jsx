import React from 'react'
import PageLayout from '../components/layout/PageLayout'

export default function Workspace() {
  return (
    <PageLayout title="Workspace">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <p className="text-zinc-400">Your workspace overview will appear here.</p>
      </div>
    </PageLayout>
  )
}
