import PetugasModulePage from '../components/PetugasModulePage';

export default function Keanggotaan() {
  return (
    <PetugasModulePage
      badge="Modul Keanggotaan"
      title="Keanggotaan"
      description="Pengelolaan pendaftaran anggota, pembaruan data, cetak kartu, dan kontrol status keanggotaan aktif maupun nonaktif."
      stats={[
        { label: 'Anggota Aktif', value: '1.606', caption: 'Siap menggunakan layanan' },
        { label: 'Pendaftaran Baru', value: '14', caption: 'Hari ini' },
        { label: 'Kartu Cetak', value: '9', caption: 'Menunggu ambil' },
        { label: 'Data Koreksi', value: '6', caption: 'Perlu verifikasi' },
      ]}
      highlights={[
        'Perbarui nomor kontak dan alamat anggota secara berkala.',
        'Cek status aktif sebelum transaksi sirkulasi.',
        'Cetak kartu dengan format yang sama di semua perangkat.',
        'Gunakan arsip digital untuk riwayat perubahan data anggota.',
      ]}
      noteTitle="Layanan Anggota"
      noteText="Semua data anggota dipusatkan di sini sebelum digunakan oleh modul sirkulasi, OPAC, dan layanan digital lainnya."
    />
  );
}