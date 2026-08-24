import React, { useState } from 'react';
import { Shield, Key, Smartphone, Monitor } from 'lucide-react';
import Button from '../../../components/common/Button';

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Security & Access</h3>
        <p className="text-sm text-slate-500">Manage your password, 2FA, and active sessions.</p>
      </div>

      {/* Change Password */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Key size={20} />
          </div>
          <h4 className="font-semibold text-slate-800">Change Password</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600">Current Password</label>
            <input type="password" placeholder="Enter current password" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" className="px-6 rounded-xl">Update Password</Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Two-Factor Authentication</h4>
            <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account using an authenticator app.</p>
          </div>
        </div>
        
        {/* Toggle Switch */}
        <button 
          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
          role="switch"
          aria-checked={twoFactorEnabled}
        >
          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="font-semibold text-slate-800 mb-4">Active Sessions</h4>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-4">
            <Monitor size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">Windows PC - Chrome</p>
              <p className="text-xs text-slate-500">New York, USA • Active now</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">Current</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
          <div className="flex items-center gap-4">
            <Smartphone size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-800">iPhone 13 - Safari</p>
              <p className="text-xs text-slate-500">New York, USA • Last active 2 hours ago</p>
            </div>
          </div>
          <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">Revoke</button>
        </div>
      </div>
    </div>
  );
}
