import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();

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
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img 
                src="https://i.imgur.com/7rNwjuG.png" 
                alt="EkoFlex Logo" 
                className="h-8 w-auto"
              />
              <span className="block text-sm font-medium mt-0.5 mb-2 text-gray-600 dark:text-gray-400">
                {t('branding.slogan')}
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional ventilation solutions for ships and industrial facilities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Contact Us
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chemijos g. 27C-62, LT-51332 Kaunas, Lithuania
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: info@ekoflex.lt
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phone: +37069018889
              </p>
            </address>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Language
            </h3>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-4 text-xs">
            <Link to="/privacy" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;