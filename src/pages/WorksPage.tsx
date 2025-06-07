import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Briefcase, Euro, 
  Clock, GraduationCap, Users, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorksPage = () => {
  const { t } = useTranslation();

  const jobs = [
    {
      id: 1,
      title: 'Ventilation System Installer',
      type: 'Full-time',
      location: 'Vilnius, Lithuania',
      salary: '2500-3500€',
      experience: '3+ years',
      education: 'Technical degree',
      department: 'Installation',
      posted: '2025-02-15',
      description: 'We are seeking an experienced ventilation system installer to join our marine installations team. The ideal candidate will have extensive experience in marine ventilation systems installation and maintenance.',
      requirements: [
        'Experience in marine ventilation systems',
        'Knowledge of maritime safety regulations',
        'Ability to read technical drawings',
        'Physical fitness for installation work',
        'English language proficiency',
        'Willingness to travel for projects'
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Professional development',
        'Travel allowance',
        'Performance bonuses'
      ]
    },
    {
      id: 2,
      title: 'Junior Ventilation Installer',
      type: 'Full-time',
      location: 'Klaipėda, Lithuania',
      salary: '1800-2200€',
      experience: '0-2 years',
      education: 'Technical education',
      department: 'Installation',
      posted: '2025-02-14',
      description: 'Looking for a junior ventilation installer to assist in marine ventilation system installations. This is an excellent opportunity for someone starting their career in marine ventilation.',
      requirements: [
        'Basic knowledge of ventilation systems',
        'Technical education background',
        'Good physical condition',
        'Willingness to learn',
        'Basic English language skills',
        'Team player attitude'
      ],
      benefits: [
        'Training and mentorship',
        'Health insurance',
        'Career growth opportunities',
        'Work equipment provided',
        'Transportation compensation'
      ]
    }
  ];

  return (
    <>
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/gZdZXix.jpeg"
            alt="Career Opportunities"
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
            <h1 className="text-4xl font-bold mb-4">{t('works.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('works.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {job.id === 1 ? t('works.jobs.ventilationInstaller.title') : t('works.jobs.juniorInstaller.title')}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.id === 1 ? t('works.jobs.ventilationInstaller.type') : t('works.jobs.juniorInstaller.type')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.id === 1 ? t('works.jobs.ventilationInstaller.location') : t('works.jobs.juniorInstaller.location')}
                      </div>
                      <div className="flex items-center">
                        <Euro className="h-4 w-4 mr-2" />
                        {job.id === 1 ? t('works.jobs.ventilationInstaller.salary') : t('works.jobs.juniorInstaller.salary')}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t('works.posted')}: {job.posted}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg mt-4 lg:mt-0 inline-flex items-center"
                  >
                    {t('works.applyNow')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                      <Users className="h-5 w-5 mr-2" />
                      {t('works.requirements.title')}
                    </h3>
                    <ul className="space-y-2">
                      {Object.values(job.id === 1 ? {
                        experience: t('works.jobs.ventilationInstaller.requirements.experience'),
                        regulations: t('works.jobs.ventilationInstaller.requirements.regulations'),
                        drawings: t('works.jobs.ventilationInstaller.requirements.drawings'),
                        fitness: t('works.jobs.ventilationInstaller.requirements.fitness'),
                        english: t('works.jobs.ventilationInstaller.requirements.english'),
                        travel: t('works.jobs.ventilationInstaller.requirements.travel')
                      } : {
                        knowledge: t('works.jobs.juniorInstaller.requirements.knowledge'),
                        education: t('works.jobs.juniorInstaller.requirements.education'),
                        condition: t('works.jobs.juniorInstaller.requirements.condition'),
                        learning: t('works.jobs.juniorInstaller.requirements.learning'),
                        english: t('works.jobs.juniorInstaller.requirements.english'),
                        teamwork: t('works.jobs.juniorInstaller.requirements.teamwork')
                      }).map((req, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2 text-primary-500">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      {t('works.qualifications.title')}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t('works.qualifications.experience')}: {job.id === 1 ? t('works.jobs.ventilationInstaller.experience') : t('works.jobs.juniorInstaller.experience')}
                      </p>
                      <p className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {t('works.qualifications.education')}: {job.id === 1 ? t('works.jobs.ventilationInstaller.education') : t('works.jobs.juniorInstaller.education')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                      <Euro className="h-5 w-5 mr-2" />
                      {t('works.benefits.title')}
                    </h3>
                    <ul className="space-y-2">
                      {Object.values(job.id === 1 ? {
                        salary: t('works.jobs.ventilationInstaller.benefits.salary'),
                        health: t('works.jobs.ventilationInstaller.benefits.health'),
                        development: t('works.jobs.ventilationInstaller.benefits.development'),
                        travel: t('works.jobs.ventilationInstaller.benefits.travel'),
                        bonuses: t('works.jobs.ventilationInstaller.benefits.bonuses')
                      } : {
                        training: t('works.jobs.juniorInstaller.benefits.training'),
                        health: t('works.jobs.juniorInstaller.benefits.health'),
                        growth: t('works.jobs.juniorInstaller.benefits.growth'),
                        equipment: t('works.jobs.juniorInstaller.benefits.equipment'),
                        transport: t('works.jobs.juniorInstaller.benefits.transport')
                      }).map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2 text-primary-500">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('works.jobDescription')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {job.id === 1 ? t('works.jobs.ventilationInstaller.description') : t('works.jobs.juniorInstaller.description')}
                  </p>
                </div>
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
            <h2 className="text-2xl font-bold mb-4">{t('works.cta.title')}</h2>
            <p className="text-gray-200 mb-8">
              {t('works.cta.description')}
            </p>
            <Link
              to="/contact"
              className="btn btn-primary btn-lg inline-flex items-center"
            >
              {t('works.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorksPage;