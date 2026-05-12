import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Verifikasi() {
  const navigate = useNavigate();
  const [pendingUser, setPendingUser] = useState(null);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('pendingUser');
    if (!data) {
      const timer = setTimeout(() => {
        navigate('/daftar');
      }, 2000);
      return () => clearTimeout(timer);
    }
    setPendingUser(JSON.parse(data));
  }, [navigate]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value.substring(value.length - 1);
    setVerificationCode(newCode);

    // Auto focus next
    if (value && index < 7) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join('');
    if (code.length < 8) {
      setVerificationError('Harap masukkan 8 digit kode');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    // Simulasi verifikasi (Kode statis: 00000000 atau 12345678)
    setTimeout(() => {
      if (code === '00000000' || code === '12345678') {
        // Berhasil! Simpan ke daftar anggota terdaftar
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const newUser = { 
          ...pendingUser, 
          status: 'Aktif',
          memberNumber: pendingUser.memberId // Gunakan memberId sebagai nomor anggota login
        };
        
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.removeItem('pendingUser'); // Hapus data pending
        
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setVerificationError('Kode verifikasi salah. Silakan periksa kembali WhatsApp Anda.');
        setIsVerifying(false);
      }
    }, 1500);
  };

  if (!pendingUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Memuat data pendaftaran...</p>
          <p className="text-slate-400 text-sm mt-2">Jika tidak diarahkan, silakan kembali ke halaman pendaftaran.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl w-full max-w-lg p-10 shadow-lg border border-gray-100">
          <button 
            onClick={() => navigate('/daftar')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Pendaftaran
          </button>

          {showSuccess ? (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-8 shadow-inner">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Verifikasi Berhasil!</h2>
              <p className="text-gray-500 mb-6">
                Selamat <span className="font-bold text-gray-800">{pendingUser.name}</span>, akun anggota Anda telah aktif.
              </p>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                <p className="text-sm text-slate-500 mb-1">Nomor Anggota Anda:</p>
                <p className="text-2xl font-mono font-bold text-blue-600 tracking-widest">{pendingUser.memberId}</p>
              </div>
              <p className="text-sm text-slate-400">Mengalihkan ke halaman login dalam beberapa saat...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 mb-6">
                  <Phone size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Verifikasi Akun</h2>
                <p className="text-gray-500">
                  Masukkan 8 digit kode yang dikirimkan petugas ke WhatsApp <span className="font-bold text-gray-800">{pendingUser.phone}</span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 mb-10">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength="1"
                      value={verificationCode[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-sm"
                    />
                  ))}
                  <div className="flex items-center text-slate-300 font-bold text-2xl">-</div>
                  {[4, 5, 6, 7].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength="1"
                      value={verificationCode[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-sm"
                    />
                  ))}
                </div>

                {verificationError && (
                  <div className="flex items-center gap-2 text-rose-600 text-sm font-medium justify-center bg-rose-50 px-4 py-3 rounded-xl w-full">
                    <XCircle size={18} />
                    {verificationError}
                  </div>
                )}
              </div>

              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 ${
                  isVerifying ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isVerifying ? 'Sedang Memverifikasi...' : 'Verifikasi Akun'}
              </button>
              
              <div className="mt-8 text-center pt-6 border-t border-slate-50">
                <p className="text-sm text-slate-400">
                  Belum menerima kode? <button className="text-blue-600 font-bold hover:underline">Kirim Ulang</button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
