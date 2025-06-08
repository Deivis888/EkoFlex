import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wind, Wrench, ShieldCheck, Cog, LineChart, 
  Activity, Droplet, Fan, Ruler, Thermometer, 
  Gauge, PenTool as Tool, AlertTriangle, CheckCircle2,
  Send, Mail, Phone
} from 'lucide-react';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'installation',
      icon: <Wind className="h-10 w-10" />,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      features: [
        t('services.installation.features.systemDesign'),
        t('services.installation.features.customDuctwork'),
        t('services.installation.features.airHandling'),
        t('services.installation.features.controlSystem'),
        t('services.installation.features.fireDamper'),
        t('services.installation.features.heatRecovery'),
        t('services.installation.features.testing')
      ]
    },
    {
      id: 'airflow',
      icon: <Fan className="h-10 w-10" />,
      title: t('services.airflow.title'),
      description: t('services.airflow.description'),
      features: [
        t('services.airflow.features.digitalReadings'),
        t('services.airflow.features.pressureTesting'),
        t('services.airflow.features.volumeCalculation'),
        t('services.airflow.features.temperatureMonitoring'),
        t('services.airflow.features.airQualityAssessment'),
        t('services.airflow.features.systemBalance'),
        t('services.airflow.features.detailedReporting')
      ]
    },
    {
      id: 'safety',
      icon: <AlertTriangle className="h-10 w-10" />,
      title: t('services.safety.title'),
      description: t('services.safety.description'),
      features: [
        t('services.safety.features.fireDamperInstallation'),
        t('services.safety.features.smokeControl'),
        t('services.safety.features.emergencyShutdown'),
        t('services.safety.features.safetyCertification'),
        t('services.safety.features.regularTesting'),
        t('services.safety.features.complianceVerification'),
        t('services.safety.features.documentation')
      ]
    },
    {
      id: 'maintenance',
      icon: <Wrench className="h-10 w-10" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      features: [
        t('services.maintenance.features.scheduledInspections'),
        t('services.maintenance.features.filterReplacement'),
        t('services.maintenance.features.systemCleaning'),
        t('services.maintenance.features.performanceOptimization'),
        t('services.maintenance.features.emergencyRepairs'),
        t('services.maintenance.features.preventiveMaintenance'),
        t('services.maintenance.features.componentUpgrades')
      ]
    }
  ];

  const installationSteps = [
    {
      icon: <Tool className="h-8 w-8" />,
      title: t('services.installationProcess.designPlanning.title'),
      description: t('services.installationProcess.designPlanning.description'),
      features: [
        t('services.installationProcess.designPlanning.features.vesselAnalysis'),
        t('services.installationProcess.designPlanning.features.systemModeling'),
        t('services.installationProcess.designPlanning.features.componentSelection')
      ]
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: t('services.installationProcess.installation.title'),
      description: t('services.installationProcess.installation.description'),
      features: [
        t('services.installationProcess.installation.features.componentSetup'),
        t('services.installationProcess.installation.features.systemIntegration'),
        t('services.installationProcess.installation.features.qualityControl')
      ]
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: t('services.installationProcess.testing.title'),
      description: t('services.installationProcess.testing.description'),
      features: [
        t('services.installationProcess.testing.features.performanceTests'),
        t('services.installationProcess.testing.features.balanceChecks'),
        t('services.installationProcess.testing.features.safetyVerification')
      ]
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: t('services.installationProcess.certification.title'),
      description: t('services.installationProcess.certification.description'),
      features: [
        t('services.installationProcess.certification.features.complianceCheck'),
        t('services.installationProcess.certification.features.documentation'),
        t('services.installationProcess.certification.features.finalApproval')
      ]
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{t('services.seo.title')}</title>
      <meta name="description" content={t('services.seo.description')} />
      <meta name="keywords" content={t('services.seo.keywords')} />

      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/Zj5T05N.jpeg"
            alt="Marine Services"
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
            <h1 className="text-4xl font-bold mb-4">{t('services.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <p className="text-lg leading-relaxed">
                  {t('services.seo.introduction')}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t('services.seo.marineEngineering.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('services.seo.marineEngineering.content')}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t('services.seo.hvacSystems.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('services.seo.hvacSystems.content')}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t('services.seo.installation.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('services.seo.installation.content')}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t('services.seo.expertise.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('services.seo.expertise.content')}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t('services.seo.efficiency.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('services.seo.efficiency.content')}
                </p>

                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-3">
                    {t('services.seo.whyChoose.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 dark:text-primary-300">
                    <li>{t('services.seo.whyChoose.experience')}</li>
                    <li>{t('services.seo.whyChoose.certified')}</li>
                    <li>{t('services.seo.whyChoose.comprehensive')}</li>
                    <li>{t('services.seo.whyChoose.support')}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 text-primary-600 dark:text-primary-400 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                      <span className="mr-2 text-primary-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center mb-12">{t('services.installationProcess.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {installationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{step.description}</p>
                <ul className="text-left space-y-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                      <span className="mr-2 text-primary-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">{t('services.consultation.title')}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('services.consultation.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">info@ekoflex.lt</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">+37069018889</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-lg inline-flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {t('services.consultation.cta')}
                </Link>
                <Link
                  to="/market"
                  className="btn btn-outline btn-lg"
                >
                  {t('services.consultation.learnMore')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            <h2 className="text-2xl font-bold mb-4">{t('services.cta.title')}</h2>
            <p className="text-gray-200 mb-8">
              {t('services.cta.description')}
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary btn-lg"
            >
              {t('services.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;