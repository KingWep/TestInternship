import React from 'react'
import DataTable from '../../../common/DataTable'
import PageHeader from '../../../common/PageHeader'

export default function AdminUsers() {
  const users = [
    { id: 1, name: 'Admin Master', email: 'admin@store.com', role: 'Super Admin' },
    { id: 2, name: 'Cashier Staff', email: 'cashier@store.com', role: 'Cashier' },
  ]

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <PageHeader 
          title="User Accounts"
          description="Manage administrator and staff permissions."
        />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}