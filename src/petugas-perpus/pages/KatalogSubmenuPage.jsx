import { FilePlus2 } from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

export default function KatalogSubmenuPage({ menu }) {
  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Submenu Katalog</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">{menu.label}</h1>
            <p className="mt-3 max-w-4xl text-sm text-blue-100 sm:text-base">{menu.description}</p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Data Aktif</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">10.935</p>
              <p className="mt-1 text-sm text-slate-600">Tercatat di sistem</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perlu Validasi</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">41</p>
              <p className="mt-1 text-sm text-slate-600">Butuh pengecekan ulang</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duplikasi</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">7</p>
              <p className="mt-1 text-sm text-slate-600">Perlu penggabungan data</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Terindeks</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">98%</p>
              <p className="mt-1 text-sm text-slate-600">Siap ditelusuri pengguna</p>
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
                  <th className="border-b border-slate-200 px-4 py-3 text-center font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="border-b border-slate-200 px-4 py-8 text-center text-slate-500">
                    Tidak ada data untuk ditampilkan.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}
