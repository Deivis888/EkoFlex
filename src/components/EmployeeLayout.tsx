import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, User, Play, Briefcase, Wrench, Car, 
  MapPin, FileText, GraduationCap, Users, Plane, 
  CreditCard, Euro, Settings, LogOut
} from 'lucide-react';
import { useEmployee } from '../contexts/EmployeeContext';

const EmployeeLayout = () => {
  const { employee, logout, isAuthenticated } = useEmployee();
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/employee/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Kraunama...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/employee/dashboard' },
    { icon: <Play className="h-5 w-5" />, label: 'Darbo pradžia/pabaiga', path: '/employee/start' },
    { icon: <Briefcase className="h-5 w-5" />, label: 'Atlikti darbai', path: '/employee/work' },
    { icon: <Wrench className="h-5 w-5" />, label: 'Įrankiai', path: '/employee/tools' },
    { icon: <Car className="h-5 w-5" />, label: 'Mašina', path: '/employee/vehicle' },
    { icon: <MapPin className="h-5 w-5" />, label: 'Adresai', path: '/employee/addresses' },
    { icon: <FileText className="h-5 w-5" />, label: 'Dokumentai', path: '/employee/documents' },
    { icon: <GraduationCap className="h-5 w-5" />, label: 'Profesija', path: '/employee/profession' },
    { icon: <Users className="h-5 w-5" />, label: 'Vadovai', path: '/employee/supervisors' },
    { icon: <Plane className="h-5 w-5" />, label: 'Komandiruotė', path: '/employee/business-trip' },
    { icon: <Euro className="h-5 w-5" />, label: 'Avansai', path: '/employee/advances' },
    { icon: <Settings className="h-5 w-5" />, label: 'Nustatymai', path: '/employee/settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/employee/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center text-center">
            <img 
              src="https://i.imgur.com/7rNwjuG.png" 
              alt="EkoFlex Logo" 
              className="h-10 w-auto mb-3"
            />
            <div className="relative">
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent tracking-wide">
                DARBUOTOJAI
              </h2>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="flex items-center mb-3">
            <img
              src={employee?.profilePhoto || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover mr-3"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {employee?.name} {employee?.surname}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {employee?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Atsijungti
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;