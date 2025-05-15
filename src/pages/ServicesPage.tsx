import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wind, Wrench, ShieldCheck, Cog, LineChart, 
  Activity, Droplet, Fan, Ruler, Thermometer, 
  Gauge, PenTool as Tool, AlertTriangle, CheckCircle2
} from 'lucide-react';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'installation',
      icon: <Wind className="h-10 w-10" />,
      title: 'Ventilation Installation',
      description: 'Complete ventilation system installation for marine vessels',
      features: [
        'System design and planning',
        'Custom ductwork fabrication',
        'Air handling unit installation',
        'Control system integration',
        'Fire and smoke damper setup',
        'Heat recovery systems',
        'Testing and commissioning'
      ]
    },
    {
      id: 'airflow',
      icon: <Fan className="h-10 w-10" />,
      title: 'Airflow Measurement',
      description: 'Professional airflow measurement and balancing services',
      features: [
        'Digital anemometer readings',
        'Pressure differential testing',
        'Volume flow rate calculation',
        'Temperature monitoring',
        'Air quality assessment',
        'System balance verification',
        'Detailed reporting'
      ]
    },
    {
      id: 'safety',
      icon: <AlertTriangle className="h-10 w-10" />,
      title: 'Fire Safety Systems',
      description: 'Fire and smoke control ventilation systems',
      features: [
        'Fire damper installation',
        'Smoke control systems',
        'Emergency shutdown setup',
        'Safety certification',
        'Regular testing',
        'Compliance verification',
        'Documentation'
      ]
    },
    {
      id: 'maintenance',
      icon: <Wrench className="h-10 w-10" />,
      title: 'Maintenance Services',
      description: 'Regular maintenance and emergency repairs',
      features: [
        'Scheduled inspections',
        'Filter replacement',
        'System cleaning',
        'Performance optimization',
        'Emergency repairs',
        'Preventive maintenance',
        'Component upgrades'
      ]
    }
  ];

  const installationSteps = [
    {
      icon: <Tool className="h-8 w-8" />,
      title: "Design & Planning",
      description: "Custom system design based on vessel requirements",
      features: ['Vessel analysis', 'System modeling', 'Component selection']
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Installation",
      description: "Professional installation by certified technicians",
      features: ['Component setup', 'System integration', 'Quality control']
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Testing",
      description: "Comprehensive testing and system balancing",
      features: ['Performance tests', 'Balance checks', 'Safety verification']
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Certification",
      description: "Complete documentation and certification",
      features: ['Compliance check', 'Documentation', 'Final approval']
    }
  ];

  return (
    <>
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
            <h1 className="text-4xl font-bold mb-4">Marine Ventilation Services</h1>
            <p className="text-xl text-gray-200">
              Professional ventilation solutions for all marine vessels, backed by
              years of experience and modern technology.
            </p>
          </motion.div>
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
          <h2 className="text-2xl font-bold text-center mb-12">Installation Process</h2>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-200 mb-8">
              Contact our team for a consultation and discover how we can enhance
              your vessel's ventilation system.
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary btn-lg"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;