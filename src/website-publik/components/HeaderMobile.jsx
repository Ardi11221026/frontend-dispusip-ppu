import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const profilLinks = [
  { to: '/profil/kelembagaan', label: 'Kelembagaan' },
  { to: '/profil/sejarah', label: 'Sejarah' },
  { to: '/profil/struktur-organisasi', label: 'Struktur Organisasi' },
];

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-white text-gray-900 shadow-lg">
      <div className="bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo/logo ppu.png" alt="Logo PPU" className="h-14 w-14 object-contain" />
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.2em] leading-tight text-emerald-100">
                Dinas Perpustakaan<br />Dan Arsip
              </p>
              <p className="mt-0.5 truncate text-[10px] font-medium leading-tight text-white/80">
                Kabupaten Penajam Paser Utara
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          >
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90 scale-95' : ''}`}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </div>

      {/* Dropdown menu sits below the fixed header and does not cover the whole page */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 shadow-2xl">
          <nav className="px-4 pb-8">
            <div className="space-y-2 pt-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-emerald-100 hover:text-emerald-700">Beranda</Link>

              <div className="rounded-2xl border border-gray-200 bg-white p-2">
                <button onClick={() => setOpenDropdown((v) => !v)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-gray-900 transition hover:bg-emerald-100">
                  Profil
                  <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`} />
                </button>

                <div className={`${openDropdown ? 'mt-2 space-y-1' : 'mt-0 h-0 overflow-hidden'}`}>
                  {openDropdown && (
                    <div className="px-2 pb-1">
                      {profilLinks.map((link) => (
                        <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-700">{link.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Link to="/layanan" onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-emerald-100 hover:text-emerald-700">Layanan</Link>

              <Link to="/berita" onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-emerald-100 hover:text-emerald-700">Berita</Link>

              <Link to="/galeri" onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-emerald-100 hover:text-emerald-700">Galeri</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
    <div className="h-[88px] md:hidden" aria-hidden="true" />
    </>
  );
}
