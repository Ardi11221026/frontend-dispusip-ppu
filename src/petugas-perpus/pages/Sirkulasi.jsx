import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, BookOpen, User, Calendar } from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

const mockBookingRequests = [
  { id: 'TRX-001', memberId: 'A001', memberName: 'Budi Santoso', bookTitle: 'Laskar Pelangi', date: '12 Mei 2024', status: 'Booking' },
  { id: 'TRX-002', memberId: 'A045', memberName: 'Siti Aminah', bookTitle: 'Bumi Manusia', date: '12 Mei 2024', status: 'Booking' },
];

const mockActiveLoans = [
  { id: 'TRX-000', memberId: 'A012', memberName: 'Ardi Kusuma', bookTitle: 'Tentang Kamu', dueDate: '15 Mei 2024', status: 'Dipinjam' },
];

export default function Sirkulasi() {
  const [activeTab, setActiveTab] = useState('verifikasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState(mockBookingRequests);
  const [loans, setLoans] = useState(mockActiveLoans);

  const handleConfirmBorrow = (id) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      alert(`Peminjaman untuk ${booking.memberName} dikonfirmasi. Durasi 7 hari mulai dihitung.`);
      setBookings(bookings.filter(b => b.id !== id));
      // In real app, would add to loans
    }
  };

  const handleReturn = (id) => {
    const loan = loans.find(l => l.id === id);
    if (loan) {
      alert(`Buku "${loan.bookTitle}" telah dikembalikan. Stok bertambah +1.`);
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  return (
    <PetugasLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Manajemen Sirkulasi</h1>
              <p className="text-sm text-slate-500 mt-1">Proses verifikasi peminjaman dan pengembalian koleksi.</p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
              <button 
                onClick={() => setActiveTab('verifikasi')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'verifikasi' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Verifikasi Pinjam
              </button>
              <button 
                onClick={() => setActiveTab('pengembalian')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'pengembalian' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pengembalian
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan Nama Anggota atau ID Anggota..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Informasi Anggota</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Buku</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {activeTab === 'verifikasi' ? 'Tgl Booking' : 'Jatuh Tempo'}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'verifikasi' ? (
                  bookings.length > 0 ? bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {item.memberName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{item.memberName}</div>
                            <div className="text-xs text-slate-500">ID: {item.memberId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-slate-400" />
                          <span className="text-sm font-semibold text-slate-700">{item.bookTitle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar size={14} />
                          <span className="text-sm">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleConfirmBorrow(item.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <CheckCircle size={14} />
                            Konfirmasi Pinjam
                          </button>
                          <button className="bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 px-3 py-2 rounded-lg transition-all">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">Tidak ada antrian booking hari ini.</td>
                    </tr>
                  )
                ) : (
                  loans.length > 0 ? loans.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                            {item.memberName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{item.memberName}</div>
                            <div className="text-xs text-slate-500">ID: {item.memberId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-slate-400" />
                          <span className="text-sm font-semibold text-slate-700">{item.bookTitle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-rose-600">
                          <Clock size={14} />
                          <span className="text-sm font-bold">{item.dueDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleReturn(item.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                        >
                          Kembalikan Buku
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">Tidak ada peminjaman aktif.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stats for Sirkulasi */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Booking Aktif</p>
              <p className="text-2xl font-bold text-blue-950">{bookings.length}</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Buku Keluar</p>
              <p className="text-2xl font-bold text-amber-950">{loans.length}</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <RefreshCw size={24} className="animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Kembali Hari Ini</p>
              <p className="text-2xl font-bold text-emerald-950">12</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </PetugasLayout>
  );
}