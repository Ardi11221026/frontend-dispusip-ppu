import PetugasModulePage from '../components/PetugasModulePage';

export default function Opac() {
  return (
    <PetugasModulePage
      badge="Modul OPAC"
      title="OPAC"
      description="Pengaturan dan pemantauan layanan katalog online agar pencarian koleksi oleh pengguna tetap cepat, rapi, dan sinkron."
      stats={[
        { label: 'Pencarian Hari Ini', value: '1.284', caption: 'Akses katalog' },
        { label: 'Sesi Aktif', value: '96', caption: 'Sedang membuka OPAC' },
        { label: 'Koleksi Terlihat', value: '10.935', caption: 'Tersedia untuk telusur' },
        { label: 'Rujukan', value: '18', caption: 'Dari petugas bantuan' },
      ]}
      highlights={[
        'Perbarui indeks data setelah perubahan katalog.',
        'Pastikan tampilan pencarian mudah digunakan di desktop dan mobile.',
        'Gunakan OPAC untuk membantu rujukan cepat kepada pengguna.',
        'Monitor hasil pencarian yang kosong untuk perbaikan metadata.',
      ]}
      noteTitle="Akses Publik"
      noteText="Modul ini berkaitan langsung dengan pencarian koleksi oleh pengguna. Karena itu, data katalog harus selalu sinkron dengan OPAC."
    />
  );
}