import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Database, Eye, FileDown, FileUp, Pencil, Plus, Trash2, X } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.state?.activeMenu || 'dashboard');
  const [beritaItems, setBeritaItems] = useState([
    { id: 1, title: 'Kegiatan Literasi Sekolah', date: '29 Apr 2026', status: 'Publik' },
    { id: 2, title: 'Kunjungan Komunitas', date: '28 Apr 2026', status: 'Draft' },
  ]);
  const [petugasItems, setPetugasItems] = useState([
    { id: 1, name: 'Petugas 1', email: 'petugas1@perpus.id', status: 'Aktif' },
    { id: 2, name: 'Petugas 2', email: 'petugas2@perpus.id', status: 'Aktif' },
    { id: 3, name: 'Petugas 3', email: 'petugas3@perpus.id', status: 'Nonaktif' },
  ]);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'view', category: 'berita', item: null });
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    setActiveMenu(location.state?.activeMenu || 'dashboard');
  }, [location.pathname, location.state, setActiveMenu]);

  const stats = [
    { label: 'Total Berita', value: '0', color: 'from-blue-500 to-blue-600' },
    { label: 'Berita Bulan Ini', value: '0', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Total Pengunjung', value: '3,730', color: 'from-purple-500 to-purple-600' },
    { label: 'Petugas Aktif', value: '98', color: 'from-orange-500 to-orange-600' },
  ];

  const openModal = (category, type, item = null) => {
    setModalState({ isOpen: true, type, category, item });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: 'view', category: 'berita', item: null });
  };

  const handleDelete = () => {
    if (!modalState.item) return;

    if (modalState.category === 'berita') {
      setBeritaItems((currentItems) => currentItems.filter((item) => item.id !== modalState.item.id));
    } else {
      setPetugasItems((currentItems) => currentItems.filter((item) => item.id !== modalState.item.id));
    }

    setModalState({ isOpen: false, type: 'view', category: 'berita', item: null });
    setSuccessState({ isOpen: true, message: 'Data berhasil dihapus.' });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (modalState.category === 'berita') {
      const nextItem = {
        id: modalState.item?.id || Date.now(),
        title: formData.get('title')?.toString() || '',
        date: formData.get('date')?.toString() || '',
        status: formData.get('status')?.toString() || 'Draft',
      };

      setBeritaItems((currentItems) => {
        if (modalState.type === 'edit' && modalState.item) {
          return currentItems.map((item) => (item.id === modalState.item.id ? nextItem : item));
        }

        return [nextItem, ...currentItems];
      });
    } else {
      const nextItem = {
        id: modalState.item?.id || Date.now(),
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        status: formData.get('status')?.toString() || 'Aktif',
      };

      setPetugasItems((currentItems) => {
        if (modalState.type === 'edit' && modalState.item) {
          return currentItems.map((item) => (item.id === modalState.item.id ? nextItem : item));
        }

        return [nextItem, ...currentItems];
      });
    }

    closeModal();
    setSuccessState({ isOpen: true, message: modalState.type === 'edit' ? 'Data berhasil diperbarui.' : 'Data berhasil ditambahkan.' });
  };

  const renderActionButtons = (category, item) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => openModal(category, 'view', item)}
        className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100"
        aria-label="Lihat"
      >
        <Eye size={16} />
      </button>
      <button
        type="button"
        onClick={() => openModal(category, 'edit', item)}
        className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700 transition hover:bg-amber-100"
        aria-label="Edit"
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={() => openModal(category, 'delete', item)}
        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
        aria-label="Hapus"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const content = (
    <div className="p-4 sm:p-6 space-y-6">
      {activeMenu === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  <BarChart3 size={24} />
                </div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                  <Plus size={18} />
                  Buat Berita
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition font-medium">
                  <Plus size={18} />
                  Kelola Konten
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition font-medium">
                  <Plus size={18} />
                  Tambah Petugas
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-emerald-700 rounded-lg shadow p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Dashboard Administrator</h3>
              <p className="text-sm opacity-90 mb-4">Kelola berita, konten, dan akun petugas dari satu tempat yang mudah.</p>
              <div className="space-y-2 text-sm">
                <p>✓ Publish/Edit Berita</p>
                <p>✓ Kelola Halaman Konten</p>
                <p>✓ Atur Akun Petugas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Berita Terbaru</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada berita. Mulai dengan membuat berita baru.</p>
            </div>
          </div>
        </>
      )}

      {activeMenu === 'berita' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Daftar Berita</h3>
            <button className="inline-flex items-center gap-2 self-start bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium sm:self-auto">
              <Plus size={18} />
              Berita Baru
            </button>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300 bg-white shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">No.</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Judul</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Tanggal</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Status</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {beritaItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 py-3 px-2">{index + 1}</td>
                  <td className="border border-gray-300 py-3 px-2">{item.title}</td>
                  <td className="border border-gray-300 py-3 px-2">{item.date}</td>
                  <td className="border border-gray-300 py-3 px-2">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Publik' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 py-3 px-2">{renderActionButtons('berita', item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeMenu === 'konten' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Daftar Konten</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Fitur manajemen konten sedang dalam pengembangan...</p>
          </div>
        </div>
      )}

      {activeMenu === 'petugas' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Daftar Petugas</h3>
            <button className="inline-flex items-center gap-2 self-start bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium sm:self-auto">
              <Plus size={18} />
              Tambah Petugas
            </button>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-gray-300 bg-white shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">No.</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Nama</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Email</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Status</th>
                <th className="border border-gray-300 text-left py-3 px-2 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {petugasItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 py-3 px-2">{index + 1}</td>
                  <td className="border border-gray-300 py-3 px-2">{item.name}</td>
                  <td className="border border-gray-300 py-3 px-2">{item.email}</td>
                  <td className="border border-gray-300 py-3 px-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 py-3 px-2">{renderActionButtons('petugas', item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeMenu === 'export' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-600 p-3 text-white">
              <FileDown size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Ekspor Data</h3>
              <p className="text-sm text-gray-500">Unduh data admin dalam format cadangan atau laporan.</p>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-gray-600">
            Menu ekspor siap dihubungkan ke format file yang dibutuhkan.
          </div>
        </div>
      )}

      {activeMenu === 'backup' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-emerald-600 p-3 text-white">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Backup Data</h3>
              <p className="text-sm text-gray-500">Simpan salinan data untuk pemulihan bila dibutuhkan.</p>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-gray-600">
            Menu backup siap dihubungkan ke penyimpanan data yang digunakan aplikasi.
          </div>
        </div>
      )}

      {activeMenu === 'import' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-purple-600 p-3 text-white">
              <FileUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Impor Data</h3>
              <p className="text-sm text-gray-500">Masukkan data dari file ke sistem admin.</p>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-gray-600">
            Menu impor siap dihubungkan ke proses upload dan validasi file.
          </div>
        </div>
      )}

      {modalState.isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">
                {modalState.type === 'view'
                  ? 'Lihat Data'
                  : modalState.type === 'edit'
                    ? 'Edit Data'
                    : 'Hapus Data'}
              </h3>
              <button onClick={closeModal} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
              {modalState.type === 'delete' ? (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Trash2 size={26} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Yakin ingin menghapus data ini?</p>
                    <p className="mt-1 text-sm text-gray-600">Tindakan ini tidak bisa dibatalkan.</p>
                  </div>
                </div>
              ) : modalState.category === 'berita' ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Judul</label>
                    <input
                      name="title"
                      defaultValue={modalState.item?.title || ''}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Tanggal</label>
                    <input
                      name="date"
                      defaultValue={modalState.item?.date || ''}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={modalState.item?.status || 'Draft'}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    >
                      <option value="Publik">Publik</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nama</label>
                    <input
                      name="name"
                      defaultValue={modalState.item?.name || ''}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      name="email"
                      defaultValue={modalState.item?.email || ''}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={modalState.item?.status || 'Aktif'}
                      disabled={modalState.type === 'view'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </>
              )}

              {modalState.type === 'view' && modalState.item && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Detail Data</p>
                  {modalState.category === 'berita' ? (
                    <div className="mt-2 space-y-1">
                      <p>Judul: {modalState.item.title}</p>
                      <p>Tanggal: {modalState.item.date}</p>
                      <p>Status: {modalState.item.status}</p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-1">
                      <p>Nama: {modalState.item.name}</p>
                      <p>Email: {modalState.item.email}</p>
                      <p>Status: {modalState.item.status}</p>
                    </div>
                  )}
                </div>
              )}

              {modalState.type !== 'view' && modalState.type !== 'delete' && (
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
                    Batal
                  </button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                    Simpan
                  </button>
                </div>
              )}

              {modalState.type === 'view' && (
                <div className="flex justify-end pt-2">
                  <button type="button" onClick={closeModal} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                    Tutup
                  </button>
                </div>
              )}

              {modalState.type === 'delete' && (
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
                    Batal
                  </button>
                  <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">
                    Ya, Hapus
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {successState.isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Berhasil</h3>
              <p className="mt-2 text-sm text-gray-600">{successState.message}</p>
              <button
                type="button"
                onClick={() => setSuccessState({ isOpen: false, message: '' })}
                className="mt-5 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>{content}</AdminLayout>;
}
