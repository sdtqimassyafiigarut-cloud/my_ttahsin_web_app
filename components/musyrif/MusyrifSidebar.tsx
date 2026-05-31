'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Star,
  CheckSquare,
  ClipboardList,
  Calendar,
  Target,
  Award,
  LogOut,
  X,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' },
  { icon: BookOpen,        label: 'Input Setoran',   tab: 'setoran' },
  { icon: Star,            label: 'Input Nilai',     tab: 'nilai' },
  { icon: CheckSquare,     label: 'Status Hafalan',  tab: 'status' },
  { icon: ClipboardList,   label: 'Evaluasi Siswa',  tab: 'evaluasi' },
  { icon: CheckSquare,     label: 'Kehadiran Siswa', tab: 'kehadiran' },
  { icon: Calendar,        label: 'Kelola Jadwal',   tab: 'jadwal' },
  { icon: Target,          label: 'Target Hafalan',  tab: 'target' },
  { icon: Award,           label: 'Sertifikat',      tab: 'sertifikat' },
];

export default function MusyrifSidebar({ isOpen, setIsOpen, activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-tosca-100 transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-tosca-50">
            <div className="flex items-center gap-3">
              <div className="bg-tosca-600 p-2 rounded-xl shadow-lg shadow-tosca-200">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-tosca-900 block leading-tight">Baitul Huffaz</span>
                <span className="text-[10px] font-bold text-tosca-400 uppercase tracking-widest">Musyrif Panel</span>
              </div>
            </div>
            <button
              className="lg:hidden p-2 text-tosca-500 hover:bg-tosca-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Card */}
          <div className="mx-4 mt-4 p-4 bg-tosca-50 rounded-2xl border border-tosca-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-tosca-600 text-white flex items-center justify-center text-xl font-black shadow-md">
                M
              </div>
              <div>
                <p className="font-extrabold text-tosca-900 text-sm">Ust. Mansyur</p>
                <p className="text-[11px] text-tosca-500 font-bold">Musyrif • Kelas A</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNav(item.tab)}
                  className={`
                    flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all group text-left
                    ${isActive
                      ? 'bg-tosca-600 text-white shadow-lg shadow-tosca-200'
                      : 'text-tosca-600 hover:bg-tosca-50 hover:text-tosca-700'}
                  `}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-tosca-500 group-hover:text-tosca-600'} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-tosca-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-semibold text-sm">Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
