import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

export default function VisiMisi() {
  return (
    <div className="w-full">
      <Header />

      <PageBanner
        title="Visi & Misi"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '#' },
          { label: 'Visi & Misi' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold font-poppins mb-4 text-gray-900">Visi</h2>
            <p className="text-gray-600 font-poppins">
              Menjadi perpustakaan yang modern dan aksesibel untuk meningkatkan literasi masyarakat
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-8 border-l-4 border-green-600">
            <h2 className="text-2xl font-bold font-poppins mb-4 text-gray-900">Misi</h2>
            <p className="text-gray-600 font-poppins">
              Menyediakan layanan informasi dan dokumentasi berkualitas untuk mendukung pembangunan daerah
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
