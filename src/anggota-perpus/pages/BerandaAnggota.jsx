import { BookOpen, Clock, CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnggotaLayout from '../components/AnggotaLayout';

const statusCards = [
  {
    label: 'Buku Dipinjam',
    value: '2',
    icon: BookOpen,
    color: 'from-blue-600 to-blue-500',
    description: 'Buku yang sedang Anda bawa'
  },
  {
    label: 'Menunggu Verifikasi',
    value: '1',
    icon: Clock,
    color: 'from-amber-500 to-amber-400',
    description: 'Booking yang belum dikonfirmasi'
  },
  {
    label: 'Sudah Dikembalikan',
    value: '12',
    icon: CheckCircle,
    color: 'from-emerald-600 to-emerald-500',
    description: 'Total buku yang pernah dipinjam'
  },
  {
    label: 'Terlambat',
    value: '0',
    icon: AlertCircle,
    color: 'from-rose-600 to-rose-500',
    description: 'Segera kembalikan ke perpustakaan'
  },
];

export default function BerandaAnggota() {
  const navigate = useNavigate();
  return (
    <AnggotaLayout>
      <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-3xl bg-blue-900 p-8 text-white shadow-xl">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold md:text-4xl">Selamat Datang Kembali!</h1>
            <p className="mt-2 text-blue-100 max-w-2xl">
              Akses ribuan koleksi buku digital dan fisik dengan mudah. Cek status peminjaman Anda dan temukan bacaan menarik hari ini.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-xl bg-white px-6 py-2.5 font-bold text-blue-900 transition hover:bg-blue-50">
                Cari Buku Baru
              </button>
              <button className="rounded-xl bg-blue-800/50 px-6 py-2.5 font-bold text-white backdrop-blur-sm transition hover:bg-blue-800/70 border border-white/10">
                Lihat Riwayat
              </button>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-800 opacity-50 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-800 opacity-30 blur-3xl" />
        </section>

        {/* Urgent Notification (Due Date) */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex flex-col md:flex-row items-center gap-4 rounded-3xl bg-rose-50 p-6 border-2 border-rose-100 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-inner">
              <Clock size={28} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-rose-900">Segera Kembalikan Buku!</h4>
              <p className="text-sm text-rose-700 mt-1">
                Buku <span className="font-bold underline">"Laskar Pelangi"</span> akan jatuh tempo dalam <span className="font-bold">2 hari lagi</span> (15 Mei 2024). Hindari keterlambatan untuk menjaga reputasi peminjaman Anda.
              </p>
            </div>
            <button 
              onClick={() => navigate('/anggota/riwayat')}
              className="rounded-xl bg-rose-600 px-6 py-2.5 font-bold text-white transition hover:bg-rose-700 shadow-lg shadow-rose-200 shrink-0"
            >
              Cek Riwayat
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${card.color} p-3 text-white shadow-lg shadow-blue-200`}>
                  <Icon size={24} />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-500">{card.label}</h3>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Informasi Penting</h3>
              <div className="space-y-4">
                <div className="flex gap-4 rounded-2xl bg-amber-50 p-4 border border-amber-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Batas Peminjaman</h4>
                    <p className="text-sm text-amber-800 mt-1">
                      Anda dapat meminjam maksimal 3 buku sekaligus untuk durasi 7 hari.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl bg-blue-50 p-4 border border-blue-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Perpanjangan Mandiri</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Perpanjangan dapat dilakukan 1 kali maksimal 7 hari sebelum masa pinjam berakhir.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Rekomendasi Buku (Nomor 5) */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-slate-800">Rekomendasi Untukmu</h3>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Berdasarkan Minat</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Dikta & Hukum', author: 'DHIA\'AN FARAH', cover: 'https://images.unsplash.com/photo-1543004629-ff569f872783?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Romankasa', author: 'Killmill', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Tentang Kamu', author: 'Tere Liye', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Dunia Sophie', author: 'Jostein Gaarder', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400' },
                ].map((book, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-[2/3] rounded-xl overflow-hidden border border-slate-100 mb-2 shadow-sm transition group-hover:shadow-md">
                      <img src={book.cover} alt={book.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{book.title}</h4>
                    <p className="text-[10px] text-slate-500">{book.author}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Pinjaman Aktif</h3>
                  <button onClick={() => navigate('/anggota/riwayat')} className="text-sm font-semibold text-blue-600 hover:underline">Lihat Semua</button>
               </div>
               <div className="divide-y divide-slate-100">
                  {[
                    { title: 'Laskar Pelangi', author: 'Andrea Hirata', due: '15 Mei 2024', status: 'Dipinjam' },
                    { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', due: '20 Mei 2024', status: 'Booking' },
                  ].map((item, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-400">Jatuh Tempo</p>
                        <p className={`text-xs font-bold ${item.status === 'Booking' ? 'text-amber-500' : 'text-blue-600'}`}>
                          {item.due}
                        </p>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Preview Kartu Anggota (Nomor 1) */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-bold text-lg mb-1">Kartu Anggota</h3>
                 <p className="text-xs text-slate-400 mb-6">Gunakan untuk verifikasi fisik</p>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                       <QrCode size={24} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-0.5">Ardi Kusuma</p>
                       <p className="text-[10px] font-mono text-slate-300">ID: PPU-2024-0812</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => navigate('/anggota/profil')}
                  className="w-full py-2 bg-white text-slate-900 font-bold text-xs rounded-lg transition hover:bg-slate-100"
                 >
                   Buka Kartu Digital
                 </button>
               </div>
               <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
            </section>
          </div>
        </div>
      </div>
    </AnggotaLayout>
  );
}
