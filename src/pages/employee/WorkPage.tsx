import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Camera, Calendar, Clock, FileText, Download } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const WorkPage = () => {
  const { workEntries, addWorkEntry } = useEmployee();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(':').slice(0, 2).join(':'),
    description: '',
    photos: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const photoUrls = formData.photos.map(photo => URL.createObjectURL(photo));
    
    await addWorkEntry({
      date: formData.date,
      time: formData.time,
      description: formData.description,
      photos: photoUrls
    });

    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(':').slice(0, 2).join(':'),
      description: '',
      photos: []
    });
    setShowAddModal(false);
  };

  const exportToPDF = () => {
    // Mock PDF export - in real app, this would generate a PDF
    alert('PDF eksportavimas bus įgyvendintas su tikra sistema');
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Atlikti darbai
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={exportToPDF}
              className="btn btn-outline inline-flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Eksportuoti PDF
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Pridėti darbą
            </button>
          </div>
        </div>

        {/* Work Entries */}
        <div className="space-y-6">
          {workEntries.length > 0 ? (
            workEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(entry.date).toLocaleDateString('lt-LT')}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      {entry.time}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Darbo aprašymas:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {entry.description}
                  </p>
                </div>

                {entry.photos.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Nuotraukos:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {entry.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Darbo nuotrauka ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(photo, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nėra atliktų darbų
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Pradėkite pridėdami savo pirmą darbo įrašą
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Pridėti darbą
              </button>
            </div>
          )}
        </div>

        {/* Add Work Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Pridėti atliktą darbą
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Laikas
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Darbo aprašymas
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="input"
                    placeholder="Aprašykite atliktą darbą..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nuotraukos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <label className="cursor-pointer">
                        <span className="text-primary-600 dark:text-primary-400 hover:underline">
                          Pasirinkite nuotraukas
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  
                  {formData.photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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

export default WorkPage;