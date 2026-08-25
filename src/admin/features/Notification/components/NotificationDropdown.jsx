import React from 'react';
import { IoNotifications } from "react-icons/io5";
import { Filter } from 'lucide-react';
import { useNotifications } from '../hooks/useNotification';

export default function NotificationDropdown() {
  const {
    isOpen,
    dropdownRef,
    activeTab,
    setActiveTab,
    filteredNotifications,
    unreadCount,
    markAllAsRead,
    toggleDropdown,
  } = useNotifications();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button using IoNotifications */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-slate-600 px-2 py-1 border-[2px] hover:bg-blue-200 rounded-md transition-colors flex items-center justify-center"
        aria-label="Notifications"
      >
        <IoNotifications size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white"></span>
        )}
      </button>

      {/* Pop-up Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="text-lg font-bold text-slate-900">Notification</h3>
            <button
              onClick={markAllAsRead}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between px-5 border-b border-slate-100">
            <div className="flex gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-slate-900 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                All Notifications
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'unread'
                    ? 'border-slate-900 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <button className="text-slate-400 hover:text-slate-600 pb-3">
              <Filter size={16} />
            </button>
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-50">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3.5 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                    !item.read ? 'bg-slate-50/60' : ''
                  }`}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">{item.name}</span>{' '}
                      {item.action}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {item.time}
                    </span>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0 self-center mt-1"></span>
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                គ្មានទិន្នន័យ (No notifications)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}