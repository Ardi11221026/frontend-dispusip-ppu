import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { Calendar, MessageCircle, Copy, Share2, ArrowLeft } from 'lucide-react';

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
      const publicNews = allNews.filter(item => item.status === 'Publik');
      const sortedNews = publicNews.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBeritaList(sortedNews);

      // Cari berita dengan ID yang sesuai
      const foundBerita = allNews.find(item => item.id === id);
      if (foundBerita) {
        setBerita(foundBerita);
      }
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
  const otherBerita = beritaList.filter(b => b.id !== id).slice(0, 5);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <button
              onClick={() => navigate('/berita')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-poppins font-semibold mb-6 transition"
            >
              <ArrowLeft size={20} />
              Kembali ke Berita
            </button>

            {/* Featured Image */}
            {berita.image && (
              <div className="mb-8">
                <img
                  src={berita.image}
                  alt={berita.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 font-poppins">
                <Calendar size={18} />
                <time dateTime={berita.date}>
                  {new Date(berita.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-poppins font-bold px-3 py-1 rounded">
                  {berita.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-6">
              {berita.title}
            </h1>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700 font-poppins">Bagikan:</span>
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-poppins"
                title="Bagikan ke WhatsApp"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                onClick={handleShareFacebook}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-poppins"
                title="Bagikan ke Facebook"
              >
                <Share2 size={18} />
                Facebook
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-poppins"
                title="Copy link"
              >
                <Copy size={18} />
                <span className="text-sm font-semibold">
                  {copiedLink ? 'Tersalin!' : 'Copy Link'}
                </span>
              </button>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-700 mb-8 italic border-l-4 border-blue-500 pl-4 font-poppins">
              {berita.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-poppins">
                {berita.content || 'Konten berita akan ditampilkan di sini...'}
              </div>
            </div>
          </div>

          {/* Sidebar - Berita Terbaru Lainnya */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Berita Terbaru Lainnya
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
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-500 font-poppins text-xs mb-2">
                        <Calendar size={14} />
                        {new Date(beritaItem.date).toLocaleDateString('id-ID')}
                      </div>
                      <h4 className="font-bold text-gray-900 font-poppins text-sm line-clamp-2 hover:text-blue-600">
                        {beritaItem.title}
                      </h4>
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
