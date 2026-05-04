import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import BeritaFormModal from '../components/BeritaFormModal';
import LihatBeritaModal from '../components/LihatBeritaModal';

export default function AdminBerita() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('berita');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('adminBeritaItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('adminBeritaItems', JSON.stringify(items));
  }, [items]);

  const [formModal, setFormModal] = useState({ isOpen: false, type: 'add', item: null });
  const [lihatModal, setLihatModal] = useState({ isOpen: false, item: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const openFormModal = (type, item = null) => setFormModal({ isOpen: true, type, item });
  const closeFormModal = () => setFormModal({ isOpen: false, type: 'add', item: null });

  const openLihatModal = (item) => setLihatModal({ isOpen: true, item });
  const closeLihatModal = () => setLihatModal({ isOpen: false, item: null });

  const handleSaveBerita = (berita) => {
    setItems((currentItems) => {
      if (formModal.type === 'edit') {
        return currentItems.map((item) => (item.id === berita.id ? berita : item));
      }
      return [berita, ...currentItems];
    });

    closeFormModal();
    setSuccessState({ 
      isOpen: true, 
      message: formModal.type === 'edit' ? 'Berita berhasil diperbarui.' : 'Berita berhasil ditambahkan.' 
    });
  };

  const handleDelete = () => {
    if (!deleteModal.item) return;
    setItems((currentItems) => currentItems.filter((item) => item.id !== deleteModal.item.id));
    setDeleteModal({ isOpen: false, item: null });
    setSuccessState({ isOpen: true, message: 'Berita berhasil dihapus.' });
  };

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => openLihatModal(item)} className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700 hover:bg-blue-100" title="Lihat preview">
        <Eye size={16} />
      </button>
      <button type="button" onClick={() => openFormModal('edit', item)} className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700 hover:bg-amber-100" title="Edit">
        <Pencil size={16} />
      </button>
      <button type="button" onClick={() => setDeleteModal({ isOpen: true, item })} className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 hover:bg-red-100" title="Hapus">
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Daftar Berita</h3>
          <button onClick={() => openFormModal('add')} className="inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 sm:self-auto">
            <Plus size={18} />
            Berita Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white text-sm shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">No.</th>
                <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Thumbnail</th>
                <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Judul</th>
                <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Tanggal / Waktu</th>
                <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-3">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-3">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-12 w-20 object-cover rounded" />
                    ) : (
                      <div className="h-12 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-3">{item.title}</td>
                  <td className="border border-gray-300 px-2 py-3">
                    <div className="text-sm font-medium">
                      {item.date ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase() : '-'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.time ? item.time.replace(':', '.') : '-'}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 py-3"><ActionButtons item={item} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Modal */}
        <BeritaFormModal
          isOpen={formModal.isOpen}
          type={formModal.type}
          item={formModal.item}
          onClose={closeFormModal}
          onSave={(berita) => {
            handleSaveBerita(berita);
          }}
        />

        {/* Lihat Modal */}
        <LihatBeritaModal
          isOpen={lihatModal.isOpen}
          item={lihatModal.item}
          onClose={closeLihatModal}
        />

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">Hapus Berita</h3>
              </div>
              <div className="space-y-4 px-6 py-5 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"><Trash2 size={26} /></div>
                <p className="font-semibold text-gray-900">Yakin ingin menghapus data ini?</p>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setDeleteModal({ isOpen: false, item: null })} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                  <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">Ya, Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {successState.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900">Berhasil</h3>
              <p className="mt-2 text-sm text-gray-600">{successState.message}</p>
              <button type="button" onClick={() => setSuccessState({ isOpen: false, message: '' })} className="mt-5 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">Tutup</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
