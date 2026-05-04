import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Home, BarChart3 } from 'lucide-react';
import Footer2 from '../../shared/components/Footer2';

export default function PetugasLayout({ children, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'petugas') {
      navigate('/back-office/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/back-office/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'manajemen', label: 'Manajemen', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center font-bold">P</div>
            <div>
              <h1 className="font-bold text-lg">Petugas Perpusda</h1>
              <p className="text-xs text-emerald-200">PPU Library</p>
            </div>
          </div>
        </div>

        <nav className="px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu?.(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeMenu === item.id ? 'bg-yellow-600 text-white' : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {menuItems.find((m) => m.id === activeMenu)?.label || 'Petugas'}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{localStorage.getItem('userEmail') || 'petugas@perpus.id'}</p>
            <p className="text-xs text-gray-500">Petugas Perpustakaan</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Footer */}
        <Footer2 />
      </div>
    </div>
  );
}
