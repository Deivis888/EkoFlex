import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Euro, Calendar, TrendingUp, 
  User, Play, Square, Briefcase, 
  LogOut, Settings
} from 'lucide-react';
import { useEmployee } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EmployeeDashboardPage = () => {
  const { employee, stats, workDays, logout, isAuthenticated } = useEmployee();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/employee/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/employee/login');
  };

  const todayWorkDay = workDays.find(day => 
    day.date === new Date().toISOString().split('T')[0]
  );

  const statsCards = [
    {
      title: 'Išdirbtos valandos',
      value: `${stats.totalHours}h`,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Išmokėtas atlyginimas',
      value: `€${stats.totalSalary}`,
      icon: <Euro className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Išmokėti avansai',
      value: `€${stats.totalAdvances}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-orange-500'
    },
    {
      title: 'Darbo dienų',
      value: stats.workDays,
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-purple-500'
    }
  ];

  const quickActions = [
    {
      title: 'Profilis',
      description: 'Redaguoti asmeninę informaciją',
      icon: <User className="h-6 w-6" />,
      href: '/employee/profile',
      color: 'bg-blue-500'
    },
    {
      title: 'Darbai',
      description: 'Peržiūrėti ir pridėti darbus',
      icon: <Briefcase className="h-6 w-6" />,
      href: '/employee/work',
      color: 'bg-green-500'
    },
    {
      title: 'Nustatymai',
      description: 'Keisti slaptažodį ir nustatymus',
      icon: <Settings className="h-6 w-6" />,
      href: '/employee/settings',
      color: 'bg-gray-500'
    }
  ];

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/7rNwjuG.png" 
                alt="EkoFlex Logo" 
                className="h-8 w-auto mr-3"
              />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Darbuotojo Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={employee.profilePhoto || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {employee.name} {employee.surname}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Atsijungti"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sveiki, {employee.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Šiandien yra {new Date().toLocaleDateString('lt-LT', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`${card.color} text-white p-3 rounded-lg mr-4`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Day Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Šiandienos darbo diena
            </h3>
            
            {todayWorkDay ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pradžia:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {todayWorkDay.startTime}
                  </span>
                </div>
                
                {todayWorkDay.endTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pabaiga:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {todayWorkDay.endTime}
                    </span>
                  </div>
                )}
                
                {todayWorkDay.totalHours && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Iš viso valandų:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {todayWorkDay.totalHours}h
                    </span>
                  </div>
                )}
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  todayWorkDay.isCompleted 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {todayWorkDay.isCompleted ? (
                    <>
                      <Square className="h-4 w-4 mr-1" />
                      Užbaigta
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Vyksta
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Šiandien dar nepradėjote darbo dienos
                </p>
                <button className="btn btn-primary">
                  Pradėti darbo dieną
                </button>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Greiti veiksmai
            </h3>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.href)}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className={`${action.color} text-white p-2 rounded-lg mr-3`}>
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Work Days */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Paskutinės darbo dienos
          </h3>
          
          {workDays.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pradžia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pabaiga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valandos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Statusas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {workDays.slice(0, 5).map((day) => (
                    <tr key={day.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(day.date).toLocaleDateString('lt-LT')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {day.startTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {day.endTime || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {day.totalHours ? `${day.totalHours}h` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          day.isCompleted 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {day.isCompleted ? 'Užbaigta' : 'Vyksta'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Dar nėra darbo dienų įrašų
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;