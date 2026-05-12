import { Clock, RefreshCw, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import AnggotaLayout from '../components/AnggotaLayout';

const initialLoans = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    borrowDate: "05 Mei 2024",
    dueDate: "12 Mei 2024",
    status: "Dipinjam",
    canExtend: true,
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    borrowDate: "10 Mei 2024",
    dueDate: "17 Mei 2024",
    status: "Dipinjam",
    canExtend: true,
  },
  {
    id: 3,
    title: "Tentang Kamu",
    author: "Tere Liye",
    borrowDate: "11 Mei 2024",
    dueDate: "18 Mei 2024",
    status: "Booking",
    canExtend: false,
  }
];

const historyData = [
  { id: 4, title: "Dikta & Hukum", author: "DHIA'AN FARAH", returnDate: "01 Mei 2024", status: "Dikembalikan" },
  { id: 5, title: "Romankasa", author: "Killmill", returnDate: "20 April 2024", status: "Dikembalikan" },
  { id: 6, title: "Sebuah Seni untuk Bersikap Bodo Amat", author: "Mark Manson", returnDate: "15 April 2024", status: "Terlambat Kembali" },
];

export default function RiwayatPinjam() {
  const [loans, setLoans] = useState(initialLoans);
  const [activeTab, setActiveTab] = useState('aktif');

  const handleExtend = (id) => {
    setLoans(loans.map(loan => {
      if (loan.id === id) {
        alert(`Peminjaman "${loan.title}" telah diperpanjang selama 7 hari.`);
        return { ...loan, dueDate: "19 Mei 2024", canExtend: false };
      }
      return loan;
    }));
  };

  return (
    <AnggotaLayout>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Peminjaman Saya</h1>
          
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('aktif')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'aktif' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sedang Dipinjam
            </button>
            <button 
              onClick={() => setActiveTab('riwayat')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'riwayat' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Riwayat Selesai
            </button>
          </div>
        </div>

        {activeTab === 'aktif' ? (
          <div className="space-y-4">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <div key={loan.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-200 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-5">
                      <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                        <BookOpen size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">{loan.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            loan.status === 'Dipinjam' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {loan.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{loan.author}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-12">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Tanggal Pinjam</p>
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-sm font-semibold">{loan.borrowDate}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Jatuh Tempo</p>
                        <div className="flex items-center gap-1.5 text-blue-600">
                          <Clock size={14} />
                          <span className="text-sm font-bold">{loan.dueDate}</span>
                        </div>
                      </div>
                      <div className="flex-1 md:flex-none">
                        {loan.status === 'Dipinjam' && (
                          <button 
                            disabled={!loan.canExtend}
                            onClick={() => handleExtend(loan.id)}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                              loan.canExtend 
                                ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-lg shadow-slate-100' 
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            }`}
                          >
                            <RefreshCw size={16} className={loan.canExtend ? 'animate-spin-slow' : ''} />
                            Perpanjang
                          </button>
                        )}
                        {loan.status === 'Booking' && (
                          <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold border border-amber-100 flex items-center gap-2">
                            <AlertCircle size={14} />
                            Menunggu Verifikasi Petugas
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-500">Tidak ada peminjaman aktif.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Judul Buku</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal Kembali</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {historyData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.author}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Dikembalikan' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {item.status === 'Dikembalikan' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{item.returnDate}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 font-bold text-sm hover:underline">Pinjam Lagi</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-2xl p-5 border border-blue-100">
           <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
              <AlertCircle size={18} />
              Kebijakan Peminjaman
           </h4>
           <ul className="text-sm text-blue-800 space-y-1.5 ml-7 list-disc">
              <li>Maksimal buku yang dibawa adalah 3 eksemplar.</li>
              <li>Maksimal durasi peminjaman adalah 7 hari.</li>
              <li>Perpanjangan hanya dapat dilakukan 1 kali (tambahan 7 hari).</li>
              <li>Keterlambatan akan dicatat pada reputasi anggota.</li>
           </ul>
        </div>
      </div>
    </AnggotaLayout>
  );
}
