import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

export default function TugasFungsi() {
  return (
    <div className="w-full">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}

      <PageBanner
        title="Tugas & Fungsi"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '#' },
          { label: 'Tugas & Fungsi' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600 mb-8">
          <h2 className="text-2xl font-bold font-poppins mb-4 text-gray-900">Tugas Pokok</h2>
          <ul className="list-disc list-inside text-gray-600 font-poppins space-y-2">
            <li>Melaksanakan penyelenggaraan perpustakaan daerah</li>
            <li>Mengelola dan mengkonservasi arsip pemerintah</li>
            <li>Memberikan layanan informasi kepada masyarakat</li>
            <li>Mengembangkan budaya baca masyarakat</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
