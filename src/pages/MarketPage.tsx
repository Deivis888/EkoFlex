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
      title: t('market.cruise.title'),
      description: t('market.cruise.description'),
      icon: <Ship className="h-8 w-8" />,
      features: [
        t('market.cruise.features.airDistribution'),
        t('market.cruise.features.energyEfficient'),
        t('market.cruise.features.passengerComfort'),
        t('market.cruise.features.zoneControl'),
        t('market.cruise.features.airQuality')
      ]
    },
    {
      id: 'ferry',
      title: t('market.ferry.title'),
      description: t('market.ferry.description'),
      icon: <LifeBuoy className="h-8 w-8" />,
      features: [
        t('market.ferry.features.dualPurpose'),
        t('market.ferry.features.vehicleDeck'),
        t('market.ferry.features.quickExchange'),
        t('market.ferry.features.weatherAdaptive'),
        t('market.ferry.features.energyOptimization')
      ]
    },
    {
      id: 'yachting',
      title: t('market.yachting.title'),
      description: t('market.yachting.description'),
      icon: <Anchor className="h-8 w-8" />,
      features: [
        t('market.yachting.features.customDesign'),
        t('market.yachting.features.silentOperation'),
        t('market.yachting.features.smartControl'),
        t('market.yachting.features.individualZones'),
        t('market.yachting.features.premiumQuality')
      ]
    },
    {
      id: 'naval',
      title: t('market.naval.title'),
      description: t('market.naval.description'),
      icon: <Compass className="h-8 w-8" />,
      features: [
        t('market.naval.features.nbcFiltration'),
        t('market.naval.features.battleReady'),
        t('market.naval.features.redundantSetup'),
        t('market.naval.features.highSecurity'),
        t('market.naval.features.militaryCompliance')
      ]
    },
    {
      id: 'cargo',
      title: t('market.cargo.title'),
      description: t('market.cargo.description'),
      icon: <Navigation className="h-8 w-8" />,
      features: [
        t('market.cargo.features.cargoVentilation'),
        t('market.cargo.features.engineRoom'),
        t('market.cargo.features.crewComfort'),
        t('market.cargo.features.lowMaintenance'),
        t('market.cargo.features.energyEfficient')
      ]
    },
    {
      id: 'specialized',
      title: t('market.specialized.title'),
      description: t('market.specialized.description'),
      icon: <Crosshair className="h-8 w-8" />,
      features: [
        t('market.specialized.features.labGrade'),
        t('market.specialized.features.cleanRoom'),
        t('market.specialized.features.equipmentCooling'),
        t('market.specialized.features.preciseControl'),
        t('market.specialized.features.customFiltration')
      ]
    }
  ];

  const expertise = [
    {
      icon: <Tool className="h-6 w-6" />,
      title: t('market.expertise.customDesign.title'),
      description: t('market.expertise.customDesign.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('market.expertise.safetyFirst.title'),
      description: t('market.expertise.safetyFirst.description')
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: t('market.expertise.performance.title'),
      description: t('market.expertise.performance.description')
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('market.expertise.innovation.title'),
      description: t('market.expertise.innovation.description')
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
            <h1 className="text-4xl font-bold mb-4">{t('market.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('market.subtitle')}
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
          <h2 className="text-2xl font-bold text-center mb-12">{t('market.expertise.title')}</h2>
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
            <h2 className="text-2xl font-bold mb-4">{t('market.cta.title')}</h2>
            <p className="text-gray-200 mb-8">
              {t('market.cta.description')}
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary btn-lg"
            >
              {t('market.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPage;