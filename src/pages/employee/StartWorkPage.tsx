import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Clock, Calendar, AlertCircle, Pause, Coffee, Edit } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const StartWorkPage = () => {
  const { workDays, startWorkDay, startWorkDayWithTime, endWorkDay, startPause, endPause, updateWorkDay } = useEmployee();
  const [earlyFinishReason, setEarlyFinishReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showManualTimeModal, setShowManualTimeModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [manualTimes, setManualTimes] = useState({
    startTime: '',
    endTime: ''
  });
  const [editingWorkDayId, setEditingWorkDayId] = useState<string | null>(null);

  const todayWorkDay = workDays.find(day => 
    day.date === new Date().toISOString().split('T')[0]
  );

  const activePause = todayWorkDay?.pauseEntries?.find(pause => pause.isActive);

  const handleEditWorkDay = (workDay: any) => {
    setEditingWorkDayId(workDay.id);
    setManualTimes({
      startTime: workDay.startTime?.substring(0, 5) || '08:00',
      endTime: workDay.endTime?.substring(0, 5) || '17:00'
    });
    setShowManualTimeModal(true);
  };

  const handleStartWork = () => {
    const now = new Date();
    setSelectedHour(now.getHours());
    setSelectedMinute(now.getMinutes());
    setShowTimeModal(true);
  };

  const handleConfirmStartTime = async () => {
    const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    await startWorkDayWithTime(timeString);
    setShowTimeModal(false);
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

  const handleManualTimeEntry = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format
    
    setManualTimes({
      startTime: todayWorkDay?.startTime?.substring(0, 5) || '08:00',
      endTime: currentTime
    });
    setShowManualTimeModal(true);
  };

  const handleSaveManualTime = async () => {
    if (!manualTimes.startTime || !manualTimes.endTime) {
      alert('Prašome užpildyti abu laikus');
      return;
    }

    const startTime = new Date(`2000-01-01T${manualTimes.startTime}:00`);
    const endTime = new Date(`2000-01-01T${manualTimes.endTime}:00`);
    
    if (endTime <= startTime) {
      alert('Pabaigos laikas turi būti vėlesnis nei pradžios laikas');
      return;
    }

    // Update the work day with manual times
    const workDay = editingWorkDayId ? workDays.find(day => day.id === editingWorkDayId) : todayWorkDay;
    
    // Calculate total worked time
    let totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    
    // Subtract lunch break (1 hour = 60 minutes) if worked more than 4 hours
    if (totalMinutes > 240) { // 4 hours
      totalMinutes -= 60; // 1 hour lunch break
    }
    
    // Subtract pause time
    const pauseMinutes = workDay?.pauseEntries?.reduce((total, pause) => {
      if (pause.endTime) {
        const pauseStart = new Date(`2000-01-01T${pause.startTime}`);
        const pauseEnd = new Date(`2000-01-01T${pause.endTime}`);
        return total + (pauseEnd.getTime() - pauseStart.getTime()) / (1000 * 60);
      }
      return total;
    }, 0) || 0;
    
    totalMinutes -= pauseMinutes;
    const totalHours = Math.max(0, totalMinutes / 60);

    if (editingWorkDayId) {
      // Update historical work day
      await updateWorkDay(editingWorkDayId, {
        startTime: `${manualTimes.startTime}:00`,
        endTime: `${manualTimes.endTime}:00`,
        totalHours: Math.round(totalHours * 100) / 100
      });
    } else {
      // End the current work day with manual times
      await endWorkDay();
    }

    setShowManualTimeModal(false);
    setManualTimes({ startTime: '', endTime: '' });
    setEditingWorkDayId(null);
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

  // Generate hours and minutes arrays
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

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
                          onClick={handleManualTimeEntry}
                          className="btn btn-outline inline-flex items-center"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Rankiniu būdu
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Veiksmai
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {day.isCompleted && (
                          <button
                            onClick={() => handleEditWorkDay(day)}
                            className="btn btn-outline btn-sm inline-flex items-center"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Redaguoti laiką
                          </button>
                        )}
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

        {/* Circular Time Picker Modal */}
        {showTimeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pasirinkite darbo pradžios laiką
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Digital Time Display */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleDateString('lt-LT')}
                  </p>
                </div>

                {/* Time Pickers */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Hour Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                      Valandos
                    </label>
                    <div className="h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg">
                      {hours.map(hour => (
                        <button
                          key={hour}
                          onClick={() => setSelectedHour(hour)}
                          className={`w-full py-2 text-center transition-colors ${
                            selectedHour === hour
                              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {hour.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minute Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                      Minutės
                    </label>
                    <div className="h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg">
                      {minutes.filter(minute => minute % 5 === 0).map(minute => (
                        <button
                          key={minute}
                          onClick={() => setSelectedMinute(minute)}
                          className={`w-full py-2 text-center transition-colors ${
                            selectedMinute === minute
                              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {minute.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Time Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hour: 7, minute: 0, label: '07:00' },
                    { hour: 8, minute: 0, label: '08:00' },
                    { hour: 9, minute: 0, label: '09:00' },
                    { hour: 10, minute: 0, label: '10:00' }
                  ].map(time => (
                    <button
                      key={time.label}
                      onClick={() => {
                        setSelectedHour(time.hour);
                        setSelectedMinute(time.minute);
                      }}
                      className="btn btn-outline btn-sm"
                    >
                      {time.label}
                    </button>
                  ))}
                </div>

                {/* Manual Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Arba įveskite rankiniu būdu:
                  </label>
                  <input
                    type="time"
                    value={`${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`}
                    onChange={(e) => {
                      const [hour, minute] = e.target.value.split(':').map(Number);
                      setSelectedHour(hour);
                      setSelectedMinute(minute);
                    }}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowTimeModal(false);
                  }}
                  className="relative px-6 py-3 rounded-xl group overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl transition-all duration-300 group-hover:from-gray-200 group-hover:to-gray-300 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500"></div>
                  <div className="relative flex items-center justify-center font-medium text-gray-700 dark:text-gray-200 transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
                    <X className="h-4 w-4 mr-2" />
                    Atšaukti
                  </div>
                </button>
                <button
                  onClick={handleConfirmStartTime}
                  className="relative px-8 py-3 rounded-xl group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl transition-all duration-300 group-hover:from-primary-600 group-hover:via-secondary-600 group-hover:to-accent-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative flex items-center justify-center font-semibold text-white">
                    <Play className="h-5 w-5 mr-2" />
                    Pradėti darbo dieną
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}

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

        {/* Manual Time Entry Modal */}
        {showManualTimeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center mb-4">
                <Edit className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingWorkDayId ? 'Redaguoti darbo laiką' : 'Rankiniu būdu įvesti darbo laiką'}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Įveskite tikslų darbo pradžios ir pabaigos laiką. Pietų pertrauka (1h) bus automatiškai išskaičiuota.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Darbo pradžia
                  </label>
                  <input
                    type="time"
                    value={manualTimes.startTime}
                    onChange={(e) => setManualTimes(prev => ({ ...prev, startTime: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Darbo pabaiga
                  </label>
                  <input
                    type="time"
                    value={manualTimes.endTime}
                    onChange={(e) => setManualTimes(prev => ({ ...prev, endTime: e.target.value }))}
                    className="input"
                    required
                  />
                </div>

                {manualTimes.startTime && manualTimes.endTime && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      <strong>Darbo laikas:</strong> {manualTimes.startTime} - {manualTimes.endTime}
                      <br />
                      <strong>Iš viso:</strong> {(() => {
                        const start = new Date(`2000-01-01T${manualTimes.startTime}:00`);
                        const end = new Date(`2000-01-01T${manualTimes.endTime}:00`);
                        let totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
                        
                        if (totalMinutes > 240) totalMinutes -= 60; // Lunch break
                        
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = Math.round(totalMinutes % 60);
                        return `${hours}h ${minutes}min (su pietų pertrauka)`;
                      })()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowManualTimeModal(false);
                    setManualTimes({ startTime: '', endTime: '' });
                    setEditingWorkDayId(null);
                  }}
                  className="btn btn-outline"
                >
                  Atšaukti
                </button>
                <button
                  onClick={handleSaveManualTime}
                  disabled={!manualTimes.startTime || !manualTimes.endTime}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Išsaugoti laiką
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

export default StartWorkPage

export default StartWorkPage