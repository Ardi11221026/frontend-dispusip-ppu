import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { Calendar, MessageCircle, Copy, Share2 } from 'lucide-react';
import { sanitizeRichHtml } from '../../shared/utils/sanitizeRichHtml';

export default function BeritaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    // Ambil data dari localStorage
    const savedItems = localStorage.getItem('adminBeritaItems');
    if (savedItems) {
      const allNews = JSON.parse(savedItems);
      const sortedNews = allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Cari berita dengan ID yang sesuai
      const foundBerita = allNews.find((item) => String(item.id) === String(id));
      
      // Update state hanya sekali
      if (foundBerita) {
        setBerita(foundBerita);
      }
      setBeritaList(sortedNews);
    }
  }, [id]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/berita/${berita.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `${berita.title}\n\n${berita.excerpt}\n\n${window.location.origin}/berita/${berita.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${window.location.origin}/berita/${berita.id}`
    )}`;
    window.open(facebookUrl, '_blank');
  };

  if (!berita) {
    return (
      <div className="w-full">
        <Header />
        <PageBanner
          title="Detail Berita"
          breadcrumbs={[
            { label: 'Beranda', href: '/' },
            { label: 'Berita', href: '/berita' },
            { label: 'Detail Berita' },
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-center text-gray-600">Berita tidak ditemukan</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Berita lainnya (untuk sidebar)
  const otherBerita = beritaList.filter((b) => String(b.id) !== String(id)).slice(0, 5);

  return (
    <div className="w-full">
      <Header />

      <PageBanner
        title={berita.title}
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita', href: '/berita' },
          { label: 'Detail' },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-3">
            {/* Featured Image */}
            {berita.image && (
              <div className="mb-6">
                <img
                  src={berita.image}
                  alt={berita.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600 font-poppins text-sm">
                <Calendar size={16} />
                <time dateTime={berita.date}>
                  {new Date(berita.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-poppins font-bold px-3 py-1 rounded">
                  {berita.category}
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-sm font-semibold text-gray-700 font-poppins">Bagikan:</span>
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-poppins text-sm"
                title="Bagikan ke WhatsApp"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>
              <button
                onClick={handleShareFacebook}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-poppins text-sm"
                title="Bagikan ke Facebook"
              >
                <Share2 size={16} />
                Facebook
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-poppins text-sm"
                title="Copy link"
              >
                <Copy size={16} />
                <span>{copiedLink ? 'Tersalin!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-6">
              {berita.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {berita.content ? (
                <div
                  className="text-gray-700 leading-relaxed font-poppins text-justify"
                  dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(berita.content) }}
                />
              ) : (
                <div className="text-gray-700 leading-relaxed font-poppins text-justify">
                  Konten berita akan ditampilkan di sini...
                </div>
              )}
            </div>

            {/* Gallery Section */}
            {berita.gallery && berita.gallery.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-6">Galeri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {berita.gallery.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Berita Terbaru */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                Berita Terbaru
              </h3>
              <div className="space-y-4">
                {otherBerita.map((beritaItem) => (
                  <div
                    key={beritaItem.id}
                    onClick={() => navigate(`/berita/${beritaItem.id}`)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={beritaItem.image}
                      alt={beritaItem.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-bold text-gray-900 font-poppins text-sm line-clamp-2 hover:text-blue-600 mb-2">
                        {beritaItem.title}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 font-poppins text-xs">
                        <Calendar size={12} />
                        {new Date(beritaItem.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
