import { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, EyeOff, PencilLine, Upload, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PetugasLayout from '../components/PetugasLayout';
import PopupBerhasil from '../../shared/components/PopupBerhasil';

import EditProfil from '../components/EditProfil';

const getMaskedText = (value, fallback = '••••••••') => {
  const text = (value || '').trim();
  if (!text) return fallback;
  return '•'.repeat(Math.max(8, Math.min(text.length, 18)));
};

export default function ProfilPetugasPerpus() {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [successState, setSuccessState] = useState({ isOpen: false, message: '' });
  const [profile, setProfile] = useState({ name: '', email: '', password: '', photo: '' });

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'petugas') {
      navigate('/back-office/login');
      return;
    }

    const email = (localStorage.getItem('userEmail') || '').trim().toLowerCase();
    const items = JSON.parse(localStorage.getItem('adminPetugasItems') || '[]');
    const matchedItem = items.find((item) => (item.email || '').trim().toLowerCase() === email);
    const storedPhoto = localStorage.getItem(`petugasProfilePhoto:${email}`) || '';

    setProfile({
      name: matchedItem?.name || localStorage.getItem('userName') || '',
      email: matchedItem?.email || localStorage.getItem('userEmail') || '',
      password: matchedItem?.password || '',
      photo: storedPhoto,
    });
  }, [navigate]);

  const maskedEmail = useMemo(() => getMaskedText(profile.email, '••••••••••••'), [profile.email]);
  const maskedPassword = useMemo(() => getMaskedText(profile.password), [profile.password]);

  const handleSaveProfile = (newData) => {
    const email = (profile.email || localStorage.getItem('userEmail') || '').trim().toLowerCase();
    const items = JSON.parse(localStorage.getItem('adminPetugasItems') || '[]');
    const updatedItems = items.map((item) => {
      if ((item.email || '').trim().toLowerCase() !== email) return item;

      return {
        ...item,
        name: newData.name,
        password: newData.password,
      };
    });

    localStorage.setItem('adminPetugasItems', JSON.stringify(updatedItems));
    localStorage.setItem('userName', newData.name);

    if (newData.photo) {
      localStorage.setItem(`petugasProfilePhoto:${email}`, newData.photo);
    }

    setProfile((current) => ({
      ...current,
      name: newData.name,
      password: newData.password,
      photo: newData.photo || current.photo,
    }));
    
    setEditModalOpen(false);
    setSuccessState({ isOpen: true, message: 'Profil berhasil diupdate.' });
  };

  return (
    <PetugasLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="bg-gradient-to-r from-blue-900 via-emerald-700 to-teal-700 px-6 py-12 text-white sm:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-amber-300 bg-white shadow-2xl transition-transform hover:scale-105">
                {profile.photo ? (
                  <img src={profile.photo} alt="Foto profil petugas" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle2 size={84} className="h-full w-full p-4 text-blue-900" />
                )}
              </div>
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
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  type="text"
                  value={maskedEmail}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-slate-500 italic">Email hanya dapat diubah oleh administrator.</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  value={maskedPassword}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none cursor-not-allowed"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 shadow-sm"
                >
                  <PencilLine size={16} />
                  Edit Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfil 
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialProfile={profile}
      />

      <PopupBerhasil
        isOpen={successState.isOpen}
        message={successState.message}
        buttonText="Tutup"
        onClose={() => setSuccessState({ isOpen: false, message: '' })}
      />
    </PetugasLayout>
  );
}