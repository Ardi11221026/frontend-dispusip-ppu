import PetugasModulePage from '../components/PetugasModulePage';

export default function SSKCKR() {
  return (
    <PetugasModulePage
      badge="Modul SSKCKR"
      title="SSKCKR"
      description="Layanan surat keterangan terkait koleksi, kunjungan, atau kebutuhan administrasi yang memerlukan verifikasi dari petugas."
      stats={[
        { label: 'Permohonan', value: '19', caption: 'Masuk hari ini' },
        { label: 'Diproses', value: '11', caption: 'Menunggu verifikasi' },
        { label: 'Selesai', value: '73', caption: 'Telah diterbitkan' },
        { label: 'Ditolak', value: '2', caption: 'Data belum lengkap' },
      ]}
      highlights={[
        'Validasi identitas sebelum menerbitkan surat.',
        'Simpan nomor registrasi untuk arsip layanan.',
        'Gunakan format surat yang seragam untuk semua permohonan.',
        'Catat status tindak lanjut agar mudah dilacak kembali.',
      ]}
      noteTitle="Verifikasi"
      noteText="Modul ini disiapkan untuk kebutuhan surat keterangan. Pastikan dokumen pendukung lengkap sebelum layanan disetujui."
    />
  );
}