import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { formatDate } from '../../shared/utils/formatDate';
import AdminLayout from '../components/AdminLayout';
import PetugasLayout from '../../petugas-perpus/components/PetugasLayout';
import BeritaFormModal from '../components/BeritaFormModal';
import LihatBeritaModal from '../components/LihatBeritaModal';
import PopupKonfirmasi from '../../shared/components/PopupKonfirmasi';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

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
    const role = localStorage.getItem('userRole');
    if (role !== 'admin' && role !== 'petugas') {
      navigate('/back-office/login');
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

  const role = localStorage.getItem('userRole');
  const Layout = role === 'admin' ? AdminLayout : PetugasLayout;

  return (
    <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
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
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />
                          <div className="text-sm font-medium">{item.date ? formatDate(item.date) : '-'}</div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={14} />
                          <div className="text-xs">{item.time ? item.time : '-'}</div>
                        </div>
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
        <PopupKonfirmasi
          isOpen={deleteModal.isOpen}
          title="Hapus Berita"
          message="Yakin ingin menghapus data ini?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ isOpen: false, item: null })}
          tone="danger"
        />

        <PopupBerhasil
          isOpen={successState.isOpen}
          message={successState.message}
          onClose={() => setSuccessState({ isOpen: false, message: '' })}
        />
      </div>
    </Layout>
  );
}
