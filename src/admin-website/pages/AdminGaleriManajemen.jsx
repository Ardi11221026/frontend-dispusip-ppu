import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { formatDate } from '../../shared/utils/formatDate';
import AdminLayout from '../components/AdminLayout';
import PetugasLayout from '../../petugas-perpus/components/PetugasLayout';
import { DeleteConfirmModal, GalleryModal, SuccessModal } from '../components/GalleryModals';
import { galleryStorage } from '../../shared/utils/galleryStorage';

const AdminGaleriManajemen = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('galeri');
  const [galleryItems, setGalleryItems] = useState(() => galleryStorage.getAll());
  const [modalState, setModalState] = useState({ isOpen: false, type: 'add', item: null });
  const [deleteState, setDeleteState] = useState({ isOpen: false, item: null });
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'petugas') {
      navigate('/back-office/login');
    }
  }, [navigate]);

  const filteredItems = galleryItems;

  const handleAddPhoto = () => {
    setModalState({ isOpen: true, type: 'add', item: null });
  };

  const handleOpenEdit = (item) => {
    setModalState({ isOpen: true, type: 'edit', item });
  };

  const handleOpenView = (item) => {
    setModalState({ isOpen: true, type: 'view', item });
  };

  const handleOpenDelete = (item) => {
    setDeleteState({ isOpen: true, item });
  };

  const handleSubmitGallery = (formData) => {
    if (modalState.type === 'add') {
      galleryStorage.add(formData);
      setSuccessState({ isOpen: true, message: 'Gambar berhasil ditambahkan.' });
    } else if (modalState.type === 'edit' && modalState.item) {
      galleryStorage.update(modalState.item.id, formData);
      setSuccessState({ isOpen: true, message: 'Gambar berhasil diperbarui.' });
    }

    setGalleryItems(galleryStorage.getAll());
  };

  const handleConfirmDelete = () => {
    if (!deleteState.item) return;

    galleryStorage.delete(deleteState.item.id);
    setGalleryItems(galleryStorage.getAll());
    setDeleteState({ isOpen: false, item: null });
    setSuccessState({ isOpen: true, message: 'Gambar berhasil dihapus.' });
  };

  const content = (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Galeri</h1>
          <p className="text-sm text-gray-500">Kelola foto, lihat detail, edit, dan hapus data galeri.</p>
        </div>

        <button
          onClick={handleAddPhoto}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Foto
        </button>
      </div>

      {/* categories removed - simplified gallery (no categories) */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
            <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
            <div className="space-y-3 p-4">
              <div>
                <h3 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenView(item)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Eye size={16} />
                  Lihat
                </button>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(item)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          Tidak ada data galeri pada kategori ini.
        </div>
      )}

      <GalleryModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        item={modalState.item}
        onClose={() => setModalState({ isOpen: false, type: 'add', item: null })}
        onSubmit={handleSubmitGallery}
      />

      <DeleteConfirmModal
        isOpen={deleteState.isOpen}
        title={deleteState.item?.title || ''}
        onCancel={() => setDeleteState({ isOpen: false, item: null })}
        onConfirm={handleConfirmDelete}
      />

      <SuccessModal
        isOpen={successState.isOpen}
        message={successState.message}
        onClose={() => setSuccessState({ isOpen: false, message: '' })}
      />
    </div>
  );

  const role = localStorage.getItem('userRole');
  const Layout = role === 'admin' ? AdminLayout : PetugasLayout;

  return <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>{content}</Layout>;
};

export default AdminGaleriManajemen;