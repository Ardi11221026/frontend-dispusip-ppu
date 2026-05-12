import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarAnggota from './SidebarAnggota';
import Footer2 from '../../shared/components/Footer2';
import HeaderDateTime from '../../shared/components/HeaderDateTime';

export default function AnggotaLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const pathToMenuKey = {
    '/anggota/beranda': 'beranda',
    '/anggota/opac': 'opac',
    '/anggota/keranjang': 'keranjang',
    '/anggota/riwayat': 'riwayat',
    '/anggota/profil': 'profil',
  };

  const menuKey = activeMenu || pathToMenuKey[location.pathname] || 'beranda';
  
  const titleByMenu = {
    beranda: 'Dashboard Anggota',
    opac: 'Katalog Buku (OPAC)',
    keranjang: 'Keranjang Pinjam',
    riwayat: 'Riwayat Pinjam',
    profil: 'Profil Saya',
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    // Jika tidak ada userRole atau bukan anggota/petugas, redirect ke login
    // Note: Kita izinkan petugas masuk ke area anggota jika perlu, tapi standarnya adalah 'anggota'
    if (!userRole) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleOpenProfile = () => {
    setProfileMenuOpen(false);
    navigate('/anggota/profil');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">
      <div className="flex flex-1 items-stretch">
        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            aria-label="Tutup overlay sidebar"
          />
        )}

        <SidebarAnggota
          activeMenu={activeMenu}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          setActiveMenu={setActiveMenu}
          setOpen={setSidebarOpen}
        />

        <div className="flex min-h-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 relative">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((prevOpen) => !prevOpen)}
                className="md:hidden rounded-lg p-2 transition hover:bg-slate-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {titleByMenu[menuKey] || 'Anggota'}
              </h2>
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 xl:flex">
              <HeaderDateTime />
            </div>

            <div className="relative hidden md:block" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prevOpen) => !prevOpen)}
                className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 shadow-sm transition hover:bg-amber-100 xl:gap-3 xl:px-4"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                   <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
                </div>
                <div className="hidden text-right leading-tight xl:block">
                  <p className="text-sm font-bold text-blue-950">
                    {localStorage.getItem('userName') || 'Anggota'}
                  </p>
                </div>
                <ChevronDown size={16} className={`text-amber-700 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={handleOpenProfile}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Settings size={14} />
                    </span>
                    Pengaturan Akun
                  </button>
                  <div className="border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <LogOut size={14} />
                    </span>
                    Keluar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Header Elements */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prevOpen) => !prevOpen)}
                className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-2 py-2 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                  <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
                </div>
                <ChevronDown size={14} className="text-amber-700" />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-4 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:hidden">
                  <button
                    type="button"
                    onClick={handleOpenProfile}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Settings size={14} />
                    </span>
                    Pengaturan Akun
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 bg-slate-50">
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
