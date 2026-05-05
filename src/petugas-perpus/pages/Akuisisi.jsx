import { ArrowRightCircle, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PetugasLayout from '../components/PetugasLayout';
import { akuisisiSubmenus } from '../akuisisiSubmenus';

export default function Akuisisi() {
  const navigate = useNavigate();

  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Modul Akuisisi</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">Akuisisi Koleksi</h1>
            <p className="mt-3 max-w-4xl text-sm text-blue-100 sm:text-base">
              Submenu akuisisi ditampilkan langsung di sidebar. Pilih salah satu submenu untuk membuka halaman kerja masing-masing.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Usulan Baru</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
              <p className="mt-1 text-sm text-slate-600">Menunggu verifikasi</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Diproses</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
              <p className="mt-1 text-sm text-slate-600">Sedang dilengkapi data</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selesai</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">26</p>
              <p className="mt-1 text-sm text-slate-600">Siap lanjut katalog</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perlu Tindak Lanjut</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
              <p className="mt-1 text-sm text-slate-600">Karantina/perbaikan data</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <ClipboardList size={20} className="text-blue-700" />
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Akses Submenu di Sidebar</h2>
          </div>
          <p className="text-sm text-slate-600">
            Semua submenu Akuisisi sudah dipindahkan ke sidebar kiri. Klik salah satu submenu untuk masuk ke halaman kerja terkait.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {akuisisiSubmenus.slice(0, 6).map((submenu) => (
              <button
                key={submenu.id}
                type="button"
                onClick={() => navigate(submenu.to, { state: { activeMenu: submenu.id } })}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-800">{submenu.label}</span>
                <ArrowRightCircle size={18} className="text-blue-600" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}
