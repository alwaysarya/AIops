import React from 'react'
import PageLayout from '../../components/layout/PageLayout'

export default function Approvals() {
  return (
    <PageLayout title="Review Approvals">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <p className="text-zinc-400">Pending approvals will be listed here.</p>
      </div>
    </PageLayout>
  )
}
