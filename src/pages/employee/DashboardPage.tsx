import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Euro, Calendar, TrendingUp, 
  User, Play, Square, Briefcase, 
  BarChart3, CheckCircle
} from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { employee, stats, workDays, startWorkDay, startWorkDayWithTime, endWorkDay, isAuthenticated } = useEmployee();
  const navigate = useNavigate();
  const [showTimeModal, setShowTimeModal] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState('');

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/employee/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Don't render anything if not authenticated or no employee data
  if (!isAuthenticated || !employee) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Kraunama...</p>
          </div>
        </div>
      </div>
    );
  }

  const todayWorkDay = workDays.find(day => 
    day.date === new Date().toISOString().split('T')[0]
  );

  const statsCards = [
    {
      title: 'Išmokėtas atlyginimas',
      value: `€${stats.totalSalary}`,
      icon: <Euro className="h-6 w-6" />,
      color: 'bg-green-500',
      change: '+€400 šį mėnesį'
    },
    {
      title: 'Išmokėti avansai',
      value: `€${stats.totalAdvances}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-orange-500',
      change: '2 prašymai šį mėnesį'
    },
    {
      title: 'Išdirbtos valandos',
      value: `${stats.totalHours}h`,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-blue-500',
      change: '+8h šią savaitę'
    },
    {
      title: 'Darbo dienų',
      value: stats.workDays,
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-purple-500',
      change: '21 diena šį mėnesį'
    }
  ];

  const quickActions = [
    {
      title: 'Pradėti/Baigti darbo dieną',
      description: 'Žymėti darbo laiką',
      icon: <Play className="h-6 w-6" />,
      href: '/employee/start',
      color: 'bg-green-500'
    },
    {
      title: 'Darbai',
      description: 'Peržiūrėti ir pridėti darbus',
      icon: <Briefcase className="h-6 w-6" />,
      href: '/employee/work',
      color: 'bg-purple-500'
    },
    {
      title: 'Įrankiai',
      description: 'Priskirti įrankiai',
      icon: <CheckCircle className="h-6 w-6" />,
      href: '/employee/tools',
      color: 'bg-orange-500'
    }
  ];

  const handleStartWorkDay = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
    setSelectedTime(currentTime);
    setShowTimeModal(true);
  };

  const handleConfirmStartTime = async () => {
    if (selectedTime) {
      await startWorkDayWithTime(selectedTime);
      setShowTimeModal(false);
      setSelectedTime('');
    }
  };

  const handleQuickStart = async () => {
    if (todayWorkDay && !todayWorkDay.isCompleted) {
      await endWorkDay();
    } else if (!todayWorkDay) {
      handleStartWorkDay();
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sveiki, {employee?.name}!
          </h1>
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {card.change}
                  </p>
                </div>
                <div className={`${card.color} text-white p-3 rounded-lg`}>
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Work Day Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Šiandienos darbo diena
            </h2>
            
            {todayWorkDay ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      todayWorkDay.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}>
                      {todayWorkDay.isCompleted ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        {todayWorkDay.isCompleted ? 'Darbo diena užbaigta' : 'Darbo diena vyksta'}
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Pradėta: {todayWorkDay.startTime}
                        {todayWorkDay.endTime && ` | Baigta: ${todayWorkDay.endTime}`}
                        {todayWorkDay.totalHours && ` | ${todayWorkDay.totalHours}h`}
                      </p>
                    </div>
                  </div>
                  {!todayWorkDay.isCompleted && (
                    <button
                      onClick={handleQuickStart}
                      className="btn btn-primary"
                    >
                      Baigti dieną
                    </button>
                  )}
                </div>

                {todayWorkDay.earlyFinishReason && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Ankstyvos pabaigos priežastis:</strong> {todayWorkDay.earlyFinishReason}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Pradėkite darbo dieną
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Paspaudę mygtuką užfiksuosite darbo dienos pradžią
                </p>
                <button
                  onClick={handleQuickStart}
                  className="btn btn-primary btn-lg inline-flex items-center"
                >
                  <Play className="h-5 w-5 mr-2" />
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Greiti veiksmai
            </h2>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.href)}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className={`${action.color} text-white p-2 rounded-lg mr-3 flex-shrink-0`}>
                    {action.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {action.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paskutinės darbo dienos
            </h2>
            <button
              onClick={() => navigate('/employee/start')}
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
            >
              Peržiūrėti visas
            </button>
          </div>
          
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
                    <tr key={day.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Dar nėra darbo dienų įrašų
              </p>
            </div>
          )}
        </motion.div>
        {/* Time Selection Modal */}
        {showTimeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pasirinkite darbo pradžios laiką
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Nustatykite tikslų darbo dienos pradžios laiką:
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Darbo pradžios laikas
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {selectedTime && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-6">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Darbo pradžia:</strong> {selectedTime}
                    <br />
                    <strong>Data:</strong> {new Date().toLocaleDateString('lt-LT')}
                  </p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowTimeModal(false);
                    setSelectedTime('');
                  }}
                  className="btn btn-outline"
                >
                  Atšaukti
                </button>
                <button
                  onClick={handleConfirmStartTime}
                  disabled={!selectedTime}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pradėti darbo dieną
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;