import React, { useState } from 'react';
import { Settings, LayoutDashboard, ShoppingBag, Users } from 'lucide-react';
import Button from '../../../components/common/Button';

export default function PermissionSettings() {
  const [permissions, setPermissions] = useState({
    maintenanceMode: false,
    staffDashboard: true,
    staffProducts: true,
    managerSettings: false,
  });

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Page Permissions</h3>
        <p className="text-sm text-slate-500">Control access to different sections of the admin panel based on roles.</p>
      </div>

      {/* Global Maintenance Mode */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-red-900">Maintenance Mode</h4>
          <p className="text-xs text-red-700 mt-0.5 max-w-md">Lock down the entire storefront and admin panel for all non-admin users. Use only during major updates.</p>
        </div>
        <button 
          onClick={() => togglePermission('maintenanceMode')}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${permissions.maintenanceMode ? 'bg-red-600' : 'bg-red-200'}`}
          role="switch"
        >
          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${permissions.maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h4 className="font-semibold text-slate-700 text-sm">Role Access Configuration</h4>
          <Button variant="primary" size="sm" className="rounded-lg text-xs py-1.5">Save Changes</Button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {/* Permission Row 1 */}
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Staff Dashboard Access</p>
                <p className="text-xs text-slate-500 mt-0.5">Allow 'Staff' role to view the main dashboard analytics.</p>
              </div>
            </div>
            <button 
              onClick={() => togglePermission('staffDashboard')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${permissions.staffDashboard ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${permissions.staffDashboard ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Permission Row 2 */}
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Staff Products Management</p>
                <p className="text-xs text-slate-500 mt-0.5">Allow 'Staff' role to add, edit, or delete products.</p>
              </div>
            </div>
            <button 
              onClick={() => togglePermission('staffProducts')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${permissions.staffProducts ? 'bg-emerald-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${permissions.staffProducts ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Permission Row 3 */}
          <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                <Settings size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Manager Settings Access</p>
                <p className="text-xs text-slate-500 mt-0.5">Allow 'Manager' role to access this settings page.</p>
              </div>
            </div>
            <button 
              onClick={() => togglePermission('managerSettings')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${permissions.managerSettings ? 'bg-orange-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${permissions.managerSettings ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
