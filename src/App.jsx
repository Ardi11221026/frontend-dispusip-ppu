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
import BackOfficeLogin from './petugas-perpus/pages/BackOfficeLogin';
import Beranda from './petugas-perpus/pages/Beranda';
import ProfilPetugasPerpus from './petugas-perpus/pages/ProfilPetugasPerpus';
import Akuisisi from './petugas-perpus/pages/Akuisisi';
import AkuisisiSubmenuPage from './petugas-perpus/pages/AkuisisiSubmenuPage';
import { akuisisiSubmenus } from './petugas-perpus/akuisisiSubmenus';
import Katalog from './petugas-perpus/pages/Katalog';
import SSKCKR from './petugas-perpus/pages/SSKCKR';
import Keanggotaan from './petugas-perpus/pages/Keanggotaan';
import Sirkulasi from './petugas-perpus/pages/Sirkulasi';
import Loker from './petugas-perpus/pages/Loker';
import Survey from './petugas-perpus/pages/Survey';
import BukuTamu from './petugas-perpus/pages/BukuTamu';
import OpacPetugas from './petugas-perpus/pages/Opac';
import LayananKoleksiDigital from './petugas-perpus/pages/LayananKoleksiDigital';
import BacaDitempat from './petugas-perpus/pages/BacaDitempat';
import Laporan from './petugas-perpus/pages/Laporan';
import Administrasi from './petugas-perpus/pages/Administrasi';
import AdminLogin from './admin-website/pages/AdminLogin';
import AdminHome from './admin-website/pages/AdminHome';
import AdminBerita from './admin-website/pages/AdminBerita';
import AdminGaleriManajemen from './admin-website/pages/AdminGaleriManajemen';
import AdminKonten from './admin-website/pages/AdminKonten';
import AdminBanner from './admin-website/pages/AdminBanner';
import AdminPetugas from './admin-website/pages/AdminPetugas';
import AdminExportData from './admin-website/pages/AdminExportData';
import AdminBackupData from './admin-website/pages/AdminBackupData';
import AdminImportData from './admin-website/pages/AdminImportData';
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
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="/galeri" element={<Galeri />} />
        
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
        <Route path="/back-office/sskckr" element={<SSKCKR />} />
        <Route path="/back-office/keanggotaan" element={<Keanggotaan />} />
        <Route path="/back-office/sirkulasi" element={<Sirkulasi />} />
        <Route path="/back-office/loker" element={<Loker />} />
        <Route path="/back-office/survey" element={<Survey />} />
        <Route path="/back-office/buku-tamu" element={<BukuTamu />} />
        <Route path="/back-office/opac" element={<OpacPetugas />} />
        <Route path="/back-office/layanan-koleksi-digital" element={<LayananKoleksiDigital />} />
        <Route path="/back-office/baca-ditempat" element={<BacaDitempat />} />
        <Route path="/back-office/laporan" element={<Laporan />} />
        <Route path="/back-office/administrasi" element={<Administrasi />} />
        <Route path="/profil-petugas-perpus" element={<ProfilPetugasPerpus />} />
        
        {/* Admin Pages */}
        <Route path="/admin-website-dispusip-ppu" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/berita" element={<AdminBerita />} />
        <Route path="/admin/galeri-manajemen" element={<AdminGaleriManajemen />} />
        <Route path="/admin/konten" element={<AdminKonten />} />
        <Route path="/admin/konten/banner" element={<AdminBanner />} />
        <Route path="/admin/petugas" element={<AdminPetugas />} />
        <Route path="/admin/export-data" element={<AdminExportData />} />
        <Route path="/admin/backup-data" element={<AdminBackupData />} />
        <Route path="/admin/import-data" element={<AdminImportData />} />
        </Routes>
      </SubdomainRouter>
    </Router>
  );
}

export default App;
