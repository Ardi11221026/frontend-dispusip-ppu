import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
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

    // Simulasi login admin (dalam produksi akan memanggil API)
    try {
      if (!validateForm()) {
        return;
      }

      if (email && password) {
        // Simpan ke localStorage dengan role admin
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        navigate('/admin/home');
      } else {
        setSubmitError('Email dan password harus diisi');
      }
    } catch {
      setSubmitError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-emerald-800 to-teal-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-emerald-700 px-6 py-10 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white ring-2 ring-amber-300 overflow-hidden">
                <img src="/logo/Logo%20Perpusnas.png" alt="Logo Perpusnas" className="h-full w-full object-contain p-2" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Admin Portal</h1>
            <p className="text-blue-100 text-center mt-2">Dinas Perpustakaan dan Arsip</p>
            <p className="text-yellow-200 text-center mt-2 text-sm font-semibold">Kabupaten Penajam Paser Utara</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((current) => ({ ...current, email: '' }));
                    }}
                    placeholder="admin@perpustakaan.id"
                    aria-invalid={!!errors.email}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  />
                </div>
                {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((current) => ({ ...current, password: '' }));
                    }}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-900 to-emerald-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-300 disabled:opacity-70 mt-6"
              >
                {loading ? 'Loading...' : 'Login sebagai Admin'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Hubungi administrator jika lupa password
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 text-white text-sm">
          <p className="font-semibold mb-2">Demo Login Admin:</p>
          <p>Email: admin@perpus.id</p>
          <p>Password: admin123</p>
          <p className="mt-3 text-xs text-yellow-200 font-semibold">Hanya untuk Administrator Website</p>
        </div>
      </div>
    </div>
  );
}
