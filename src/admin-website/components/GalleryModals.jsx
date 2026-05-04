import { useState } from 'react';
import { X, Eye, Edit2, Trash2, AlertCircle } from 'lucide-react';
import PopupKonfirmasi from '../../shared/components/PopupKonfirmasi';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

export function GalleryModal({ isOpen, type, item, onClose, onSubmit }) {
  const [formData, setFormData] = useState(item || { title: '', image: '', date: new Date().toISOString().split('T')[0] });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(item?.image || '');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Nama kegiatan wajib diisi';
    if (type !== 'view' && !formData.image && !imagePreview) {
      newErrors.image = 'Foto wajib dipilih';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(item || { title: '', image: '', date: new Date().toISOString().split('T')[0] });
    setErrors({});
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  const titleText = type === 'add' ? 'Tambah Gambar' : type === 'edit' ? 'Edit Gambar' : 'Lihat Gambar';

  return (
    <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
      <div className="mx-auto flex min-h-full w-full max-w-md items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{titleText}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Image Preview */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {imagePreview || item?.image ? (
              <img
                src={imagePreview || item?.image}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Tidak ada gambar</span>
              </div>
            )}
          </div>

          {/* Upload Image */}
          {type !== 'view' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Foto
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.image && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.image}
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kegiatan
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              disabled={type === 'view'}
              placeholder="Contoh: Kunjungan Sekolah"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
            {errors.title && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.title}
              </div>
            )}
          </div>

          {/* Date (allow backdate) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              disabled={type === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Batal
          </button>
          {type !== 'view' && (
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {type === 'add' ? 'Tambah' : 'Simpan'}
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ isOpen, title, onConfirm, onCancel }) {
  return (
    <PopupKonfirmasi
      isOpen={isOpen}
      title="Hapus Gambar?"
      message={title ? `Anda yakin ingin menghapus ${title}? Tindakan ini tidak dapat dibatalkan.` : 'Anda yakin ingin menghapus data ini?'}
      confirmText="Hapus"
      cancelText="Batal"
      onConfirm={onConfirm}
      onCancel={onCancel}
      tone="danger"
    />
  );
}

export function SuccessModal({ isOpen, message, onClose }) {
  return <PopupBerhasil isOpen={isOpen} message={message} onClose={onClose} />;
}
