import PetugasModulePage from '../components/PetugasModulePage';

export default function Katalog() {
  return (
    <PetugasModulePage
      badge="Modul Katalog"
      title="Katalog"
      description="Pengelolaan data bibliografi, pengindeksan, klasifikasi, dan perapihan metadata koleksi agar mudah dicari melalui sistem."
      stats={[
        { label: 'Entri Katalog', value: '10.935', caption: 'Data bibliografi aktif' },
        { label: 'Perlu Validasi', value: '41', caption: 'Butuh pengecekan ulang' },
        { label: 'Duplikasi', value: '7', caption: 'Perlu penggabungan data' },
        { label: 'Terindeks', value: '98%', caption: 'Siap ditelusuri pengguna' },
      ]}
      highlights={[
        'Perbarui judul, pengarang, dan subjek secara konsisten.',
        'Jaga format metadata agar selaras dengan standar perpustakaan.',
        'Gunakan penelusuran cepat untuk koreksi data ganda.',
        'Sinkronkan katalog dengan koleksi fisik dan digital.',
      ]}
      noteTitle="Catatan Katalog"
      noteText="Halaman ini berfungsi sebagai pusat perapihan metadata. Setiap perubahan di sini akan memengaruhi hasil pencarian di layanan OPAC dan modul lainnya."
    />
  );
}