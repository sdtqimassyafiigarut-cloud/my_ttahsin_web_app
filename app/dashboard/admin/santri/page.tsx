'use client';

import React, { useState, useRef } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/navbar';
import { 
  FileDown, 
  Upload, 
  Save, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  X,
  CheckCircle2
} from 'lucide-react';

const dummySantri = [
  { nisn: '1234567890', nama: 'Ahmad Fauzi', kelas: '7A', wali: 'Bpk. Ridwan', wa: '081234567890' },
  { nisn: '1234567891', nama: 'Siti Aminah', kelas: '8B', wali: 'Ibu Fatimah', wa: '081234567891' },
  { nisn: '1234567892', nama: 'Zaid Al-Khair', kelas: '9C', wali: 'Bpk. Sulaiman', wa: '081234567892' },
  { nisn: '1234567893', nama: 'Maryam Az-Zahra', kelas: '7B', wali: 'Ibu Sarah', wa: '081234567893' },
  { nisn: '1234567894', nama: 'Yusuf Habibi', kelas: '8A', wali: 'Bpk. Hamdan', wa: '081234567894' },
];

export default function ManajemenSantri() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to download CSV Template
  const downloadTemplate = () => {
    const headers = ['NISN', 'Nama Lengkap', 'Kelas', 'Nama Orang Tua/Wali', 'Nomor WA'];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_santri_baitul_huffaz.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`File "${file.name}" berhasil dipilih. Mengunggah data...`);
      // Logic upload simulasi
      setTimeout(() => {
        triggerToast();
      }, 1000);
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-tosca-900">Manajemen Santri</h1>
              <p className="text-tosca-600 font-medium">Kelola data santri Baitul Huffaz secara lengkap.</p>
            </div>
            {showToast && (
              <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold">Data Berhasil Disimpan!</span>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="bg-white p-4 rounded-3xl border border-tosca-50 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 px-4 py-2 bg-tosca-50 text-tosca-700 rounded-xl font-semibold text-sm hover:bg-tosca-100 transition-colors border border-tosca-100"
                >
                  <FileDown size={18} />
                  Template
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-tosca-50 text-tosca-700 rounded-xl font-semibold text-sm hover:bg-tosca-100 transition-colors border border-tosca-100"
                >
                  <Upload size={18} />
                  Upload Massal
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".csv,.xls,.xlsx"
                />
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-tosca-600 text-white rounded-xl font-semibold text-sm hover:bg-tosca-700 transition-all shadow-md shadow-tosca-100"
                >
                  <Save size={18} />
                  Simpan
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tosca-400">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Cari santri..."
                    className="pl-10 pr-4 py-2 bg-tosca-50/50 border border-tosca-100 rounded-xl text-sm focus:ring-2 focus:ring-tosca-500 focus:border-tosca-500 transition-all w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-tosca-900 text-white rounded-xl font-semibold text-sm hover:bg-black transition-all"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Tambah Santri Manual</span>
                  <span className="sm:hidden">Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-3xl border border-tosca-50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tosca-50/50 border-b border-tosca-50">
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">NISN</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Nama Lengkap</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Kelas</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Nama Orang Tua/Wali</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider">Nomor WA</th>
                    <th className="px-6 py-4 text-xs font-bold text-tosca-700 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tosca-50">
                  {dummySantri.map((santri) => (
                    <tr key={santri.nisn} className="hover:bg-tosca-50/30 transition-colors group">
                      <td className="px-6 py-4 text-sm font-medium text-tosca-900">{santri.nisn}</td>
                      <td className="px-6 py-4 text-sm text-tosca-700 font-semibold">{santri.nama}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-tosca-100 text-tosca-700 rounded-full text-xs font-bold">
                          {santri.kelas}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-tosca-600">{santri.wali}</td>
                      <td className="px-6 py-4">
                        <a 
                          href={`https://wa.me/${santri.wa}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-tosca-600 hover:text-tosca-900 transition-colors"
                        >
                          {santri.wa}
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-tosca-500 hover:bg-tosca-100 hover:text-tosca-700 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                          <button className="p-2 text-tosca-400 hover:bg-tosca-50 rounded-lg">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="px-6 py-4 bg-tosca-50/20 border-t border-tosca-50 flex items-center justify-between text-sm text-tosca-500 font-medium">
              <p>Menampilkan 1-5 dari 450 santri</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-tosca-100 rounded-xl hover:bg-white transition-colors disabled:opacity-50" disabled>Sebelumnya</button>
                <button className="px-4 py-2 border border-tosca-100 rounded-xl hover:bg-white transition-colors">Selanjutnya</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Tambah Santri */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-tosca-50">
              <h2 className="text-xl font-bold text-tosca-900">Tambah Santri Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-tosca-400 hover:text-tosca-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); triggerToast(); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-tosca-700 ml-1">NISN</label>
                  <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="Contoh: 0012345" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-tosca-700 ml-1">Kelas</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm">
                    <option>7A</option>
                    <option>7B</option>
                    <option>8A</option>
                    <option>8B</option>
                    <option>9A</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Nama Lengkap</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="Nama lengkap santri" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Nama Orang Tua/Wali</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="Nama ayah/ibu/wali" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-tosca-700 ml-1">Nomor WhatsApp</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-tosca-100 focus:ring-2 focus:ring-tosca-500 text-sm" placeholder="62812xxx" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-tosca-100 text-tosca-600 rounded-xl font-bold hover:bg-tosca-50 transition-colors">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-tosca-600 text-white rounded-xl font-bold hover:bg-tosca-700 transition-all shadow-lg shadow-tosca-100">Simpan Santri</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
