import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, Shield } from 'lucide-react';

export default function LayananKami() {
  const services = [
    {
      id: 1,
      title: 'OPAC Perpus',
      description: 'Layanan akses online ke katalog perpustakaan kami',
      icon: BookOpen,
      href: '/opac',
      color: 'from-blue-900 to-blue-800',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-900',
    },
    {
      id: 2,
      title: 'Keanggotaan',
      description: 'Daftar menjadi anggota perpustakaan dengan mudah',
      icon: Users,
      href: '/daftar',
      color: 'from-emerald-600 to-teal-700',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      id: 3,
      title: 'Pengaduan',
      description: 'Sampaikan masukan dan pengaduan Anda',
      icon: FileText,
      href: '/layanan',
      color: 'from-teal-600 to-emerald-700',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
    {
      id: 4,
      title: 'PPID',
      description: 'Pusat Penerbitan Informasi dan Dokumentasi',
      icon: Shield,
      href: '/layanan',
      color: 'from-blue-800 to-blue-900',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-900',
    },
    {
      id: 5,
      title: 'Buku Tamu Digital',
      description: 'Isi buku tamu pengunjung perpustakaan secara online',
      icon: FileText,
      href: '/buku-tamu-digital',
      color: 'from-emerald-600 to-teal-700',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Layanan Kami</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-emerald-600 mx-auto rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 mt-4">Berbagai layanan terpadu untuk memenuhi kebutuhan informasi Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                to={service.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 cursor-pointer overflow-hidden hover:scale-105 relative"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${service.color} transition duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <div className={`${service.iconBg} p-3 sm:p-4 rounded-full ${service.iconColor} group-hover:scale-110 transition duration-300`}>
                      <IconComponent size={28} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-900 transition">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center group-hover:text-gray-700 transition">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
