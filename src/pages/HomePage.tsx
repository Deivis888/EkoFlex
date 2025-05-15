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
      title: "Advanced Technology",
      description: "State-of-the-art ventilation systems with smart controls and energy optimization"
    },
    {
      title: "Expert Installation",
      description: "Certified technicians with extensive marine ventilation experience"
    },
    {
      title: "Custom Solutions",
      description: "Tailored systems designed specifically for your vessel's requirements"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and certification of all installations"
    }
  ];

  const measurementFeatures = [
    {
      icon: <Tool className="h-6 w-6" />,
      title: "Professional Equipment",
      description: "Using advanced anemometers and pressure measurement devices for precise readings"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Efficient Process",
      description: "Complete ship ventilation assessment in 2-3 days depending on vessel size"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Detailed Reports",
      description: "Comprehensive documentation of all measurements and recommendations"
    }
  ];

  const commonQuestions = [
    {
      question: "How often should airflow be measured?",
      answer: "We recommend quarterly measurements for optimal system performance"
    },
    {
      question: "What standards do you follow?",
      answer: "All measurements comply with ISO 7547 and SOLAS regulations"
    },
    {
      question: "What areas are measured?",
      answer: "All critical zones including cabins, engine rooms, and common areas"
    }
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
              Marine Ventilation <br />
              Excellence
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Setting the industry standard in marine ventilation with cutting-edge technology, 
              expert installation, and unmatched service quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="btn btn-primary btn-lg group"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Vessels Equipped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Client Satisfaction</div>
              </div>
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
                <h2 className="text-3xl font-bold mb-4">Professional Installation Excellence</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Our expert team brings decades of experience in marine ventilation, delivering 
                  superior installation services that ensure optimal air quality and system efficiency 
                  for vessels of all sizes.
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
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
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
                    <p className="text-sm font-semibold">Expert Installation</p>
                    <p className="text-xs opacity-75">Marine-grade ventilation systems</p>
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
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive ventilation solutions tailored to your specific needs
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
              <h2 className="text-2xl font-bold mb-6">Expert Airflow Measurement</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Precise airflow measurement is crucial for maintaining optimal ventilation in marine environments. 
                Our certified technicians use advanced equipment to ensure your vessel's ventilation system 
                meets all safety standards and performance requirements.
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
                  Common Questions
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
              <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Vessel's Ventilation?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Contact our team of experts for a consultation and discover how we can enhance your vessel's air quality and energy efficiency.
              </p>
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
              >
                Get a Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;