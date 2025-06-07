import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, Users, Target, Shield, 
  Clock, Globe, CheckCircle2, Zap
} from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '15+', label: t('about.stats.experience') },
    { value: '500+', label: t('about.stats.projects') },
    { value: '50+', label: t('about.stats.team') },
    { value: '100%', label: t('about.stats.satisfaction') }
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('about.values.qualityFirst.title'),
      description: t('about.values.qualityFirst.description')
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('about.values.expertTeam.title'),
      description: t('about.values.expertTeam.description')
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: t('about.values.globalReach.title'),
      description: t('about.values.globalReach.description')
    }
  ];

  const certifications = [
    t('about.certifications.iso9001'),
    t('about.certifications.maritime'),
    t('about.certifications.environmental'),
    t('about.certifications.classification')
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/paUSZRC.jpeg"
            alt="About EkoFlex"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">{t('about.story.title')}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.story.description1')}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.story.description2')}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('about.certifications.title')}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('about.values.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="card p-6">
                    <div className="text-primary-600 dark:text-primary-400 mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/UfS2AvC.jpeg"
            alt="Marine Ventilation CTA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-2xl font-bold mb-4">{t('about.cta.title')}</h2>
            <p className="text-gray-200 mb-8">
              {t('about.cta.description')}
            </p>
            <Link
              to="/contact"
              className="btn btn-primary btn-lg"
            >
              {t('about.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;