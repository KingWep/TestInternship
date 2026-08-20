import React from 'react'
import { FaBoxOpen } from "react-icons/fa";

export default function DataTable({ columns, data, keyField = 'id' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-t-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {data && data.length > 0 ? (
              data.map((row) => (
                <tr key={row[keyField] || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-slate-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <FaBoxOpen className="w-20 h-20 text-slate-400 mb-3" />

                  <span className="text-sm">
                    No data available.
                  </span>
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}