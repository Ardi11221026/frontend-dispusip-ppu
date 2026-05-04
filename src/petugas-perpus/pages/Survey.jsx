import PetugasModulePage from '../components/PetugasModulePage';

export default function Survey() {
  return (
    <PetugasModulePage
      badge="Modul Survey"
      title="Survey"
      description="Ruang kerja untuk memantau survei kepuasan, umpan balik layanan, dan tindak lanjut hasil penilaian pengguna."
      stats={[
        { label: 'Survei Aktif', value: '3', caption: 'Sedang berjalan' },
        { label: 'Respon Masuk', value: '182', caption: 'Dari pengguna layanan' },
        { label: 'Selesai', value: '12', caption: 'Sudah direkap' },
        { label: 'Tindak Lanjut', value: '5', caption: 'Butuh aksi petugas' },
      ]}
      highlights={[
        'Kumpulkan umpan balik dari setiap kanal layanan.',
        'Analisis hasil survei untuk peningkatan mutu.',
        'Catat isu berulang agar cepat ditangani.',
        'Tampilkan ringkasan hasil untuk koordinasi internal.',
      ]}
      noteTitle="Evaluasi"
      noteText="Gunakan halaman ini untuk memantau suara pengguna dan menjadikannya dasar perbaikan layanan perpustakaan."
    />
  );
}