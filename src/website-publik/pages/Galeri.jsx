import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import { X, Eye } from 'lucide-react';
import { galleryStorage } from '../../shared/utils/galleryStorage';

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    const items = galleryStorage.getAll();
    setGalleryImages(items);
  }, []);
  const filteredImages = galleryImages;

  return (
    <div className="w-full">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}

      <PageBanner
        title="Galeri"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Galeri' },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category filter removed - simplified gallery */}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-end justify-start">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  <p className="font-poppins font-bold text-sm">{image.title}</p>
                  <p className="text-xs mt-1 text-gray-200">{new Date(image.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-poppins text-lg">
              Tidak ada gambar untuk kategori ini
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                {selectedImage.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">{new Date(selectedImage.date).toLocaleDateString('id-ID')}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
