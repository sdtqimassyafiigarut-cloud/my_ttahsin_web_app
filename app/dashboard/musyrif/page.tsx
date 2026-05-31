'use client';

import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Star, 
  CheckSquare, 
  ClipboardList, 
  Calendar, 
  Target, 
  Award, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  X, 
  Clock,
  BookOpenCheck,
  AwardCheck,
  TrendingUp,
  Sliders,
  CalendarCheck,
  GraduationCap,
  Video,
  Home,
  UserCheck,
  Sparkles,
  Smartphone
} from 'lucide-react';
import Navbar from '@/components/ui/navbar';

// Mock Initial Data
const initialSantri = [
  { id: '1', nama: 'Ahmad Fauzi', kelas: 'Halaqah A', juzTarget: '30', juzSelesai: ['30', '29'], kehadiran: 'Hadir', adab: 'Sangat Baik', tajwid: 85, makhraj: 88, kelancaran: 87, status: 'Lanjut' },
  { id: '2', nama: 'Siti Aminah', kelas: 'Halaqah A', juzTarget: '5', juzSelesai: ['30', '29', '28', '1'], kehadiran: 'Hadir', adab: 'Baik', tajwid: 90, makhraj: 92, kelancaran: 91, status: 'Lanjut' },
  { id: '3', nama: 'Zaid Al-Khair', kelas: 'Halaqah A', juzTarget: '30', juzSelesai: ['30'], kehadiran: 'Sakit', adab: 'Cukup', tajwid: 75, makhraj: 78, kelancaran: 74, status: 'Ulangi' },
  { id: '4', nama: 'Muhammad Rian', kelas: 'Halaqah A', juzTarget: '15', juzSelesai: ['30', '29', '28', '27'], kehadiran: 'Hadir', adab: 'Baik', tajwid: 82, makhraj: 80, kelancaran: 84, status: 'Lanjut' },
  { id: '5', nama: 'Laila Fitri', kelas: 'Halaqah A', juzTarget: '10', juzSelesai: ['30', '29'], kehadiran: 'Izin', adab: 'Sangat Baik', tajwid: 88, makhraj: 85, kelancaran: 86, status: 'Lanjut' }
];

const initialSetoran = [
  { id: 1, nama: 'Ahmad Fauzi', surah: 'An-Naba', ayat: '1-20', status: 'Lanjut', tanggal: '19 Mei 2026', nilai: 88 },
  { id: 2, nama: 'Siti Aminah', surah: 'An-Nisa', ayat: '1-15', status: 'Lanjut', tanggal: '19 Mei 2026', nilai: 91 },
  { id: 3, nama: 'Zaid Al-Khair', surah: 'An-Naba', ayat: '21-40', status: 'Ulangi', tanggal: '18 Mei 2026', nilai: 75 }
];

const initialJadwal = [
  { id: 1, sesi: 'Tahfizh Pagi', jam: '05:00 - 07:00', lokasi: 'Masjid Utama', musyrif: 'Ust. Mansyur' },
  { id: 2, sesi: 'Murojaah Sore', jam: '16:00 - 17:30', lokasi: 'Pendopo Halaqah', musyrif: 'Ust. Mansyur' }
];

