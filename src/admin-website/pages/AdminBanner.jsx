import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Image, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { bannerStorage } from '../../shared/utils/bannerStorage';

export default function AdminBanner() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('konten');
  const [items, setItems] = useState(() => bannerStorage.getAll());
  const [modalState, setModalState] = useState({ isOpen: false, type: 'add', item: null });
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const refreshItems = () => setItems(bannerStorage.getAll());
  const openModal = (type, item = null) => setModalState({ isOpen: true, type, item });
  const closeModal = () => setModalState({ isOpen: false, type: 'add', item: null });

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextItem = {
      id: modalState.item?.id || Date.now(),
      title: formData.get('title')?.toString() || '',
      image: formData.get('image')?.toString() || modalState.item?.image || '/banner/pusip1.jpeg',
    };

    if (modalState.type === 'edit' && modalState.item) {
      bannerStorage.update(modalState.item.id, nextItem);
    } else {
      bannerStorage.add(nextItem);
    }

    refreshItems();
    closeModal();
    setSuccessState({ isOpen: true, message: modalState.type === 'edit' ? 'Banner berhasil diperbarui.' : 'Banner berhasil ditambahkan.' });
  };

  const handleDelete = () => {
    if (!modalState.item) return;
    bannerStorage.delete(modalState.item.id);
    refreshItems();
    closeModal();
    setSuccessState({ isOpen: true, message: 'Banner berhasil dihapus.' });
  };

  return (
    <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Banner</h3>
            <p className="text-sm text-gray-500">Kelola beberapa foto yang dipakai di website publik.</p>
          </div>
          <button onClick={() => openModal('add')} className="inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 sm:self-auto">
            <Plus size={18} />
            Tambah Banner
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
              <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Banner</p>
                  <h4 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openModal('view', item)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Eye size={16} />
                    Lihat
                  </button>
                  <button onClick={() => openModal('edit', item)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100">
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button onClick={() => openModal('delete', item)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalState.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">{modalState.type === 'view' ? 'Lihat Banner' : modalState.type === 'edit' ? 'Edit Banner' : 'Hapus Banner'}</h3>
                <button onClick={closeModal} className="rounded-lg p-2 hover:bg-gray-100"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
                {modalState.type === 'delete' ? (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"><Trash2 size={26} /></div>
                    <p className="font-semibold text-gray-900">Yakin ingin menghapus banner ini?</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-xl bg-gray-50">
                      <img src={modalState.item?.image || '/banner/pusip1.jpeg'} alt="Preview" className="h-56 w-full object-cover" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Judul</label>
                      <input name="title" defaultValue={modalState.item?.title || ''} disabled={modalState.type === 'view'} className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">URL Gambar</label>
                      <input name="image" defaultValue={modalState.item?.image || ''} disabled={modalState.type === 'view'} placeholder="/banner/pusip1.jpeg" className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50" />
                    </div>
                  </>
                )}

                {modalState.type === 'view' ? (
                  <div className="flex justify-end pt-2"><button type="button" onClick={closeModal} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Tutup</button></div>
                ) : modalState.type === 'delete' ? (
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                    <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">Ya, Hapus</button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                    <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Simpan</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {successState.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Image size={26} />
              </div>
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
