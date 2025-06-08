import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Save, Edit, Eye, EyeOff } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const BankPage = () => {
  const { employee, updateBankDetails } = useEmployee();
  const [isEditing, setIsEditing] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [formData, setFormData] = useState({
    bankName: employee?.bankDetails?.bankName || '',
    accountNumber: employee?.bankDetails?.accountNumber || '',
    swiftCode: employee?.bankDetails?.swiftCode || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateBankDetails(formData);
    setIsEditing(false);
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return '';
    const visible = accountNumber.slice(-4);
    const masked = '*'.repeat(Math.max(0, accountNumber.length - 4));
    return masked + visible;
  };

  const lithuanianBanks = [
    'SEB Bank',
    'Swedbank',
    'Luminor Bank',
    'Šiaulių bankas',
    'Medicinos bankas',
    'Citadele Bank',
    'Revolut',
    'Paysera'
  ];

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Banko duomenys
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary btn-sm inline-flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Redaguoti
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center mb-6">
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
              <CreditCard className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Banko sąskaitos informacija
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Atlyginimo pervedimai bus atliekami į šią sąskaitą
              </p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Banko pavadinimas
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Pasirinkite banką"
                  list="bank-suggestions"
                  required
                />
                <datalist id="bank-suggestions">
                  {lithuanianBanks.map(bank => (
                    <option key={bank} value={bank} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sąskaitos numeris (IBAN)
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="LT12 3456 7890 1234 5678"
                  pattern="[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Įveskite IBAN formatą (pvz., LT12 3456 7890 1234 5678)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SWIFT kodas
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="CBVILT2X"
                  pattern="[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  8 arba 11 simbolių SWIFT kodas
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="btn btn-primary inline-flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Išsaugoti
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                >
                  Atšaukti
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {employee?.bankDetails ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Banko pavadinimas
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {employee.bankDetails.bankName}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SWIFT kodas
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {employee.bankDetails.swiftCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sąskaitos numeris
                    </label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 dark:text-white font-medium font-mono">
                        {showAccountNumber 
                          ? employee.bankDetails.accountNumber 
                          : maskAccountNumber(employee.bankDetails.accountNumber)
                        }
                      </p>
                      <button
                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showAccountNumber ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      ✓ Banko duomenys sėkmingai išsaugoti. Atlyginimo pervedimai bus atliekami į šią sąskaitą.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nėra banko duomenų
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Pridėkite banko duomenis, kad galėtumėte gauti atlyginimą
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary inline-flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Pridėti banko duomenis
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BankPage;