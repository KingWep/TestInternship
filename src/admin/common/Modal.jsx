import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setShow(true)
      })
    } else {
      setShow(false)
    }
  }, [isOpen])

  if (!isOpen && !show) return null

  return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto
          bg-slate-900/50 backdrop-blur-sm
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${show ? 'opacity-100' : 'opacity-0'}`}
      >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${show
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-3'
          }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-lg">
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-all duration-200 p-1.5 rounded-lg hover:bg-slate-100 hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[calc(90vh-65px)]">
          {children}
        </div>
      </div>
    </div>
  )
}