import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import PopupKonfirmasi from '../../shared/components/PopupKonfirmasi';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

const emptyForm = { name: '', email: '', password: '', status: 'Aktif' };

const isValidEmail = (value) => /.+@.+\..+/.test(value);

export default function AdminPetugas() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('petugas');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('adminPetugasItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [modalState, setModalState] = useState({ isOpen: false, type: 'add', item: null });
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('adminPetugasItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!modalState.isOpen || modalState.type === 'delete') return;

    setFormData({
      name: modalState.item?.name || '',
      email: modalState.item?.email || '',
      password: modalState.item?.password || '',
      status: modalState.item?.status || 'Aktif',
    });
    setErrors({});
    setShowPassword(false);
  }, [modalState]);

  const openModal = (type, item = null) => setModalState({ isOpen: true, type, item });
  const closeModal = () => {
    setModalState({ isOpen: false, type: 'add', item: null });
    setErrors({});
    setShowPassword(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Nama akun wajib diisi';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!isValidEmail(formData.email.trim())) {
      nextErrors.email = 'Format email tidak valid';
    }
    if (!formData.password.trim()) nextErrors.password = 'Password wajib diisi';
    if (!formData.status.trim()) nextErrors.status = 'Status wajib dipilih';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const nextItem = {
      id: modalState.item?.id || Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      status: formData.status,
    };

    setItems((currentItems) => {
      if (modalState.type === 'edit' && modalState.item) {
        return currentItems.map((item) => (item.id === modalState.item.id ? nextItem : item));
      }

      return [nextItem, ...currentItems];
    });

    closeModal();
    setSuccessState({ isOpen: true, message: modalState.type === 'edit' ? 'Data petugas berhasil diperbarui.' : 'Data petugas berhasil ditambahkan.' });
  };

  const handleDelete = () => {
    if (!modalState.item) return;
    setItems((currentItems) => currentItems.filter((item) => item.id !== modalState.item.id));
    closeModal();
    setSuccessState({ isOpen: true, message: 'Data petugas berhasil dihapus.' });
  };

  const ActionButtons = ({ item }) => (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => openModal('edit', item)} className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700 hover:bg-amber-100" aria-label="Edit">
        <Pencil size={16} />
      </button>
      <button type="button" onClick={() => openModal('delete', item)} className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 hover:bg-red-100" aria-label="Hapus">
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Manajemen Petugas</h3>
            <p className="text-sm text-gray-500">Tambahkan akun petugas perpustakaan di sini, lalu mereka bisa login memakai data yang tersimpan di browser.</p>
          </div>
          <button onClick={() => openModal('add')} className="inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 sm:self-auto">
            <Plus size={18} />
            Tambah Petugas
          </button>
        </div>

        <div className="overflow-x-auto">
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
        </div>

        {modalState.isOpen && modalState.type !== 'delete' && (
          <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
            <div className="flex min-h-full items-center justify-center">
              <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-900">{modalState.type === 'edit' ? 'Edit Data Petugas' : 'Tambah Data Petugas'}</h3>
                </div>

                <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nama Akun</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Contoh: Hilmi"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="hilmi123@gmail.com"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="hilmi123"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password ? <p className="mt-1 text-sm text-red-500">{errors.password}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                    {errors.status ? <p className="mt-1 text-sm text-red-500">{errors.status}</p> : null}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                    <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <PopupKonfirmasi
          isOpen={modalState.isOpen && modalState.type === 'delete'}
          title="Hapus Petugas"
          message="Yakin ingin menghapus data petugas ini?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          onConfirm={handleDelete}
          onCancel={closeModal}
          tone="danger"
        />

        <PopupBerhasil
          isOpen={successState.isOpen}
          message={successState.message}
          onClose={() => setSuccessState({ isOpen: false, message: '' })}
        />
      </div>
    </AdminLayout>
  );
}