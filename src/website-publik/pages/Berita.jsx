import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { Calendar } from 'lucide-react';

const beritaList = [
  {
    id: 1,
    title: 'Perpusnas Kawal Ombudsman Sinkronisasi Aset Bantuan',
      date: '2026-04-28',
      category: 'Berita',
      excerpt: 'Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara mengikuti serangkaian kegiatan sinkronisasi aset dengan pihak Ombudsman untuk memastikan semua bantuan tercatat dengan baik.',
      image: 'https://via.placeholder.com/600x400?text=Berita+1',
    },
    {
      id: 2,
      title: 'Semangat Kartini di Dunia Literasi dan Pendidikan Perempuan',
      date: '2026-04-27',
      category: 'Berita',
      excerpt: 'Peringatan Hari Kartini tahun ini menghadirkan tema tentang pendidikan dan literasi perempuan di era digital.',
      image: 'https://via.placeholder.com/600x400?text=Berita+2',
    },
    {
      id: 3,
      title: 'Perpusnas dan Pimpinan Pusat Aisyiyah Perluas Gerakan Literasi Berkarakter',
      date: '2026-04-27',
      category: 'Berita',
      excerpt: 'Kolaborasi strategis antara Perpustakaan Nasional dan Aisyiyah untuk memperluas akses literasi kepada masyarakat luas.',
      image: 'https://via.placeholder.com/600x400?text=Berita+3',
    },
    {
      id: 4,
      title: 'Kepala Perpusnas Rinci Tiga Tahapan dalam Hakikat Membaca Buku',
      date: '2026-04-26',
      category: 'Berita',
      excerpt: 'Pemimpin Perpustakaan Nasional menjelaskan pentingnya membaca buku dan tahapan-tahapan dalam kebiasaan membaca.',
      image: 'https://via.placeholder.com/600x400?text=Berita+4',
    },
    {
      id: 5,
      title: 'Perpusnas Apresiasi Upaya Edukasi Antikorupsi Melalui Cerpen',
      date: '2026-04-24',
      category: 'Berita',
      excerpt: 'Perpustakaan Nasional memberikan apresiasi kepada penulis yang mengangkat tema antikorupsi melalui karya sastra cerpen.',
      image: 'https://via.placeholder.com/600x400?text=Berita+5',
    },
    {
      id: 6,
      title: 'SIARAN PERS: Berkolaborasi, Perpusnas Perkuat Kapasitas Pustakawan',
      date: '2026-04-22',
      category: 'Berita',
      excerpt: 'Program pelatihan dan peningkatan kapasitas untuk para pustakawan profesional dilaksanakan secara berkala.',
      image: 'https://via.placeholder.com/600x400?text=Berita+6',
    },
];

export default function Berita() {
  return (
    <div className="w-full">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}

      <PageBanner
        title="Berita Terbaru"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita Terbaru' },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured News */}
        {beritaList.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={beritaList[0].image}
                  alt={beritaList[0].title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 font-poppins text-sm mb-3">
                    <Calendar size={16} />
                    {new Date(beritaList[0].date).toLocaleDateString('id-ID')}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-3">
                    {beritaList[0].title}
                  </h2>
                  <p className="text-gray-600 font-poppins mb-4">
                    {beritaList[0].excerpt}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-2 px-6 rounded transition">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>

              {/* Sidebar Featured */}
              <div className="space-y-4">
                {beritaList.slice(1, 4).map((berita) => (
                  <div key={berita.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <img
                      src={berita.image}
                      alt={berita.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-500 font-poppins text-xs mb-2">
                        <Calendar size={14} />
                        {new Date(berita.date).toLocaleDateString('id-ID')}
                      </div>
                      <h3 className="font-bold text-gray-900 font-poppins text-sm line-clamp-2">
                        {berita.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All News Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-8">Semua Berita</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaList.map((berita) => (
              <div
                key={berita.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={berita.image}
                  alt={berita.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 font-poppins text-sm mb-2">
                    <Calendar size={16} />
                    {new Date(berita.date).toLocaleDateString('id-ID')}
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-poppins font-bold px-3 py-1 rounded mb-3">
                    {berita.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 font-poppins mb-3 line-clamp-2">
                    {berita.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-poppins line-clamp-3 mb-4">
                    {berita.excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-poppins font-bold text-sm"
                  >
                    Baca Selengkapnya →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12">
          <button className="px-3 py-2 rounded bg-gray-200 text-gray-700 font-poppins hover:bg-gray-300">
            ←
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white font-poppins font-bold">
            1
          </button>
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-poppins hover:bg-gray-300">
            2
          </button>
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-poppins hover:bg-gray-300">
            3
          </button>
          <button className="px-3 py-2 rounded bg-gray-200 text-gray-700 font-poppins hover:bg-gray-300">
            →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
