import React from 'react'
import PageLayout from '../../components/layout/PageLayout'

export default function ConnectData() {
  return (
    <PageLayout title="Connect Data Source">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 text-white">
        <p className="text-zinc-400 mb-4">Select a data source to connect to your workspace.</p>
        <div className="flex gap-4">
          <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/5">AWS S3</button>
          <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/5">PostgreSQL</button>
        </div>
      </div>
    </PageLayout>
  )
}
