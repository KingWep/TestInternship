import React from 'react'
import PageHeader from '../../../common/PageHeader'

export default function AdminSlides() {
  return (
    <div className="space-y-6">
      <div>
        <PageHeader 
          title="Banner Slides"
          description="Manage your homepage hero carousels and promotional graphics."
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500">
        No banner slides uploaded yet.
      </div>
    </div>
  )
}