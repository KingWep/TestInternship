import React from 'react'
import Button from '../../../components/common/Button'
import PageHeader from '../../../components/common/PageHeader'

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <PageHeader
          title="System Settings"
          description="Configure global shop parameters."
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Store Name</label>
          <input type="text" defaultValue="My E-Commerce Store" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Currency Symbol</label>
          <input type="text" defaultValue="$" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
        </div>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  )
}