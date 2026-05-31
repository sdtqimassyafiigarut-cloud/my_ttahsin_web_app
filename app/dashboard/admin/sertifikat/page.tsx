'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  Award, 
  Search, 
  Printer, 
  Download, 
  CheckCircle2, 
  X, 
  Plus, 
  FileCheck,
  Star,
  ChevronRight
} from 'lucide-react';

const sertifikatData = [
  { id: 1, nama: 'Ahmad Fauzi', juz: '30', tglLulus: '10 Mei 2026', predikat: 'Mumtaz', status: 'Siap Cetak' },
  { id: 2, nama: 'Siti Aminah', juz: '5', tglLulus: '12 Mei 2026', predikat: 'Jayyid Jiddan', status: 'Tercetak' },
  { id: 3, nama: 'Maryam', juz: '29', tglLulus: '14 Mei 2026', predikat: 'Mumtaz', status: 'Siap Cetak' },
];

export default function ManajemenSertifikat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCetak = (nama: string, juz: string) => {
    alert(`Mencetak Sertifikat Hafalan Juz ${juz} atas nama ${nama}...`);
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Manajemen Sertifikat</h1>
              <p className="text-tosca-600 font-medium">Apresiasi capaian hafalan santri dengan sertifikat resmi.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-tosca-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-tosca-200 hover:bg-tosca-700 transition-all active:scale-95"
            >
              <Plus size={20} />
              Input Kelulusan Juz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sertifikatData.filter(s => s.nama.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
              <div key={s.id} className="bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden group hover:border-tosca-300 hover:shadow-md transition-all">
                <div className="p-6 bg-tosca-900 text-white relative">
                  <div className="absolute right-4 top-4 opacity-20">
                    <Award size={80} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="text-orange-400 fill-orange-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-tosca-200">Sertifikat Juz {s.juz}</span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{s.nama}</h3>
                  <p className="text-xs text-tosca-200 font-bold">{s.tglLulus}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-tosca-400 font-bold">Predikat</span>
                    <span className="text-tosca-900 font-black uppercase text-xs">{s.predikat}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-tosca-50">
                    <span className="text-tosca-400 font-bold">Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      s.status === 'Siap Cetak' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleCetak(s.nama, s.juz)}
                      className="flex-1 flex items-center justify-center gap-2 bg-tosca-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-tosca-700 transition-colors"
                    >
                      <Printer size={16} /> Cetak
                    </button>
                    <button className="px-4 py-2.5 border-2 border-tosca-50 text-tosca-600 rounded-xl hover:bg-tosca-50 transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal Input Kelulusan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-tosca-50 flex items-center justify-between bg-tosca-50/20">
              <h2 className="text-xl font-bold text-tosca-900 flex items-center gap-2">
                <FileCheck size={24} className="text-tosca-600" /> Input Kelulusan Juz
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-tosca-400 hover:text-tosca-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("Data kelulusan berhasil disimpan!"); }} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-tosca-900 ml-1">Pilih Santri</label>
                <select className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-tosca-900">
                  <option>Ahmad Fauzi</option><option>Siti Aminah</option><option>Maryam</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Lulus Juz</label>
                  <input type="number" required className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-black" placeholder="Contoh: 30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-tosca-900 ml-1">Predikat</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-tosca-100 font-bold text-tosca-900">
                    <option>Mumtaz</option><option>Jayyid Jiddan</option><option>Jayyid</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-tosca-600 text-white rounded-2xl font-black shadow-lg shadow-tosca-100 mt-4">Simpan & Terbitkan</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
