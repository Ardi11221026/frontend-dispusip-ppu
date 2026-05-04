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
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-8">Berita Terbaru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      <Footer />
    </div>
  );
}
