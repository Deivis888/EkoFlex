import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wind, Wrench, ShieldCheck, Cog, LineChart, 
  Activity, Droplet, Fan, Ruler, Thermometer, 
  Gauge, PenTool as Tool, AlertTriangle, CheckCircle2,
  Ship, Anchor, Settings, Zap, Send, Mail, Phone
} from 'lucide-react';

const VentilationInstallationPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const services = [
    {
      icon: <Ship className="h-8 w-8" />,
      title: 'Marine HVAC Systems',
      description: 'Complete marine HVAC solutions for all vessel types including cruise ships, cargo vessels, and luxury yachts.',
      keywords: ['marine hvac', 'marine hvac system', 'HVAC in ships']
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: 'Ventilation Installation',
      description: 'Professional ventilation installation services by certified marine engineering specialists.',
      keywords: ['ventilation installation', 'marine engineering', 'installation engineer HVAC']
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Marine Engineering Services',
      description: 'Comprehensive marine and naval engineering solutions for optimal vessel performance.',
      keywords: ['marine engineering companies', 'naval engineer', 'maritime engineering']
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'HVAC Engineering',
      description: 'Expert HVAC engineer services for heating and air conditioning systems in marine environments.',
      keywords: ['HVAC engineer', 'heating and air conditioning engineer', 'marine hvac engineer']
    }
  ];

  const brands = [
    {
      name: 'Dometic Marine',
      description: 'Authorized installation of dometic marine air conditioner systems with full warranty support.',
      specialization: 'Marine Air Conditioning'
    },
    {
      name: 'Daikin Marine',
      description: 'Certified daikin marine air conditioner installation and maintenance services.',
      specialization: 'Advanced HVAC Solutions'
    },
    {
      name: 'Heat Recovery Systems',
      description: 'Professional rekuperatorių montavimas for energy-efficient marine ventilation.',
      specialization: 'Energy Recovery'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Marine Engineering Assessment',
      description: 'Our marine engineering team conducts comprehensive vessel analysis to determine optimal HVAC requirements.'
    },
    {
      step: 2,
      title: 'System Design & Planning',
      description: 'Custom marine hvac system design by experienced marine hvac engineer professionals.'
    },
    {
      step: 3,
      title: 'Professional Installation',
      description: 'Certified installation engineer HVAC specialists perform precise ventilation installation.'
    },
    {
      step: 4,
      title: 'Testing & Commissioning',
      description: 'Comprehensive testing ensures optimal performance of all marine HVAC services.'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags would be handled by React Helmet or similar */}
      <title>Ventilation Installation – Marine HVAC & Engineering Solutions</title>
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/Zj5T05N.jpeg"
            alt="Marine Ventilation Installation Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <strong>Ventilation Installation</strong> & <strong>Marine HVAC</strong> Solutions
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Leading <strong>marine engineering companies</strong> trust our expertise in <strong>marine hvac systems</strong>, 
              <strong>dometic marine air conditioner</strong> installations, and comprehensive <strong>Marine HVAC Services</strong> 
              for vessels worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Marine HVAC Quote
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Expert <strong>Marine Engineering</strong> & <strong>HVAC in Ships</strong></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                As one of the premier <strong>marine engineering companies</strong> in the Baltic region, EkoFlex specializes in 
                comprehensive <strong>ventilation installation</strong> and <strong>marine hvac</strong> solutions. Our team of certified 
                <strong>marine hvac engineer</strong> professionals delivers cutting-edge <strong>marine hvac system</strong> installations 
                that meet the highest standards of <strong>maritime engineering</strong>.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                From <strong>dometic marine air conditioner</strong> systems to advanced <strong>daikin marine air conditioner</strong> 
                installations, we provide complete <strong>Marine HVAC Services</strong> for all vessel types. Our expertise in 
                <strong>marine and naval engineering</strong> ensures optimal performance, energy efficiency, and regulatory compliance 
                for every project.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Whether you need a certified <strong>HVAC engineer</strong>, experienced <strong>heating and air conditioning engineer</strong>, 
                or specialized <strong>installation engineer HVAC</strong> services, our team delivers professional 
                <strong>rekuperatorių montavimas</strong> and comprehensive ventilation solutions tailored to marine environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive <strong>Marine HVAC Services</strong></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our <strong>marine engineering</strong> expertise covers all aspects of <strong>HVAC in ships</strong>, 
              from initial design to final commissioning and ongoing maintenance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
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
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marine Engineering Process */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our <strong>Marine Engineering</strong> Process</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From initial <strong>maritime engineering</strong> assessment to final <strong>ventilation installation</strong>, 
              our systematic approach ensures optimal <strong>marine hvac system</strong> performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partnerships */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Authorized <strong>Marine HVAC</strong> Brand Partners</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We are certified installers for leading <strong>marine hvac companies</strong> and their premium equipment lines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{brand.specialization}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{brand.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Advanced <strong>Maritime Engineering</strong> Expertise</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Our team of certified <strong>naval engineer</strong> professionals and experienced <strong>marine hvac engineer</strong> 
                specialists brings decades of combined expertise in <strong>marine and naval engineering</strong>. We understand the 
                unique challenges of <strong>HVAC in ships</strong> and deliver solutions that exceed industry standards.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Every <strong>installation engineer HVAC</strong> on our team is certified in the latest <strong>marine hvac system</strong> 
                technologies, including energy-efficient <strong>rekuperatorių montavimas</strong> and advanced climate control systems. 
                Our <strong>heating and air conditioning engineer</strong> specialists ensure optimal performance in all marine environments.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vessels Equipped</div>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">15+</div>
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
              <img 
                src="https://i.imgur.com/7e6sVYr.jpeg"
                alt="Marine HVAC Installation by Expert Engineers"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Request a <strong>Marine HVAC</strong> Consultation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get expert advice from our <strong>marine engineering</strong> team for your <strong>ventilation installation</strong> project.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your marine HVAC requirements..."
                    required
                    className="input min-h-[100px] resize-y"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn btn-primary btn-lg inline-flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Request Marine HVAC Consultation
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    info@ekoflex.lt
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    +370 690 18889
                  </div>
                </div>
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
            alt="Professional Marine HVAC Installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Upgrade Your <strong>Marine HVAC System</strong>?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Partner with leading <strong>marine engineering companies</strong> for professional 
              <strong>ventilation installation</strong> and comprehensive <strong>Marine HVAC Services</strong>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Professional Quote
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VentilationInstallationPage;