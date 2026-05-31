'use client';
import React, { useState } from 'react';
import { Star, ClipboardList, Target, Video, Award, Download, Clock, CheckCircle2, GraduationCap, Sparkles, Home, BookOpen, X, Home as HomeIcon } from 'lucide-react';

const profile = {
  nama: 'Ahmad Fauzi', nis: 'BH20260401', kelas: 'Halaqah A - Ust. Mansyur',
  wali: 'Bapak Rahman', nilaiRata: 87, juzTarget: 'Juz 2', totalJuz: '4 Juz',
  juzSelesai: ['30', '29', '28', '1'],
  adab: 'Sangat Baik', disiplin: 'Sangat Disiplin',
  catatan: 'Ahmad menunjukkan adab yang sangat mulia. Hafalan barunya lancar, tajwid perlu dipertahankan.',
  zoomId: '829 4012 3928', zoomPass: 'tahfizhA',
};

const riwayat = [
  { id: 1, surah: 'An-Naba', ayat: '1-20', tajwid: 85, makhraj: 88, kelancaran: 87, rata: 87, status: 'Lanjut', tgl: '19 Mei 2026' },
  { id: 2, surah: "An-Nazi'at", ayat: '1-25', tajwid: 90, makhraj: 92, kelancaran: 91, rata: 91, status: 'Lanjut', tgl: '17 Mei 2026' },
  { id: 3, surah: 'Abasa', ayat: '1-42', tajwid: 80, makhraj: 85, kelancaran: 80, rata: 82, status: 'Lanjut', tgl: '15 Mei 2026' },
  { id: 4, surah: 'At-Takwir', ayat: '1-29', tajwid: 75, makhraj: 78, kelancaran: 74, rata: 76, status: 'Ulangi', tgl: '13 Mei 2026' },
];

const modules = [
  { id: 'overview', label: 'Beranda', icon: Home, color: 'from-teal-500 to-emerald-600' },
  { id: 'nilai', label: 'Nilai', icon: Star, color: 'from-amber-400 to-orange-500' },
  { id: 'evaluasi', label: 'Evaluasi', icon: ClipboardList, color: 'from-violet-500 to-purple-600' },
  { id: 'target', label: 'Target', icon: Target, color: 'from-fuchsia-500 to-purple-700' },
  { id: 'zoom', label: 'Zoom', icon: Video, color: 'from-sky-500 to-blue-600' },
  { id: 'sertifikat', label: 'Sertifikat', icon: Award, color: 'from-yellow-500 to-amber-600' },
];

