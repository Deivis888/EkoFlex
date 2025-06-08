import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wind, Activity, BarChart, Shield, Users, ChevronRight, Check, Clock, FileCheck, PenTool as Tool, HelpCircle
} from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Wind className="h-8 w-8" />,
      title: t('home.services.ventilation.title'),
      description: t('home.services.ventilation.description'),
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: t('home.services.airflow.title'),
      description: t('home.services.airflow.description'),
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: t('home.services.efficiency.title'),
      description: t('home.services.efficiency.description'),
    }
  ];

  const benefits = [
    {
      title: t('home.benefits.technology.title'),
      description: t('home.benefits.technology.description')
    },
    {
      title: t('home.benefits.installation.title'),
      description: t('home.benefits.installation.description')
    },
    {
      title: t('home.benefits.custom.title'),
      description: t('home.benefits.custom.description')
    },
    {
      title: t('home.benefits.quality.title'),
      description: t('home.benefits.quality.description')
    }
  ];

  const measurementFeatures = [
    {
      icon: <Tool className="h-6 w-6" />,
      title: t('home.measurement.equipment.title'),
      description: t('home.measurement.equipment.description')
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('home.measurement.process.title'),
      description: t('home.measurement.process.description')
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: t('home.measurement.reports.title'),
      description: t('home.measurement.reports.description')
    }
  ];

  const commonQuestions = [
    {
      question: t('home.faq.frequency.question'),
      answer: t('home.faq.frequency.answer')
    },
    {
      question: t('home.faq.standards.question'),
      answer: t('home.faq.standards.answer')
    },
    {
      question: t('home.faq.areas.question'),
      answer: t('home.faq.areas.answer')
    }
  ];

  const stats = [
    { value: '500+', label: t('home.stats.vessels') },
    { value: '15+', label: t('home.stats.experience') },
    { value: '100%', label: t('home.stats.satisfaction') }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/SOVoV5t.jpeg"
            alt="Marine Ventilation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="btn btn-primary btn-lg group"
              >
                {t('home.hero.cta')}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Installation Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('home.installation.title')}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {t('home.installation.description')}
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 p-1">
                      <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-1">
                        <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.clientSatisfaction')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.yearsExperience')}</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img 
                  src="https://i.imgur.com/7e6sVYr.jpeg"
                  alt="Ventilation system installation"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">{t('home.installation.expertInstallation')}</p>
                    <p className="text-xs opacity-75">{t('home.installation.marineGrade')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">{t('home.services.title')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('home.services.subtitle')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                {index === 0 && (
                  <Link 
                    to="/services/ventilation-installation" 
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm mt-2"
                  >
                    Learn More →
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Airflow Measurement Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('home.measurement.title')}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                {t('home.measurement.description')}
              </p>

              <div className="space-y-6 mb-8">
                {measurementFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2" />
                  {t('home.faq.title')}
                </h3>
                {commonQuestions.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-primary-600 dark:text-primary-400">
                      {item.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img 
                src="https://i.imgur.com/1PdhAmu.jpeg"
                alt="Technician measuring airflow"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/UfS2AvC.jpeg"
            alt="Marine Ventilation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t('home.cta.title')}</h2>
              <p className="text-xl text-gray-200 mb-8">
                {t('home.cta.description')}
              </p>
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
              >
                {t('home.cta.button')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;