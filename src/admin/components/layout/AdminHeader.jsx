import React from 'react'
import { FaHome } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import Button from '../common/Button';
import { Link } from 'react-router-dom'

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-green-500 hover:border-green-400 bg-blue-600 text-white flex items-center justify-center font-semibold text-sm overflow-hidden transition-colors duration-300 group cursor-pointer">
          <img
            src="https://i.pinimg.com/736x/63/b8/9c/63b89cb7ed448ff66c84c3af15e107b4.jpg"
            alt="Avatar"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-125"
          />
        </div>
        <span className="text-xl font-bold text-slate-600 hidden sm:inline">Admin</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600 text-xl">
        {/* Home */}
        <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
          <Button variant="outline" size="sm" className=" rounded">
            <FaHome size={18} />
          </Button>
        </Link>

        {/* Notifications */}
        <Link to="/admin/notifications" className="text-slate-600 hover:text-blue-600 transition-colors">
          <Button variant="outline" size="sm" className="rounded">
            <IoNotifications size={18} />
          </Button>
        </Link>
      </div>
    </header>
  )
}