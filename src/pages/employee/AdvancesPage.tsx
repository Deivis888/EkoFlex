import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Euro, Plus, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const AdvancesPage = () => {
  const { advanceRequests, requestAdvance } = useEmployee();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(200);

  // Check how many requests this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthRequests = advanceRequests.filter(request => {
    const requestDate = new Date(request.requestDate);
    return requestDate.getMonth() === currentMonth && requestDate.getFullYear() === currentYear;
  });

  const canRequestAdvance = thisMonthRequests.length < 2;

  const handleRequestAdvance = async () => {
    if (canRequestAdvance && requestAmount > 0) {
      await requestAdvance(requestAmount);
      setShowRequestModal(false);
      setRequestAmount(200);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    }
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
        return 'Laukia sprendimo';
    }
  };

  const suggestedAmounts = [100, 200, 300, 500, 800, 1000];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Avansai
          </h1>
          <button
            onClick={() => setShowRequestModal(true)}
            disabled={!canRequestAdvance}
            className="btn btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Prašyti avanso
          </button>
        </div>

        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-lg p-4 mb-6 ${
            canRequestAdvance 
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }`}
        >
          <div className="flex items-center">
            <AlertCircle className={`h-5 w-5 mr-2 ${
              canRequestAdvance 
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-orange-600 dark:text-orange-400'
            }`} />
            <p className={`text-sm ${
              canRequestAdvance 
                ? 'text-blue-800 dark:text-blue-200'
                : 'text-orange-800 dark:text-orange-200'
            }`}>
              {canRequestAdvance 
                ? `Galite prašyti avanso ${2 - thisMonthRequests.length} kartus šį mėnesį.`
                : 'Šį mėnesį jau panaudojote visus avanso prašymus (2/2).'
              }
            </p>
          </div>
        </motion.div>

        {/* Advance Requests List */}
        <div className="space-y-6">
          {advanceRequests.length > 0 ? (
            advanceRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
                      <Euro className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Avanso prašymas
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-2" />
                          <span className="font-medium">Suma: {request.amount} {request.currency}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Pateikta: {new Date(request.requestDate).toLocaleDateString('lt-LT')}</span>
                        </div>
                        {request.approvedBy && request.approvedAt && (
                          <div className="flex items-center">
                            <span className="font-medium">Patvirtino:</span>
                            <span className="ml-1">{request.approvedBy}</span>
                            <span className="ml-2">({new Date(request.approvedAt).toLocaleDateString('lt-LT')})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Euro className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nėra avanso prašymų
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Galite prašyti avanso iki 2 kartų per mėnesį
              </p>
              <button
                onClick={() => setShowRequestModal(true)}
                disabled={!canRequestAdvance}
                className="btn btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Prašyti avanso
              </button>
            </div>
          )}
        </div>

        {/* Request Advance Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Prašyti avanso
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Avanso suma (EUR)
                  </label>
                  
                  {/* Suggested amounts */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {suggestedAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setRequestAmount(amount)}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          requestAmount === amount
                            ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-300'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {amount}€
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(parseInt(e.target.value) || 0)}
                    min="50"
                    max="2000"
                    step="50"
                    className="input"
                    placeholder="Įveskite sumą"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Minimali suma: 50€, maksimali: 2000€
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Pastaba:</strong> Avansas bus išskaičiuotas iš kito atlyginimo. Galite prašyti avanso iki 2 kartų per mėnesį.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="btn btn-outline"
                  >
                    Atšaukti
                  </button>
                  <button
                    onClick={handleRequestAdvance}
                    disabled={requestAmount < 50 || requestAmount > 2000}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pateikti prašymą
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancesPage;