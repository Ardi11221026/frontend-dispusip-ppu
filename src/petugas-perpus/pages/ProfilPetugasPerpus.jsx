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
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });
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
    setEditMode(false);
    setShowPassword(false);
    setSuccessState({ isOpen: true, message: 'Profil berhasil diupdate.' });
  };

  return (
    <PetugasLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-700 px-6 py-8 text-white sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-amber-300 bg-white shadow-lg">
              {previewPhoto ? (
                <img src={previewPhoto} alt="Foto profil petugas" className="h-full w-full object-cover" />
              ) : (
                <UserCircle2 size={48} className="text-blue-900" />
              )}
            </div>
            <h1 className="mt-5 text-center text-3xl font-bold sm:text-4xl">Pengaturan Akun</h1>
            <p className="mt-2 text-center text-blue-100">Profil petugas perpustakaan</p>
          </div>

          <form onSubmit={handleSave} className="space-y-5 px-6 py-6 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-[140px_1fr] sm:items-start">
              <div className="space-y-3">
                <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  <button
                    type="button"
                    onClick={handlePhotoPick}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Upload size={16} />
                    Ubah Foto Profil
                  </button>
                </div>
                {previewPhoto ? (
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoDraft('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Hapus Foto Sementara
                  </button>
                ) : null}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                    disabled={!editMode}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
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
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={editMode ? draft.password : maskedPassword}
                      onChange={(event) => setDraft((current) => ({ ...current, password: event.target.value }))}
                      disabled={!editMode}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                    {editMode ? (
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(true);
                      setDraft({ name: profile.name, password: profile.password });
                      setShowPassword(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                  >
                    <PencilLine size={16} />
                    Edit Profil
                  </button>

                  {editMode ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setDraft({ name: profile.name, password: profile.password });
                          setShowPassword(false);
                          setPhotoDraft(profile.photo || '');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Simpan Perubahan
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <PopupBerhasil
        isOpen={successState.isOpen}
        message={successState.message}
        buttonText="Tutup"
        onClose={() => setSuccessState({ isOpen: false, message: '' })}
      />
    </PetugasLayout>
  );
}