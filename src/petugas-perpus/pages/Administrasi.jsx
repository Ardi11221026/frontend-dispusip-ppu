import PetugasModulePage from '../components/PetugasModulePage';

export default function Administrasi() {
  return (
    <PetugasModulePage
      badge="Modul Administrasi"
      title="Administrasi"
      description="Pengelolaan akun petugas, hak akses, konfigurasi sistem, dan kebutuhan administrasi internal perpustakaan."
      stats={[
        { label: 'Pengguna', value: '8', caption: 'Akun petugas aktif' },
        { label: 'Peran', value: '3', caption: 'Level akses tersedia' },
        { label: 'Konfigurasi', value: '12', caption: 'Pengaturan utama' },
        { label: 'Audit Log', value: '94', caption: 'Tercatat hari ini' },
      ]}
      highlights={[
        'Kelola akses pengguna sesuai tugas masing-masing.',
        'Ubah konfigurasi hanya jika sudah diverifikasi.',
        'Periksa log aktivitas untuk keamanan sistem.',
        'Pastikan data administrasi konsisten antar modul.',
      ]}
      noteTitle="Hak Akses"
      noteText="Modul ini menjadi pusat pengaturan internal. Gunakan dengan hati-hati karena perubahan di sini dapat memengaruhi seluruh layanan petugas."
    />
  );
}