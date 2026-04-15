import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiShoppingCart, FiAlertTriangle, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { MdLocalGasStation } from 'react-icons/md';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiGrid className="w-5 h-5" /> },
    { name: 'Orders', path: '/orders', icon: <FiShoppingCart className="w-5 h-5" /> },
    { name: 'Emergencies', path: '/emergencies', icon: <FiAlertTriangle className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 text-white p-2 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30">
              <MdLocalGasStation className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
              FuelNow
            </span>
          </div>
          <button
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-500 hover:text-red-600 hover:bg-red-50 w-full px-3 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-900 mr-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1">
              {navItems.find(item => item.path === window.location.pathname)?.name || 'Admin Panel'}
            </h1>
          </div>

          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gray-50 px-2 sm:px-3 py-1.5 rounded-full border border-gray-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs sm:text-sm">
                A
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
