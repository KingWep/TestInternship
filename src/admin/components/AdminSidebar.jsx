import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, PlusCircle, ClipboardList, Users, Layers, Image, Settings, LogOut } from 'lucide-react'

export default function AdminSidebar() {
  const location = useLocation()
  
  const menuSections = [
    {
      title: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Orders', path: '/admin/orders', icon: ClipboardList, badge: 5 },
        { label: 'Sale Form', path: '/admin/sale-form', icon: PlusCircle },
      ]
    },
    {
      title: 'CATALOG',
      items: [
        { label: 'Products', path: '/admin/products', icon: ShoppingBag, badge: 2 },
        { label: 'Categories', path: '/admin/categories', icon: Layers },
        { label: 'Slides', path: '/admin/slides', icon: Image },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Users', path: '/admin/users', icon: Users, badge: 1 },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ]

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800">
      <div className="p-6 font-bold text-lg text-white border-b border-slate-800 flex items-center gap-4">
        <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-white">
          <img src="/images/shopping.png" alt="Shopping" />
        </div>
        <span className="text-white text-xl">ONE CARE</span> 
      </div>
      
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h2 className="px-4 text-xs font-semibold text-slate-500 tracking-wider mb-2">
              {section.title}
            </h2>
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/50 transition-colors">
          <LogOut size={18} /> Exit to Shop
        </Link>
      </div>
    </aside>
  )
}