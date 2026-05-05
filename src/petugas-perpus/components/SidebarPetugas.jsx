import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Home,
  BookOpen,
  Search,
  ClipboardList,
  Users,
  RefreshCw,
  Lock,
  BarChart3,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  X,
} from 'lucide-react';
import { akuisisiSubmenus } from '../akuisisiSubmenus';
import { katalogSubmenus } from '../katalogSubmenus';

export default function SidebarPetugas({ activeMenu, open, onClose, onLogout, setActiveMenu, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAkuisisiOpen, setIsAkuisisiOpen] = useState(location.pathname.startsWith('/back-office/akuisisi'));
  const [isKatalogOpen, setIsKatalogOpen] = useState(location.pathname.startsWith('/back-office/katalog'));

  useEffect(() => {
    if (location.pathname.startsWith('/back-office/akuisisi')) {
      setIsAkuisisiOpen(true);
    }
  }, [location.pathname]);

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home, to: '/back-office/beranda' },
    { id: 'akuisisi', label: 'Akuisisi', icon: BookOpen, to: '/back-office/akuisisi', chevron: true, children: akuisisiSubmenus },
     { id: 'katalog', label: 'Katalog', icon: Search, to: '/back-office/katalog', chevron: true, children: katalogSubmenus },
    { id: 'sskckr', label: 'SSKCKR', icon: ClipboardList, to: '/back-office/sskckr', chevron: true },
    { id: 'keanggotaan', label: 'Keanggotaan', icon: Users, to: '/back-office/keanggotaan', chevron: true },
    { id: 'sirkulasi', label: 'Sirkulasi', icon: RefreshCw, to: '/back-office/sirkulasi', chevron: true },
    { id: 'loker', label: 'Loker', icon: Lock, to: '/back-office/loker' },
    { id: 'survey', label: 'Survey', icon: BarChart3, to: '/back-office/survey', chevron: true },
    { id: 'buku-tamu', label: 'Buku Tamu', icon: FileText, to: '/back-office/buku-tamu' },
    { id: 'opac', label: 'Opac', icon: Search, to: '/back-office/opac' },
    { id: 'layanan-koleksi-digital', label: 'Layanan Koleksi Digital', icon: BookOpen, to: '/back-office/layanan-koleksi-digital', chevron: true },
    { id: 'baca-ditempat', label: 'Baca Ditempat', icon: BookOpen, to: '/back-office/baca-ditempat' },
    { id: 'laporan', label: 'Laporan', icon: FileText, to: '/back-office/laporan' },
    { id: 'administrasi', label: 'Administrasi', icon: Settings, to: '/back-office/administrasi', chevron: true },
  ];

  const isActive = (item) => {
    if (item.id === 'akuisisi') {
      return location.pathname.startsWith('/back-office/akuisisi') || activeMenu === 'akuisisi';
    }
     if (item.id === 'katalog') {
       return location.pathname.startsWith('/back-office/katalog') || activeMenu === 'katalog';
     }

    return location.pathname === item.to || activeMenu === item.id;
  };

  const handleMenuClick = (item) => {
    if (item.id === 'akuisisi') {
      setActiveMenu?.('akuisisi');
      setIsAkuisisiOpen((previous) => !previous);

      if (!location.pathname.startsWith('/back-office/akuisisi')) {
        navigate('/back-office/akuisisi', { state: { activeMenu: 'akuisisi' } });
      }
      return;
    }
     if (item.id === 'katalog') {
       setActiveMenu?.('katalog');
       setIsKatalogOpen((previous) => !previous);

       if (!location.pathname.startsWith('/back-office/katalog')) {
         navigate('/back-office/katalog', { state: { activeMenu: 'katalog' } });
       }
       return;
     }

    setActiveMenu?.(item.id);

    if (item.to) {
      navigate(item.to, { state: { activeMenu: item.id } });
    }

    setOpen?.(false);
    onClose?.();
  };

  const handleSubmenuClick = (submenu) => {
    setActiveMenu?.(submenu.id);
    navigate(submenu.to, { state: { activeMenu: submenu.id } });
    setOpen?.(false);
    onClose?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-2 ring-amber-400/60">
              <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">Petugas Perpusda</h1>
              <p className="text-xs text-amber-300">PPU Library</p>
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
                    active ? 'bg-yellow-600 text-white' : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.id === 'akuisisi' ? (
                    <ChevronDown size={16} className={`transition-transform ${isAkuisisiOpen ? 'rotate-180' : ''}`} />
                  ) : item.chevron ? (
                    <ChevronRight size={16} />
                  ) : null}
                </button>

                {item.id === 'akuisisi' && isAkuisisiOpen ? (
                  <div className="mt-1 space-y-1 pl-5">
                    {item.children.map((submenu) => {
                      const subActive = location.pathname === submenu.to || activeMenu === submenu.id;

                      return (
                        <button
                          key={submenu.id}
                          type="button"
                          onClick={() => handleSubmenuClick(submenu)}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                            subActive
                              ? 'bg-white/20 text-white'
                              : 'text-blue-100/90 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          <span className="line-clamp-2">{submenu.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
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
