import { useRef, useState } from 'react';
import { Eye, EyeOff, Upload, UserCircle2 } from 'lucide-react';

export default function EditProfil({ isOpen, onClose, onSave, initialProfile }) {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState({ 
    name: initialProfile?.name || '', 
    password: initialProfile?.password || '' 
  });
  const [photoDraft, setPhotoDraft] = useState(initialProfile?.photo || '');

  if (!isOpen) return null;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nextErrors = {};
    if (!draft.name.trim()) nextErrors.name = 'Nama wajib diisi';
    if (!draft.password.trim()) nextErrors.password = 'Password wajib diisi';
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      name: draft.name.trim(),
      password: draft.password,
      photo: photoDraft
    });
  };

  const previewPhoto = photoDraft || initialProfile?.photo;

  return (
    <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
      <div className="flex min-h-full items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
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
                  onChange={(e) => {
                    setDraft(s => ({ ...s, name: e.target.value }));
                    if (errors.name) setErrors(s => ({ ...s, name: '' }));
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-2 focus:ring-blue-100 ${
                    errors.name ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  type="text"
                  value={initialProfile?.email}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={draft.password}
                    onChange={(e) => {
                      setDraft(s => ({ ...s, password: e.target.value }));
                      if (errors.password) setErrors(s => ({ ...s, password: '' }));
                    }}
                    className={`w-full rounded-xl border px-4 py-3 pr-12 text-slate-900 outline-none transition focus:ring-2 focus:ring-blue-100 ${
                      errors.password ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
