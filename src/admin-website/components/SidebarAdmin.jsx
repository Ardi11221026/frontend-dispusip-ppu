import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Newspaper, Image, Package, Users, FileDown, Database, FileUp, X } from 'lucide-react';

export default function SidebarAdmin({ activeMenu, open, onClose, onLogout, setActiveMenu, setOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/admin/home' },
    { id: 'berita', label: 'Manajemen Berita', icon: Newspaper, to: '/admin/berita' },
    { id: 'galeri', label: 'Manajemen Galeri', icon: Image, to: '/admin/galeri-manajemen' },
    { id: 'konten', label: 'Manajemen Konten', icon: Package, to: '/admin/konten' },
    { id: 'petugas', label: 'Manajemen Petugas', icon: Users, to: '/admin/petugas' },
  ];

  const dataMenuItems = [
    { id: 'export', label: 'Ekspor Data', icon: FileDown, to: '/admin/export-data' },
    { id: 'backup', label: 'Backup Data', icon: Database, to: '/admin/backup-data' },
    { id: 'import', label: 'Impor Data', icon: FileUp, to: '/admin/import-data' },
  ];

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
      className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
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
              <h1 className="text-lg font-bold leading-tight">DPUPR PPU</h1>
              <p className="text-xs text-amber-300">Admin Panel</p>
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

        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeMenu === item.id ? 'bg-yellow-600 text-white' : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}

          <div className="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-blue-200/80">
            Data
          </div>

          {dataMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeMenu === item.id ? 'bg-yellow-600 text-white' : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition hover:bg-white/10"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}