import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
import LayananKami from '../components/LayananKami';
import Footer from '../components/Footer';
import { Users, FileText, Award, Calendar } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Header />
      <Banner />
      <LayananKami />
      
      {/* Layanan Kelembagaan Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Layanan Unggulan</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4">Layanan terpadu untuk kebutuhan informasi dan dokumentasi Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* PPID */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 sm:p-8 text-white">
                <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">PPID</h3>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-semibold text-gray-800 mb-2">Pusat Penerbitan Informasi dan Dokumentasi</p>
                <p className="text-sm text-gray-600">
                  Layanan penyediaan informasi publik sesuai dengan regulasi pemerintah untuk transparansi dan akses informasi.
                </p>
              </div>
            </div>

            {/* Lapor PPU */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 sm:p-8 text-white">
                <div className="w-12 h-12 bg-emerald-400/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Users size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Lapor PPU</h3>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-semibold text-gray-800 mb-2">Laporan dan Pengaduan</p>
                <p className="text-sm text-gray-600">
                  Saluran komunikasi terpercaya untuk menyampaikan laporan, saran, dan pengaduan terkait layanan kami.
                </p>
              </div>
            </div>

            {/* Layanan Khusus */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="bg-gradient-to-br from-blue-800 to-emerald-700 p-6 sm:p-8 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Award size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Layanan Khusus</h3>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-semibold text-gray-800 mb-2">Pengajuan Layanan Kelembagaan</p>
                <p className="text-sm text-gray-600">
                  Pengajuan untuk kerjasama, penelitian, dan layanan khusus yang disesuaikan dengan kebutuhan kelembagaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Berita Terbaru</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4">Informasi dan update terkini dari perpustakaan kami</p>
          </div>

          <NewsSection />

          <div className="text-center mt-10 sm:mt-12">
            <button
              type="button"
              onClick={() => navigate('/berita')}
              className="inline-block bg-gradient-to-r from-blue-900 to-emerald-600 hover:from-blue-800 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg transition duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Lihat Semua Berita
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function NewsSection() {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    const load = () => {
      const savedItems = localStorage.getItem('adminBeritaItems');
      if (savedItems) {
        try {
          const allNews = JSON.parse(savedItems);
          const sorted = allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBeritaList(sorted.slice(0, 5));
        } catch (e) {
          setBeritaList([]);
        }
      } else {
        setBeritaList([]);
      }
    };

    load();
    const onStorage = () => load();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!beritaList || beritaList.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500 text-lg">Belum ada berita terbaru</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
      {beritaList.map((berita) => (
        <div key={berita.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
          <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
            <img src={berita.image} alt={berita.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs text-blue-900 font-semibold mb-2 flex items-center gap-2">
              <Calendar size={14} />
              {new Date(berita.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition">
              {berita.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {berita.excerpt}
            </p>
            <button
              type="button"
              onClick={() => navigate(`/berita/${berita.id}`)}
              className="mt-3 pt-3 border-t border-gray-200 w-full text-left flex items-center text-emerald-600 font-semibold text-sm group-hover:text-blue-900 transition"
            >
              Baca selengkapnya →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
