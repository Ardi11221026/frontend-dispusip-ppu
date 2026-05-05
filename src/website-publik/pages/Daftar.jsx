import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Daftar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', address: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => /.+@.+\..+/.test(value);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(formData.email.trim())) {
      nextErrors.email = 'Format email tidak valid';
    }
    if (!formData.phone.trim()) nextErrors.phone = 'No. Telp / WhatsApp wajib diisi';
    if (!formData.password.trim()) nextErrors.password = 'Password wajib diisi';
    if (!formData.address.trim()) nextErrors.address = 'Alamat lengkap wajib diisi';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
      <Header />
      
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
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, name: e.target.value }));
                    if (errors.name) setErrors((current) => ({ ...current, name: '' }));
                  }}
                  aria-invalid={!!errors.name}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, email: e.target.value }));
                    if (errors.email) setErrors((current) => ({ ...current, email: '' }));
                  }}
                  aria-invalid={!!errors.email}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">No. Telp / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="tel" 
                  placeholder="08xxxxxx" 
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, phone: e.target.value }));
                    if (errors.phone) setErrors((current) => ({ ...current, phone: '' }));
                  }}
                  aria-invalid={!!errors.phone}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
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

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Alamat Lengkap</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea 
                  rows="3" 
                  placeholder="Masukkan alamat lengkap" 
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((current) => ({ ...current, address: e.target.value }));
                    if (errors.address) setErrors((current) => ({ ...current, address: '' }));
                  }}
                  aria-invalid={!!errors.address}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>
              {errors.address ? <p className="mt-1 text-xs text-red-600">{errors.address}</p> : null}
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
