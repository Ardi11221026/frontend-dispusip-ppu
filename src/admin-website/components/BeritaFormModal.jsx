import { useState, useEffect } from 'react';
import { X, Upload, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

export default function BeritaFormModal({ isOpen, type, item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Berita',
    location: '',
    image: '',
    contentBlocks: [],
  });

  useEffect(() => {
    if (type === 'edit' && item) {
      setFormData({
        title: item.title || '',
        date: item.date || new Date().toISOString().split('T')[0],
        category: item.category || 'Berita',
        location: item.location || '',
        image: item.image || '',
        contentBlocks: item.contentBlocks || (item.content ? [{ type: 'text', value: item.content }] : []),
      });
    } else if (type === 'add') {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Berita',
        location: '',
        image: '',
        contentBlocks: [],
      });
    }
  }, [type, item, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, date: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addContentBlock = (type) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, { type, value: '' }],
    }));
  };

  const updateContentBlock = (index, value) => {
    setFormData((prev) => {
      const newBlocks = [...prev.contentBlocks];
      newBlocks[index] = { ...newBlocks[index], value };
      return { ...prev, contentBlocks: newBlocks };
    });
  };

  const handleContentImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContentBlock(index, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const moveBlock = (index, direction) => {
    setFormData((prev) => {
      const newBlocks = [...prev.contentBlocks];
      if (direction === 'up' && index > 0) {
        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      } else if (direction === 'down' && index < newBlocks.length - 1) {
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      }
      return { ...prev, contentBlocks: newBlocks };
    });
  };

  const deleteBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Konversi contentBlocks menjadi string content untuk kompatibilitas
    const content = formData.contentBlocks
      .map(block => block.type === 'text' ? block.value : '')
      .join('\n')
      .trim();

    // Ambil gambar pertama untuk gallery (jika ada)
    const gallery = formData.contentBlocks
      .filter(block => block.type === 'image')
      .map(block => block.value);

    onSave({
      ...item,
      title: formData.title,
      date: formData.date,
      category: formData.category,
      location: formData.location,
      image: formData.image,
      content: content,
      gallery: gallery,
      contentBlocks: formData.contentBlocks,
      excerpt: content.substring(0, 150),
      id: item?.id || Date.now(),
      status: item?.status || 'Draft',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <h2 className="text-xl font-bold">
            {type === 'add' ? 'Tambah Berita Baru' : 'Edit Berita'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-blue-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Thumbnail Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail Berita *
            </label>
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50">
              {formData.image ? (
                <div className="space-y-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="block text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                  >
                    Ubah Gambar
                  </label>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Klik untuk upload thumbnail</p>
                  <p className="text-xs text-gray-500">PNG, JPG hingga 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="block text-sm text-blue-600 cursor-pointer hover:text-blue-800 mt-2"
                  >
                    Pilih File
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-orange-600 mt-2">Thumbnail akan ditampilkan sebagai gambar pertama di berita</p>
          </div>

          {/* Tanggal Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Berita *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Format: Senin, 4 Mei 2026</p>
          </div>

          {/* Judul Berita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Berita *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Lokasi/Kecamatan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lokasi/Kecamatan *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Penajam</option>
              <option value="Penajam">Penajam</option>
              <option value="Kecamatan Lain">Kecamatan Lain</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Lokasi akan ditampilkan di awal konten: "TENAK JAM, Dalam rangka..."</p>
          </div>

          {/* Konten Berita */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Konten Berita *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addContentBlock('text')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                >
                  + Teks
                </button>
                <button
                  type="button"
                  onClick={() => addContentBlock('image')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                >
                  + Gambar
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">Susun konten dengan teks dan gambar. Ringkasan otomatis diambil dari teks pertama.</p>

            {formData.contentBlocks.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
                <p className="text-sm text-gray-600">Belum ada konten. Klik tombol di atas untuk menambah.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.contentBlocks.map((block, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {/* Header Block */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-600">
                        {block.type === 'text' ? '📝 Blok Teks' : '🖼️ Blok Gambar'} #{index + 1}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
                          title="Pindah ke atas"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'down')}
                          disabled={index === formData.contentBlocks.length - 1}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
                          title="Pindah ke bawah"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlock(index)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Hapus blok"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    {block.type === 'text' ? (
                      <textarea
                        value={block.value}
                        onChange={(e) => updateContentBlock(index, e.target.value)}
                        placeholder="Mulai tulis konten di sini... Pilih teks untuk format dengan toolbar di atas."
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {block.value ? (
                          <div className="space-y-2">
                            <img
                              src={block.value}
                              alt={`Gambar ${index}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleContentImageChange(e, index)}
                              className="hidden"
                              id={`content-image-${index}`}
                            />
                            <label
                              htmlFor={`content-image-${index}`}
                              className="block text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                            >
                              Ubah Gambar
                            </label>
                          </div>
                        ) : (
                          <div>
                            <Upload size={28} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Klik untuk upload gambar</p>
                            <p className="text-xs text-gray-500 mb-2">PNG, JPG, GIF hingga 10MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleContentImageChange(e, index)}
                              className="hidden"
                              id={`content-image-${index}`}
                            />
                            <label
                              htmlFor={`content-image-${index}`}
                              className="block text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                            >
                              Pilih File
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {type === 'add' ? 'Simpan Berita' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
