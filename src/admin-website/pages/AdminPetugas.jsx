import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminPetugas() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('petugas');
  const [items, setItems] = useState([
    { id: 1, name: 'Petugas 1', email: 'petugas1@perpus.id', status: 'Aktif' },
    { id: 2, name: 'Petugas 2', email: 'petugas2@perpus.id', status: 'Aktif' },
    { id: 3, name: 'Petugas 3', email: 'petugas3@perpus.id', status: 'Nonaktif' },
  ]);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'view', item: null });
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const openModal = (type, item = null) => setModalState({ isOpen: true, type, item });
  const closeModal = () => setModalState({ isOpen: false, type: 'view', item: null });

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextItem = {
      id: modalState.item?.id || Date.now(),
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      status: formData.get('status')?.toString() || 'Aktif',
    };

    setItems((currentItems) => {
      if (modalState.type === 'edit' && modalState.item) {
        return currentItems.map((item) => (item.id === modalState.item.id ? nextItem : item));
      }

      return [nextItem, ...currentItems];
    });

    closeModal();
    setSuccessState({ isOpen: true, message: modalState.type === 'edit' ? 'Data berhasil diperbarui.' : 'Data berhasil ditambahkan.' });
  };

  const handleDelete = () => {
    if (!modalState.item) return;
    setItems((currentItems) => currentItems.filter((item) => item.id !== modalState.item.id));
    closeModal();
    setSuccessState({ isOpen: true, message: 'Data berhasil dihapus.' });
  };

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => openModal('view', item)} className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700 hover:bg-blue-100" aria-label="Lihat"><Eye size={16} /></button>
      <button type="button" onClick={() => openModal('edit', item)} className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700 hover:bg-amber-100" aria-label="Edit"><Pencil size={16} /></button>
      <button type="button" onClick={() => openModal('delete', item)} className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 hover:bg-red-100" aria-label="Hapus"><Trash2 size={16} /></button>
    </div>
  );

  return (
    <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Daftar Petugas</h3>
          <button onClick={() => openModal('add')} className="inline-flex items-center gap-2 self-start rounded-lg bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700 sm:self-auto">
            <Plus size={18} />
            Tambah Petugas
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 bg-white text-sm shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">No.</th>
              <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Nama</th>
              <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="border border-gray-300 px-2 py-3 text-left font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-3">{index + 1}</td>
                <td className="border border-gray-300 px-2 py-3">{item.name}</td>
                <td className="border border-gray-300 px-2 py-3">{item.email}</td>
                <td className="border border-gray-300 px-2 py-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-2 py-3"><ActionButtons item={item} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalState.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {modalState.type === 'view' ? 'Lihat Data' : modalState.type === 'edit' ? 'Edit Data' : 'Hapus Data'}
                </h3>
                <button onClick={closeModal} className="rounded-lg p-2 hover:bg-gray-100"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
                {modalState.type === 'delete' ? (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"><Trash2 size={26} /></div>
                    <p className="font-semibold text-gray-900">Yakin ingin menghapus data ini?</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Nama</label>
                      <input name="name" defaultValue={modalState.item?.name || ''} disabled={modalState.type === 'view'} className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                      <input name="email" defaultValue={modalState.item?.email || ''} disabled={modalState.type === 'view'} className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                      <select name="status" defaultValue={modalState.item?.status || 'Aktif'} disabled={modalState.type === 'view'} className="w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50">
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                      </select>
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
