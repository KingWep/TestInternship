import React from 'react';
import { Upload, User } from 'lucide-react';
import Button from '../../../components/common/Button';

export default function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h3 className="text-lg font-bold text-slate-800">ប្រវត្តិរូបគណនី</h3>
        <p className="text-sm text-slate-500">គ្រប់គ្រងព័ត៌មានលម្អិតគណនីអ្នកគ្រប់គ្រង និងប្រវត្តិរូបសាធារណៈរបស់អ្នក។</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-8">
        
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            <img 
              src="https://i.pinimg.com/736x/63/b8/9c/63b89cb7ed448ff66c84c3af15e107b4.jpg" 
              alt="Admin Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-700">រូបថតប្រវត្តិរូប</h4>
            <p className="text-xs text-slate-500 max-w-sm">ផ្ទុករូបតំណាងថ្មីឡើង។ ទំហំដែលបានណែនាំគឺ 256x256px។ អនុញ្ញាត PNG ឬ JPG។</p>
            <div className="flex items-center gap-3 mt-2">
              <Button variant="outline" className="text-xs px-4 py-1.5 h-auto rounded-lg flex items-center gap-2">
                <Upload size={14} /> ផ្ទុកឡើងថ្មី
              </Button>
              <button className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors">លុបចេញ</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">នាមខ្លួន</label>
            <input type="text" defaultValue="Admin" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600">នាមត្រកូល</label>
            <input type="text" defaultValue="User" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600">អាសយដ្ឋានអ៊ីមែល</label>
            <input type="email" defaultValue="admin@mystore.com" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600">ប្រវត្តិរូបសង្ខេប / ការពិពណ៌នាតួនាទី</label>
            <textarea rows="3" defaultValue="Lead Administrator for the e-commerce platform." className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button variant="primary" className="px-6 rounded-xl">រក្សាទុកប្រវត្តិរូប</Button>
        </div>
      </div>
    </div>
  );
}
