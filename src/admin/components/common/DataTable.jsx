import React from 'react'
import { FaBoxOpen } from "react-icons/fa";

export default function DataTable({ columns, data, keyField = 'id' }) {
  // Helper to handle column alignment (defaults to left)
  const getAlignmentClass = (align) => {
    if (align === 'right') return 'text-right';
    if (align === 'center') return 'text-center';
    return 'text-left';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-t-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-4 ${getAlignmentClass(col.align)}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={row[keyField] ?? rowIndex} 
                  className="hover:bg-slate-100 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 ${getAlignmentClass(col.align)}`}
                    >
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
                      គ្មានទិន្នន័យ
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