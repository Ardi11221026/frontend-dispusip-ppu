import PetugasModulePage from '../components/PetugasModulePage';

export default function Akuisisi() {
  return (
    <PetugasModulePage
      badge="Modul Akuisisi"
      title="Akuisisi"
      description="Halaman pengelolaan penerimaan koleksi baru, usulan pembelian, hibah, dan proses verifikasi bahan pustaka sebelum masuk ke katalog."
      stats={[
        { label: 'Usulan Baru', value: '12', caption: 'Masih menunggu verifikasi' },
        { label: 'Diproses', value: '8', caption: 'Sedang dilengkapi data' },
        { label: 'Selesai', value: '26', caption: 'Sudah diterima sistem' },
        { label: 'Tertunda', value: '3', caption: 'Perlu konfirmasi ulang' },
      ]}
      highlights={[
        'Catat sumber koleksi dan status pengadaan.',
        'Pastikan metadata dasar lengkap sebelum diserahkan ke katalog.',
        'Kelompokkan usulan berdasarkan prioritas layanan.',
        'Gunakan rekap akhir hari untuk monitoring proses masuk koleksi.',
      ]}
      noteTitle="Petunjuk"
      noteText="Gunakan modul ini untuk pencatatan awal koleksi baru. Setelah data lengkap, lanjutkan ke katalog agar koleksi siap dilayankan ke pengguna."
    />
  );
}