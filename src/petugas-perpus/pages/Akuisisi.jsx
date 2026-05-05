import {
  Archive,
  BookOpen,
  BookPlus,
  Boxes,
  ClipboardList,
  FileSpreadsheet,
  PackageCheck,
  ScrollText,
  Search,
  Send,
  ShieldAlert,
  Tags,
} from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

const acquisitionMenus = [
  {
    section: 'Pengaturan Akuisisi',
    description: 'Data referensi dasar sebelum proses pengadaan berjalan.',
    items: [
      { title: 'Daftar Nama Sumber Perolehan', subtitle: 'Kelola sumber pengadaan koleksi', icon: Tags, status: '54 data', type: 'Pengaturan' },
    ],
  },
  {
    section: 'Proses Akuisisi',
    description: 'Alur utama penerimaan, usulan, dan validasi koleksi.',
    items: [
      { title: 'Entri Koleksi', subtitle: 'Input metadata koleksi baru', icon: BookPlus, status: 'Aktif', type: 'Input' },
      { title: 'Entri Koleksi (RDA)', subtitle: 'Input koleksi sesuai standar RDA', icon: ScrollText, status: 'Aktif', type: 'Input' },
      { title: 'Daftar Koleksi', subtitle: 'Lihat daftar koleksi yang sudah diinput', icon: BookOpen, status: 'Siap', type: 'Daftar' },
      { title: 'Jilid Koleksi', subtitle: 'Pengelolaan data jilid koleksi', icon: Archive, status: 'Siap', type: 'Daftar' },
      { title: 'Kardeks Terbitan Berkala', subtitle: 'Monitoring serial/terbitan berkala', icon: ClipboardList, status: 'Siap', type: 'Daftar' },
      { title: 'Daftar Usulan Koleksi', subtitle: 'Rekap usulan koleksi dari anggota', icon: Boxes, status: '2 usulan', type: 'Daftar' },
      { title: 'Impor Data dari Excel', subtitle: 'Upload data koleksi massal', icon: FileSpreadsheet, status: 'Tersedia', type: 'Tools' },
      { title: 'Keranjang Koleksi', subtitle: 'Daftar koleksi yang sedang diproses', icon: PackageCheck, status: 'Kosong', type: 'Tools' },
      { title: 'Karantina Koleksi', subtitle: 'Validasi koleksi bermasalah', icon: ShieldAlert, status: 'Perlu cek', type: 'Tools' },
      { title: 'Pengiriman Koleksi', subtitle: 'Distribusi koleksi ke unit layanan', icon: Send, status: 'Aktif', type: 'Tools' },
    ],
  },
];

export default function Akuisisi() {
  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-700 px-5 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Modul Akuisisi</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-4xl">Akuisisi Koleksi</h1>
            <p className="mt-3 max-w-4xl text-sm text-blue-100 sm:text-base">
              Struktur fitur mengikuti alur kerja akuisisi perpustakaan, namun dengan tampilan modern portal petugas agar lebih ringan dipakai di desktop maupun mobile.
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
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Menu Akuisisi</h2>
              <p className="text-sm text-slate-600">Nama menu disusun sesuai kebutuhan operasional petugas.</p>
            </div>
            <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:w-[320px]">
              <Search size={16} className="text-slate-500" />
              <input
                type="text"
                value=""
                readOnly
                placeholder="Pencarian menu (sementara nonaktif)"
                className="w-full bg-transparent text-sm text-slate-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            {acquisitionMenus.map((group) => (
              <div key={group.section} className="space-y-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                  <h3 className="text-base font-bold text-blue-900 sm:text-lg">{group.section}</h3>
                  <p className="text-sm text-blue-800/80">{group.description}</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="hidden grid-cols-[56px_1.2fr_1.8fr_auto_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
                    <span>No</span>
                    <span>Nama Submenu</span>
                    <span>Keterangan</span>
                    <span>Tipe</span>
                    <span>Status</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:block lg:space-y-0 lg:p-0">
                    {group.items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md lg:rounded-none lg:border-0 lg:border-b lg:border-slate-100 lg:shadow-none lg:hover:translate-y-0 lg:hover:bg-slate-50"
                      >
                        <div className="hidden lg:grid lg:grid-cols-[56px_1.2fr_1.8fr_auto_auto] lg:items-center lg:gap-3">
                          <span className="text-sm font-semibold text-slate-500">{index + 1}</span>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-800">
                              <Icon size={18} />
                            </span>
                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                          </div>
                          <span className="text-sm text-slate-600">{item.subtitle}</span>
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            {item.type}
                          </span>
                          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            {item.status}
                          </span>
                        </div>

                        <div className="lg:hidden">
                          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-800">
                            <Icon size={20} />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 sm:text-base">{item.title}</h4>
                          <p className="mt-1 text-xs text-slate-600 sm:text-sm">{item.subtitle}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                              {item.type}
                            </span>
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}