import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { Calendar } from 'lucide-react';

export default function Berita() {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState(() => {
    const savedItems = localStorage.getItem('adminBeritaItems');
    if (savedItems) {
      const allNews = JSON.parse(savedItems);
      const publicNews = allNews.filter(item => item.status === 'Publik');
      return publicNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedItems = localStorage.getItem('adminBeritaItems');
      if (savedItems) {
        const allNews = JSON.parse(savedItems);
        const publicNews = allNews.filter(item => item.status === 'Publik');
        const sortedNews = publicNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBeritaList(sortedNews);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="w-full">
      <Header />

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
                  <button 
                    onClick={() => navigate(`/berita/${beritaList[0].id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-2 px-6 rounded transition">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>

              {/* Sidebar Featured */}
              <div className="space-y-4">
                {beritaList.slice(1, 4).map((berita) => (
                  <div 
                    key={berita.id} 
                    onClick={() => navigate(`/berita/${berita.id}`)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  >
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
                    onClick={() => navigate(`/berita/${berita.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-poppins font-bold text-sm cursor-pointer"
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
