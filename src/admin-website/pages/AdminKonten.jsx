import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Package } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import PetugasLayout from '../../petugas-perpus/components/PetugasLayout';

export default function AdminKonten() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('konten');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin' && role !== 'petugas') {
      navigate('/back-office/login');
    }
  }, [navigate]);

  const role = localStorage.getItem('userRole');
  const Layout = role === 'admin' ? AdminLayout : PetugasLayout;
  const bannerPath = role === 'admin' ? '/admin/konten/banner' : '/back-office/konten/banner';

  return (
    <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Daftar Konten</h3>
          <p className="text-sm text-gray-500">Pilih menu konten yang ingin dikelola.</p>
        </div>

        <button
          onClick={() => navigate(bannerPath)}
          className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Image size={26} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">Banner</h4>
            <p className="text-sm text-gray-500">Kelola foto banner yang dipakai di website publik.</p>
          </div>
        </button>

        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Package size={26} />
          </div>
          <p className="mt-2 text-sm text-gray-500">Menu lain bisa ditambahkan di sini nanti.</p>
        </div>
      </div>
    </Layout>
  );
}
