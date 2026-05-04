import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

export default function StrukturOrganisasi() {
  return (
    <div className="w-full">
      <Header />

      <PageBanner
        title="Struktur Organisasi"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '#' },
          { label: 'Struktur Organisasi' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
          <p className="text-gray-600 font-poppins text-lg">
            Struktur organisasi dan hierarki Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
