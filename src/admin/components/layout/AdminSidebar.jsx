import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, PlusCircle, ClipboardList, Users, Layers, Image, Settings, LogOut, ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function AdminSidebar({ sidebarState, setSidebarState }) {
  const location = useLocation()

  // Close sidebar on mobile on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarState(0)
      } else {
        setSidebarState(prev => (prev === 0 ? 2 : prev))
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarState])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarState(0)
    }
  }, [location.pathname, setSidebarState])

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      if (sidebarState === 0) setSidebarState(1)
      else if (sidebarState === 1) setSidebarState(2)
      else setSidebarState(0)
    } else {
      if (sidebarState === 2) setSidebarState(1)
      else setSidebarState(2)
    }
  }

  const isFull = sidebarState === 2
  const isHidden = sidebarState === 0
  const menuSections = [
    {
      title: 'ចម្បង',
      items: [
        { label: 'ផ្ទាំងគ្រប់គ្រង', path: '/admin', icon: LayoutDashboard },
        { label: 'ការបញ្ជាទិញ', path: '/admin/orders', icon: ClipboardList, badge: 5 },
        { label: 'ទម្រង់លក់', path: '/admin/sale-form', icon: PlusCircle },
      ]
    },
    {
      title: 'កាតាឡុក',
      items: [
        { label: 'ផលិតផល', path: '/admin/products', icon: ShoppingBag, badge: 2 },
        { label: 'ប្រភេទ', path: '/admin/categories', icon: Layers },
        { label: 'ស្លាយ', path: '/admin/slides', icon: Image },
      ]
    },
    {
      title: 'ប្រព័ន្ធ',
      items: [
        { label: 'អ្នកប្រើប្រាស់', path: '/admin/users', icon: Users, badge: 1 },
        { label: 'ការកំណត់', path: '/admin/settings', icon: Settings },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarState !== 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarState(0)}
      />

      <aside className={`
        fixed md:relative z-50 h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 
        transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] select-none
        ${sidebarState === 0 ? '-translate-x-full md:translate-x-0 w-[80px]' : 'translate-x-0'}
        ${sidebarState === 1 ? 'w-[80px]' : ''}
        ${sidebarState === 2 ? 'w-64' : ''}
      `}>
        {/* Your Exact Button & Position */}
        <button 
          onClick={handleToggle}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-blue-500 text-white flex items-center justify-center w-6 h-24 rounded-r-xl shadow-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none z-10"
          aria-label="Toggle Sidebar"
        >
          {isFull ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>

        {/* Logo Section */}
        <div className="p-6 h-[76px] font-bold text-lg text-white border-b border-slate-800 flex items-center overflow-hidden shrink-0">
          <div className="w-8 h-8 shrink-0 rounded overflow-hidden flex items-center justify-center bg-white">
            <img src="/images/ShoppingJunction.png" alt="Shopping" className='object-cover w-full h-full'/>
          </div>
          <div className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
            isFull ? 'grid-cols-[1fr] opacity-100 ml-4' : 'grid-cols-[0fr] opacity-0 ml-0'
          }`}>
            <span className="text-white text-xl whitespace-nowrap overflow-hidden leading-none">
              ONE CARE
            </span>
          </div>
        </div>
      
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto overflow-x-hidden">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                isFull ? 'grid-rows-[1fr] opacity-100 mb-2' : 'grid-rows-[0fr] opacity-0 mb-0'
              }`}>
                <div className="overflow-hidden">
                  <h2 className="px-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">
                    {section.title}
                  </h2>
                </div>
              </div>

              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 relative group overflow-hidden ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'hover:bg-slate-800 hover:text-white text-slate-400'
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <Icon size={18} className="shrink-0" />
                      <div className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                        isFull ? 'grid-cols-[1fr] opacity-100 ml-3' : 'grid-cols-[0fr] opacity-0 ml-0'
                      }`}>
                        <span className="whitespace-nowrap overflow-hidden leading-normal">
                          {item.label}
                        </span>
                      </div>
                    </div>
                    
                    {item.badge && (
                      <div className={`ml-auto grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                        isFull ? 'grid-cols-[auto] opacity-100' : 'grid-cols-[0fr] opacity-0'
                      }`}>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold overflow-hidden whitespace-nowrap leading-normal ${
                          isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {!isFull && sidebarState !== 0 && (
                      <div className="absolute left-[calc(100%+8px)] px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-50 whitespace-nowrap shadow-lg">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <Link to="/" className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/50 transition-colors duration-200 relative group overflow-hidden">
            <LogOut size={18} className="shrink-0" /> 
            <div className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isFull ? 'grid-cols-[1fr] opacity-100 ml-3' : 'grid-cols-[0fr] opacity-0 ml-0'
            }`}>
              <span className="whitespace-nowrap overflow-hidden leading-normal">
                ចាកចេញទៅហាង
              </span>
            </div>
            {!isFull && sidebarState !== 0 && (
              <div className="absolute left-[calc(100%+8px)] px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-50 whitespace-nowrap shadow-lg">
                ចាកចេញទៅហាង
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  )
}