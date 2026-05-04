import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

export default function Kelembagaan() {
  return (
    <div className="w-full">
      <Header />
      <div className="md:hidden h-20" /> {/* Spacer untuk offset fixed header di mobile */}

      <PageBanner
        title="Kelembagaan"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil', href: '#' },
          { label: 'Kelembagaan' },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 font-poppins sm:text-4xl">Visi dan Misi</h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Arah kebijakan dan tujuan utama layanan perpustakaan dan arsip.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-blue-900 font-poppins sm:text-2xl">Visi</h3>
              <p className="mt-4 leading-8 text-slate-700 font-poppins">
                "Menjadi perpustakaan yang transformatif dalam meningkatkan budaya baca dan literasi untuk mewujudkan bangsa bermartabat bersama Indonesia Maju menuju Indonesia Emas 2045"
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-emerald-900 font-poppins sm:text-2xl">Misi</h3>
              <ol className="mt-4 space-y-4 leading-8 text-slate-700 font-poppins">
                <li>1. Memperkuat Budaya Baca dan Meningkatkan Kecakapan Literasi Masyarakat</li>
                <li>2. Memperkuat Perpustakaan Digital dengan Memanfaatkan Teknologi Terkini</li>
                <li>3. Meningkatkan Kualitas Pengelolaan Perpustakaan sesuai Standar</li>
                <li>4. Memperkuat Program Transformasi Perpustakaan Berbasis Inklusi Sosial</li>
                <li>5. Memperkuat Peran Masyarakat dalam Gerakan Budaya Baca dan Peningkatan Kecakapan Literasi</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
