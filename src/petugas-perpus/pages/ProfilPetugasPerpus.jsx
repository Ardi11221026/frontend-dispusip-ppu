import { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, EyeOff, PencilLine, Upload, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PetugasLayout from '../components/PetugasLayout';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

const getMaskedText = (value, fallback = '••••••••') => {
  const text = (value || '').trim();
  if (!text) return fallback;
  return '•'.repeat(Math.max(8, Math.min(text.length, 18)));
};

export default function ProfilPetugasPerpus() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({ name: '', email: '', password: '', photo: '' });
  const [draft, setDraft] = useState({ name: '', password: '' });
  const [photoDraft, setPhotoDraft] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'petugas') {
      navigate('/back-office/login');
      return;
    }

    const email = (localStorage.getItem('userEmail') || '').trim().toLowerCase();
    const items = JSON.parse(localStorage.getItem('adminPetugasItems') || '[]');
    const matchedItem = items.find((item) => (item.email || '').trim().toLowerCase() === email);
    const storedPhoto = localStorage.getItem(`petugasProfilePhoto:${email}`) || '';

    const nextProfile = {
      name: matchedItem?.name || localStorage.getItem('userName') || '',
      email: matchedItem?.email || localStorage.getItem('userEmail') || '',
      password: matchedItem?.password || '',
      photo: storedPhoto,
    };

    setProfile(nextProfile);
    setDraft({ name: nextProfile.name, password: nextProfile.password });
    setPhotoDraft(storedPhoto);
  }, [navigate]);

  const maskedEmail = useMemo(() => getMaskedText(profile.email, '••••••••••••'), [profile.email]);
  const maskedPassword = useMemo(() => getMaskedText(profile.password), [profile.password]);
  const previewPhoto = photoDraft || profile.photo;

  const handlePhotoPick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoDraft(String(reader.result || ''));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!draft.name.trim()) nextErrors.name = 'Nama wajib diisi';
    if (!draft.password.trim()) nextErrors.password = 'Password wajib diisi';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const email = (profile.email || localStorage.getItem('userEmail') || '').trim().toLowerCase();
    const items = JSON.parse(localStorage.getItem('adminPetugasItems') || '[]');
    const updatedItems = items.map((item) => {
      if ((item.email || '').trim().toLowerCase() !== email) return item;

      return {
        ...item,
        name: draft.name.trim(),
        password: draft.password,
      };
    });

    localStorage.setItem('adminPetugasItems', JSON.stringify(updatedItems));
    localStorage.setItem('userName', draft.name.trim());

    if (photoDraft) {
      localStorage.setItem(`petugasProfilePhoto:${email}`, photoDraft);
    }

    setProfile((current) => ({
      ...current,
      name: draft.name.trim(),
      password: draft.password,
      photo: photoDraft || current.photo,
    }));
    setEditModalOpen(false);
    setShowPassword(false);
    setDraft((current) => ({ ...current, password: draft.password }));
    setSuccessState({ isOpen: true, message: 'Profil berhasil diupdate.' });
  };

  const openEditModal = () => {
    setDraft({ name: profile.name, password: profile.password });
    setPhotoDraft(profile.photo || '');
    setShowPassword(false);
    setErrors({});
    setEditModalOpen(true);
  };

  return (
    <PetugasLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-700 px-6 py-12 text-white sm:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-amber-300 bg-white shadow-2xl transition-transform hover:scale-105">
                  {previewPhoto ? (
                    <img src={previewPhoto} alt="Foto profil petugas" className="h-full w-full object-cover" />
                  ) : (
                    <UserCircle2 size={84} className="h-full w-full p-4 text-blue-900" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePhotoPick}
                  className="absolute bottom-0 right-0 rounded-full bg-amber-400 p-2 text-blue-900 shadow-lg transition hover:bg-amber-300 active:scale-95"
                  title="Ubah Foto"
                >
                  <Upload size={20} />
                </button>
              </div>
              
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              
              <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Profil Petugas</h1>
              <p className="text-blue-100 opacity-80 text-sm">Kelola informasi akun Anda di sini</p>
            </div>
          </div>

          <div className="space-y-6 px-6 py-10 sm:px-12">
            <div className="mx-auto max-w-xl space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
                  <input
                    type="text"
                    value={profile.name}
                    disabled
                    className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    type="text"
                    value={maskedEmail}
                    disabled
                    className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                  />
                  <p className="mt-1 text-xs text-slate-500">Email diambil dari data petugas dan tidak bisa diubah dari halaman ini.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <input
                    type="password"
                    value={maskedPassword}
                    disabled
                    className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={openEditModal}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                  >
                    <PencilLine size={16} />
                    Edit Profil
                  </button>
            </div>
          </div>
        </div>
      </div>

      {editModalOpen ? (
        <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
          <div className="flex min-h-full items-center justify-center">
            <form onSubmit={handleSave} className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
              <div className="bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-700 px-6 py-6 text-white sm:px-8">
                <h2 className="text-2xl font-bold">Edit Profil</h2>
                <p className="mt-1 text-sm text-blue-100">Ubah nama, password, dan foto profil petugas.</p>
              </div>

              <div className="space-y-6 px-6 py-8 sm:px-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative group">
                    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-amber-300 bg-white shadow-xl transition-transform hover:scale-105">
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Foto profil petugas" className="h-full w-full object-cover" />
                      ) : (
                        <UserCircle2 size={64} className="h-full w-full p-3 text-blue-900" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handlePhotoPick}
                      className="absolute bottom-0 right-0 rounded-full bg-amber-400 p-1.5 text-blue-900 shadow-md transition hover:bg-amber-300 active:scale-95"
                      title="Ubah Foto"
                    >
                      <Upload size={16} />
                    </button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  <p className="mt-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ubah Foto Profil</p>
                </div>

                <div className="mx-auto max-w-sm space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
                      <input
                        type="text"
                        value={draft.name}
                        onChange={(event) => {
                          setDraft((current) => ({ ...current, name: event.target.value }));
                          if (errors.name) setErrors((current) => ({ ...current, name: '' }));
                        }}
                        aria-invalid={!!errors.name}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                      {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                      <input
                        type="text"
                        value={maskedEmail}
                        disabled
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={draft.password}
                          onChange={(event) => {
                            setDraft((current) => ({ ...current, password: event.target.value }));
                            if (errors.password) setErrors((current) => ({ ...current, password: '' }));
                          }}
                          aria-invalid={!!errors.password}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((current) => !current)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditModalOpen(false);
                      setShowPassword(false);
                    }}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <PopupBerhasil
        isOpen={successState.isOpen}
        message={successState.message}
        buttonText="Tutup"
        onClose={() => setSuccessState({ isOpen: false, message: '' })}
      />
    </PetugasLayout>
  );
}