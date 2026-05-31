'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  Users, 
  UserSquare2, 
  GraduationCap, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus,
  CheckCircle2,
  X,
  ChevronRight,
  BookOpen,
  MessageSquare,
  FileText
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { 
    label: 'Total Santri', 
    value: '450', 
    icon: Users, 
    change: '+12%', 
    isPositive: true, 
    color: 'bg-blue-50 text-blue-600',
    href: '/dashboard/admin/santri'
  },
  { 
    label: 'Total Musyrif/ah', 
    value: '32', 
    icon: UserSquare2, 
    change: '+2', 
    isPositive: true, 
    color: 'bg-tosca-50 text-tosca-600',
    href: '/dashboard/admin/musyrif'
  },
  { 
    label: 'Rata-rata Hafalan', 
    value: '12.5 Juz', 
    icon: BookOpen, 
    change: '-0.5%', 
    isPositive: false, 
    color: 'bg-orange-50 text-orange-600',
    href: '/dashboard/admin/nilai'
  },
  { 
    label: 'Peningkatan Nilai', 
    value: '85%', 
    icon: TrendingUp, 
    change: '+5%', 
    isPositive: true, 
    color: 'bg-green-50 text-green-600',
    href: '/dashboard/admin/nilai'
  },
];

const activities = [
  { id: 1, type: 'hafalan', user: 'Ust. Mansyur', action: 'menilai setoran', target: 'Ahmad Fauzi', time: '5 menit yang lalu', status: 'Lancar', detail: 'Santri Ahmad menyetorkan Juz 30 (An-Naba) dengan kelancaran yang baik.' },
  { id: 2, type: 'sertifikat', user: 'Siti Aminah', action: 'mengajukan', target: 'Sertifikat Juz 5', time: '12 menit yang lalu', status: 'Proses', detail: 'Pengajuan sertifikat hafalan Juz 5 telah diterima dan sedang dalam verifikasi.' },
  { id: 3, type: 'jadwal', user: 'Admin', action: 'memperbarui', target: 'Halaqah Sore', time: '1 jam yang lalu', status: 'Update', detail: 'Perubahan lokasi halaqah sore dari Pendopo ke Masjid Baitul Huffaz.' },
  { id: 4, type: 'santri', user: 'Ust. Zulkifli', action: 'mendaftar', target: 'Santri Baru (Zaid)', time: '2 jam yang lalu', status: 'Baru', detail: 'Pendaftaran santri baru atas nama Zaid Al-Khair telah berhasil diverifikasi.' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuickAddOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hafalan': return <BookOpen size={20} className="text-tosca-600" />;
      case 'sertifikat': return <GraduationCap size={20} className="text-orange-600" />;
      case 'jadwal': return <CalendarIcon size={20} className="text-blue-600" />;
      case 'santri': return <Users size={20} className="text-purple-600" />;
      default: return <MessageSquare size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-tosca-50/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-72 transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header Card with White Background */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-tosca-50 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Dashboard Admin</h1>
              <p className="text-tosca-600 font-medium">Ringkasan aktivitas Baitul Huffaz hari ini.</p>
            </div>
            <div className="flex items-center gap-4">
              {showToast && (
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-right-4">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-bold">Data Berhasil Ditambah!</span>
                </div>
              )}
              <button 
                onClick={() => setIsQuickAddOpen(true)}
                className="flex items-center justify-center gap-2 bg-tosca-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-tosca-200 hover:bg-tosca-700 transition-all active:scale-95"
              >
                <Plus size={20} />
                Tambah Data Cepat
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <div className="bg-white p-6 rounded-3xl border border-tosca-50 shadow-sm hover:border-tosca-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={24} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                      {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                  </div>
                  <h3 className="text-tosca-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                  <p className="text-2xl font-black text-tosca-900 mt-1">{stat.value}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-tosca-50 flex items-center justify-between bg-tosca-50/10">
                <h2 className="text-lg font-black text-tosca-900">Aktivitas Terbaru</h2>
                <button className="text-tosca-600 text-sm font-bold hover:text-tosca-900 transition-colors bg-white px-4 py-1.5 rounded-full border border-tosca-50 shadow-sm">Lihat Semua</button>
              </div>
              <div className="flex-1 divide-y divide-tosca-50">
                {activities.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedActivity(item)}
                    className="p-5 flex items-start gap-4 hover:bg-tosca-50/50 transition-all cursor-pointer group"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white border border-tosca-50 shadow-sm flex items-center justify-center group-hover:scale-110 transition-all">
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-tosca-900 group-hover:text-tosca-600 transition-colors">
                        <span className="text-tosca-700">{item.user}</span> <span className="text-tosca-500 font-medium">{item.action}</span> {item.target}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-[10px] text-tosca-400 font-bold uppercase flex items-center gap-1">
                          <Clock size={10} />
                          {item.time}
                        </p>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                          item.status === 'Lancar' ? 'bg-green-500 text-white' : 
                          item.status === 'Baru' ? 'bg-purple-500 text-white' : 
                          item.status === 'Proses' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-tosca-200 group-hover:text-tosca-600 transition-colors mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Schedule */}
            <div className="space-y-6">
              <div className="bg-tosca-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <GraduationCap size={200} />
                </div>
                <h3 className="text-xl font-black mb-2 relative z-10">Manajemen Nilai</h3>
                <p className="text-tosca-100 text-sm mb-8 relative z-10 opacity-80 leading-relaxed">
                  Input dan monitoring setoran hafalan santri secara real-time.
                </p>
                <Link href="/dashboard/admin/nilai">
                  <button className="w-full bg-white text-tosca-900 py-3 rounded-2xl font-black text-sm relative z-10 hover:bg-tosca-50 transition-colors">
                    Mulai Menilai
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-tosca-50 shadow-sm">
                <h3 className="text-lg font-black text-tosca-900 mb-6">Jadwal Hari Ini</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-tosca-50 rounded-2xl border border-transparent hover:border-tosca-200 transition-all cursor-pointer group">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-tosca-600 shadow-sm group-hover:bg-tosca-600 group-hover:text-white transition-all">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-tosca-900">Tahfizh Pagi</p>
                      <p className="text-xs text-tosca-500 font-bold">05:00 - 07:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-tosca-50 rounded-2xl border border-transparent hover:border-tosca-200 transition-all cursor-pointer group">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-tosca-900">Murojaah Bersama</p>
                      <p className="text-xs text-tosca-500 font-bold">16:00 - 17:30</p>
                    </div>
                  </div>
                </div>
                <Link href="/dashboard/admin/jadwal">
                  <button className="w-full mt-6 py-3 border-2 border-tosca-50 text-tosca-600 rounded-2xl font-bold text-sm hover:bg-tosca-50 transition-all">
                    Lihat Selengkapnya
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Detail Aktivitas */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-tosca-50 flex items-center justify-between bg-tosca-50/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-tosca-50">
                  {getActivityIcon(selectedActivity.type)}
                </div>
                <h2 className="text-xl font-bold text-tosca-900">Detail Aktivitas</h2>
              </div>
              <button onClick={() => setSelectedActivity(null)} className="text-tosca-400 hover:text-tosca-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="h-20 w-20 bg-tosca-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-black shadow-lg">
                  {selectedActivity.user.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-tosca-900">{selectedActivity.user}</h3>
                <span className="px-3 py-1 bg-tosca-50 text-tosca-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-tosca-100">
                  {selectedActivity.status}
                </span>
              </div>
              
              <div className="space-y-4 bg-tosca-50/50 p-6 rounded-2xl border border-tosca-50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-tosca-400 font-bold uppercase text-[10px]">Tindakan</span>
                  <span className="text-tosca-900 font-black">{selectedActivity.action}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-tosca-400 font-bold uppercase text-[10px]">Target</span>
                  <span className="text-tosca-900 font-black">{selectedActivity.target}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-tosca-400 font-bold uppercase text-[10px]">Waktu</span>
                  <span className="text-tosca-900 font-black">{selectedActivity.time}</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-tosca-100 rounded-2xl shadow-sm">
                <p className="text-xs font-bold text-tosca-400 uppercase mb-2">Keterangan:</p>
                <p className="text-sm text-tosca-800 leading-relaxed font-medium">{selectedActivity.detail}</p>
              </div>

              <button 
                onClick={() => setSelectedActivity(null)}
                className="w-full py-4 bg-tosca-900 text-white rounded-2xl font-black shadow-xl shadow-tosca-100 active:scale-95 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-tosca-50 flex items-center justify-between bg-tosca-50/20">
              <h2 className="text-xl font-bold text-tosca-900 flex items-center gap-2">
                <Plus size={24} className="text-tosca-600" /> Tambah Data Cepat
              </h2>
              <button onClick={() => setIsQuickAddOpen(false)} className="text-tosca-400 hover:text-tosca-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleQuickAdd} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-tosca-900 ml-1">Nama Lengkap</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-black" placeholder="Nama santri/musyrif" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Tipe Data</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-tosca-900">
                    <option>Santri</option><option>Musyrif/ah</option><option>Kelas</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Keterangan</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-black" placeholder="Kelas/NIP/Nis" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-tosca-600 text-white rounded-2xl font-black shadow-lg shadow-tosca-100 mt-4">Simpan Data</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