export default function MusyrifDashboard() {
  const [activeSection, setActiveSection] = useState<'overview' | 'setoran' | 'nilai' | 'status' | 'evaluasi' | 'kehadiran' | 'jadwal' | 'target' | 'sertifikat'>('overview');
  
  // Dynamic State for Inputs and Submissions
  const [santriList, setSantriList] = useState(initialSantri);
  const [setoranList, setSetoranList] = useState(initialSetoran);
  const [jadwalList, setJadwalList] = useState(initialJadwal);
  
  // Form State - Setoran & Nilai
  const [selectedSantriId, setSelectedSantriId] = useState('1');
  const [inputSurah, setInputSurah] = useState('');
  const [inputAyat, setInputAyat] = useState('');
  const [inputStatus, setInputStatus] = useState<'Lanjut' | 'Ulangi'>('Lanjut');
  const [inputTajwid, setInputTajwid] = useState('80');
  const [inputMakhraj, setInputMakhraj] = useState('80');
  const [inputKelancaran, setInputKelancaran] = useState('80');
  const [inputCatatan, setInputCatatan] = useState('');

  // Form State - Evaluasi
  const [evalSantriId, setEvalSantriId] = useState('1');
  const [evalAdab, setEvalAdab] = useState('Sangat Baik');
  const [evalCatatan, setEvalCatatan] = useState('');

  // Form State - Target
  const [targetSantriId, setTargetSantriId] = useState('1');
  const [newTargetJuz, setNewTargetJuz] = useState('1');

  // Form State - Jadwal
  const [inputSesi, setInputSesi] = useState('');
  const [inputJam, setInputJam] = useState('');
  const [inputLokasi, setInputLokasi] = useState('');

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Submit Setoran & Nilai
  const handleAddSetoran = (e: React.FormEvent) => {
    e.preventDefault();
    const santriObj = santriList.find(s => s.id === selectedSantriId);
    if (!santriObj) return;

    const taj = parseInt(inputTajwid) || 0;
    const mak = parseInt(inputMakhraj) || 0;
    const kel = parseInt(inputKelancaran) || 0;
    const avgNilai = Math.round((taj + mak + kel) / 3);

    const newSetoranObj = {
      id: Date.now(),
      nama: santriObj.nama,
      surah: inputSurah || 'Al-Mulk',
      ayat: inputAyat || '1-10',
      status: inputStatus,
      tanggal: 'Hari ini',
      nilai: avgNilai
    };
    
    setSetoranList([newSetoranObj, ...setoranList]);

    setSantriList(prev => prev.map(s => {
      if (s.id === selectedSantriId) {
        return {
          ...s,
          tajwid: taj,
          makhraj: mak,
          kelancaran: kel,
          status: inputStatus
        };
      }
      return s;
    }));

    showNotification(`Setoran ${santriObj.nama} berhasil diinput!`);
    setInputSurah('');
    setInputAyat('');
    setInputCatatan('');
  };

  // Update Attendance
  const handleAttendanceChange = (id: string, newKehadiran: string) => {
    setSantriList(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, kehadiran: newKehadiran };
      }
      return s;
    }));
    showNotification(`Kehadiran santri berhasil diperbarui!`);
  };

  // Submit Evaluasi
  const handleUpdateEvaluasi = (e: React.FormEvent) => {
    e.preventDefault();
    const santriObj = santriList.find(s => s.id === evalSantriId);
    if (!santriObj) return;

    setSantriList(prev => prev.map(s => {
      if (s.id === evalSantriId) {
        return { ...s, adab: evalAdab };
      }
      return s;
    }));

    showNotification(`Evaluasi perkembangan ${santriObj.nama} berhasil diperbarui!`);
    setEvalCatatan('');
  };

  // Update Target
  const handleUpdateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const santriObj = santriList.find(s => s.id === targetSantriId);
    if (!santriObj) return;

    setSantriList(prev => prev.map(s => {
      if (s.id === targetSantriId) {
        return { ...s, juzTarget: newTargetJuz };
      }
      return s;
    }));

    showNotification(`Target hafalan ${santriObj.nama} diset ke Juz ${newTargetJuz}!`);
  };

  // Submit Jadwal Baru
  const handleAddJadwal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSesi || !inputJam || !inputLokasi) return;

    const newJadwalObj = {
      id: Date.now(),
      sesi: inputSesi,
      jam: inputJam,
      lokasi: inputLokasi,
      musyrif: 'Ust. Mansyur'
    };

    setJadwalList([...jadwalList, newJadwalObj]);
    showNotification(`Jadwal halaqah baru berhasil ditambahkan!`);
    setInputSesi('');
    setInputJam('');
    setInputLokasi('');
  };

  // Simulated Certificate Download
  const handleDownloadCertificate = (nama: string, juz: string) => {
    showNotification(`Mengunduh Sertifikat Juz ${juz} untuk ${nama}...`);
    setTimeout(() => {
      alert(`Sertifikat Juz ${juz} atas nama ${nama} berhasil diunduh.`);
    }, 1000);
  };

  // Beautiful modern gradients and icons for the Android layout modules
  const modules = [
    { id: 'overview', label: 'Dashboard', icon: Sliders, color: 'from-teal-500 to-emerald-600', iconBg: 'bg-teal-50 text-teal-600' },
    { id: 'setoran', label: 'Setoran', icon: BookOpen, color: 'from-sky-500 to-blue-600', iconBg: 'bg-sky-50 text-sky-600' },
    { id: 'nilai', label: 'Input Nilai', icon: Star, color: 'from-amber-400 to-orange-500', iconBg: 'bg-amber-5 text-amber-600' },
    { id: 'status', label: 'Status', icon: BookOpenCheck, color: 'from-rose-500 to-pink-600', iconBg: 'bg-rose-50 text-rose-600' },
    { id: 'evaluasi', label: 'Evaluasi', icon: ClipboardList, color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-50 text-violet-600' },
    { id: 'kehadiran', label: 'Presensi', icon: CheckSquare, color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-50 text-green-600' },
    { id: 'jadwal', label: 'Jadwal', icon: Calendar, color: 'from-indigo-500 to-blue-700', iconBg: 'bg-indigo-50 text-indigo-600' },
    { id: 'target', label: 'Target', icon: Target, color: 'from-fuchsia-500 to-purple-700', iconBg: 'bg-fuchsia-50 text-fuchsia-600' },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award, color: 'from-yellow-500 to-amber-600', iconBg: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 lg:pb-8">
      {/* Top Mobile Bar - Premium Android Style Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-tosca-100/50 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-tosca-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-tosca-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-black text-tosca-950 block tracking-tight">Baitul Huffaz</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-tosca-500 font-extrabold uppercase tracking-wider">Musyrif Panel</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-tosca-900">Ust. Mansyur</span>
              <span className="text-[9px] font-bold text-tosca-400 uppercase tracking-widest">Halaqah A</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-tosca-50 border border-tosca-100 flex items-center justify-center text-tosca-600 font-bold shadow-sm">
              UM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur text-white px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="text-teal-400" size={18} />
            <span className="text-xs font-extrabold">{notification}</span>
          </div>
        )}

        {/* Hero Card / Welcome Sheet */}
        <div className="relative bg-gradient-to-tr from-tosca-900 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none flex items-center justify-end pr-6">
            <Smartphone size={160} />
          </div>
          <div className="space-y-1 z-10">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">Ahlan wa Sahlan, Ust. Mansyur</h1>
            <p className="text-xs text-teal-100 font-medium leading-relaxed max-w-xl">Akses semua fitur halaqah Anda melalui modul launcher horizontal modern berbasis layout Android responsif di bawah ini.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 z-10 bg-white/10 px-3 py-1.5 rounded-xl w-fit border border-white/5">
            <Clock size={12} className="text-teal-300 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-200">Sesi Aktif: Tahfizh Pagi</span>
          </div>
        </div>

        {/* =======================================================
            ANDROID-STYLE HORIZONTAL MODULE LAUNCHER
            ======================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Modul Halaqah (Horizontal Launcher)
            </h2>
            <span className="text-[10px] font-bold text-slate-400">Swipe Kanan/Kiri →</span>
          </div>

          {/* Horizontal Scrollable Menu - Smooth Android Style UI on Mobile, Perfect Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-9 gap-3 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar -mx-4 md:mx-0 px-4 md:px-0 snap-x">
            {modules.map((m) => {
              const isActive = activeSection === m.id;
              const IconComp = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveSection(m.id as any)}
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-between p-3 w-[88px] md:w-auto h-[100px] rounded-2xl transition-all snap-center border ${
                      isActive 
                        ? 'bg-white border-tosca-500 shadow-md shadow-tosca-100 ring-2 ring-tosca-500/20 scale-[1.03]' 
                        : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                    }
                  `}
                >
                  {/* Circle Grad Icon */}
                  <div className={`
                    h-11 w-11 rounded-xl flex items-center justify-center transition-all bg-gradient-to-tr ${m.color} text-white shadow-sm
                  `}>
                    <IconComp size={18} className="stroke-[2.5]" />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[10px] font-bold text-center leading-tight truncate w-full ${
                    isActive ? 'text-tosca-950 font-black' : 'text-slate-600'
                  }`}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Inline CSS to hide scrollbars on mobile while keeping native horizontal scrolling functionality */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        {/* =======================================================
            DYNAMIC BODY SECTION (LAID UNDER THE LAUNCHER)
            ======================================================= */}
        <div className="transition-all duration-300">
          
          {/* OVERVIEW PANEL */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stats */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Santri Aktif</span>
                    <p className="text-2xl font-black text-slate-900 mt-2">{santriList.length} Santri</p>
                    <span className="text-[9px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded w-fit mt-3">Halaqah A</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hadir Hari Ini</span>
                    <p className="text-2xl font-black text-slate-900 mt-2">
                      {santriList.filter(s => s.kehadiran === 'Hadir').length} / {santriList.length}
                    </p>
                    <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded w-fit mt-3">Presensi Selesai</span>
                  </div>
                </div>

                {/* Sesi Halaqah Hari Ini */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-tosca-600" /> Sesi Jadwal
                  </h3>
                  <div className="space-y-2.5">
                    {jadwalList.map(j => (
                      <div key={j.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                        <div>
                          <p className="text-xs font-black text-slate-800">{j.sesi}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5">{j.lokasi}</p>
                        </div>
                        <span className="text-[9px] font-extrabold text-tosca-600 bg-white px-2 py-0.5 rounded border border-slate-150">{j.jam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Setoran Recents */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Setoran Terakhir Masuk</h3>
                  <button onClick={() => setActiveSection('setoran')} className="text-[10px] font-bold text-tosca-600 hover:text-tosca-750">Input Setoran →</button>
                </div>
                <div className="divide-y divide-slate-50">
                  {setoranList.map(s => (
                    <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-slate-900">{s.nama}</p>
                        <p className="text-[10px] text-slate-400 font-bold">Surah {s.surah} (Ayat {s.ayat})</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                          s.status === 'Lanjut' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>{s.status}</span>
                        <span className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-700">{s.nilai}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INPUT SETORAN */}
          {activeSection === 'setoran' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-slate-55 pb-4">
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <BookOpen className="text-tosca-600" size={20} /> Input Setoran Hafalan Baru
                </h3>
              </div>
              <form onSubmit={handleAddSetoran} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pilih Santri</label>
                  <select 
                    value={selectedSantriId}
                    onChange={(e) => setSelectedSantriId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-800 bg-white"
                  >
                    {santriList.map(s => (
                      <option key={s.id} value={s.id}>{s.nama}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Surah</label>
                    <input type="text" placeholder="Contoh: An-Naba" value={inputSurah} onChange={(e) => setInputSurah(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-black" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Rentang Ayat</label>
                    <input type="text" placeholder="Contoh: 1-20" value={inputAyat} onChange={(e) => setInputAyat(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-black" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status Setoran</label>
                  <div className="flex gap-4 pt-1">
                    <button type="button" onClick={() => setInputStatus('Lanjut')} className={`flex-1 py-3 rounded-xl font-bold text-xs border ${inputStatus === 'Lanjut' ? 'bg-green-500 border-green-500 text-white' : 'bg-white text-slate-600 border-slate-200'}`}>Lanjut (Lulus)</button>
                    <button type="button" onClick={() => setInputStatus('Ulangi')} className={`flex-1 py-3 rounded-xl font-bold text-xs border ${inputStatus === 'Ulangi' ? 'bg-red-500 border-red-500 text-white' : 'bg-white text-slate-600 border-slate-200'}`}>Ulangi (Murojaah)</button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Tajwid</label>
                    <input type="number" value={inputTajwid} onChange={(e) => setInputTajwid(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-center text-black" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Makhraj</label>
                    <input type="number" value={inputMakhraj} onChange={(e) => setInputMakhraj(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-center text-black" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Kelancaran</label>
                    <input type="number" value={inputKelancaran} onChange={(e) => setInputKelancaran(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-center text-black" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-tosca-600 hover:bg-tosca-700 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow">Simpan Data Setoran</button>
              </form>
            </div>
          )}

          {/* INPUT NILAI */}
          {activeSection === 'nilai' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Star size={16} className="text-amber-500" /> Detail Aspek Nilai Santri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50">
                      <th className="py-3 px-4">Nama</th>
                      <th className="py-3 px-4 text-center">Tajwid</th>
                      <th className="py-3 px-4 text-center">Makhraj</th>
                      <th className="py-3 px-4 text-center">Kelancaran</th>
                      <th className="py-3 px-4 text-center">Skor Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-bold text-xs text-slate-800">
                    {santriList.map(s => {
                      const avg = Math.round((s.tajwid + s.makhraj + s.kelancaran) / 3);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/20">
                          <td className="py-3 px-4 font-black">{s.nama}</td>
                          <td className="py-3 px-4 text-center">{s.tajwid}</td>
                          <td className="py-3 px-4 text-center">{s.makhraj}</td>
                          <td className="py-3 px-4 text-center">{s.kelancaran}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 bg-tosca-600 text-white rounded text-[10px] font-black">{avg}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STATUS */}
          {activeSection === 'status' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50/40 rounded-2xl border border-green-150 p-5 space-y-3">
                <h4 className="text-xs font-black text-green-700 uppercase tracking-wider">Status Lanjut (Lulus)</h4>
                <div className="space-y-2">
                  {santriList.filter(s => s.status === 'Lanjut').map(s => (
                    <div key={s.id} className="p-3 bg-white border border-green-100 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">{s.nama}</span>
                      <span className="text-[10px] font-bold text-green-600">Lulus Uji</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50/40 rounded-2xl border border-red-150 p-5 space-y-3">
                <h4 className="text-xs font-black text-red-700 uppercase tracking-wider">Status Ulangi (Murojaah)</h4>
                <div className="space-y-2">
                  {santriList.filter(s => s.status === 'Ulangi').map(s => (
                    <div key={s.id} className="p-3 bg-white border border-red-100 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">{s.nama}</span>
                      <span className="text-[10px] font-bold text-red-600">Perlu Lancar</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EVALUASI */}
          {activeSection === 'evaluasi' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Karakter & Adab</h4>
                <form onSubmit={handleUpdateEvaluasi} className="space-y-3">
                  <select value={evalSantriId} onChange={(e) => setEvalSantriId(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                    {santriList.map(s => (
                      <option key={s.id} value={s.id}>{s.nama}</option>
                    ))}
                  </select>
                  <select value={evalAdab} onChange={(e) => setEvalAdab(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                    <option>Sangat Baik</option><option>Baik</option><option>Cukup</option>
                  </select>
                  <button type="submit" className="w-full py-2.5 bg-tosca-600 text-white rounded-lg text-xs font-bold shadow">Simpan Evaluasi</button>
                </form>
              </div>

              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Daftar Sikap Santri</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50">
                        <th className="py-2 px-3">Nama</th>
                        <th className="py-2 px-3 text-center">Predikat Adab</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-bold text-xs text-slate-800">
                      {santriList.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/20">
                          <td className="py-2 px-3 font-black">{s.nama}</td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-2 py-0.5 bg-tosca-50 text-tosca-600 border border-tosca-100 rounded text-[10px] font-bold">{s.adab}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRESENSI / KEHADIRAN */}
          {activeSection === 'kehadiran' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Input Kehadiran Santri</h4>
              <div className="space-y-3">
                {santriList.map(s => (
                  <div key={s.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-black text-slate-800">{s.nama}</span>
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {['Hadir', 'Izin', 'Sakit', 'Alpa'].map(k => (
                        <button
                          key={k}
                          onClick={() => handleAttendanceChange(s.id, k)}
                          className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${
                            s.kehadiran === k 
                              ? 'bg-tosca-600 border-tosca-600 text-white shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JADWAL */}
          {activeSection === 'jadwal' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Tambah Jadwal</h4>
                <form onSubmit={handleAddJadwal} className="space-y-3">
                  <input type="text" placeholder="Sesi" value={inputSesi} onChange={(e) => setInputSesi(e.target.value)} required className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-black" />
                  <input type="text" placeholder="Jam" value={inputJam} onChange={(e) => setInputJam(e.target.value)} required className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-black" />
                  <input type="text" placeholder="Lokasi" value={inputLokasi} onChange={(e) => setInputLokasi(e.target.value)} required className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-black" />
                  <button type="submit" className="w-full py-2.5 bg-tosca-600 text-white rounded-lg text-xs font-bold shadow">Simpan Jadwal</button>
                </form>
              </div>

              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Daftar Jadwal Aktif</h4>
                <div className="space-y-2">
                  {jadwalList.map(j => (
                    <div key={j.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-150">
                      <div>
                        <p className="text-xs font-black text-slate-800">{j.sesi}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">Lokasi: {j.lokasi}</p>
                      </div>
                      <span className="text-[10px] font-bold text-tosca-600 bg-white px-2 py-0.5 rounded border">{j.jam}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TARGET */}
          {activeSection === 'target' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Update Target</h4>
                <form onSubmit={handleUpdateTarget} className="space-y-3">
                  <select value={targetSantriId} onChange={(e) => setTargetSantriId(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white">
                    {santriList.map(s => (
                      <option key={s.id} value={s.id}>{s.nama}</option>
                    ))}
                  </select>
                  <input type="number" min="1" max="30" value={newTargetJuz} onChange={(e) => setNewTargetJuz(e.target.value)} required className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-black" />
                  <button type="submit" className="w-full py-2.5 bg-tosca-600 text-white rounded-lg text-xs font-bold shadow">Update Target</button>
                </form>
              </div>

              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Daftar Target Hafalan</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50">
                        <th className="py-2 px-3">Nama</th>
                        <th className="py-2 px-3 text-center">Target (Juz)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-bold text-xs text-slate-800">
                      {santriList.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/20">
                          <td className="py-2 px-3 font-black">{s.nama}</td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded text-[10px] font-bold">Juz {s.juzTarget}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SERTIFIKAT */}
          {activeSection === 'sertifikat' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Cetak Sertifikat Kelulusan Juz</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {santriList.map(s => (
                  <div key={s.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs font-black text-slate-900">{s.nama}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Juz diselesaikan: {s.juzSelesai.join(', ')}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {s.juzSelesai.map(jz => (
                        <button
                          key={jz}
                          onClick={() => handleDownloadCertificate(s.nama, jz)}
                          className="w-full flex items-center justify-between px-3 py-1.5 bg-tosca-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider"
                        >
                          <span>Unduh Juz {jz}</span>
                          <Download size={12} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* =======================================================
          ANDROID-STYLE BOTTOM NAVIGATION BAR
          ======================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2.5 flex items-center justify-around shadow-2xl lg:hidden">
        <button 
          onClick={() => setActiveSection('overview')}
          className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${
            activeSection === 'overview' ? 'text-tosca-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home size={20} className={activeSection === 'overview' ? 'stroke-[2.5]' : 'stroke-[2]'} />
          <span className="text-[9px] font-extrabold tracking-tight">Utama</span>
        </button>

        <button 
          onClick={() => setActiveSection('setoran')}
          className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${
            activeSection === 'setoran' ? 'text-tosca-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen size={20} className={activeSection === 'setoran' ? 'stroke-[2.5]' : 'stroke-[2]'} />
          <span className="text-[9px] font-extrabold tracking-tight">Setoran</span>
        </button>

        <button 
          onClick={() => setActiveSection('nilai')}
          className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${
            activeSection === 'nilai' ? 'text-tosca-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Star size={20} className={activeSection === 'nilai' ? 'stroke-[2.5]' : 'stroke-[2]'} />
          <span className="text-[9px] font-extrabold tracking-tight">Nilai</span>
        </button>

        <button 
          onClick={() => setActiveSection('kehadiran')}
          className={`flex flex-col items-center justify-center gap-1 w-12 transition-all ${
            activeSection === 'kehadiran' ? 'text-tosca-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <CheckSquare size={20} className={activeSection === 'kehadiran' ? 'stroke-[2.5]' : 'stroke-[2]'} />
          <span className="text-[9px] font-extrabold tracking-tight">Presensi</span>
        </button>

        <a 
          href="/login"
          className="flex flex-col items-center justify-center gap-1 w-12 text-red-500 hover:text-red-600"
        >
          <X size={20} className="stroke-[2.5]" />
          <span className="text-[9px] font-extrabold tracking-tight">Keluar</span>
        </a>
      </nav>
    </div>
  );
}
