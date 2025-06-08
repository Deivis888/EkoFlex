import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AtSign, Lock, Facebook, Eye, EyeOff } from 'lucide-react';
import { useEmployee } from '../contexts/EmployeeContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login: employeeLogin } = useEmployee();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Check if this is an employee login
      if (email.includes('@ekoflex.lt')) {
        const success = await employeeLogin(email, password);
        if (success) {
          navigate('/employee/dashboard');
          return;
        } else {
          throw new Error('Neteisingas el. paštas arba slaptažodis. Bandykite: jonas.petraitis@ekoflex.lt / password123');
        }
      }
      
      // Regular client login (mock)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === '' || password === '') {
        throw new Error('Prašome užpildyti visus laukus');
      }
      
      // For now, just show success message for non-employee logins
      console.log('Client logged in with:', { email, password });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('auth.login.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
              {t('auth.login.createAccount')}
            </Link>
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Darbuotojams:</strong> Naudokite savo @ekoflex.lt el. paštą<br />
              <strong>Demo:</strong> jonas.petraitis@ekoflex.lt / password123
            </p>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.login.email')}
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
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.login.password')}
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
                onClick={togglePasswordVisibility}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-12 rounded-lg group overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
              <div className="absolute top-0 left-0 w-1/4 h-full bg-[#007acc] transform origin-right group-hover:scale-x-150"></div>
              <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#0099ff] transform origin-right group-hover:scale-x-150"></div>
              <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#ff7e15] transform origin-right group-hover:scale-x-150"></div>
              <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#ff6205] transform origin-right group-hover:scale-x-150"></div>
            </div>
            <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-[0.99]">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-primary-600\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  {t('auth.login.loginButton')}
                </span>
              )}
            </div>
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {t('auth.login.orContinueWith')}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="relative w-full h-12 rounded-lg group overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
                <div className="absolute top-0 left-0 w-1/4 h-full bg-[#4285f4] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#ea4335] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#fbbc05] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#34a853] transform origin-right group-hover:scale-x-150"></div>
              </div>
              <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center space-x-2 transition-transform group-hover:scale-[0.99]">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Google</span>
              </div>
            </button>
            
            <button
              type="button"
              className="relative w-full h-12 rounded-lg group overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
                <div className="absolute top-0 left-0 w-1/4 h-full bg-[#1877f2] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#0d6efd] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#0b5ed7] transform origin-right group-hover:scale-x-150"></div>
                <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#0a58ca] transform origin-right group-hover:scale-x-150"></div>
              </div>
              <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center space-x-2 transition-transform group-hover:scale-[0.99]">
                <Facebook className="h-6 w-6 text-[#1877f2]" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Facebook</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;