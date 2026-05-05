import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import Footer2 from '../../shared/components/Footer2';
import HeaderDateTime from '../../shared/components/HeaderDateTime';

export default function AdminLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuKey = activeMenu || (location.pathname === '/admin/home' ? 'dashboard' : 'dashboard');
  const titleByMenu = {
    dashboard: 'Dashboard',
    berita: 'Manajemen Berita',
    galeri: 'Manajemen Galeri',
    konten: 'Manajemen Konten',
    petugas: 'Manajemen Petugas',
    export: 'Ekspor Data',
    backup: 'Backup Data',
    import: 'Impor Data',
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/admin-website-dispusip-ppu');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 items-stretch">
        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            aria-label="Tutup overlay sidebar"
          />
        )}

        <SidebarAdmin
          activeMenu={activeMenu}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          setActiveMenu={setActiveMenu}
          setOpen={setSidebarOpen}
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 relative">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((prevOpen) => !prevOpen)}
                className="md:hidden rounded-lg p-2 transition hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {titleByMenu[menuKey] || 'Admin'}
              </h2>
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 xl:flex">
              <HeaderDateTime />
            </div>

            {/* Desktop: Icon + Text */}
            <div className="hidden items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm md:flex">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
              </div>
              <div className="text-right leading-tight">
                <p className="text-sm font-bold text-blue-950">{localStorage.getItem('userEmail') || 'admin@perpus.id'}</p>
                <p className="text-xs text-amber-700">Administrator</p>
              </div>
            </div>

            {/* Mobile: Compact time + icon */}
            <div className="flex items-center gap-2 md:hidden">
              <HeaderDateTime compact />
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
              </div>
            </div>
          </div>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      <div className="relative z-30 w-full">
        <Footer2 />
      </div>
    </div>
  );
}
