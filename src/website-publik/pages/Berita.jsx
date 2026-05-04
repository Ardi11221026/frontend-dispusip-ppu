import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { Calendar, MessageCircle, Copy, X, Share2 } from 'lucide-react';

export default function Berita() {
  const [beritaList, setBeritaList] = useState(() => {
    const savedItems = localStorage.getItem('adminBeritaItems');
    if (savedItems) {
      const allNews = JSON.parse(savedItems);
      const publicNews = allNews.filter(item => item.status === 'Publik');
      return publicNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  });

  const [selectedBerita, setSelectedBerita] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleCopyLink = (berita) => {
    const link = `${window.location.origin}/berita/${berita.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = (berita) => {
    const text = `${berita.title}\n\n${berita.excerpt}\n\n${window.location.origin}/berita/${berita.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = (berita) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${window.location.origin}/berita/${berita.id}`
    )}`;
    window.open(facebookUrl, '_blank');
  };

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
                    onClick={() => setSelectedBerita(beritaList[0])}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-poppins font-bold py-2 px-6 rounded transition">
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
                    onClick={() => setSelectedBerita(berita)}
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

      {/* Detail Modal */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Detail Berita</h2>
              <button
                onClick={() => setSelectedBerita(null)}
                className="rounded-full p-1 hover:bg-gray-100 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Featured Image */}
              {selectedBerita.image && (
                <div className="mb-8">
                  <img
                    src={selectedBerita.image}
                    alt={selectedBerita.title}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <time dateTime={selectedBerita.date}>
                    {new Date(selectedBerita.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded">
                    {selectedBerita.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedBerita.title}</h1>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">Bagikan:</span>
                <button
                  onClick={() => handleShareWhatsApp(selectedBerita)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  title="Bagikan ke WhatsApp"
                >
                  <MessageCircle size={18} />
                </button>
                <button
                  onClick={() => handleShareFacebook(selectedBerita)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  title="Bagikan ke Facebook"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => handleCopyLink(selectedBerita)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  title="Copy link"
                >
                  <Copy size={18} />
                  <span className="text-sm font-semibold">
                    {copiedLink ? 'Tersalin!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-gray-700 mb-6 italic border-l-4 border-blue-500 pl-4">
                {selectedBerita.excerpt}
              </p>

              {/* Content */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedBerita.content || 'Konten berita akan ditampilkan di sini...'}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedBerita(null)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
