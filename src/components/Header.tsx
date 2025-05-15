import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: t('navigation.home') },
    { href: '/market', label: t('navigation.market') },
    { href: '/services', label: t('navigation.services') },
    { href: '/about', label: t('navigation.about') },
    { href: '/works', label: t('navigation.works') },
    { href: '/careers', label: t('navigation.careers') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-1'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <img 
              src="https://i.imgur.com/7rNwjuG.png" 
              alt="EkoFlex Logo" 
              className={`transition-all duration-300 ${
                scrolled ? 'h-6' : 'h-8'
              } w-auto`}
            />
            <span className={`text-xs font-medium text-gray-600 dark:text-gray-400 transition-all duration-300 ${
              scrolled ? 'opacity-0 h-0 mt-0' : 'opacity-100 mt-0.5'
            }`}>
              {t('branding.slogan')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === link.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="flex items-center space-x-2 ml-4">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm"
              >
                {t('navigation.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
              >
                {t('navigation.register')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium p-2 rounded-md transition-colors ${
                    location.pathname === link.href
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <Link
                to="/login"
                className="btn btn-ghost btn-md justify-start"
              >
                {t('navigation.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-md justify-start"
              >
                {t('navigation.register')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;