import { X, MessageCircle, Copy, Facebook, Calendar } from 'lucide-react';
import { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Preview Berita</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
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
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
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
              <Facebook size={18} />
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

          {/* Excerpt */}
          <p className="text-lg text-gray-700 mb-6 italic border-l-4 border-blue-500 pl-4">
            {item.excerpt}
          </p>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {item.content}
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
