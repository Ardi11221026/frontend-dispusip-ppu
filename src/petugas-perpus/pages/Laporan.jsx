import PetugasModulePage from '../components/PetugasModulePage';

export default function Laporan() {
  return (
    <PetugasModulePage
      badge="Modul Laporan"
      title="Laporan"
      description="Pusat rekap harian, bulanan, dan tahunan untuk membantu petugas menyusun data statistik dan bahan evaluasi layanan."
      stats={[
        { label: 'Laporan Harian', value: '6', caption: 'Siap direkap' },
        { label: 'Bulanan', value: '2', caption: 'Sedang disusun' },
        { label: 'Tahunan', value: '1', caption: 'Sedang diperbarui' },
        { label: 'Ekspor', value: '14', caption: 'Berhasil dibuat' },
      ]}
      highlights={[
        'Gunakan data valid dari semua modul kerja.',
        'Periksa konsistensi angka sebelum distribusi laporan.',
        'Simpan arsip laporan untuk kebutuhan audit.',
        'Siapkan format ringkas untuk pimpinan dan staf.',
      ]}
      noteTitle="Rekap Data"
      noteText="Laporan menjadi sumber utama evaluasi kinerja layanan. Pastikan semua modul sudah sinkron sebelum rekap disahkan."
    />
  );
}