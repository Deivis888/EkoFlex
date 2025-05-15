import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wind, Anchor, Shield, Activity, Ship, Ruler, Compass, Navigation, Crosshair, Zap, LifeBuoy, Waves, PenTool as Tool, CheckCircle2
} from 'lucide-react';

const MarketPage = () => {
  const { t } = useTranslation();

  const marketSectors = [
    {
      id: 'cruise',
      title: 'Cruise Ships',
      description: 'Advanced ventilation solutions for passenger cruise vessels',
      icon: <Ship className="h-8 w-8" />,
      features: [
        'Advanced air distribution',
        'Energy-efficient systems',
        'Passenger comfort focus',
        'Zone climate control',
        'Air quality monitoring'
      ]
    },
    {
      id: 'ferry',
      title: 'Ferry Vessels',
      description: 'Specialized systems for passenger and vehicle ferries',
      icon: <LifeBuoy className="h-8 w-8" />,
      features: [
        'Dual-purpose ventilation',
        'Vehicle deck exhaust',
        'Quick air exchange',
        'Weather-adaptive',
        'Energy optimization'
      ]
    },
    {
      id: 'yachting',
      title: 'Luxury Yachts',
      description: 'Premium ventilation solutions for private vessels',
      icon: <Anchor className="h-8 w-8" />,
      features: [
        'Custom luxury design',
        'Silent operation',
        'Smart climate control',
        'Individual zones',
        'Premium air quality'
      ]
    },
    {
      id: 'naval',
      title: 'Naval Vessels',
      description: 'Military-grade ventilation systems',
      icon: <Compass className="h-8 w-8" />,
      features: [
        'NBC filtration',
        'Battle-ready systems',
        'Redundant setup',
        'High security',
        'Military compliance'
      ]
    },
    {
      id: 'cargo',
      title: 'Cargo Ships',
      description: 'Efficient solutions for commercial vessels',
      icon: <Navigation className="h-8 w-8" />,
      features: [
        'Cargo ventilation',
        'Engine room systems',
        'Crew comfort',
        'Low maintenance',
        'Energy efficient'
      ]
    },
    {
      id: 'specialized',
      title: 'Research Vessels',
      description: 'Custom solutions for specialized ships',
      icon: <Crosshair className="h-8 w-8" />,
      features: [
        'Lab-grade systems',
        'Clean room setup',
        'Equipment cooling',
        'Precise control',
        'Custom filtration'
      ]
    }
  ];

  const expertise = [
    {
      icon: <Tool className="h-6 w-6" />,
      title: 'Custom Design',
      description: 'Tailored solutions for each vessel type'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safety First',
      description: 'Compliance with maritime regulations'
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Performance',
      description: 'Optimal airflow and efficiency'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Innovation',
      description: 'Latest ventilation technology'
    }
  ];

  return (
    <>
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/obXcFEP.jpeg"
            alt="Marine Market"
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
            <h1 className="text-4xl font-bold mb-4">Marine Market Sectors</h1>
            <p className="text-xl text-gray-200">
              Specialized ventilation solutions for every type of vessel,
              ensuring optimal performance and compliance with industry standards.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketSectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 text-primary-600 dark:text-primary-400 mr-4">
                    {sector.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{sector.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {sector.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {sector.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
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
          <h2 className="text-2xl font-bold text-center mb-12">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
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
              Contact our team to discuss your vessel's ventilation needs
              and discover our tailored solutions.
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

export default MarketPage;