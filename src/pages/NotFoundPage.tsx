import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          {t('notFound.title')}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('notFound.description')}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-primary btn-lg inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('notFound.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;