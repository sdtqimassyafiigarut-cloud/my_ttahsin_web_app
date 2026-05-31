'use client';

import React, { useState, useRef } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Save, 
  Camera, 
  ChevronRight, 
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';

export default function Pengaturan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast();
  };

  const menuItems = [
    { id: 'notif', icon: Bell, title: 'Notifikasi', desc: 'Kelola pemberitahuan WhatsApp dan Email', color: 'bg-blue-50 text-blue-600' },
    { id: 'security', icon: Shield, title: 'Keamanan', desc: 'Ubah kata sandi dan verifikasi dua faktor', color: 'bg-orange-50 text-orange-600' },
    { id: 'backup', icon: Database, title: 'Backup Data', desc: 'Ekspor data santri dan nilai ke format Excel', color: 'bg-purple-50 text-purple-600' },
    { id: 'help', icon: HelpCircle, title: 'Laporan Bantuan', desc: 'Hubungi tim teknis atau laporkan kendala', color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-tosca-50/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-72 transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header Card with White Background */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-tosca-50 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Pengaturan Sistem</h1>
              <p className="text-tosca-600 font-medium">Konfigurasi profil admin dan preferensi aplikasi Baitul Huffaz.</p>
            </div>
            {showToast && (
              <div className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-2xl shadow-lg animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 size={20} />
                <span className="text-sm font-bold">Pengaturan Tersimpan!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-tosca-50 flex flex-col sm:flex-row items-center gap-6 bg-tosca-50/20">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-3xl bg-tosca-600 flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-tosca-100 transition-transform group-hover:scale-105">
                    A
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-xl border border-tosca-100 text-tosca-600 hover:bg-tosca-900 hover:text-white transition-all"
                  >
                    <Camera size={18} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-black text-tosca-900">Admin Utama</h3>
                  <p className="text-sm text-tosca-500 font-bold tracking-wide mt-1 uppercase">Hak Akses: Super Admin</p>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    defaultValue="Admin Utama" 
                    className="w-full px-5 py-3 rounded-2xl border-2 border-tosca-50 focus:border-tosca-600 focus:ring-0 text-sm font-bold text-black transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Email Resmi</label>
                  <input 
                    type="email" 
                    defaultValue="admin@baitulhuffaz.com" 
                    className="w-full px-5 py-3 rounded-2xl border-2 border-tosca-50 focus:border-tosca-600 focus:ring-0 text-sm font-bold text-black transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="bg-white rounded-3xl border border-tosca-50 shadow-sm divide-y divide-tosca-50">
              {menuItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="p-5 flex items-center justify-between hover:bg-tosca-50/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3.5 rounded-2xl transition-all group-hover:scale-110 ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-base font-black text-tosca-900">{item.title}</p>
                      <p className="text-xs text-tosca-500 font-bold mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-tosca-300 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-tosca-900 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-tosca-100 hover:bg-black transition-all active:scale-95"
            >
              <Save size={24} />
              Simpan Semua Perubahan
            </button>
          </form>
        </main>
      </div>

      {/* Modal Features Placeholder */}
      {activeTab && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-tosca-50 flex items-center justify-between bg-tosca-50/20">
              <h2 className="text-xl font-bold text-tosca-900">
                {menuItems.find(m => m.id === activeTab)?.title}
              </h2>
              <button onClick={() => setActiveTab(null)} className="text-tosca-400 hover:text-tosca-600"><X size={24} /></button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-tosca-100 text-tosca-600 rounded-2xl flex items-center justify-center">
                <SettingsIcon size={32} />
              </div>
              <p className="text-tosca-600 font-medium">Fitur ini sedang dalam pengembangan untuk integrasi sistem secara penuh.</p>
              <button 
                onClick={() => setActiveTab(null)}
                className="w-full py-3 bg-tosca-600 text-white rounded-xl font-bold"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}
