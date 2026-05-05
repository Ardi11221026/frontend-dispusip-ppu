import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BukuTamuDigital() {
  const [type, setType] = useState('non-anggota');
  const [form, setForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastEntry, setLastEntry] = useState(null);

  const resetForm = () => {
    setType('non-anggota');
    setForm({});
  };

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const entries = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    const id = `BT-${Date.now().toString().slice(-6)}`;
    const payload = { id, type, data: form, createdAt: new Date().toISOString() };
    entries.push(payload);
    localStorage.setItem('bukuTamuDigital', JSON.stringify(entries));
    setLastEntry(payload);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Buku Tamu Digital</h1>
            <p className="text-sm text-gray-600 mb-6">Pilih tipe pengunjung lalu isi formulir sesuai ketentuan.</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Pengunjung</label>
              <select
                value={type}
                onChange={(e) => { setType(e.target.value); setForm({}); }}
                className="w-full rounded-lg border-gray-200 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="non-anggota">Non-Anggota</option>
                <option value="anggota">Anggota</option>
                <option value="rombongan">Rombongan</option>
              </select>
            </div>

            <form onSubmit={handleSubmit}>
              {type === 'anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                    <input required value={form.nama || ''} onChange={handleChange('nama')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nomor Anggota</label>
                    <input required value={form.nomorAnggota || ''} onChange={handleChange('nomorAnggota')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                </div>
              )}

              {type === 'non-anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                    <input required value={form.nama || ''} onChange={handleChange('nama')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                    <select required value={form.jenisKelamin || ''} onChange={handleChange('jenisKelamin')} className="mt-1 w-full rounded-lg border-gray-200 p-2">
                      <option value="">-- Pilih --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Umur</label>
                    <input required type="number" min="0" value={form.umur || ''} onChange={handleChange('umur')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                </div>
              )}

              {type === 'rombongan' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dari Sekolah / Institusi</label>
                    <input required value={form.asalSekolah || ''} onChange={handleChange('asalSekolah')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Penanggungjawab</label>
                    <input required value={form.penanggungjawab || ''} onChange={handleChange('penanggungjawab')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nomor Telp / WA</label>
                    <input required value={form.kontak || ''} onChange={handleChange('kontak')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Isi Buku Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />

      {showSuccess && lastEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Entri Berhasil Disimpan</h3>
            <p className="mt-2 text-sm text-slate-600">Tunjukkan layar ini kepada petugas di perpustakaan.</p>

            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-700"><strong>ID:</strong> {lastEntry.id}</p>
              <p className="text-sm text-slate-700"><strong>Tipe:</strong> {lastEntry.type}</p>
              <p className="text-sm text-slate-700"><strong>Waktu:</strong> {new Date(lastEntry.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={handleCloseSuccess} className="rounded-lg bg-blue-600 px-4 py-2 text-white">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
