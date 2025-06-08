import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Lock, Mail, Bell, Phone, 
  Save, Edit, Eye, EyeOff, AlertCircle 
} from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const SettingsPage = () => {
  const { employee, updateProfile, updateEmergencyContact, updatePassword } = useEmployee();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: employee?.name || '',
    surname: employee?.surname || '',
    email: employee?.email || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Emergency contact form state
  const [emergencyData, setEmergencyData] = useState({
    name: employee?.emergencyContact?.name || '',
    phone: employee?.emergencyContact?.phone || '',
    relationship: employee?.emergencyContact?.relationship || ''
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    workReminders: true,
    paymentNotifications: true
  });

  const handleProfileSave = async () => {
    await updateProfile(profileData);
    alert('Profilio duomenys atnaujinti sėkmingai');
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Slaptažodžiai nesutampa');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Slaptažodis turi būti bent 8 simbolių');
      return;
    }
    
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Slaptažodis pakeistas sėkmingai');
    } catch (error) {
      alert('Klaida keičiant slaptažodį');
    }
  };

  const handleEmergencyContactSave = async () => {
    await updateEmergencyContact(emergencyData);
    alert('Avarinės situacijos kontaktas atnaujintas sėkmingai');
  };

  const tabs = [
    { id: 'profile', label: 'Profilio informacija', icon: <User className="h-4 w-4" /> },
    { id: 'password', label: 'Slaptažodis', icon: <Lock className="h-4 w-4" /> },
    { id: 'emergency', label: 'Avarinės situacijos kontaktas', icon: <Phone className="h-4 w-4" /> },
    { id: 'notifications', label: 'Pranešimai', icon: <Bell className="h-4 w-4" /> }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          Nustatymai
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-3">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Profilio informacija
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Vardas
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pavardė
                        </label>
                        <input
                          type="text"
                          value={profileData.surname}
                          onChange={(e) => setProfileData(prev => ({ ...prev, surname: e.target.value }))}
                          className="input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        El. paštas
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <button
                      onClick={handleProfileSave}
                      className="btn btn-primary inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Išsaugoti pakeitimus
                    </button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Keisti slaptažodį
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dabartinis slaptažodis
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="input pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Naujas slaptažodis
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="input pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Mažiausiai 8 simboliai
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Patvirtinti naują slaptažodį
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="input pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordSave}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="btn btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Pakeisti slaptažodį
                    </button>
                  </div>
                </div>
              )}

              {/* Emergency Contact Tab */}
              {activeTab === 'emergency' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Avarinės situacijos kontaktas
                  </h2>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Šis kontaktas bus naudojamas nelaimės atveju arba skubiais atvejais.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Vardas ir pavardė
                      </label>
                      <input
                        type="text"
                        value={emergencyData.name}
                        onChange={(e) => setEmergencyData(prev => ({ ...prev, name: e.target.value }))}
                        className="input"
                        placeholder="Pvz., Ona Petraitienė"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Telefono numeris
                      </label>
                      <input
                        type="tel"
                        value={emergencyData.phone}
                        onChange={(e) => setEmergencyData(prev => ({ ...prev, phone: e.target.value }))}
                        className="input"
                        placeholder="+37060123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ryšys
                      </label>
                      <input
                        type="text"
                        value={emergencyData.relationship}
                        onChange={(e) => setEmergencyData(prev => ({ ...prev, relationship: e.target.value }))}
                        className="input"
                        placeholder="Pvz., Žmona, Tėvas, Brolis"
                      />
                    </div>

                    <button
                      onClick={handleEmergencyContactSave}
                      className="btn btn-primary inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Išsaugoti kontaktą
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Pranešimų nustatymai
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            El. pašto pranešimai
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gauti pranešimus el. paštu apie svarbius įvykius
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailNotifications}
                            onChange={(e) => setNotifications(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            SMS pranešimai
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gauti SMS pranešimus apie skubius įvykius
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.smsNotifications}
                            onChange={(e) => setNotifications(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Darbo priminimai
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gauti priminimus apie darbo pradžią ir pabaigą
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.workReminders}
                            onChange={(e) => setNotifications(prev => ({ ...prev, workReminders: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Mokėjimų pranešimai
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gauti pranešimus apie atlyginimo ir avansų mokėjimus
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.paymentNotifications}
                            onChange={(e) => setNotifications(prev => ({ ...prev, paymentNotifications: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Pranešimų nustatymai išsaugoti')}
                      className="btn btn-primary inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Išsaugoti nustatymus
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;