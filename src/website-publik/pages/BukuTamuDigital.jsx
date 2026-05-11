import { useState } from 'react';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

export default function BukuTamuDigital() {
  const [type, setType] = useState('non-anggota');
  const [form, setForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setType('non-anggota');
    setForm({});
  };

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const validateForm = () => {
    const nextErrors = {};

    if (type === 'anggota') {
      if (!(form.nama || '').trim()) nextErrors.nama = 'Nama wajib diisi';
      if (!(form.nomorAnggota || '').trim()) nextErrors.nomorAnggota = 'Nomor anggota wajib diisi';
    }

    if (type === 'non-anggota') {
      if (!(form.nama || '').trim()) nextErrors.nama = 'Nama wajib diisi';
      if (!(form.jenisKelamin || '').trim()) nextErrors.jenisKelamin = 'Jenis kelamin wajib dipilih';
      if (!(form.umur || '').trim()) {
        nextErrors.umur = 'Umur wajib diisi';
      } else if (Number(form.umur) <= 0) {
        nextErrors.umur = 'Umur harus lebih dari 0';
      }
    }

    if (type === 'rombongan') {
      if (!(form.asalSekolah || '').trim()) nextErrors.asalSekolah = 'Asal sekolah / institusi wajib diisi';
      if (!(form.penanggungjawab || '').trim()) nextErrors.penanggungjawab = 'Penanggungjawab wajib diisi';
      if (!(form.kontak || '').trim()) nextErrors.kontak = 'Nomor telp / WA wajib diisi';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const entries = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    const id = `BT-${Date.now().toString().slice(-6)}`;
    const payload = { id, type, data: form, createdAt: new Date().toISOString() };
    entries.push(payload);
    localStorage.setItem('bukuTamuDigital', JSON.stringify(entries));
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
      </div>

      <main className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-emerald-700 px-6 py-10 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white ring-2 ring-amber-300 overflow-hidden">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-2" />
              </div>
            </div>
            <p className="text-blue-100 text-center mt-2 text-xs font-semibold uppercase tracking-[0.3em]">Perpustakaan Digital</p>
            <h1 className="text-3xl font-bold text-center mt-2">Buku Tamu Digital</h1>
            <p className="text-blue-100 text-center mt-2 text-sm px-4">
              Pilih tipe pengunjung lalu isi formulir sesuai ketentuan.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Tipe Pengunjung</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setForm({});
                    setErrors({});
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="non-anggota">Non-Anggota</option>
                  <option value="anggota">Anggota</option>
                  <option value="rombongan">Rombongan</option>
                </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={(e) => {
                        handleChange('nama')(e);
                        if (errors.nama) setErrors((current) => ({ ...current, nama: '' }));
                      }}
                      aria-invalid={!!errors.nama}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.nama ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="Nama lengkap"
                    />
                    {errors.nama ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.nama}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Nomor Anggota</label>
                    <input
                      required
                      value={form.nomorAnggota || ''}
                      onChange={(e) => {
                        handleChange('nomorAnggota')(e);
                        if (errors.nomorAnggota) setErrors((current) => ({ ...current, nomorAnggota: '' }));
                      }}
                      aria-invalid={!!errors.nomorAnggota}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.nomorAnggota ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="Nomor anggota"
                    />
                    {errors.nomorAnggota ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.nomorAnggota}</p> : null}
                  </div>
                </div>
              )}

              {type === 'non-anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={(e) => {
                        handleChange('nama')(e);
                        if (errors.nama) setErrors((current) => ({ ...current, nama: '' }));
                      }}
                      aria-invalid={!!errors.nama}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.nama ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="Nama pengunjung"
                    />
                    {errors.nama ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.nama}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Jenis Kelamin</label>
                    <select
                      required
                      value={form.jenisKelamin || ''}
                      onChange={(e) => {
                        handleChange('jenisKelamin')(e);
                        if (errors.jenisKelamin) setErrors((current) => ({ ...current, jenisKelamin: '' }));
                      }}
                      aria-invalid={!!errors.jenisKelamin}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-emerald-500 ${
                        errors.jenisKelamin ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {errors.jenisKelamin ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.jenisKelamin}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Umur</label>
                    <input
                      required
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={form.umur || ''}
                      onChange={(e) => {
                        handleChange('umur')(e);
                        if (errors.umur) setErrors((current) => ({ ...current, umur: '' }));
                      }}
                      aria-invalid={!!errors.umur}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.umur ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="0"
                    />
                    {errors.umur ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.umur}</p> : null}
                  </div>
                </div>
              )}

              {type === 'rombongan' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Asal Sekolah / Institusi</label>
                    <input
                      required
                      value={form.asalSekolah || ''}
                      onChange={(e) => {
                        handleChange('asalSekolah')(e);
                        if (errors.asalSekolah) setErrors((current) => ({ ...current, asalSekolah: '' }));
                      }}
                      aria-invalid={!!errors.asalSekolah}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.asalSekolah ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="Nama sekolah atau institusi"
                    />
                    {errors.asalSekolah ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.asalSekolah}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Penanggungjawab</label>
                    <input
                      required
                      value={form.penanggungjawab || ''}
                      onChange={(e) => {
                        handleChange('penanggungjawab')(e);
                        if (errors.penanggungjawab) setErrors((current) => ({ ...current, penanggungjawab: '' }));
                      }}
                      aria-invalid={!!errors.penanggungjawab}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.penanggungjawab ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="Nama penanggungjawab"
                    />
                    {errors.penanggungjawab ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.penanggungjawab}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Nomor Telp / WA</label>
                    <input
                      required
                      value={form.kontak || ''}
                      onChange={(e) => {
                        handleChange('kontak')(e);
                        if (errors.kontak) setErrors((current) => ({ ...current, kontak: '' }));
                      }}
                      aria-invalid={!!errors.kontak}
                      className={`w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                        errors.kontak ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      placeholder="08xxxxxxxxxx"
                    />
                    {errors.kontak ? <p className="mt-1 text-xs text-red-600 font-medium">{errors.kontak}</p> : null}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-900 to-emerald-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/25 transition-all mt-4 hover:shadow-lg"
              >
                Isi Buku Tamu
              </button>
            </form>
          </div>
        </div>
      </main>

      <PopupBerhasil
        isOpen={showSuccess}
        message="Berhasil mengisi dan tunjukkan ini pada perpustakaan."
        buttonText="Kembali"
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
