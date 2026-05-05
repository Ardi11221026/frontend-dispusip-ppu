import PetugasLayout from '../components/PetugasLayout';

export default function Katalog() {
  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Modul Katalog</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">Katalog Koleksi</h1>
            <p className="mt-3 max-w-4xl text-sm text-blue-100 sm:text-base">
              Submenu katalog ditampilkan langsung di sidebar. Pilih salah satu submenu untuk membuka halaman kerja masing-masing.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Entri</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">10.935</p>
              <p className="mt-1 text-sm text-slate-600">Data bibliografi aktif</p>
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
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Catatan Katalog</h2>
            <p className="mt-3 text-sm text-slate-700">
              Halaman ini berfungsi sebagai pusat perapihan metadata. Setiap perubahan di sini akan memengaruhi hasil pencarian di layanan OPAC dan modul lainnya.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>Perbarui judul, pengarang, dan subjek secara konsisten.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>Jaga format metadata agar selaras dengan standar perpustakaan.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>Gunakan penelusuran cepat untuk koreksi data ganda.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>Sinkronkan katalog dengan koleksi fisik dan digital.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}