export default function SantriDashboard() {
  const [active, setActive] = useState<string>('overview');
  const [notif, setNotif] = useState<string | null>(null);
  const [zoomLive, setZoomLive] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const notify = (msg: string) => { setNotif(msg); setTimeout(() => setNotif(null), 3000); };

  const handleDownload = (juz: string) => {
    setDownloading(juz);
    notify(`Menyiapkan Sertifikat Juz ${juz}...`);
    setTimeout(() => { setDownloading(null); alert(`Sertifikat Juz ${juz} - ${profile.nama} berhasil diunduh.`); }, 1500);
  };

  return (
    <div className="min-h-screen bg-tosca-50/30 flex flex-col pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-tosca-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-tosca-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-base font-black text-tosca-900 block">Baitul Huffaz</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-tosca-500 font-extrabold uppercase tracking-wider">Portal Santri</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-tosca-900">{profile.nama}</span>
              <span className="text-[9px] text-tosca-400 font-bold uppercase">{profile.kelas}</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-tosca-50 border border-tosca-100 flex items-center justify-center text-tosca-600 font-black shadow-sm">AF</div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Toast */}
        {notif && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-tosca-600 text-white px-5 py-3 rounded-2xl shadow-xl">
            <CheckCircle2 size={18} /><span className="text-xs font-extrabold">{notif}</span>
          </div>
        )}

        {/* Hero Card */}
        <div className="relative bg-gradient-to-tr from-tosca-900 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden min-h-[140px] flex flex-col justify-between">
          <div className="absolute right-4 top-4 opacity-10"><Award size={120} /></div>
          <div className="space-y-1 z-10">
            <h1 className="text-xl sm:text-2xl font-black">Assalamualaikum, {profile.nama}</h1>
            <p className="text-xs text-teal-100 font-medium">Pantau perkembangan hafalan Anda secara real-time.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 bg-white/10 px-3 py-1.5 rounded-xl w-fit border border-white/10">
            <Clock size={12} className="text-teal-300" />
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-200">NIS: {profile.nis}</span>
          </div>
        </div>

        {/* Module Launcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-tosca-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" /> Menu Santri
            </h2>
            <span className="text-[10px] font-bold text-tosca-400">Swipe →</span>
          </div>
          <div className="flex md:grid md:grid-cols-6 gap-3 overflow-x-auto pb-3 no-scrollbar -mx-4 md:mx-0 px-4 md:px-0 snap-x">
            {modules.map(m => {
              const isActive = active === m.id;
              const Icon = m.icon;
              return (
                <button key={m.id} onClick={() => setActive(m.id)}
                  className={`flex-shrink-0 flex flex-col items-center justify-between p-3 w-[88px] md:w-auto h-[100px] rounded-2xl transition-all snap-center border ${isActive ? 'bg-white border-tosca-500 ring-2 ring-tosca-500/20 shadow-md scale-[1.03]' : 'bg-white border-tosca-100 hover:border-tosca-200 shadow-sm'}`}>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center bg-gradient-to-tr ${m.color} text-white shadow-sm`}>
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className={`text-[10px] font-bold text-center truncate w-full ${isActive ? 'text-tosca-900 font-black' : 'text-tosca-600'}`}>{m.label}</span>
                </button>
              );
            })}
          </div>
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
        </div>

        {/* Sections */}
        <div>
          {/* OVERVIEW */}
          {active === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Rata-rata Nilai', val: `${profile.nilaiRata}/100`, badge: 'Mumtaz', badgeColor: 'bg-green-500', click: 'nilai', iconColor: 'bg-tosca-50 text-tosca-600', Icon: Star },
                  { label: 'Target Hafalan', val: profile.juzTarget, badge: 'Aktif', badgeColor: 'bg-orange-400', click: 'target', iconColor: 'bg-orange-50 text-orange-600', Icon: Target },
                  { label: 'Predikat Adab', val: profile.adab, badge: 'Karakter', badgeColor: 'bg-violet-500', click: 'evaluasi', iconColor: 'bg-violet-50 text-violet-600', Icon: ClipboardList },
                  { label: 'Sertifikat', val: profile.totalJuz, badge: 'Siap Unduh', badgeColor: 'bg-amber-500', click: 'sertifikat', iconColor: 'bg-amber-50 text-amber-600', Icon: Award },
                ].map(c => (
                  <div key={c.label} onClick={() => setActive(c.click)} className="bg-white p-5 rounded-2xl border border-tosca-50 shadow-sm hover:border-tosca-200 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2.5 rounded-xl ${c.iconColor} group-hover:scale-110 transition-transform`}><c.Icon size={20} /></div>
                      <span className={`${c.badgeColor} text-white text-[9px] font-black px-2 py-0.5 rounded`}>{c.badge}</span>
                    </div>
                    <p className="text-tosca-500 text-[10px] font-bold uppercase tracking-wider">{c.label}</p>
                    <p className="text-lg font-black text-tosca-900 mt-0.5">{c.val}</p>
                  </div>
                ))}
              </div>

              {/* Recent Setoran */}
              <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-tosca-50 flex justify-between items-center">
                  <h3 className="text-xs font-black text-tosca-500 uppercase tracking-widest">Setoran Terbaru</h3>
                  <button onClick={() => setActive('nilai')} className="text-[10px] font-bold text-tosca-600">Lihat Semua →</button>
                </div>
                {riwayat.slice(0, 3).map(r => (
                  <div key={r.id} className="p-4 flex items-center justify-between border-b border-tosca-50/50 last:border-0 hover:bg-tosca-50/20 transition-all">
                    <div>
                      <p className="text-xs font-black text-tosca-900">Surah {r.surah}</p>
                      <p className="text-[10px] text-tosca-400 font-bold">Ayat {r.ayat} • {r.tgl}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${r.status === 'Lanjut' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{r.status}</span>
                      <span className="h-9 w-9 rounded-xl bg-tosca-50 border border-tosca-100 flex items-center justify-center font-black text-xs text-tosca-800">{r.rata}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Zoom Quick Card */}
              <div className="bg-tosca-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500"><Video size={100} /></div>
                <span className="px-2 py-0.5 bg-green-500 text-white rounded text-[8px] font-black uppercase tracking-wider">Halaqah Aktif</span>
                <h4 className="text-sm font-black mt-2">Tahfizh Pagi - Halaqah A</h4>
                <p className="text-xs text-teal-200 mt-0.5">05:00 - 07:00 (Hari Ini)</p>
                <button onClick={() => setActive('zoom')} className="mt-4 w-full py-2.5 bg-white text-tosca-900 rounded-xl font-black text-xs hover:bg-tosca-50 transition-colors">Masuk Room Halaqah Online</button>
              </div>
            </div>
          )}

          {/* NILAI */}
          {active === 'nilai' && (
            <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-tosca-50">
                <h3 className="text-sm font-black text-tosca-900 flex items-center gap-2"><Star className="text-amber-500" size={18} /> Laporan Nilai Hafalan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="bg-tosca-50/50 border-b border-tosca-100 text-[9px] font-black text-tosca-400 uppercase tracking-widest">
                    <th className="py-3 px-4">Tanggal</th><th className="py-3 px-4">Hafalan</th>
                    <th className="py-3 px-4 text-center">Tajwid</th><th className="py-3 px-4 text-center">Makhraj</th>
                    <th className="py-3 px-4 text-center">Kelancaran</th><th className="py-3 px-4 text-center">Rata</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr></thead>
                  <tbody className="divide-y divide-tosca-50 text-xs text-tosca-800">
                    {riwayat.map(r => (
                      <tr key={r.id} className="hover:bg-tosca-50/20">
                        <td className="py-3 px-4 font-medium">{r.tgl}</td>
                        <td className="py-3 px-4 font-black">Surah {r.surah} ({r.ayat})</td>
                        <td className="py-3 px-4 text-center font-bold">{r.tajwid}</td>
                        <td className="py-3 px-4 text-center font-bold">{r.makhraj}</td>
                        <td className="py-3 px-4 text-center font-bold">{r.kelancaran}</td>
                        <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 bg-tosca-600 text-white rounded text-[10px] font-black">{r.rata}</span></td>
                        <td className="py-3 px-4 text-center"><span className={`px-2 py-0.5 rounded text-[9px] font-black ${r.status === 'Lanjut' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EVALUASI */}
          {active === 'evaluasi' && (
            <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-black text-tosca-900 flex items-center gap-2"><ClipboardList className="text-violet-500" size={18} /> Evaluasi & Perkembangan Sikap</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-tosca-50 rounded-xl border border-tosca-100">
                  <p className="text-[10px] font-black text-tosca-400 uppercase">Predikat Adab</p>
                  <p className="text-base font-black text-tosca-900 mt-1">{profile.adab}</p>
                </div>
                <div className="p-4 bg-tosca-50 rounded-xl border border-tosca-100">
                  <p className="text-[10px] font-black text-tosca-400 uppercase">Kedisiplinan</p>
                  <p className="text-base font-black text-tosca-900 mt-1">{profile.disiplin}</p>
                </div>
              </div>
              <div className="p-5 bg-white border border-tosca-100 rounded-xl">
                <p className="text-[10px] font-black text-tosca-400 uppercase mb-2">Catatan Pembimbing (Ust. Mansyur)</p>
                <p className="text-sm text-tosca-800 leading-relaxed font-medium">{profile.catatan}</p>
              </div>
            </div>
          )}

          {/* TARGET */}
          {active === 'target' && (
            <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm p-6 space-y-6">
              <h3 className="text-sm font-black text-tosca-900 flex items-center gap-2"><Target className="text-fuchsia-500" size={18} /> Target Hafalan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-tosca-50 rounded-2xl border border-tosca-100 space-y-4">
                  <p className="text-[10px] font-black text-tosca-400 uppercase">Target Aktif</p>
                  <p className="text-2xl font-black text-tosca-900">{profile.juzTarget}</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-tosca-600"><span>Progres</span><span>65%</span></div>
                    <div className="h-3 bg-white border border-tosca-200 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-tosca-600 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 border border-tosca-100 rounded-2xl">
                  <p className="text-xs font-black text-tosca-500 mb-3 uppercase">Juz Selesai</p>
                  <div className="grid grid-cols-2 gap-2">
                    {profile.juzSelesai.map(jz => (
                      <div key={jz} className="p-2.5 bg-tosca-50 rounded-xl border border-tosca-100 flex items-center gap-2">
                        <Award className="text-yellow-500" size={16} />
                        <span className="text-xs font-black text-tosca-900">Juz {jz}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ZOOM */}
          {active === 'zoom' && (
            <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-black text-tosca-900 flex items-center gap-2"><Video className="text-sky-500" size={18} /> Akses Room Halaqah Online</h3>
              {!zoomLive ? (
                <div className="bg-tosca-900 text-white rounded-2xl p-6 space-y-4 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10"><Video size={120} /></div>
                  <span className="px-2 py-0.5 bg-green-500 text-white rounded text-[8px] font-black uppercase">Siap Terhubung</span>
                  <h4 className="text-lg font-black">Tahfizh Pagi - Halaqah A</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/10 rounded-xl"><p className="text-[9px] text-teal-300 font-bold">MEETING ID</p><p className="text-sm font-black">{profile.zoomId}</p></div>
                    <div className="p-3 bg-white/10 rounded-xl"><p className="text-[9px] text-teal-300 font-bold">PASSCODE</p><p className="text-sm font-black">{profile.zoomPass}</p></div>
                  </div>
                  <button onClick={() => { setZoomLive(true); notify('Bergabung ke halaqah online...'); }} className="w-full py-3 bg-white text-tosca-900 rounded-xl font-black text-sm hover:bg-tosca-50 transition-colors">Gabung Halaqah Sekarang</button>
                </div>
              ) : (
                <div className="bg-black rounded-2xl overflow-hidden aspect-video relative flex flex-col justify-between p-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse w-fit">● LIVE</span>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                    <div className="h-20 w-20 rounded-full bg-tosca-600 flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white shadow-xl">UM</div>
                    <p className="text-white font-black mt-3">Ust. Mansyur</p>
                    <p className="text-gray-400 text-xs mt-1">Sedang menyimak setoran...</p>
                  </div>
                  <button onClick={() => { setZoomLive(false); notify('Keluar dari halaqah.'); }} className="z-10 px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-black self-end">Keluar</button>
                </div>
              )}
            </div>
          )}

          {/* SERTIFIKAT */}
          {active === 'sertifikat' && (
            <div className="bg-white rounded-2xl border border-tosca-50 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-black text-tosca-900 flex items-center gap-2"><Award className="text-amber-500" size={18} /> Sertifikat Kelulusan Juz</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.juzSelesai.map(jz => (
                  <div key={jz} className="p-5 bg-tosca-50/50 rounded-2xl border border-tosca-100 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-tosca-400 uppercase border border-tosca-100 bg-white px-2 py-0.5 rounded">Baitul Huffaz</span>
                      <Award className="text-yellow-500" size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] text-tosca-400 font-black uppercase">Sertifikat Resmi</p>
                      <p className="text-base font-black text-tosca-900">Juz {jz}</p>
                      <p className="text-xs text-tosca-500">{profile.nama}</p>
                    </div>
                    <button onClick={() => handleDownload(jz)} disabled={downloading === jz}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-tosca-600 hover:bg-tosca-700 text-white rounded-xl text-xs font-black transition-all disabled:opacity-50">
                      <span>{downloading === jz ? 'Memproses...' : `Unduh Juz ${jz}`}</span>
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-tosca-100 px-4 py-2 flex items-center justify-around shadow-2xl lg:hidden">
        {[
          { id: 'overview', label: 'Beranda', icon: Home },
          { id: 'nilai', label: 'Nilai', icon: Star },
          { id: 'zoom', label: 'Zoom', icon: Video },
          { id: 'sertifikat', label: 'Sertifikat', icon: Award },
        ].map(n => {
          const Icon = n.icon;
          return (
            <button key={n.id} onClick={() => setActive(n.id)} className={`flex flex-col items-center gap-0.5 w-12 ${active === n.id ? 'text-tosca-600' : 'text-tosca-400'}`}>
              <Icon size={20} strokeWidth={active === n.id ? 2.5 : 2} />
              <span className="text-[9px] font-extrabold">{n.label}</span>
            </button>
          );
        })}
        <a href="/login" className="flex flex-col items-center gap-0.5 w-12 text-red-500">
          <X size={20} strokeWidth={2.5} /><span className="text-[9px] font-extrabold">Keluar</span>
        </a>
      </nav>
    </div>
  );
}
