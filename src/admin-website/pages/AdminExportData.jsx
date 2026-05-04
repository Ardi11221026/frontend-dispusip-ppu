import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDown } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminExportData() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('export');

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="p-4 sm:p-6">
        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-3 text-white"><FileDown size={24} /></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Ekspor Data</h3>
              <p className="text-sm text-gray-500">Unduh data admin dalam format cadangan atau laporan.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
