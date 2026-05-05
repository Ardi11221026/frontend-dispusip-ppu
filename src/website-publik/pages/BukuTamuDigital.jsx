import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!showSuccess) return undefined;

    const timer = window.setTimeout(() => {
      setShowSuccess(false);
      resetForm();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [showSuccess]);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-teal-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.28),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(6,78,59,0.9))]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <main className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-10 lg:px-6">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-blue-900 via-teal-800 to-emerald-700 px-5 py-8 text-white sm:px-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-amber-300 bg-white shadow-lg">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-2" />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100/90">Perpustakaan Digital</p>
              <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">Buku Tamu Digital</h1>
              <p className="mt-2 text-center text-sm leading-6 text-blue-100 sm:text-[15px]">
                Pilih tipe pengunjung lalu isi formulir sesuai ketentuan.
              </p>
            </div>

            <div className="space-y-5 px-5 py-6 sm:px-6">
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tipe Pengunjung</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setForm({});
                    setErrors({});
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                >
                  <option value="non-anggota">Non-Anggota</option>
                  <option value="anggota">Anggota</option>
                  <option value="rombongan">Rombongan</option>
                </select>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {type === 'anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={(e) => {
                        handleChange('nama')(e);
                        if (errors.nama) setErrors((current) => ({ ...current, nama: '' }));
                      }}
                      aria-invalid={!!errors.nama}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="Nama lengkap"
                    />
                    {errors.nama ? <p className="mt-1 text-xs text-red-600">{errors.nama}</p> : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nomor Anggota</label>
                    <input
                      required
                      value={form.nomorAnggota || ''}
                      onChange={(e) => {
                        handleChange('nomorAnggota')(e);
                        if (errors.nomorAnggota) setErrors((current) => ({ ...current, nomorAnggota: '' }));
                      }}
                      aria-invalid={!!errors.nomorAnggota}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="Nomor anggota"
                    />
                    {errors.nomorAnggota ? <p className="mt-1 text-xs text-red-600">{errors.nomorAnggota}</p> : null}
                  </div>
                </div>
              )}

              {type === 'non-anggota' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={(e) => {
                        handleChange('nama')(e);
                        if (errors.nama) setErrors((current) => ({ ...current, nama: '' }));
                      }}
                      aria-invalid={!!errors.nama}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="Nama pengunjung"
                    />
                    {errors.nama ? <p className="mt-1 text-xs text-red-600">{errors.nama}</p> : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jenis Kelamin</label>
                    <select
                      required
                      value={form.jenisKelamin || ''}
                      onChange={(e) => {
                        handleChange('jenisKelamin')(e);
                        if (errors.jenisKelamin) setErrors((current) => ({ ...current, jenisKelamin: '' }));
                      }}
                      aria-invalid={!!errors.jenisKelamin}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {errors.jenisKelamin ? <p className="mt-1 text-xs text-red-600">{errors.jenisKelamin}</p> : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Umur</label>
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="0"
                    />
                    {errors.umur ? <p className="mt-1 text-xs text-red-600">{errors.umur}</p> : null}
                  </div>
                </div>
              )}

              {type === 'rombongan' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Asal Sekolah / Institusi</label>
                    <input
                      required
                      value={form.asalSekolah || ''}
                      onChange={(e) => {
                        handleChange('asalSekolah')(e);
                        if (errors.asalSekolah) setErrors((current) => ({ ...current, asalSekolah: '' }));
                      }}
                      aria-invalid={!!errors.asalSekolah}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="Nama sekolah atau institusi"
                    />
                    {errors.asalSekolah ? <p className="mt-1 text-xs text-red-600">{errors.asalSekolah}</p> : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Penanggungjawab</label>
                    <input
                      required
                      value={form.penanggungjawab || ''}
                      onChange={(e) => {
                        handleChange('penanggungjawab')(e);
                        if (errors.penanggungjawab) setErrors((current) => ({ ...current, penanggungjawab: '' }));
                      }}
                      aria-invalid={!!errors.penanggungjawab}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="Nama penanggungjawab"
                    />
                    {errors.penanggungjawab ? <p className="mt-1 text-xs text-red-600">{errors.penanggungjawab}</p> : null}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nomor Telp / WA</label>
                    <input
                      required
                      value={form.kontak || ''}
                      onChange={(e) => {
                        handleChange('kontak')(e);
                        if (errors.kontak) setErrors((current) => ({ ...current, kontak: '' }));
                      }}
                      aria-invalid={!!errors.kontak}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="08xxxxxxxxxx"
                    />
                    {errors.kontak ? <p className="mt-1 text-xs text-red-600">{errors.kontak}</p> : null}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-teal-800 to-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600"
              >
                Isi Buku Tamu
              </button>
              </form>
            </div>
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
