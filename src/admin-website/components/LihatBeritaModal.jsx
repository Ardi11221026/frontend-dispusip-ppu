import { X, MessageCircle, Copy, Share2, Calendar } from 'lucide-react';
import { formatDate } from '../../shared/utils/formatDate';
import { useState } from 'react';
import { sanitizeRichHtml } from '../../shared/utils/sanitizeRichHtml';

export default function LihatBeritaModal({ isOpen, item, onClose }) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !item) return null;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/berita/${item.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `${item.title}\n\n${item.excerpt}\n\n${window.location.origin}/berita/${item.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${window.location.origin}/berita/${item.id}`
    )}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
      <div className="flex min-h-full items-center justify-center">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Preview Berita</h2>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Featured Image */}
          {item.image && (
            <div className="mb-8">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <time dateTime={item.date}>{formatDate(item.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded">
                {item.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Bagikan:</span>
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              title="Bagikan ke WhatsApp"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-semibold">WhatsApp</span>
            </button>
            <button
              onClick={handleShareFacebook}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              title="Bagikan ke Facebook"
            >
              <Share2 size={18} />
              <span className="text-sm font-semibold">Facebook</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              title="Copy link"
            >
              <Copy size={18} />
              <span className="text-sm font-semibold">
                {copiedLink ? 'Tersalin!' : 'Copy Link'}
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {item.content ? (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.content) }}
              />
            ) : (
              <div className="text-gray-700 leading-relaxed">Konten berita belum tersedia.</div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-8 py-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
