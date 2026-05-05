import { BookOpen, LibraryBig, MoreHorizontal, Users, FileText } from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

const summaryCards = [
  {
    label: 'Judul',
    value: '10,935',
    icon: BookOpen,
    color: 'from-red-700 to-red-600',
  },
  {
    label: 'Konten Digital',
    value: '0',
    icon: FileText,
    color: 'from-emerald-700 to-emerald-600',
  },
  {
    label: 'Eksemplar',
    value: '29,154',
    icon: LibraryBig,
    color: 'from-amber-600 to-amber-500',
  },
  {
    label: 'Anggota',
    value: '1,606',
    icon: Users,
    color: 'from-sky-500 to-blue-400',
  },
];

const visitComposition = [
  { label: 'Anggota', value: 10733, color: '#88a9dc' },
  { label: 'Non Anggota', value: 2380, color: '#47474f' },
];

const totalVisits = visitComposition.reduce((sum, item) => sum + item.value, 0);

export default function Beranda() {
  const firstSliceDeg = (visitComposition[0].value / totalVisits) * 360;

  return (
    <PetugasLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Dashboard Perpustakaan</h1>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Ringkasan data operasional koleksi dan kunjungan. Tampilan disusun mengikuti kebutuhan dashboard kerja petugas, bukan tampilan INLISLite.
            </div>
            <h2 className="text-lg text-slate-700 sm:text-2xl">
              Jenis Perpustakaan : <span className="font-semibold text-slate-900">Perpustakaan Umum</span>
            </h2>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-4 text-white shadow-md`}
                >
                  <div className="absolute right-3 top-3 opacity-20">
                    <Icon size={76} />
                  </div>
                  <p className="relative z-10 text-4xl font-extrabold leading-none tracking-tight">{card.value}</p>
                  <p className="relative z-10 mt-2 text-base font-semibold">{card.label}</p>
                  <p className="relative z-10 mt-5 text-xs font-semibold">Detail ↗</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-medium text-slate-700">Data Kunjungan</h3>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
              aria-label="Opsi"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="relative">
                <div
                  className="h-[260px] w-[260px] rounded-full shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:h-[320px] sm:w-[320px]"
                  style={{
                    background: `conic-gradient(${visitComposition[0].color} 0 ${firstSliceDeg.toFixed(
                      1
                    )}deg, ${visitComposition[1].color} ${firstSliceDeg.toFixed(1)}deg 360deg)`,
                  }}
                >
                  <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white sm:h-14 sm:w-14" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {visitComposition.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-sm font-semibold text-slate-800">
                      {item.label}: {item.value.toLocaleString('id-ID')} Orang
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {((item.value / totalVisits) * 100).toFixed(1)}% dari total kunjungan
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}