import PetugasModulePage from '../components/PetugasModulePage';

export default function Beranda() {
  return (
    <PetugasModulePage
      badge="Dashboard Petugas"
      title="Beranda"
      description="Ringkasan operasional harian untuk petugas perpustakaan. Halaman ini menjadi pusat pantauan aktivitas, transaksi, dan tindak lanjut layanan."
      stats={[
        { label: 'Kunjungan Hari Ini', value: '238', caption: 'Masuk dari layanan utama' },
        { label: 'Transaksi Aktif', value: '24', caption: 'Peminjaman dan pengembalian' },
        { label: 'Anggota Aktif', value: '1.606', caption: 'Terdaftar dalam sistem' },
        { label: 'Layanan Tersedia', value: '13', caption: 'Modul kerja petugas' },
      ]}
      highlights={[
        'Pantau antrean layanan sebelum membuka loket.',
        'Cek data anggota dan status peminjaman secara berkala.',
        'Gunakan laporan harian untuk rekap akhir shift.',
        'Pastikan sinkronisasi data selesai sebelum logout.',
      ]}
      noteTitle="Fokus Hari Ini"
      noteText="Mulai dari beranda ini, petugas bisa masuk ke modul akuisisi, katalog, sirkulasi, sampai administrasi. Tampilan desktop dan mobile dibuat seragam dengan warna Perpusnas sebagai aksen utama."
    />
  );
}