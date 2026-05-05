import { ClipboardList, FilePlus2 } from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

export default function AkuisisiSubmenuPage({ menu }) {
  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Submenu Akuisisi</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">{menu.label}</h1>
            <p className="mt-3 max-w-4xl text-sm text-blue-100 sm:text-base">{menu.description}</p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Data Aktif</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">54</p>
              <p className="mt-1 text-sm text-slate-600">Tercatat di sistem</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Butuh Verifikasi</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
              <p className="mt-1 text-sm text-slate-600">Perlu pengecekan petugas</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selesai Hari Ini</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
              <p className="mt-1 text-sm text-slate-600">Diproses pada shift ini</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tertunda</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
              <p className="mt-1 text-sm text-slate-600">Menunggu tindak lanjut</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Daftar Data</h2>
              <p className="text-sm text-slate-600">Halaman ini siap dipakai untuk implementasi data dinamis berikutnya.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FilePlus2 size={16} />
              Tambah Data
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">No</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">Nama Data</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">Keterangan</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((row) => (
                  <tr key={row} className="hover:bg-slate-50">
                    <td className="border-b border-slate-100 px-4 py-3 text-slate-600">{row}</td>
                    <td className="border-b border-slate-100 px-4 py-3 font-medium text-slate-900">Contoh data {row}</td>
                    <td className="border-b border-slate-100 px-4 py-3 text-slate-600">Contoh isi untuk {menu.label.toLowerCase()}</td>
                    <td className="border-b border-slate-100 px-4 py-3">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Aktif
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        <ClipboardList size={14} />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}
