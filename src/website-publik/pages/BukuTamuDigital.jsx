import { useState } from 'react';
import PetugasModulePage from '../../petugas-perpus/components/PetugasModulePage';
import { useNavigate } from 'react-router-dom';

export default function BukuTamuDigital() {
  const [type, setType] = useState('non-anggota');
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now store in localStorage as a simple record
    const entries = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    entries.push({ type, data: form, createdAt: new Date().toISOString() });
    localStorage.setItem('bukuTamuDigital', JSON.stringify(entries));
    alert('Terima kasih, entri buku tamu berhasil disimpan.');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 py-12">
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
                  <input required onChange={handleChange('nama')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomor Anggota</label>
                  <input required onChange={handleChange('nomorAnggota')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
              </div>
            )}

            {type === 'non-anggota' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input required onChange={handleChange('nama')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                  <select required onChange={handleChange('jenisKelamin')} className="mt-1 w-full rounded-lg border-gray-200 p-2">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Umur</label>
                  <input required type="number" min="0" onChange={handleChange('umur')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
              </div>
            )}

            {type === 'rombongan' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dari Sekolah / Institusi</label>
                  <input required onChange={handleChange('asalSekolah')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Penanggungjawab</label>
                  <input required onChange={handleChange('penanggungjawab')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomor Telp / WA</label>
                  <input required onChange={handleChange('kontak')} className="mt-1 w-full rounded-lg border-gray-200 p-2" />
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
    </div>
  );
}
