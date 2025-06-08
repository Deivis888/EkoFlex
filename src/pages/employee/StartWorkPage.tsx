import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Clock, Calendar, AlertCircle, Pause, Coffee } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const StartWorkPage = () => {
  const { workDays, startWorkDay, endWorkDay, startPause, endPause } = useEmployee();
  const [earlyFinishReason, setEarlyFinishReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [showPauseModal, setShowPauseModal] = useState(false);

  const todayWorkDay = workDays.find(day => 
    day.date === new Date().toISOString().split('T')[0]
  );

  const activePause = todayWorkDay?.pauseEntries?.find(pause => pause.isActive);

  const handleStartWork = async () => {
    await startWorkDay();
  };

  const handleEndWork = async () => {
    // End any active pause first
    if (activePause) {
      await endPause();
    }
    
    const now = new Date();
    const endOfWorkDay = new Date();
    endOfWorkDay.setHours(17, 0, 0, 0); // 17:00

    if (now < endOfWorkDay) {
      setShowReasonModal(true);
    } else {
      await endWorkDay();
    }
  };

  const handleEarlyFinish = async () => {
    await endWorkDay(earlyFinishReason);
    setShowReasonModal(false);
    setEarlyFinishReason('');
  };

  const handleStartPause = async () => {
    if (pauseReason.trim()) {
      await startPause(pauseReason);
      setShowPauseModal(false);
      setPauseReason('');
    }
  };

  const handleEndPause = async () => {
    await endPause();
  };

  const calculateTotalPauseTime = (pauseEntries: any[] = []) => {
    return pauseEntries.reduce((total, pause) => {
      if (pause.endTime) {
        const start = new Date(`2000-01-01T${pause.startTime}`);
        const end = new Date(`2000-01-01T${pause.endTime}`);
        return total + (end.getTime() - start.getTime()) / (1000 * 60);
      }
      return total;
    }, 0);
  };

  const pauseReasons = [
    'Vizitas pas gydytoją',
    'Dokumentų tvarkymas',
    'Asmeniniai reikalai',
    'Techninė pertrauka',
    'Kita'
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Darbo pradžia/pabaiga
        </h1>

        {/* Info about lunch break */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center">
            <Coffee className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Pietų pertrauka:</strong> Automatiškai išskaičiuojama 1 valanda pietums iš darbo laiko (jei dirbama daugiau nei 4 valandas).
              <br />
              <strong>Pauzės:</strong> Naudokite pauzės mygtuką vizitams pas gydytoją ar dokumentų tvarkymui.
            </p>
          </div>
        </motion.div>
        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Šiandienos darbo diena
          </h2>

          {todayWorkDay ? (
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                activePause 
                  ? 'bg-orange-50 dark:bg-orange-900/20' 
                  : 'bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <div className="flex items-center">
                  <Clock className={`h-5 w-5 mr-3 ${
                    activePause 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      activePause 
                        ? 'text-orange-900 dark:text-orange-100' 
                        : 'text-blue-900 dark:text-blue-100'
                    }`}>
                      {activePause ? 'Pauzė' : 'Darbo diena pradėta'}
                    </p>
                    <p className={`text-sm ${
                      activePause 
                        ? 'text-orange-700 dark:text-orange-300' 
                        : 'text-blue-700 dark:text-blue-300'
                    }`}>
                      {activePause 
                        ? `Pauzė nuo ${activePause.startTime} (${activePause.reason})`
                        : `Pradėta: ${todayWorkDay.startTime}`
                      }
                    </p>
                  </div>
                </div>
                {!todayWorkDay.isCompleted && (
                  <div className="flex space-x-2">
                    {activePause ? (
                      <button
                        onClick={handleEndPause}
                        className="btn btn-primary inline-flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Tęsti darbą
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowPauseModal(true)}
                          className="btn btn-outline inline-flex items-center"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pauzė
                        </button>
                        <button
                          onClick={handleEndWork}
                          className="btn btn-primary inline-flex items-center"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Baigti darbo dieną
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Pause History */}
              {todayWorkDay.pauseEntries && todayWorkDay.pauseEntries.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Šiandienos pauzės:</h3>
                  <div className="space-y-2">
                    {todayWorkDay.pauseEntries.map((pause, index) => (
                      <div key={pause.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {pause.reason}: {pause.startTime}
                          {pause.endTime ? ` - ${pause.endTime}` : ' (vyksta)'}
                        </span>
                        {pause.endTime && (
                          <span className="text-gray-500 dark:text-gray-400">
                            {Math.round((new Date(`2000-01-01T${pause.endTime}`).getTime() - 
                                       new Date(`2000-01-01T${pause.startTime}`).getTime()) / (1000 * 60))} min
                          </span>
                        )}
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Iš viso pauzių: {Math.round(calculateTotalPauseTime(todayWorkDay.pauseEntries))} min
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {todayWorkDay.isCompleted && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">
                        Darbo diena užbaigta
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Pabaiga: {todayWorkDay.endTime} | Iš viso: {todayWorkDay.totalHours}h (su pietų pertrauka)
                      </p>
                      {todayWorkDay.earlyFinishReason && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Priežastis: {todayWorkDay.earlyFinishReason}
                        </p>
                      )}
                      {todayWorkDay.pauseEntries && todayWorkDay.pauseEntries.length > 0 && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Pauzės: {Math.round(calculateTotalPauseTime(todayWorkDay.pauseEntries))} min
                        </p>
                      )}
                    </div>
                  </div>
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
                onClick={handleStartWork}
                className="btn btn-primary btn-lg inline-flex items-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Pradėti darbo dieną
              </button>
            </div>
          )}
        </motion.div>

        {/* Work History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Darbo dienų istorija
          </h2>

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
                      Pauzės
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Statusas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {workDays.map((day) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {day.pauseEntries && day.pauseEntries.length > 0 
                          ? `${Math.round(calculateTotalPauseTime(day.pauseEntries))} min`
                          : '-'
                        }
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

        {/* Pause Modal */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center mb-4">
                <Pause className="h-6 w-6 text-orange-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pradėti pauzę
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Pauzės laikas nebus įskaičiuotas į darbo valandas. Pasirinkite pauzės priežastį:
              </p>
              
              <div className="space-y-2 mb-4">
                {pauseReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setPauseReason(reason)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      pauseReason === reason
                        ? 'bg-orange-50 border-orange-300 text-orange-700 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
              
              {pauseReason === 'Kita' && (
                <textarea
                  value={pauseReason === 'Kita' ? '' : pauseReason}
                  onChange={(e) => setPauseReason(e.target.value)}
                  placeholder="Įveskite pauzės priežastį..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                  rows={3}
                />
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPauseModal(false);
                    setPauseReason('');
                  }}
                  className="btn btn-outline"
                >
                  Atšaukti
                </button>
                <button
                  onClick={handleStartPause}
                  disabled={!pauseReason.trim()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pradėti pauzę
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Early Finish Modal */}
        {showReasonModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-orange-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ankstyvas darbo dienos pabaigimas
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Darbo diena baigiama anksčiau nei įprastai. Prašome nurodyti priežastį:
              </p>
              
              <textarea
                value={earlyFinishReason}
                onChange={(e) => setEarlyFinishReason(e.target.value)}
                placeholder="Įveskite priežastį..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
                required
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowReasonModal(false)}
                  className="btn btn-outline"
                >
                  Atšaukti
                </button>
                <button
                  onClick={handleEarlyFinish}
                  disabled={!earlyFinishReason.trim()}
                  className="btn btn-primary"
                >
                  Baigti darbo dieną
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartWorkPage;