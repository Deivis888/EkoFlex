import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Camera, MapPin, Phone, Mail, 
  Calendar, Globe, ArrowLeft, Save,
  Upload, X
} from 'lucide-react';
import { useEmployee } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';

const EmployeeProfilePage = () => {
  const { employee, updateProfile } = useEmployee();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee || {});
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      let photoUrl = formData.profilePhoto;
      
      if (profilePhoto) {
        // In a real app, you would upload the photo to a server
        photoUrl = URL.createObjectURL(profilePhoto);
      }
      
      await updateProfile({
        ...formData,
        profilePhoto: photoUrl
      });
      
      setIsEditing(false);
      setProfilePhoto(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/employee/dashboard')}
                className="mr-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profilis
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Atšaukti
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary btn-sm inline-flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Išsaugoti
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary btn-sm"
                >
                  Redaguoti
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={previewUrl || employee.profilePhoto || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {employee.name} {employee.surname}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{employee.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Darbuotojas nuo {new Date(employee.createdAt).toLocaleDateString('lt-LT')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Asmeninė informacija
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vardas
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pavardė
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="surname"
                  value={formData.surname || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.surname}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gimimo data
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {new Date(employee.birthDate).toLocaleDateString('lt-LT')}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tautybė
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.nationality}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Adresai
          </h3>
          
          <div className="space-y-6">
            {/* Registration Address */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Registracijos adresas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Šalis
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="registrationAddress.country"
                      value={formData.registrationAddress?.country || ''}
                      onChange={handleInputChange}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{employee.registrationAddress.country}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Miestas
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="registrationAddress.city"
                      value={formData.registrationAddress?.city || ''}
                      onChange={handleInputChange}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{employee.registrationAddress.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gatvė
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="registrationAddress.street"
                      value={formData.registrationAddress?.street || ''}
                      onChange={handleInputChange}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{employee.registrationAddress.street}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assigned Address */}
            {employee.assignedAddress && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Priskirtas adresas užsienyje</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    {employee.assignedAddress.street} {employee.assignedAddress.houseNumber}, {employee.assignedAddress.city}, {employee.assignedAddress.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Avarinės situacijos kontaktas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vardas
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact?.name || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.emergencyContact.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefonas
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.emergencyContact.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ryšys
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={handleInputChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{employee.emergencyContact.relationship}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;