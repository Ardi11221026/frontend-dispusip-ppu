import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-8 sm:py-12 mt-8 sm:mt-12 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Jam Operasional */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-poppins mb-3 sm:mb-4">Jam Operasional</h3>
            <div className="space-y-1 sm:space-y-2 font-poppins text-xs sm:text-sm">
              <p><strong>Senin - Jumat:</strong></p>
              <p>08:00 - 16:00 WIB</p>
              <p className="mt-2 sm:mt-4"><strong>Sabtu:</strong></p>
              <p>08:00 - 12:00 WIB</p>
              <p className="mt-2 sm:mt-4"><strong>Minggu:</strong> Tutup</p>
            </div>
          </div>

          {/* Layanan Digital */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-poppins mb-3 sm:mb-4">Layanan Digital</h3>
            <ul className="space-y-1 sm:space-y-2 font-poppins text-xs sm:text-sm">
              <li><a href="#" className="hover:text-blue-200 transition">OPAC</a></li>
              <li><a href="#" className="hover:text-blue-200 transition">iPusnas</a></li>
              <li><a href="#" className="hover:text-blue-200 transition">E-Resources</a></li>
              <li><a href="#" className="hover:text-blue-200 transition">Reservasi</a></li>
            </ul>
          </div>

          {/* Kontak Kami */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-poppins mb-3 sm:mb-4">Kontak Kami</h3>
            <div className="space-y-2 sm:space-y-3 font-poppins text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <p>(0548) 2032XXX</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <p>perpusip@ppu.go.id</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm">Jalan Korpri KM. 9 <br /> Kelurahan Nipah-Nipah <br />Kecamatan Penajam <br />Kabupaten Penajam Paser Utara<br /> Kalimantan Timur 76142</p>
              </div>
            </div>
          </div>

          {/* Media Sosial */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-poppins mb-3 sm:mb-4">Ikuti Kami</h3>
            <div className="flex gap-2 sm:gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 rounded-lg p-2 sm:p-3 transition transform hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="sm:w-8 sm:h-8 text-white">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.882-.229-3.633-.229-3.965 0-6.742 2.4-6.742 6.8v2.429z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 rounded-lg p-2 sm:p-3 transition transform hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="sm:w-8 sm:h-8 text-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg p-2 sm:p-3 transition transform hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="sm:w-8 sm:h-8 text-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.405c0 .795.645 1.44 1.44 1.44.795 0 1.44-.645 1.44-1.44 0-.794-.645-1.439-1.44-1.439-.795 0-1.44.645-1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700 pt-6 sm:pt-8">
          <div className="text-center">
            <p className="font-poppins text-xs sm:text-sm mb-1 sm:mb-2">
              © 2026 Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara
            </p>
            <p className="font-poppins text-xs text-blue-200">
              Jalan Korpri KM. 9 Kelurahan Nipah-Nipah Kecamatan Penajam<br />
              Kabupaten Penajam Paser Utara Kalimantan Timur 76142
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
