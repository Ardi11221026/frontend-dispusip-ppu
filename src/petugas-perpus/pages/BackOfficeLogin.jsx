import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function BackOfficeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!email.trim()) nextErrors.email = 'Email wajib diisi';
    if (!password.trim()) nextErrors.password = 'Password wajib diisi';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setLoading(true);

    try {
      if (!validateForm()) {
        return;
      }

      const emailValue = email.trim().toLowerCase();
      const passValue = password.trim();

      // Check Admin (Hardcoded for demo)
      if (emailValue === 'admin@perpus.id' && passValue === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', emailValue);
        localStorage.setItem('userName', 'Administrator');
        navigate('/admin/home');
        return;
      }

      // Check Petugas (from localStorage)
      const savedItems = JSON.parse(localStorage.getItem('adminPetugasItems') || '[]');
      const matchedItem = savedItems.find((item) => {
        const itemEmail = (item.email || '').trim().toLowerCase();
        const itemPassword = (item.password || '').trim();
        const itemStatus = (item.status || 'Aktif').trim();
        return itemEmail === emailValue && itemPassword === passValue && itemStatus === 'Aktif';
      });

      if (matchedItem) {
        localStorage.setItem('userRole', 'petugas');
        localStorage.setItem('userEmail', emailValue);
        localStorage.setItem('userName', matchedItem.name || emailValue);
        navigate('/back-office/beranda');
      } else {
        setSubmitError('Email atau password tidak cocok, atau akun belum aktif');
      }
    } catch (err) {
      setSubmitError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-emerald-700 px-6 py-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white ring-2 ring-amber-300 overflow-hidden">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-2" />
              </div>
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-wide">Back Office</h1>
            <p className="text-blue-100 mt-1 font-medium">Dinas Perpustakaan dan Arsip</p>
            <p className="text-xs text-amber-300 mt-1 uppercase tracking-widest font-semibold opacity-80">Kabupaten Penajam Paser Utara</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email / Username</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((current) => ({ ...current, email: '' }));
                    }}
                    placeholder="nama@perpustakaan.id"
                    aria-invalid={!!errors.email}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-slate-50"
                  />
                </div>
                {errors.email ? <p className="mt-1 text-xs text-red-600 ml-1">{errors.email}</p> : null}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((current) => ({ ...current, password: '' }));
                    }}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className="w-full pl-11 pr-11 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password ? <p className="mt-1 text-xs text-red-600 ml-1">{errors.password}</p> : null}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-900 to-emerald-700 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-emerald-900/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 mt-6 shadow-lg"
              >
                {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Sistem Informasi Manajemen Perpustakaan
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="shrink-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-white text-xs w-56">
            <p className="font-bold mb-2 text-amber-300">ADMINISTRATOR:</p>
            <p className="opacity-80">Email: admin@perpus.id</p>
            <p className="opacity-80">Pass: admin123</p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-white text-xs w-56">
            <p className="font-bold mb-2 text-sky-300">PETUGAS PERPUS:</p>
            <p className="opacity-80">Email: petugas@perpus.id</p>
            <p className="opacity-80">Pass: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
