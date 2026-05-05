import PetugasLayout from '../components/PetugasLayout';
import {
  BookOpen,
  CircleGauge,
  FileText,
  MoreHorizontal,
  Users,
  LibraryBig,
} from 'lucide-react';

const stats = [
  {
    label: 'Judul',
    value: '10,935',
    icon: BookOpen,
    accent: 'from-red-800 to-red-600',
  },
  {
    label: 'Konten Digital',
    value: '0',
    icon: FileText,
    accent: 'from-emerald-700 to-emerald-500',
  },
  {
    label: 'Eksemplar',
    value: '29,154',
    icon: LibraryBig,
    accent: 'from-amber-600 to-amber-400',
  },
  {
    label: 'Anggota',
    value: '1,606',
    icon: Users,
    accent: 'from-sky-500 to-sky-300',
  },
];

const visits = [
  { label: 'Anggota', value: 10733, color: '#8fb0e5' },
  { label: 'Non Anggota', value: 2380, color: '#4a4a50' },
];

const totalVisits = visits.reduce((sum, item) => sum + item.value, 0);

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${stat.accent} p-4 text-white shadow-md`}>
      <div className="absolute right-3 top-3 opacity-20">
        <Icon size={78} />
      </div>
      <div className="relative z-10">
        <p className="text-4xl font-extrabold leading-none tracking-tight">{stat.value}</p>
        <p className="mt-2 text-base font-medium">{stat.label}</p>
        <div className="mt-6 text-xs font-semibold opacity-90">Detail ↗</div>
      </div>
    </div>
  );
}

export default function Beranda() {
  const pieStyle = {
    background: `conic-gradient(${visits[0].color} 0 ${(
      (visits[0].value / totalVisits) * 360
    ).toFixed(1)}deg, ${visits[1].color} 0 360deg)`,
  };

  return (
    <PetugasLayout>
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-medium text-slate-800 sm:text-[30px]">INLISite v3</h1>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <span>🏠 Dashboard</span>
                  <span>›</span>
                  <span>INLISite v3</span>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm">
                Penggunaan aplikasi ini belum diregistrasikan. Klik di sini untuk informasi lebih lengkap
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h2 className="text-[22px] font-normal text-slate-700">
                Jenis Perpustakaan : <span className="font-medium text-slate-900">Perpustakaan Umum</span>
              </h2>
            </div>
          </div>

          <div className="px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center justify-center text-center">
                <h3 className="text-2xl font-medium text-slate-700">Data Kunjungan</h3>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto_320px] lg:items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="relative">
                      <div
                        className="h-[320px] w-[320px] rounded-full shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                        style={pieStyle}
                        aria-label="Diagram kunjungan"
                      >
                        <div className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-white shadow-inner" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-3 lg:order-2 lg:self-start lg:pt-2">
                  <button
                    type="button"
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100"
                    aria-label="Opsi data kunjungan"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="order-1 space-y-4 lg:order-3 lg:pt-8">
                  {visits.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="h-4 w-4 rounded-sm" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.label}: {item.value.toLocaleString('id-ID')} Orang
                        </p>
                        <p className="text-xs text-slate-500">
                          {((item.value / totalVisits) * 100).toFixed(1)}% dari total kunjungan
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                      <CircleGauge size={16} />
                      Ringkasan cepat
                    </div>
                    <p className="mt-2 text-sm text-blue-800">
                      Dashboard ini menampilkan ringkasan data utama seperti koleksi, anggota, dan komposisi kunjungan harian.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PetugasLayout>
  );
}