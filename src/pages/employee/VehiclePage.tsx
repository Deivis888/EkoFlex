import React from 'react';
import { motion } from 'framer-motion';
import { Car, Check, X, Clock } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const VehiclePage = () => {
  const { vehicles, acceptVehicle, rejectVehicle } = useEmployee();

  const handleAcceptVehicle = async (vehicleId: string) => {
    await acceptVehicle(vehicleId);
  };

  const handleRejectVehicle = async (vehicleId: string) => {
    await rejectVehicle(vehicleId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Priimta';
      case 'rejected':
        return 'Atmesta';
      default:
        return 'Laukia sprendimo';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Transporto priemonė
        </h1>

        {vehicles.length > 0 ? (
          <div className="space-y-6">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {vehicle.photo && (
                    <div>
                      <img
                        src={vehicle.photo}
                        alt={vehicle.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {vehicle.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Valstybinis numeris: {vehicle.licensePlate}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          Priskirta: {new Date(vehicle.assignedDate).toLocaleDateString('lt-LT')} {vehicle.assignedTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                        {getStatusText(vehicle.status)}
                      </span>
                      
                      {vehicle.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleRejectVehicle(vehicle.id)}
                            className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 inline-flex items-center"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Atsisakyti
                          </button>
                          <button
                            onClick={() => handleAcceptVehicle(vehicle.id)}
                            className="btn btn-primary inline-flex items-center"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Priimti
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nėra priskirtų transporto priemonių
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transporto priemonės bus rodomos čia, kai jos bus jums priskirtos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePage;