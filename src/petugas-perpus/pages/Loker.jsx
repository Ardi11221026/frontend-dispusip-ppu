import PetugasModulePage from '../components/PetugasModulePage';

export default function Loker() {
  return (
    <PetugasModulePage
      badge="Modul Loker"
      title="Loker"
      description="Pengelolaan loker penyimpanan barang pengunjung, termasuk ketersediaan, penugasan, dan pengecekan status harian."
      stats={[
        { label: 'Loker Aktif', value: '48', caption: 'Siap digunakan' },
        { label: 'Terpakai', value: '31', caption: 'Sedang dipinjam' },
        { label: 'Kosong', value: '17', caption: 'Tersedia sekarang' },
        { label: 'Perlu Cek', value: '4', caption: 'Butuh inspeksi' },
      ]}
      highlights={[
        'Pastikan penandaan loker selalu jelas.',
        'Periksa kunci dan kondisi fisik secara rutin.',
        'Catat serah terima untuk menghindari kehilangan.',
        'Gunakan daftar harian untuk kontrol ketersediaan.',
      ]}
      noteTitle="Keamanan"
      noteText="Halaman ini membantu petugas menjaga keamanan barang pengunjung selama berada di area layanan perpustakaan."
    />
  );
}