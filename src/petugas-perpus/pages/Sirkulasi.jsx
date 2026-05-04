import PetugasModulePage from '../components/PetugasModulePage';

export default function Sirkulasi() {
  return (
    <PetugasModulePage
      badge="Modul Sirkulasi"
      title="Sirkulasi"
      description="Pengelolaan peminjaman, pengembalian, perpanjangan, dan pencatatan keterlambatan koleksi secara cepat dan terstruktur."
      stats={[
        { label: 'Peminjaman', value: '24', caption: 'Diproses hari ini' },
        { label: 'Pengembalian', value: '18', caption: 'Sudah selesai' },
        { label: 'Terlambat', value: '5', caption: 'Butuh tindak lanjut' },
        { label: 'Perpanjangan', value: '7', caption: 'Masih aktif' },
      ]}
      highlights={[
        'Cek status anggota dan koleksi sebelum transaksi.',
        'Catat denda keterlambatan sesuai kebijakan.',
        'Gunakan riwayat peminjaman untuk penelusuran cepat.',
        'Sinkronkan status koleksi setelah pengembalian diterima.',
      ]}
      noteTitle="Operasional"
      noteText="Modul ini adalah inti layanan harian. Gunakan untuk menjaga alur transaksi tetap cepat, rapi, dan tercatat dengan benar."
    />
  );
}