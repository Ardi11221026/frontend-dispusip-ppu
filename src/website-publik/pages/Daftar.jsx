import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Daftar() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}
      
      <div className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pendaftaran Anggota</h1>
            <p className="text-gray-500">Lengkapi data diri Anda untuk mendapatkan nomor anggota</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">No. Telp / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="tel" 
                  placeholder="08xxxxxx" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Alamat Lengkap</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea 
                  rows="3" 
                  placeholder="Masukkan alamat lengkap" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <p className="text-gray-500 text-sm">
              Sudah memiliki akun? {' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-600 font-bold hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
