// App.jsx - Utama
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './website-publik/pages/Home';
import Layanan from './website-publik/pages/Layanan';
import Berita from './website-publik/pages/Berita';
import BeritaDetail from './website-publik/pages/BeritaDetail';
import Galeri from './website-publik/pages/Galeri';
import Kelembagaan from './website-publik/pages/Kelembagaan';
import VisiMisi from './website-publik/pages/VisiMisi';
import FalsafahLogo from './website-publik/pages/FalsafahLogo';
import TugasFungsi from './website-publik/pages/TugasFungsi';
import Sejarah from './website-publik/pages/Sejarah';
import StrukturOrganisasi from './website-publik/pages/StrukturOrganisasi';
import Opac from './website-publik/pages/Opac';
import Login from './website-publik/pages/Login';
import Daftar from './website-publik/pages/Daftar';
import Verifikasi from './website-publik/pages/Verifikasi';
import BukuTamuDigital from './website-publik/pages/BukuTamuDigital';
import BukuTamuDigitalPetugas from './petugas-perpus/pages/BukuTamuDigital';
import BackOfficeLogin from './petugas-perpus/pages/BackOfficeLogin';
import Beranda from './petugas-perpus/pages/Beranda';
import ProfilPetugasPerpus from './petugas-perpus/pages/ProfilPetugasPerpus';
import Akuisisi from './petugas-perpus/pages/Akuisisi';
import AkuisisiSubmenuPage from './petugas-perpus/pages/AkuisisiSubmenuPage';
import { akuisisiSubmenus } from './petugas-perpus/akuisisiSubmenus';
import Katalog from './petugas-perpus/pages/Katalog';
import KatalogSubmenuPage from './petugas-perpus/pages/KatalogSubmenuPage';
import Keanggotaan from './petugas-perpus/pages/Keanggotaan';
import Sirkulasi from './petugas-perpus/pages/Sirkulasi';
import { katalogSubmenus } from './petugas-perpus/katalogSubmenus';
import { bukuTamuDigitalSubmenus } from './petugas-perpus/bukuTamuDigitalSubmenus';
import OpacPetugas from './petugas-perpus/pages/Opac';
import LayananKoleksiDigital from './petugas-perpus/pages/LayananKoleksiDigital';
import BacaDitempat from './petugas-perpus/pages/BacaDitempat';
import Laporan from './petugas-perpus/pages/Laporan';
import Administrasi from './petugas-perpus/pages/Administrasi';
import AdminLogin from './admin-website/pages/AdminLogin';
import AdminHome from './admin-website/pages/AdminHome';
import ManajemenBerita from './admin-website/pages/ManajemenBerita';
import ManajemenGaleri from './admin-website/pages/ManajemenGaleri';
import ManajemenKonten from './admin-website/pages/ManajemenKonten';
import ManajemenBanner from './admin-website/pages/ManajemenBanner';
import ManajemenPetugas from './admin-website/pages/ManajemenPetugas';
import AdminExportData from './admin-website/pages/AdminExportData';
import AdminBackupData from './admin-website/pages/AdminBackupData';
import AdminImportData from './admin-website/pages/AdminImportData';

// Anggota Pages
import BerandaAnggota from './anggota-perpus/pages/BerandaAnggota';
import OpacAnggota from './anggota-perpus/pages/OpacAnggota';
import KeranjangPinjam from './anggota-perpus/pages/KeranjangPinjam';
import RiwayatPinjam from './anggota-perpus/pages/RiwayatPinjam';
import ProfilAnggota from './anggota-perpus/pages/ProfilAnggota';

import './App.css';

