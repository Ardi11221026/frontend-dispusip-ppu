import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Users, BarChart3, Settings, BarChart3 as ChartIcon } from 'lucide-react';
import PetugasLayout from '../components/PetugasLayout';

export default function BackOfficeHome() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'petugas') {
      navigate('/back-office/login');
    }
  }, [navigate]);

  const stats = [
    { label: 'Total Koleksi', value: '10,935', color: 'from-blue-500 to-blue-600' },
    { label: 'Peminjaman Hari Ini', value: '24', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Pengembalian Hari Ini', value: '18', color: 'from-orange-500 to-orange-600' },
    { label: 'Member Aktif', value: '1,606', color: 'from-purple-500 to-purple-600' },
  ];

  const content = (
    <div className="p-4 sm:p-6">
      {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                    <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white mb-4`}>
                      <BarChart3 size={24} />
                    </div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Main Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Peminjaman */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Peminjaman Terbaru</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">No.</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Member</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Judul Buku</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Tgl Pinjam</th>
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4].map((item) => (
                          <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-2">{item}</td>
                            <td className="py-3 px-2">Budi Santoso</td>
                            <td className="py-3 px-2">Teknologi Terdepan</td>
                            <td className="py-3 px-2">28 Apr 2026</td>
                            <td className="py-3 px-2">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Aktif</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Aksi Cepat</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                        + Peminjaman Baru
                      </button>
                      <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition font-medium">
                        ✓ Pengembalian
                      </button>
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition font-medium">
                        ⚠ Denda
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow p-6 text-white">
                    <h3 className="font-bold mb-2">Tips</h3>
                    <p className="text-sm opacity-90">Perbarui data peminjaman setiap hari untuk laporan akurat.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Menu Items */}
          {activeMenu !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{['Manajemen Koleksi', 'Peminjaman', 'Laporan', 'Pengaturan'][['koleksi', 'peminjaman', 'laporan', 'pengaturan'].indexOf(activeMenu)]}</h3>
              <p className="text-gray-600">Fitur ini sedang dalam pengembangan...</p>
            </div>
          )}
        </div>
      );

  return <PetugasLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>{content}</PetugasLayout>;
}
