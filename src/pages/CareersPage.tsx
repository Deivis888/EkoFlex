import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Globe, Zap, Users, 
  Award, Target, ArrowRight, Briefcase,
  BookOpen, Heart, Coffee, DollarSign
} from 'lucide-react';

const CareersPage = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Professional Growth',
      description: 'Continuous learning and development opportunities'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'International Projects',
      description: 'Work on diverse projects across the globe'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Innovation Focus',
      description: 'Access to cutting-edge technology and solutions'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Great Team',
      description: 'Collaborative and supportive work environment'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Health Benefits',
      description: 'Comprehensive health and wellness package'
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: 'Competitive Pay',
      description: 'Attractive salary and performance bonuses'
    }
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Innovation',
      description: 'Pushing boundaries in marine ventilation'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Learning',
      description: 'Continuous growth and development'
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Work-Life Balance',
      description: 'Flexible working arrangements'
    }
  ];

  return (
    <>
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/QsJYxbs.jpeg"
            alt="Join Our Team"
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
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-200">
              Build your career with the leader in marine ventilation solutions.
              We offer exciting opportunities for growth and innovation.
            </p>
            <div className="mt-8">
              <Link
                to="/works"
                className="btn btn-primary btn-lg inline-flex items-center"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join EkoFlex?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer more than just a job - we provide a career path in an innovative
              industry with opportunities for growth and development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                At EkoFlex, we foster a culture of innovation, collaboration, and continuous
                learning. Our team members are passionate about delivering excellence in
                marine ventilation solutions while growing professionally.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-primary-600 dark:text-primary-400 mr-3">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </div>
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
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Team Members</div>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-200 mb-8">
              Join our team and be part of innovative marine ventilation solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/works"
                className="btn btn-primary btn-lg inline-flex items-center justify-center"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View Open Positions
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-lg inline-flex items-center justify-center"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;