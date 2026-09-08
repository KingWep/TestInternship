import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import NotificationDropdown from '@/admin/features/Notification/components/NotificationDropdown';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6 shadow-xl">
      <div className="flex items-center gap-2 text-slate-600 text-xl">

        <Link to="qr-code" className="px-2 py-1 border-[2px] hover:bg-blue-200 rounded-md hover:text-blue-600 transition-colors">
          <QrCode size={18} className=" hover:bg-blue-200 text-slate-600 hover:text-blue-600" />
        </Link>

        {/* Home */}
        <Link to="/" className="text-slate-600 px-2 py-1 border-[2px] hover:bg-blue-200 rounded-md hover:text-blue-600 transition-colors">
          <FaHome size={18} />
        </Link>

        {/* Notifications Dropdown Component */}
        <NotificationDropdown size={18} className="text-slate-600 hover:text-blue-600" />

      </div>
    </header>
  )
}