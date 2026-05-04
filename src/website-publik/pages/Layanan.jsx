import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { BookOpen, Users, FileText, Building2 } from 'lucide-react';

export default function Layanan() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Header />

      <PageBanner
        title="Layanan Kami"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan Kami' },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Layanan Kunjungan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-8">Layanan Kunjungan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPAC Perpus */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-full text-white">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">OPAC Perpus</h3>
              </div>
              <p className="text-gray-600 font-poppins mb-4">
                Online Public Access Catalog (OPAC) adalah layanan pencarian katalog perpustakaan secara online yang memudahkan Anda menemukan koleksi kami.
              </p>
              <ul className="list-disc list-inside text-gray-600 font-poppins space-y-2">
                <li>Pencarian koleksi buku, jurnal, dan media lainnya</li>
                <li>Informasi detail tentang ketersediaan koleksi</li>
                <li>Fasilitas reservasi online</li>
                <li>Akses 24/7 dari mana saja</li>
              </ul>
              <button
                onClick={() => navigate('/opac')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-2 px-6 rounded transition"
              >
                Akses OPAC
              </button>
            </div>

            {/* Keanggotaan */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-600 p-3 rounded-full text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">Keanggotaan</h3>
              </div>
              <p className="text-gray-600 font-poppins mb-4">
                Menjadi anggota perpustakaan kami memberikan akses penuh ke semua layanan dan koleksi yang kami sediakan.
              </p>
              <ul className="list-disc list-inside text-gray-600 font-poppins space-y-2">
                <li>Peminjaman koleksi hingga 7 hari</li>
                <li>Akses ke layanan digital (iPusnas, E-Resources)</li>
                <li>Proses pendaftaran mudah dan gratis</li>
                <li>Berlaku seumur hidup</li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white font-poppins font-bold py-2 px-6 rounded transition"
              >
                Daftar Anggota
              </button>
            </div>
          </div>
        </div>

        {/* Layanan Kelembagaan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-8">Layanan Kelembagaan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PPID */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-purple-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-600 p-3 rounded-full text-white">
                  <FileText size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">PPID Penajam Kab</h3>
              </div>
              <p className="text-gray-600 font-poppins mb-4">
                Pusat Penerbitan Informasi dan Dokumentasi adalah unit yang mengelola informasi publik dan pelaksanaan kebijakan keterbukaan informasi.
              </p>
              <ul className="list-disc list-inside text-gray-600 font-poppins space-y-2">
                <li>Pelayanan informasi publik</li>
                <li>Pengajuan permohonan informasi</li>
                <li>Dokumentasi arsip pemerintah</li>
                <li>Sesuai dengan UU Keterbukaan Informasi Publik</li>
              </ul>
              <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-poppins font-bold py-2 px-6 rounded transition">
                Ajukan Permohonan
              </button>
            </div>

            {/* Lapor PPU */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-red-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600 p-3 rounded-full text-white">
                  <Building2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">Lapor PPU</h3>
              </div>
              <p className="text-gray-600 font-poppins mb-4">
                Platform untuk menyampaikan laporan, saran, dan pengaduan kepada Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara.
              </p>
              <ul className="list-disc list-inside text-gray-600 font-poppins space-y-2">
                <li>Saluran komunikasi terbuka</li>
                <li>Laporan ditangani dengan profesional</li>
                <li>Jaminan kerahasiaan identitas pelapor</li>
                <li>Respons cepat terhadap setiap laporan</li>
              </ul>
              <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-poppins font-bold py-2 px-6 rounded transition">
                Buat Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Additional Services Info */}
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
          <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-4">Jam Layanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-poppins font-bold text-gray-900 mb-2">Senin - Jumat</p>
              <p className="text-gray-600 font-poppins">Pukul 08.00 - 16.00 WIB</p>
            </div>
            <div>
              <p className="font-poppins font-bold text-gray-900 mb-2">Sabtu</p>
              <p className="text-gray-600 font-poppins">Pukul 08.00 - 12.00 WIB</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
