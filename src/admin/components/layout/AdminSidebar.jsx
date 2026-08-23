import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, PlusCircle, ClipboardList, Users, Layers, Image, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
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
    <aside className={`${isCollapsed ? 'w-[80px]' : 'w-64'} bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out relative z-20`}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-slate-800 border border-slate-700 text-slate-300 p-1.5 rounded-full hover:text-white hover:bg-slate-700 transition-all duration-300 ease-in-out "
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>

      <div className="p-6 h-[76px] font-bold text-lg text-white border-b border-slate-800 flex items-center overflow-hidden">
        <div className="w-8 h-8 shrink-0 rounded overflow-hidden flex items-center justify-center bg-white">
          <img src="/images/ShoppingJunction.png" alt="Shopping" className=' object-cover w-full h-full'/>
        </div>
        <span className={`text-white text-xl whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-4'}`}>
          ONE CARE
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h2 className={`px-4 text-xs font-semibold text-slate-500 tracking-wider transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-[20px] opacity-100 mb-2'}`}>
              {section.title}
            </h2>
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors relative group overflow-hidden ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon size={18} className="shrink-0" />
                    <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'}`}>
                      {item.label}
                    </span>
                  </div>
                  
                  <div className={`ml-auto flex items-center overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[50px] opacity-100'}`}>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/" className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/50 transition-colors relative group overflow-hidden">
          <LogOut size={18} className="shrink-0" /> 
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'}`}>
            Exit to Shop
          </span>
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              Exit to Shop
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}