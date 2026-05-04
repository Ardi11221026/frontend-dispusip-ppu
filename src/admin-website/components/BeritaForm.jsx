import { useState, useEffect } from 'react';
import { Upload, ChevronUp, ChevronDown, Trash2, X } from 'lucide-react';

export default function BeritaForm({ type, item, onSave, onClose }) {
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
        contentBlocks:
          item.contentBlocks ||
          (item.content ? [{ type: 'text', value: item.content }] : []),
      });
    }
  }, [type, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (index === null) {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      } else {
        updateContentBlock(index, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addContentBlock = (type) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, { type, value: '' }],
    }));
  };

  const updateContentBlock = (index, value) => {
    const newBlocks = [...formData.contentBlocks];
    newBlocks[index].value = value;
    setFormData((prev) => ({ ...prev, contentBlocks: newBlocks }));
  };

  const moveBlock = (index, direction) => {
    const blocks = [...formData.contentBlocks];
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    }
    if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    setFormData((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  const deleteBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = formData.contentBlocks
      .map((b) => (b.type === 'text' ? b.value : ''))
      .join('\n');

    const gallery = formData.contentBlocks
      .filter((b) => b.type === 'image')
      .map((b) => b.value);

    onSave({
      ...item,
      ...formData,
      content,
      gallery,
      excerpt: content.substring(0, 150),
      id: item?.id || Date.now(),
      status: item?.status || 'Draft',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Buat Berita Baru</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <form id="berita-form" onSubmit={handleSubmit} className="overflow-y-auto px-6 py-4 space-y-6 flex-1">

          {/* Thumbnail */}
          <div>
            <label className="font-medium block mb-2">Thumbnail Berita *</label>
            <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500">
              <Upload />
              <span className="text-sm mt-2">Klik untuk upload thumbnail</span>
              <input type="file" hidden onChange={handleImageChange} />
            </label>
            {formData.image && (
              <img src={formData.image} className="h-32 mt-3 rounded" />
            )}
          </div>

          {/* Tanggal */}
          <div>
            <label className="block mb-1 font-medium">Tanggal Berita</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Judul */}
          <div>
            <label className="block mb-1 font-medium">Judul Berita *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Konten */}
          <div>
            <label className="font-medium block mb-2">Konten Berita *</label>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => addContentBlock('text')}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Teks
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('image')}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Gambar
              </button>
            </div>

            {formData.contentBlocks.map((block, i) => (
              <div key={i} className="border rounded-lg p-3 mb-3">

                {block.type === 'text' ? (
                  <textarea
                    value={block.value}
                    onChange={(e) => updateContentBlock(i, e.target.value)}
                    placeholder="Tulis konten..."
                    className="w-full border rounded p-2 min-h-[100px]"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, i)}
                    />
                    {block.value && (
                      <img src={block.value} className="mt-2 h-32 rounded" />
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => moveBlock(i, 'up')}>
                    <ChevronUp size={18} />
                  </button>
                  <button type="button" onClick={() => moveBlock(i, 'down')}>
                    <ChevronDown size={18} />
                  </button>
                  <button type="button" onClick={() => deleteBlock(i)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>

        {/* FOOTER (STICKY BUTTONS) */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-700 text-white"
          >
            Simpan Berita
          </button>
        </div>
      </div>
    </div>
  );
}