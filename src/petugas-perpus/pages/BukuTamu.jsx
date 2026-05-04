import PetugasModulePage from '../components/PetugasModulePage';

export default function BukuTamu() {
  return (
    <PetugasModulePage
      badge="Modul Buku Tamu"
      title="Buku Tamu"
      description="Pencatatan pengunjung yang datang ke perpustakaan, baik anggota maupun nonanggota, untuk kebutuhan statistik dan layanan."
      stats={[
        { label: 'Tamu Hari Ini', value: '238', caption: 'Sudah tercatat' },
        { label: 'Nonanggota', value: '84', caption: 'Kunjungan umum' },
        { label: 'Anggota', value: '154', caption: 'Kunjungan terdaftar' },
        { label: 'Bulan Ini', value: '7.204', caption: 'Total kunjungan' },
      ]}
      highlights={[
        'Pastikan nama dan tujuan kunjungan dicatat benar.',
        'Gunakan data tamu untuk rekap statistik bulanan.',
        'Pantau jam ramai untuk pengaturan petugas.',
        'Sediakan alur cepat untuk pengunjung berulang.',
      ]}
      noteTitle="Statistik Kunjungan"
      noteText="Data dari buku tamu membantu menilai pola kunjungan dan kebutuhan layanan di jam sibuk."
    />
  );
}