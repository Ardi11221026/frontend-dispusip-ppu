import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPetugas from './SidebarPetugas';
import Footer2 from '../../shared/components/Footer2';

export default function PetugasLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathToMenuKey = {
    '/back-office/home': 'beranda',
    '/back-office/beranda': 'beranda',
    '/back-office/akuisisi': 'akuisisi',
    '/back-office/katalog': 'katalog',
    '/back-office/sskckr': 'sskckr',
    '/back-office/keanggotaan': 'keanggotaan',
    '/back-office/sirkulasi': 'sirkulasi',
    '/back-office/loker': 'loker',
    '/back-office/survey': 'survey',
    '/back-office/buku-tamu': 'buku-tamu',
    '/back-office/opac': 'opac',
    '/back-office/layanan-koleksi-digital': 'layanan-koleksi-digital',
    '/back-office/baca-ditempat': 'baca-ditempat',
    '/back-office/laporan': 'laporan',
    '/back-office/administrasi': 'administrasi',
  };
  const menuKey = activeMenu || pathToMenuKey[location.pathname] || 'beranda';
  const titleByMenu = {
    beranda: 'Beranda',
    akuisisi: 'Akuisisi',
    katalog: 'Katalog',
    sskckr: 'SSKCKR',
    keanggotaan: 'Keanggotaan',
    sirkulasi: 'Sirkulasi',
    loker: 'Loker',
    survey: 'Survey',
    'buku-tamu': 'Buku Tamu',
    opac: 'OPAC',
    'layanan-koleksi-digital': 'Layanan Koleksi Digital',
    'baca-ditempat': 'Baca Ditempat',
    laporan: 'Laporan',
    administrasi: 'Administrasi',
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

            {/* Desktop: Icon + Text (match Admin appearance) */}
            <div className="hidden items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm md:flex">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
              </div>
              <div className="text-right leading-tight">
                <p className="text-sm font-bold text-blue-950">{localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'petugas@perpus.id'}</p>
                <p className="text-xs text-amber-700">{localStorage.getItem('userEmail') || 'Petugas Perpustakaan'}</p>
              </div>
            </div>

            {/* Mobile: Icon Only */}
            <div className="flex md:hidden">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-amber-300">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-1" />
              </div>
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
