import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit, Save, X } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const AddressesPage = () => {
  const { employee, updateProfile } = useEmployee();
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    postalCode: ''
  });

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = async () => {
    if (employee) {
      await updateProfile({
        newAddress: newAddress
      });
      setIsEditingNew(false);
      setNewAddress({
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        apartmentNumber: '',
        postalCode: ''
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Adresai
        </h1>

        <div className="space-y-6">
          {/* Registration Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Registracijos adresas
            </h2>
            {employee && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-900 dark:text-white">
                  {employee.registrationAddress.street} {employee.registrationAddress.houseNumber}
                  {employee.registrationAddress.apartmentNumber && `-${employee.registrationAddress.apartmentNumber}`}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {employee.registrationAddress.city}, {employee.registrationAddress.country}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {employee.registrationAddress.postalCode}
                </p>
              </div>
            )}
          </motion.div>

          {/* Assigned Address */}
          {employee?.assignedAddress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Darbdavio priskirtas adresas užsienyje
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-blue-900 dark:text-blue-100">
                  {employee.assignedAddress.street} {employee.assignedAddress.houseNumber}
                  {employee.assignedAddress.apartmentNumber && `-${employee.assignedAddress.apartmentNumber}`}
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  {employee.assignedAddress.city}, {employee.assignedAddress.country}
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  {employee.assignedAddress.postalCode}
                </p>
              </div>
            </motion.div>
          )}

          {/* New Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Naujas adresas (susitarimas su kitais darbuotojais)
              </h2>
              {!isEditingNew && !employee?.newAddress && (
                <button
                  onClick={() => setIsEditingNew(true)}
                  className="btn btn-primary btn-sm inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Pridėti adresą
                </button>
              )}
            </div>

            {employee?.newAddress && !isEditingNew ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-900 dark:text-green-100">
                  {employee.newAddress.street} {employee.newAddress.houseNumber}
                  {employee.newAddress.apartmentNumber && `-${employee.newAddress.apartmentNumber}`}
                </p>
                <p className="text-green-700 dark:text-green-300">
                  {employee.newAddress.city}, {employee.newAddress.country}
                </p>
                <p className="text-green-700 dark:text-green-300">
                  {employee.newAddress.postalCode}
                </p>
                <button
                  onClick={() => setIsEditingNew(true)}
                  className="mt-3 btn btn-outline btn-sm inline-flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Redaguoti
                </button>
              </div>
            ) : isEditingNew ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Šalis
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={newAddress.country}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., Norvegija"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Miestas
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., Oslo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Gatvė
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., Karl Johans gate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Namo numeris
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={newAddress.houseNumber}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., 15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Buto numeris (neprivaloma)
                    </label>
                    <input
                      type="text"
                      name="apartmentNumber"
                      value={newAddress.apartmentNumber}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., 25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pašto kodas
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleNewAddressChange}
                      className="input"
                      placeholder="Pvz., 0159"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveNewAddress}
                    className="btn btn-primary inline-flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Išsaugoti
                  </button>
                  <button
                    onClick={() => setIsEditingNew(false)}
                    className="btn btn-outline inline-flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Atšaukti
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Nėra pridėto naujo adreso
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;