import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPetugas from './SidebarPetugas';
import Footer2 from '../../shared/components/Footer2';

export default function PetugasLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuKey = activeMenu || (location.pathname === '/back-office/home' ? 'dashboard' : 'dashboard');
  const titleByMenu = {
    dashboard: 'Dashboard',
    manajemen: 'Manajemen',
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'petugas') {
      navigate('/back-office/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/back-office/login');
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

        <SidebarPetugas
          activeMenu={activeMenu}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          setActiveMenu={setActiveMenu}
          setOpen={setSidebarOpen}
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((prevOpen) => !prevOpen)}
                className="md:hidden rounded-lg p-2 transition hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {titleByMenu[menuKey] || 'Petugas'}
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-yellow-500 font-bold text-white ring-2 ring-yellow-300">
                P
              </div>
              <div className="text-right leading-tight">
                <p className="text-sm font-bold text-emerald-950">{localStorage.getItem('userEmail') || 'petugas@perpus.id'}</p>
                <p className="text-xs text-emerald-700">Petugas Perpustakaan</p>
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
