import React from 'react'
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import NotificationDropdown from '@/admin/features/Notification/components/NotificationDropdown';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';

export default function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'តើអ្នកពិតជាចង់ចាកចេញមែនទេ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ចាកចេញ',
      cancelButtonText: 'បោះបង់'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/admin/login');
      }
    });
  };
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
        <span className="text-xl font-bold text-slate-600 hidden sm:inline">អ្នកគ្រប់គ្រង</span>
      </div>

      <div className="flex items-center gap-2 text-slate-600 text-xl">
        {/* Home */}
        <Link to="/" className="text-slate-600 px-2 py-1 border-[2px] hover:bg-blue-200 rounded-md hover:text-blue-600 transition-colors">
          <FaHome size={18} />
        </Link>

        {/* Notifications Dropdown Component */}
        <NotificationDropdown size={18} className="text-slate-600 hover:text-blue-600" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-500 px-2 py-1.5 border-[2px] border-transparent hover:bg-red-50 hover:border-red-200 rounded-md transition-colors flex items-center justify-center"
          title="ចាកចេញ (Logout)"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}