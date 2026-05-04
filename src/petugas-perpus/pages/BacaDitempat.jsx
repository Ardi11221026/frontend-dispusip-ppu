import PetugasModulePage from '../components/PetugasModulePage';

export default function BacaDitempat() {
  return (
    <PetugasModulePage
      badge="Modul Baca Ditempat"
      title="Baca Ditempat"
      description="Pengaturan layanan baca di tempat, termasuk reservasi ruang, ketersediaan kursi, dan pencatatan penggunaan fasilitas."
      stats={[
        { label: 'Kapasitas', value: '40', caption: 'Kursi tersedia' },
        { label: 'Terisi', value: '27', caption: 'Sedang digunakan' },
        { label: 'Reservasi', value: '9', caption: 'Menunggu konfirmasi' },
        { label: 'Selesai', value: '64', caption: 'Kunjungan hari ini' },
      ]}
      highlights={[
        'Atur alur masuk agar ruang baca tetap nyaman.',
        'Cek kebersihan dan kerapian meja baca secara rutin.',
        'Catat kapasitas saat jam sibuk untuk evaluasi layanan.',
        'Gunakan data reservasi untuk pengaturan petugas.',
      ]}
      noteTitle="Ruang Layanan"
      noteText="Halaman ini membantu petugas mengelola ruang baca di tempat agar pengguna mendapat pengalaman yang tertib dan nyaman."
    />
  );
}