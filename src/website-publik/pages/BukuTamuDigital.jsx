import { useEffect, useState } from 'react';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

export default function BukuTamuDigital() {
  const [type, setType] = useState('non-anggota');
  const [form, setForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.28),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(6,78,59,0.9))]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <main className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-10 lg:px-6">
        <div className="w-full max-w-xl">
          <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8">
            <div className="mb-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/90">Perpustakaan Digital</p>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Buku Tamu Digital</h1>
              <p className="text-sm leading-6 text-slate-100/80 sm:text-[15px]">
                Pilih tipe pengunjung lalu isi formulir sesuai ketentuan. Tampilan ini dibuat nyaman untuk layar kecil.
              </p>
            </div>

            <div className="mb-5 rounded-2xl border border-white/10 bg-slate-950/25 p-3 sm:p-4">
              <label className="mb-2 block text-sm font-medium text-slate-100">Tipe Pengunjung</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setForm({});
                }}
                className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
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
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={handleChange('nama')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Nomor Anggota</label>
                    <input
                      required
                      value={form.nomorAnggota || ''}
                      onChange={handleChange('nomorAnggota')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="Nomor anggota"
                    />
                  </div>
                </div>
              )}

              {type === 'non-anggota' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Nama</label>
                    <input
                      required
                      value={form.nama || ''}
                      onChange={handleChange('nama')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="Nama pengunjung"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Jenis Kelamin</label>
                    <select
                      required
                      value={form.jenisKelamin || ''}
                      onChange={handleChange('jenisKelamin')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Umur</label>
                    <input
                      required
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={form.umur || ''}
                      onChange={handleChange('umur')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}

              {type === 'rombongan' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Asal Sekolah / Institusi</label>
                    <input
                      required
                      value={form.asalSekolah || ''}
                      onChange={handleChange('asalSekolah')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="Nama sekolah atau institusi"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Penanggungjawab</label>
                    <input
                      required
                      value={form.penanggungjawab || ''}
                      onChange={handleChange('penanggungjawab')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="Nama penanggungjawab"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-100">Nomor Telp / WA</label>
                    <input
                      required
                      value={form.kontak || ''}
                      onChange={handleChange('kontak')}
                      className="w-full rounded-xl border border-white/15 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:from-emerald-400 hover:to-cyan-400"
                >
                  Isi Buku Tamu
                </button>
              </div>
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