// Deteksi subdomain dan redirect otomatis
function SubdomainRouter({ children }) {
  const [shouldShowOpac, setShouldShowOpac] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    // Cek jika hostname dimulai dengan "opac."
    if (hostname.startsWith('opac.')) {
      setShouldShowOpac(true);
    }
  }, []);

  if (shouldShowOpac) {
    return <Opac />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <SubdomainRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/opac" element={<Opac />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/verifikasi" element={<Verifikasi />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/buku-tamu-digital" element={<BukuTamuDigital />} />
          <Route path="/back-office/buku-tamu-digital" element={<BukuTamuDigitalPetugas />} />
          <Route path="/back-office/buku-tamu-digital/:category" element={<BukuTamuDigitalPetugas />} />
          
          {/* Anggota (Member) Area */}
          <Route path="/anggota/beranda" element={<BerandaAnggota />} />
          <Route path="/anggota/opac" element={<OpacAnggota />} />
          <Route path="/anggota/keranjang" element={<KeranjangPinjam />} />
          <Route path="/anggota/riwayat" element={<RiwayatPinjam />} />
          <Route path="/anggota/profil" element={<ProfilAnggota />} />

          {/* Profile Pages */}
          <Route path="/profil/kelembagaan" element={<Kelembagaan />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/profil/falsafah-logo" element={<FalsafahLogo />} />
          <Route path="/profil/tugas-fungsi" element={<TugasFungsi />} />
          <Route path="/profil/sejarah" element={<Sejarah />} />
          <Route path="/profil/struktur-organisasi" element={<StrukturOrganisasi />} />
          
          {/* Back-office Pages (Petugas Perpustakaan) */}
          <Route path="/back-office/login" element={<BackOfficeLogin />} />
          <Route path="/back-office/home" element={<Beranda />} />
          <Route path="/back-office/beranda" element={<Beranda />} />
          <Route path="/back-office/akuisisi" element={<Akuisisi />} />
          {akuisisiSubmenus.map((submenu) => (
            <Route
              key={submenu.id}
              path={submenu.to}
              element={<AkuisisiSubmenuPage menu={submenu} />}
            />
          ))}
          <Route path="/back-office/katalog" element={<Katalog />} />
           {katalogSubmenus.map((submenu) => (
             <Route
               key={submenu.id}
               path={submenu.to}
               element={<KatalogSubmenuPage menu={submenu} />}
             />
           ))}
          <Route path="/back-office/keanggotaan" element={<Keanggotaan />} />
          <Route path="/back-office/sirkulasi" element={<Sirkulasi />} />
          <Route path="/back-office/opac" element={<OpacPetugas />} />
          <Route path="/back-office/layanan-koleksi-digital" element={<LayananKoleksiDigital />} />
          <Route path="/back-office/baca-ditempat" element={<BacaDitempat />} />
          <Route path="/back-office/laporan" element={<Laporan />} />
          <Route path="/back-office/manajemen-berita" element={<ManajemenBerita />} />
          <Route path="/back-office/manajemen-galeri" element={<ManajemenGaleri />} />
          <Route path="/back-office/manajemen-konten" element={<ManajemenKonten />} />
          <Route path="/back-office/manajemen-konten/banner" element={<ManajemenBanner />} />
          <Route path="/back-office/administrasi" element={<Administrasi />} />
          <Route path="/profil-petugas-perpus" element={<ProfilPetugasPerpus />} />
          
          {/* Admin Pages */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/manajemen-berita" element={<ManajemenBerita />} />
          <Route path="/admin/manajemen-galeri" element={<ManajemenGaleri />} />
          <Route path="/admin/manajemen-konten" element={<ManajemenKonten />} />
          <Route path="/admin/manajemen-konten/banner" element={<ManajemenBanner />} />
          <Route path="/admin/manajemen-petugas" element={<ManajemenPetugas />} />
          <Route path="/admin/export-data" element={<AdminExportData />} />
          <Route path="/admin/backup-data" element={<AdminBackupData />} />
          <Route path="/admin/import-data" element={<AdminImportData />} />
        </Routes>
      </SubdomainRouter>
    </Router>
  );
}


export default App;
