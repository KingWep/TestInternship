import React from 'react'
import DataTable from '../../../common/DataTable'
import PageHeader from '../../../common/PageHeader'

export default function AdminCategories() {
  const categories = [
    { id: 1, name: 'Electronics', count: 12 },
    { id: 2, name: 'Accessories', count: 20 },
  ]

  const columns = [
    { header: 'Category Name', accessor: 'name' },
    { header: 'Products Count', accessor: 'count' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <PageHeader 
          title="Categories"
          description="Organize your shop taxonomy."
        />
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  )
}