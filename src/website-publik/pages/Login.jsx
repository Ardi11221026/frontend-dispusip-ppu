import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ memberNumber: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.memberNumber.trim()) nextErrors.memberNumber = 'Nomor anggota wajib diisi';
    if (!formData.password.trim()) nextErrors.password = 'Password wajib diisi';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-lg border border-gray-100 p-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-8 mx-auto">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Login Anggota</h1>
          <p className="text-center text-gray-500 mb-10">Masuk untuk melanjutkan peminjaman buku</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nomor Anggota</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Masukkan No. Anggota" 
                  value={formData.memberNumber}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, memberNumber: e.target.value }));
                    if (errors.memberNumber) setErrors((current) => ({ ...current, memberNumber: '' }));
                  }}
                  aria-invalid={!!errors.memberNumber}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.memberNumber ? <p className="mt-1 text-xs text-red-600">{errors.memberNumber}</p> : null}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Lupa Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, password: e.target.value }));
                    if (errors.password) setErrors((current) => ({ ...current, password: '' }));
                  }}
                  aria-invalid={!!errors.password}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all mt-4"
            >
              Masuk Sekarang
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Belum punya akun anggota? {' '}
              <button 
                onClick={() => navigate('/daftar')}
                className="text-blue-600 font-bold hover:underline"
              >
                Daftar di sini
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
