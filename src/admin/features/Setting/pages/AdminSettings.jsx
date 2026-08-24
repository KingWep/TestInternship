import React, { useState } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import GeneralSettings from '../components/GeneralSettings';
import ProfileSettings from '../components/ProfileSettings';
import SecuritySettings from '../components/SecuritySettings';
import PermissionSettings from '../components/PermissionSettings';
import { Store, User, ShieldCheck, Settings2 } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Store', icon: Store },
    { id: 'profile', label: 'Account Profile', icon: User },
    { id: 'security', label: 'Security Access', icon: ShieldCheck },
    { id: 'permissions', label: 'Page Permissions', icon: Settings2 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Admin Settings"
        description="Manage your store preferences, account security, and team permissions."
      />

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'permissions' && <PermissionSettings />}
        </div>
      </div>
    </div>
  );
}