import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Home,
  Search,
  ShoppingCart,
  History,
  X,
  User,
} from 'lucide-react';

export default function SidebarAnggota({ activeMenu, open, onClose, onLogout, setActiveMenu, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'beranda', label: 'Dashboard', icon: Home, to: '/anggota/beranda' },
    { id: 'opac', label: 'Cari Buku (OPAC)', icon: Search, to: '/anggota/opac' },
    { id: 'keranjang', label: 'Keranjang Pinjam', icon: ShoppingCart, to: '/anggota/keranjang' },
    { id: 'riwayat', label: 'Riwayat Pinjam', icon: History, to: '/anggota/riwayat' },
    { id: 'profil', label: 'Profil Saya', icon: User, to: '/anggota/profil' },
  ];

  const isActive = (item) => {
    return location.pathname === item.to || activeMenu === item.id;
  };

  const handleMenuClick = (item) => {
    setActiveMenu?.(item.id);
    if (item.to) {
      navigate(item.to, { state: { activeMenu: item.id } });
    }
    setOpen?.(false);
    onClose?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-2 ring-blue-400/60">
              <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">Area Anggota</h1>
              <p className="text-xs text-blue-300">PPU Digital Library</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10 md:hidden"
            aria-label="Tutup sidebar"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2 px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                    active ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 font-medium">{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white transition hover:bg-white/10"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
