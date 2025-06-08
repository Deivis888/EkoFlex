import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, Lock, Eye, EyeOff, AlertCircle, Building2 } from 'lucide-react';
import { useEmployee } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useEmployee();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/employee/dashboard');
      } else {
        setError('Neteisingas el. paštas arba slaptažodis. Bandykite: jonas.petraitis@ekoflex.lt / password123');
      }
    } catch (err) {
      setError('Įvyko klaida. Bandykite dar kartą.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              EkoFlex Darbuotojai
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Prisijunkite prie savo darbuotojo paskyros
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                El. paštas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input pl-10"
                  placeholder="jonas.petraitis@ekoflex.lt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slaptažodis
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-12 rounded-lg group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
                <div className="absolute top-0 left-0 w-1/4 h-full bg-[#007acc] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#0099ff] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#ff7e15] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#ff6205] transform origin-right group-hover:scale-x-150"></div>
              </div>
              <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-[0.99]">
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-primary-600\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24">
                    <circle className="opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" strokeWidth=\"4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    Prisijungti
                  </span>
                )}
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Demo prisijungimo duomenys:<br />
              El. paštas: jonas.petraitis@ekoflex.lt<br />
              Slaptažodis: password123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeLoginPage;