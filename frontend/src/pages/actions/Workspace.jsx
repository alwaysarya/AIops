import React from 'react'
import PageLayout from '../../components/layout/PageLayout'

export default function Workspace() {
  return (
    <PageLayout title="Your Workspace">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <p className="text-zinc-400">Workspace overview will appear here.</p>
      </div>
    </PageLayout>
  )
}
