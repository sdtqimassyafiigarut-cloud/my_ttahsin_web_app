'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  X,
  CheckCircle2
} from 'lucide-react';

const initialMusyrif = [
  { nip: 'MSR-001', nama: 'Ust. Mansyur Al-Hafizh', kelompok: 'Halaqah A', email: 'mansyur@contoh.com', wa: '081234567801' },
  { nip: 'MSR-002', nama: 'Usth. Siti Khadijah', kelompok: 'Halaqah B', email: 'khadijah@contoh.com', wa: '081234567802' },
  { nip: 'MSR-003', nama: 'Ust. Zulkifli', kelompok: 'Halaqah C', email: 'zulkifli@contoh.com', wa: '081234567803' },
];

export default function ManajemenMusyrif() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filteredMusyrif = initialMusyrif.filter(m => 
    m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddMusyrif = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    triggerToast();
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Manajemen Musyrif/ah</h1>
              <p className="text-tosca-600 font-medium">Kelola data ustadz dan ustadzah pembimbing Baitul Huffaz.</p>
            </div>
            <div className="flex items-center gap-4">
              {showToast && (
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-right-4">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-bold">Berhasil Disimpan!</span>
                </div>
              )}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-tosca-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-tosca-200 hover:bg-tosca-700 transition-all active:scale-95"
              >
                <Plus size={20} />
                Tambah Musyrif
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-tosca-50 shadow-sm mb-6">
            <div className="relative group max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tosca-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Cari nama atau NIP musyrif..." 
                className="pl-10 pr-4 py-2 bg-tosca-50/50 border border-tosca-200 rounded-xl text-sm font-bold text-black placeholder:text-tosca-500 focus:ring-2 focus:ring-tosca-500 w-full transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tosca-50/50 border-b border-tosca-50">
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">NIP</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Nama Lengkap</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Kelompok Binaan</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Kontak</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tosca-50">
                  {filteredMusyrif.length > 0 ? (
                    filteredMusyrif.map((m) => (
                      <tr key={m.nip} className="hover:bg-tosca-50/30 transition-colors group">
                        <td className="px-6 py-4 text-sm font-medium text-tosca-900">{m.nip}</td>
                        <td className="px-6 py-4 text-sm text-tosca-700 font-semibold">{m.nama}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-tosca-100 text-tosca-700 rounded-full text-xs font-bold">{m.kelompok}</span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-tosca-600 font-medium group-hover:text-tosca-900 transition-colors"><Mail size={12} /> {m.email}</div>
                          <div className="flex items-center gap-2 text-xs text-tosca-600 font-medium group-hover:text-tosca-900 transition-colors"><Phone size={12} /> {m.wa}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-tosca-500 hover:bg-tosca-100 rounded-lg transition-colors"><Edit size={18} /></button>
                            <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-tosca-500 font-medium italic">
                        Tidak ada musyrif yang ditemukan dengan nama "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Tambah Musyrif */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-tosca-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tosca-100 rounded-xl text-tosca-600">
                  <Plus size={20} />
                </div>
                <h2 className="text-xl font-bold text-tosca-900">Tambah Musyrif Baru</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-tosca-400 hover:text-tosca-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleAddMusyrif}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-tosca-700 ml-1">NIP / ID</label>
                  <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="MSR-00X" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-tosca-700 ml-1">Kelompok Binaan</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm">
                    <option>Halaqah A</option>
                    <option>Halaqah B</option>
                    <option>Halaqah C</option>
                    <option>Halaqah D</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Nama Lengkap</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="Nama lengkap ustadz/ah" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Email</label>
                <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="email@contoh.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Nomor WhatsApp</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="62812xxx" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-tosca-100 text-tosca-600 rounded-xl font-bold hover:bg-tosca-50 transition-colors">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-tosca-600 text-white rounded-xl font-bold hover:bg-tosca-700 transition-all shadow-lg shadow-tosca-100">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
