import { User, QrCode, Download, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import AnggotaLayout from '../components/AnggotaLayout';

export default function ProfilAnggota() {
  const memberData = {
    name: localStorage.getItem('userName') || 'Ardi Kusuma',
    email: localStorage.getItem('userEmail') || 'ardi.kusuma@email.com',
    memberId: localStorage.getItem('memberId') || 'PPU-2024-0812',
    joinDate: '12 Mei 2024',
    phone: '0812-3456-7890',
    address: 'Jl. Penajam No. 45, Penajam Paser Utara, Kalimantan Timur',
    status: 'Aktif'
  };

  return (
    <AnggotaLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-slate-900">Profil & Kartu Anggota</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Kartu Anggota Digital */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={20} />
              Kartu Anggota Digital
            </h3>
            
            <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-6 text-white shadow-2xl shadow-blue-200">
              {/* Background patterns */}
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-400 opacity-10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-400 opacity-10 blur-3xl" />
              
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/20">
                      <img src="/logo/Logo%20Perpusnas.png" alt="Logo" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">Perpustakaan Umum</h4>
                      <p className="text-[10px] font-medium text-blue-300">Kab. Penajam Paser Utara</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm border border-emerald-500/30">
                    {memberData.status}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 font-bold mb-1">Nama Anggota</p>
                    <h2 className="text-xl font-bold sm:text-2xl">{memberData.name}</h2>
                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 font-bold mb-1">ID Anggota</p>
                      <p className="font-mono text-lg font-bold tracking-wider">{memberData.memberId}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded-xl shadow-lg">
                    <QrCode size={64} className="text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white border-2 border-slate-200 py-3 font-bold text-slate-700 transition hover:bg-slate-50">
              <Download size={18} />
              Unduh Kartu (PNG)
            </button>
          </section>

          {/* Detail Informasi */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Detail Akun</h3>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</p>
                  <p className="font-semibold text-slate-900">{memberData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Email</p>
                  <p className="font-semibold text-slate-900">{memberData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nomor WhatsApp</p>
                  <p className="font-semibold text-slate-900">{memberData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat</p>
                  <p className="font-semibold text-slate-900 leading-relaxed">{memberData.address}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AnggotaLayout>
  );
}
