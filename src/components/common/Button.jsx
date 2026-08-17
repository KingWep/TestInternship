import React from 'react'

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition-colors"
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 text-slate-900 hover:bg-slate-50",
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
