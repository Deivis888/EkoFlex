import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Plus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const BusinessTripPage = () => {
  const { businessTrips, submitBusinessTrip } = useEmployee();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    departureDate: '',
    workWeeks: 1,
    vacationWeeks: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name.includes('Weeks') ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if departure date is at least 10 days from now
    const departureDate = new Date(formData.departureDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 10);
    
    if (departureDate < minDate) {
      alert('Komandiruotę galima pateikti tik prieš mažiausiai 10 dienų');
      return;
    }
    
    await submitBusinessTrip(formData);
    setFormData({
      departureDate: '',
      workWeeks: 1,
      vacationWeeks: 0
    });
    setShowAddModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Patvirtinta';
      case 'rejected':
        return 'Atmesta';
      default:
        return 'Laukia patvirtinimo';
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 10);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Komandiruotė
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Planuoti komandiruotę
          </button>
        </div>

        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Komandiruotę galima pateikti tik prieš mažiausiai 10 dienų. Visi prašymai bus peržiūrėti ir patvirtinti administracijos.
            </p>
          </div>
        </motion.div>

        {/* Business Trips List */}
        <div className="space-y-6">
          {businessTrips.length > 0 ? (
            businessTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
                      <Plane className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Komandiruotė
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Išvykimo data: {new Date(trip.departureDate).toLocaleDateString('lt-LT')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Darbo savaitės: {trip.workWeeks}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Atostogų savaitės: {trip.vacationWeeks}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Pateikta:</span>
                          <span className="ml-1">{new Date(trip.submittedAt).toLocaleDateString('lt-LT')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
                    {getStatusText(trip.status)}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nėra suplanuotų komandiruočių
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Pradėkite planuodami savo pirmą komandiruotę
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Planuoti komandiruotę
              </button>
            </div>
          )}
        </div>

        {/* Add Business Trip Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Planuoti komandiruotę
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Išvykimo data
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={minDateString}
                    className="input"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Mažiausiai 10 dienų nuo šiandien
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Darbo savaitės
                  </label>
                  <input
                    type="number"
                    name="workWeeks"
                    value={formData.workWeeks}
                    onChange={handleInputChange}
                    min="1"
                    max="52"
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Atostogų savaitės
                  </label>
                  <input
                    type="number"
                    name="vacationWeeks"
                    value={formData.vacationWeeks}
                    onChange={handleInputChange}
                    min="0"
                    max="12"
                    className="input"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                  >
                    Atšaukti
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Pateikti prašymą
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessTripPage;