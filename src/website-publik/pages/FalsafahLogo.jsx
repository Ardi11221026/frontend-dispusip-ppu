import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

export default function FalsafahLogo() {
  return (
    <div className="w-full">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}

      <PageBanner
        title="Falsafah Logo"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '#' },
          { label: 'Falsafah Logo' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
          <p className="text-gray-600 font-poppins text-lg">
            Penjelasan filosofi dan makna di balik logo Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
