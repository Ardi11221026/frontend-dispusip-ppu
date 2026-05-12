import { Trash2, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import AnggotaLayout from '../components/AnggotaLayout';

const initialCart = [
  {
    id: 1,
    title: "Tentang Kamu",
    author: "Tere Liye",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    category: "Fiksi",
    status: "Tersedia",
  },
  {
    id: 2,
    title: "Dikta & Hukum",
    author: "DHIA'AN FARAH",
    cover: "https://images.unsplash.com/photo-1543004629-ff569f872783?auto=format&fit=crop&q=80&w=400",
    category: "Romance",
    status: "Tersedia",
  }
];

export default function KeranjangPinjam() {
  const [cart, setCart] = useState(initialCart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleBooking = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setCart([]);
    }, 1500);
  };

  return (
    <AnggotaLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Keranjang Pinjam</h1>

        {showSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900">Booking Berhasil!</h2>
            <p className="text-emerald-800 mt-2 max-w-md mx-auto">
              Permintaan peminjaman Anda telah dikirim ke petugas. Silakan datang ke meja perpustakaan untuk verifikasi fisik buku.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
            >
              Lihat Riwayat
            </button>
          </div>
        ) : cart.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 shadow-sm">
                  <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                    <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.author}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <span className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle size={14} />
                      <span className="text-xs font-semibold">Tersedia untuk dipinjam</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Ringkasan Pinjaman</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Jumlah Buku</span>
                    <span className="font-bold text-slate-900">{cart.length} Judul</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Durasi Pinjam</span>
                    <span className="font-bold text-slate-900">7 Hari</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-bold">
                    <span className="text-slate-900">Total Eksemplar</span>
                    <span className="text-blue-600">{cart.length}</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-6">
                  <div className="flex gap-2 text-amber-800">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p className="text-xs font-medium">
                      Status buku akan berubah menjadi "Booking" dan stok akan dikunci untuk Anda selama 24 jam.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={isProcessing}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'Memproses...' : (
                    <>
                      <BookOpen size={20} />
                      Konfirmasi Booking
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
                  Dengan mengklik tombol di atas, Anda setuju dengan peraturan peminjaman Perpustakaan PPU.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
            <div className="mx-auto h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <BookOpen size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Keranjang Kosong</h2>
            <p className="text-slate-500 mt-2">Anda belum memilih buku untuk dipinjam.</p>
            <button 
              className="mt-6 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition-all"
              onClick={() => window.location.href = '/anggota/opac'}
            >
              Cari Buku Sekarang
            </button>
          </div>
        )}
      </div>
    </AnggotaLayout>
  );
}
