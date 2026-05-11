import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPetugas from './SidebarPetugas';
import Footer2 from '../../shared/components/Footer2';
import HeaderDateTime from '../../shared/components/HeaderDateTime';
import { akuisisiSubmenus } from '../akuisisiSubmenus';
import { katalogSubmenus } from '../katalogSubmenus';

export default function PetugasLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const akuisisiPathToMenu = Object.fromEntries(akuisisiSubmenus.map((submenu) => [submenu.to, submenu.id]));
  const akuisisiTitleMap = Object.fromEntries(akuisisiSubmenus.map((submenu) => [submenu.id, submenu.label]));

  const katalogPathToMenu = Object.fromEntries(katalogSubmenus.map((submenu) => [submenu.to, submenu.id]));
  const katalogTitleMap = Object.fromEntries(katalogSubmenus.map((submenu) => [submenu.id, submenu.label]));

  const visitorPathToMenu = Object.fromEntries(bukuTamuDigitalSubmenus.map((submenu) => [submenu.to, submenu.id]));
  const visitorTitleMap = Object.fromEntries(bukuTamuDigitalSubmenus.map((submenu) => [submenu.id, `Buku Tamu: ${submenu.label}`]));

  const pathToMenuKey = {
    '/back-office/home': 'beranda',
    '/back-office/beranda': 'beranda',
    '/back-office/akuisisi': 'akuisisi',
    ...akuisisiPathToMenu,
    ...katalogPathToMenu,
    ...visitorPathToMenu,
    '/back-office/katalog': 'katalog',
    '/back-office/keanggotaan': 'keanggotaan',
    '/back-office/sirkulasi': 'sirkulasi',
    '/back-office/buku-tamu-digital': 'buku-tamu-digital',
    '/back-office/opac': 'opac',
    '/back-office/layanan-koleksi-digital': 'layanan-koleksi-digital',
    '/back-office/baca-ditempat': 'baca-ditempat',
    '/back-office/laporan': 'laporan',
    '/back-office/berita': 'berita',
    '/back-office/galeri': 'galeri',
    '/back-office/konten': 'konten',
    '/back-office/administrasi': 'administrasi',
    '/profil-petugas-perpus': 'pengaturan-akun',
  };
  const menuKey = activeMenu || pathToMenuKey[location.pathname] || 'beranda';
  const titleByMenu = {
    beranda: 'Beranda',
    akuisisi: 'Akuisisi',
    katalog: 'Katalog',
    keanggotaan: 'Keanggotaan',
    sirkulasi: 'Sirkulasi',
    'buku-tamu-digital': 'Buku Tamu Digital',
    opac: 'OPAC',
    'layanan-koleksi-digital': 'Layanan Koleksi Digital',
    'baca-ditempat': 'Baca Ditempat',
    laporan: 'Laporan',
    berita: 'Manajemen Berita',
    galeri: 'Manajemen Galeri',
    konten: 'Manajemen Konten',
    administrasi: 'Administrasi',
    'pengaturan-akun': 'Pengaturan Akun',
    ...akuisisiTitleMap,
    ...katalogTitleMap,
    ...visitorTitleMap,
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'petugas') {
      navigate('/back-office/login');
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
    navigate('/back-office/login');
  };

  const handleOpenProfile = () => {
    setProfileMenuOpen(false);
    navigate('/profil-petugas-perpus');
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
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 relative">
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
                    {localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'petugas@perpus.id'}
                  </p>
                  <p className="text-xs text-amber-700">{localStorage.getItem('userEmail') || 'Petugas Perpustakaan'}</p>
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
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">⚙</span>
                    Pengaturan Akun
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <HeaderDateTime compact />
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prevOpen) => !prevOpen)}
                className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-2 shadow-sm"
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
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">⚙</span>
                    Pengaturan Akun
                  </button>
                </div>
              )}
            </div>
          </div>

          <main className="flex-1">{children}</main>
        </div>
      </div>

      <div className="relative z-30 w-full">
        <Footer2 />
      </div>
    </div>
  );
}
