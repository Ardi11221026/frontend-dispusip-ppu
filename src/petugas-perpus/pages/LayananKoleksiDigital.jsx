import PetugasModulePage from '../components/PetugasModulePage';

export default function LayananKoleksiDigital() {
  return (
    <PetugasModulePage
      badge="Modul Layanan Koleksi Digital"
      title="Layanan Koleksi Digital"
      description="Manajemen akses koleksi digital, permintaan file, dan kontrol layanan elektronik agar pengguna tetap mudah menjangkau bahan pustaka."
      stats={[
        { label: 'File Digital', value: '0', caption: 'Tersedia saat ini' },
        { label: 'Permintaan', value: '16', caption: 'Sedang diproses' },
        { label: 'Akses Aktif', value: '72', caption: 'Pengguna online' },
        { label: 'Masalah Akses', value: '2', caption: 'Butuh penanganan' },
      ]}
      highlights={[
        'Cek hak akses sebelum membagikan file digital.',
        'Pastikan tautan unduhan masih aktif.',
        'Kelola metadata koleksi digital dengan format yang konsisten.',
        'Simpan riwayat permintaan untuk audit layanan.',
      ]}
      noteTitle="Layanan Elektronik"
      noteText="Gunakan modul ini untuk mendukung bahan pustaka digital, baik akses baca maupun distribusi file yang diizinkan."
    />
  );
}