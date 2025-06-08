import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Edit, Trash2, Building } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const ProfessionPage = () => {
  const { professions, addProfession } = useEmployee();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    experienceYears: 0,
    startDate: '',
    endDate: '',
    company: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'experienceYears' ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProfession(formData);
    setFormData({
      title: '',
      experienceYears: 0,
      startDate: '',
      endDate: '',
      company: '',
      description: ''
    });
    setShowAddModal(false);
  };

  const professionSuggestions = [
    'Stalius',
    'Montuotojas',
    'Elektrikas',
    'Santechnikas',
    'Suvirintojas',
    'Dažytojas',
    'Plytelių klojėjas',
    'Betonuotojas',
    'Stogdengys',
    'Izoliacijos specialistas'
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profesija
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Pridėti profesiją
          </button>
        </div>

        {/* Professions List */}
        <div className="space-y-6">
          {professions.length > 0 ? (
            professions.map((profession) => (
              <motion.div
                key={profession.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
                      <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {profession.title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>{profession.company}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Patirtis:</span>
                          <span className="ml-1">{profession.experienceYears} metai</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Laikotarpis:</span>
                          <span className="ml-1">
                            {new Date(profession.startDate).toLocaleDateString('lt-LT')}
                            {profession.endDate && ` - ${new Date(profession.endDate).toLocaleDateString('lt-LT')}`}
                            {!profession.endDate && ' - dabar'}
                          </span>
                        </div>
                      </div>
                      {profession.description && (
                        <p className="mt-3 text-gray-700 dark:text-gray-300">
                          {profession.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn btn-outline btn-sm inline-flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Redaguoti
                    </button>
                    <button className="btn btn-outline btn-sm text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 inline-flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Šalinti
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nėra pridėtų profesijų
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Pradėkite pridėdami savo pirmą profesiją
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Pridėti profesiją
              </button>
            </div>
          )}
        </div>

        {/* Add Profession Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Pridėti profesiją
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profesijos pavadinimas
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Pvz., Stalius"
                    required
                    list="profession-suggestions"
                  />
                  <datalist id="profession-suggestions">
                    {professionSuggestions.map(suggestion => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Patirties metai
                    </label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className="input"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Įmonė
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Įmonės pavadinimas"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pradžios data
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pabaigos data (neprivaloma)
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Aprašymas (neprivaloma)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="input"
                    placeholder="Trumpas darbo aprašymas..."
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
                    Išsaugoti
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

export default ProfessionPage;