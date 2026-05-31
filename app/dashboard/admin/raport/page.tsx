'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  FileText, 
  Search, 
  Printer, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2,
  X,
  Filter,
  Download,
  Share2
} from 'lucide-react';

const raportData = [
  { id: 1, nama: 'Ahmad Fauzi', nisn: '0012345678', kelas: '7A', rataNilai: '88', status: 'Selesai' },
  { id: 2, nama: 'Siti Aminah', nisn: '0012345679', kelas: '8A', rataNilai: '92', status: 'Selesai' },
  { id: 3, nama: 'Zaid Al-Khair', nisn: '0012345680', kelas: '7A', rataNilai: '75', status: 'Draft' },
  { id: 4, nama: 'Maryam', nisn: '0012345681', kelas: '9A', rataNilai: '85', status: 'Selesai' },
];

export default function ManajemenRaport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSantri, setSelectedSantri] = useState<any>(null);

  const handlePrint = (nama: string) => {
    alert(`Mempersiapkan Raport: ${nama} untuk dicetak...`);
  };

  const handleSendWA = (nama: string) => {
    alert(`Mengirim link raport ${nama} ke WhatsApp orang tua...`);
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Manajemen Raport</h1>
              <p className="text-tosca-600 font-medium">Cetak dan distribusikan hasil evaluasi hafalan santri.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center gap-2 bg-white border-2 border-tosca-50 text-tosca-600 px-5 py-3 rounded-2xl font-bold hover:bg-tosca-50 transition-all active:scale-95">
                <Filter size={18} />
                Filter Kelas
              </button>
              <button className="flex items-center justify-center gap-2 bg-tosca-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-tosca-100 hover:bg-tosca-700 transition-all active:scale-95">
                <Download size={20} />
                Download Semua
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-tosca-50 bg-tosca-50/20">
              <div className="relative group max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tosca-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Cari nama santri..." 
                  className="pl-11 pr-4 py-3 bg-white border border-tosca-200 rounded-2xl text-sm font-bold text-black placeholder:text-tosca-400 focus:ring-2 focus:ring-tosca-500 w-full shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-tosca-50/50">
                    <th className="px-6 py-4 text-left text-xs font-black text-tosca-400 uppercase tracking-wider">Santri</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-tosca-400 uppercase tracking-wider">NISN / Kelas</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-tosca-400 uppercase tracking-wider">Rata-rata Nilai</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-tosca-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-black text-tosca-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tosca-50">
                  {raportData.filter(s => s.nama.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                    <tr key={item.id} className="hover:bg-tosca-50/30 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-tosca-600 flex items-center justify-center text-white font-black text-sm">
                            {item.nama.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-tosca-900">{item.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm font-bold text-tosca-700">{item.nisn}</p>
                        <p className="text-[10px] font-bold text-tosca-400 uppercase">Kelas {item.kelas}</p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 bg-tosca-100 rounded-full overflow-hidden">
                            <div className="h-full bg-tosca-600 rounded-full" style={{ width: `${item.rataNilai}%` }}></div>
                          </div>
                          <span className="text-sm font-black text-tosca-900">{item.rataNilai}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          item.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handlePrint(item.nama)}
                            className="p-2 text-tosca-600 hover:bg-tosca-600 hover:text-white rounded-xl transition-all"
                            title="Cetak Raport"
                          >
                            <Printer size={18} />
                          </button>
                          <button 
                            onClick={() => handleSendWA(item.nama)}
                            className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all"
                            title="Kirim WA"
                          >
                            <MessageCircle size={18} />
                          </button>
                          <button className="p-2 text-tosca-400 hover:bg-tosca-50 rounded-xl transition-all">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
