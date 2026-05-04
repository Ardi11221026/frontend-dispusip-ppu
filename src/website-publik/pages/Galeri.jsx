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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const items = galleryStorage.getAll();
    setGalleryImages(items);
    const cats = galleryStorage.getCategories(items);
    setCategories(cats);
  }, []);

  const filteredImages = selectedCategory === 'Semua'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="w-full">
      <Header />

      <PageBanner
        title="Galeri"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Galeri' },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-poppins font-bold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  <p className="text-xs bg-blue-600 px-2 py-1 rounded inline-block font-poppins mb-1">
                    {image.category}
                  </p>
                  <p className="font-poppins font-bold text-sm">{image.title}</p>
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
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto"
            />
            <div className="p-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-poppins font-bold px-3 py-1 rounded mb-3">
                {selectedImage.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                {selectedImage.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
