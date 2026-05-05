import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminImportData() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('import');

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
            <div className="rounded-lg bg-blue-600 p-3 text-white"><FileUp size={24} /></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Impor Data</h3>
              <p className="text-sm text-gray-500">Masukkan data dari file ke sistem admin.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
