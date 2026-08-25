import React from 'react';
import Button from '../../../components/common/Button';

export default function GeneralSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h3 className="text-lg font-bold text-slate-800">ការកំណត់ហាងទូទៅ</h3>
        <p className="text-sm text-slate-500">ធ្វើបច្ចុប្បន្នភាពព័ត៌មានមូលដ្ឋាន និងទីតាំងហាងរបស់អ្នក។</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">ឈ្មោះហាង</label>
            <input type="text" defaultValue="My E-Commerce Store" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">អ៊ីមែលទំនាក់ទំនង</label>
            <input type="email" defaultValue="support@mystore.com" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">ទូរស័ព្ទជំនួយ</label>
            <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">និមិត្តសញ្ញារូបិយប័ណ្ណ</label>
            <input type="text" defaultValue="$" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600">អាសយដ្ឋានហាង</label>
            <textarea rows="3" defaultValue="123 Commerce St.&#10;Suite 100&#10;New York, NY 10001" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button variant="primary" className="px-6 rounded-xl">រក្សាទុកការផ្លាស់ប្តូរ</Button>
        </div>
      </div>
    </div>
  );
}
