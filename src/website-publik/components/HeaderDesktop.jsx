import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const desktopLinks = [
  { to: '/', label: 'Beranda' },
];

const profilLinks = [
  { to: '/profil/kelembagaan', label: 'Kelembagaan' },
  { to: '/profil/sejarah', label: 'Sejarah' },
  { to: '/profil/struktur-organisasi', label: 'Struktur Organisasi' },
];

export default function HeaderDesktop() {
  const [profilOpen, setProfilOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfilOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-slate-200 bg-white text-gray-900 shadow-lg">
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-600">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-7">
          <div className="flex items-center justify-start">
            <img src="/logo/logo ppu.png" alt="Logo PPU" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
          </div>

          <div className="min-w-0 text-center">
            <p className="text-xl font-bold uppercase tracking-[0.35em] text-emerald-100 sm:text-2xl md:text-3xl">
              Dinas Perpustakaan Dan Arsip
            </p>
            <h1 className="mt-1 text-xs font-semibold leading-tight text-white/90 sm:text-sm md:text-base">
              Kabupaten Penajam Paser Utara
            </h1>
          </div>

          <div className="flex items-center justify-end">
            <img src="/logo/Logo Perpusnas.png" alt="Logo Perpusnas" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
          </div>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4">
          <nav className="flex items-center justify-center gap-2 whitespace-nowrap">
            {desktopLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative z-[99999]" ref={dropdownRef}>
              <button
                onClick={() => setProfilOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700"
              >
                Profil
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${profilOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {profilOpen && (
                <div className="absolute left-1/2 top-full z-[999999] mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="p-2">
                    {profilLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setProfilOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/layanan"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700"
            >
              Layanan
            </Link>
            <Link
              to="/berita"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700"
            >
              Berita
            </Link>
            <Link
              to="/galeri"
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700"
            >
              Galeri
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
