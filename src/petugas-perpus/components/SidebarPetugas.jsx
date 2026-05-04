import { useNavigate } from 'react-router-dom';
import { LogOut, Home, BarChart3, X } from 'lucide-react';

export default function SidebarPetugas({ activeMenu, open, onClose, onLogout, setActiveMenu, setOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/back-office/home' },
    { id: 'manajemen', label: 'Manajemen', icon: BarChart3, to: '/back-office/home' },
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
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-950 text-white transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-2 ring-yellow-400/60 font-bold text-lg">
              P
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Petugas Perpusda</h1>
              <p className="text-xs text-emerald-200">PPU Library</p>
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
                  activeMenu === item.id ? 'bg-yellow-600 text-white' : 'text-emerald-100 hover:bg-white/10'
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
