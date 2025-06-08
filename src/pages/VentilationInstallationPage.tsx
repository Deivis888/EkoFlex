import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wind, Wrench, ShieldCheck, Cog, LineChart, 
  Activity, Droplet, Fan, Ruler, Thermometer, 
  Gauge, PenTool as Tool, AlertTriangle, CheckCircle2,
  Send, Mail, Phone, User
} from 'lucide-react';

const VentilationInstallationPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const services = [
    {
      icon: <Wind className="h-8 w-8" />,
      title: 'Marine HVAC System Design',
      description: 'Custom marine hvac system design for all vessel types including cruise ships, cargo vessels, and luxury yachts.'
    },
    {
      icon: <Fan className="h-8 w-8" />,
      title: 'Ventilation Installation',
      description: 'Professional ventilation installation services by certified marine hvac engineers with extensive maritime engineering experience.'
    },
    {
      icon: <Thermometer className="h-8 w-8" />,
      title: 'Marine Air Conditioning',
      description: 'Installation and maintenance of dometic marine air conditioner and daikin marine air conditioner systems.'
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: 'HVAC Engineering',
      description: 'Complete HVAC engineer services including heating and air conditioning engineer solutions for marine applications.'
    }
  ];

  const benefits = [
    'Certified marine hvac companies with 15+ years experience',
    'Specialized naval engineer and maritime engineering expertise',
    'Energy-efficient marine and naval engineering solutions',
    'Professional installation engineer HVAC services',
    'Comprehensive rekuperatorių montavimas (heat recovery installation)',
    'Advanced Marine HVAC Services for all vessel types'
  ];

  return (
    <>
      {/* SEO Meta Tags would be handled by React Helmet or similar */}
      <div className="hidden">
        <title>Ventilation Installation – Marine HVAC & Engineering Solutions</title>
        <meta name="description" content="Professional marine HVAC and ventilation installation services. Expert marine engineering companies providing dometic and daikin marine air conditioner solutions." />
        <meta name="keywords" content="marine engineering, marine hvac, ventilation installation, marine hvac system, naval engineer, maritime engineering, HVAC engineer" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/Zj5T05N.jpeg"
            alt="Marine Ventilation Installation"
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
              Leading <strong>marine engineering companies</strong> providing comprehensive <strong>marine hvac system</strong> installation, 
              maintenance, and optimization services for vessels worldwide.
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

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">Expert Marine Engineering & HVAC Solutions</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                <p>
                  As one of the leading <strong>marine engineering companies</strong> in the Baltic region, EkoFlex specializes in 
                  comprehensive <strong>marine hvac</strong> solutions that ensure optimal air quality and climate control aboard 
                  vessels of all sizes. Our team of certified <strong>marine hvac engineers</strong> brings decades of experience 
                  in <strong>maritime engineering</strong> to deliver cutting-edge <strong>ventilation installation</strong> services 
                  that meet the highest industry standards.
                </p>

                <p>
                  Our <strong>marine hvac system</strong> installations encompass everything from basic ventilation to sophisticated 
                  climate control solutions featuring <strong>dometic marine air conditioner</strong> and <strong>daikin marine air conditioner</strong> 
                  units. Each project is managed by experienced <strong>naval engineers</strong> who understand the unique challenges 
                  of <strong>marine and naval engineering</strong> applications, ensuring reliable performance in harsh maritime environments.
                </p>

                <p>
                  Working with certified <strong>HVAC engineers</strong> and <strong>heating and air conditioning engineers</strong>, 
                  we provide complete system design, installation, and maintenance services. Our <strong>installation engineer HVAC</strong> 
                  specialists are trained in the latest technologies and safety protocols, delivering energy-efficient solutions that 
                  reduce operational costs while maintaining superior comfort levels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Marine HVAC Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Advanced HVAC in Ships Technology</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Our expertise in <strong>HVAC in ships</strong> extends beyond basic installation to include sophisticated 
                    climate control systems that integrate seamlessly with vessel operations. We specialize in 
                    <strong>rekuperatorių montavimas</strong> (heat recovery installation) that significantly improves 
                    energy efficiency while maintaining optimal air quality throughout the vessel.
                  </p>
                  
                  <p>
                    As experienced <strong>marine hvac companies</strong>, we understand that each vessel has unique requirements. 
                    Our <strong>Marine HVAC Services</strong> include custom system design, precision installation, and ongoing 
                    maintenance programs that ensure peak performance in all maritime conditions.
                  </p>

                  <p>
                    From luxury yachts requiring whisper-quiet operation to commercial vessels demanding robust, 
                    maintenance-free systems, our <strong>maritime engineering</strong> solutions are tailored to meet 
                    specific operational requirements while exceeding international safety and efficiency standards.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Our Marine Engineering Services</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <img 
                  src="https://i.imgur.com/7e6sVYr.jpeg"
                  alt="Marine HVAC Installation"
                  className="rounded-lg shadow-lg w-full"
                />
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary-800 dark:text-primary-200">
                    Professional Installation Process
                  </h3>
                  <div className="space-y-3 text-sm text-primary-700 dark:text-primary-300">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">1</span>
                      System design and engineering analysis
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">2</span>
                      Professional ventilation installation by certified engineers
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">3</span>
                      Comprehensive testing and system optimization
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">4</span>
                      Certification and ongoing maintenance support
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Excellence in Marine HVAC Engineering</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-6">
              <p>
                Our <strong>naval engineer</strong> team specializes in complex <strong>marine and naval engineering</strong> 
                projects that require precise climate control solutions. Whether installing a new <strong>marine hvac system</strong> 
                or upgrading existing equipment with modern <strong>dometic marine air conditioner</strong> or 
                <strong>daikin marine air conditioner</strong> units, we ensure every installation meets stringent maritime standards.
              </p>

              <p>
                As certified <strong>marine hvac companies</strong>, we provide comprehensive <strong>Marine HVAC Services</strong> 
                that include energy audits, system optimization, and preventive maintenance programs. Our <strong>HVAC engineer</strong> 
                specialists work closely with vessel operators to design solutions that minimize energy consumption while maximizing 
                comfort and air quality throughout the vessel.
              </p>

              <p>
                The integration of advanced <strong>rekuperatorių montavimas</strong> technology in our installations represents 
                our commitment to sustainable maritime operations. These heat recovery systems can reduce energy consumption by 
                up to 40% while maintaining optimal indoor air quality, making them essential components of modern 
                <strong>HVAC in ships</strong> applications.
              </p>

              <p>
                Our <strong>heating and air conditioning engineer</strong> team brings specialized knowledge of marine environments, 
                ensuring that every <strong>ventilation installation</strong> is designed to withstand the unique challenges of 
                maritime operations including salt air corrosion, vibration, and space constraints typical in vessel applications.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Successful Marine HVAC Installations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Maritime Engineering Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4">Request a Marine HVAC Consultation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get expert advice on your marine ventilation installation project from our certified engineers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input pl-10"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input pl-10"
                        placeholder="+370 xxx xxxxx"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input pl-10"
                      placeholder="your.email@example.com"
                    />
                  </div>
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
                    required
                    className="input resize-none"
                    placeholder="Tell us about your marine HVAC project requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Request Consultation
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Related Marine Engineering Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/services" className="card p-6 hover:shadow-lg transition-all group">
              <Wind className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Marine Engineering Services
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comprehensive marine engineering solutions for all vessel types and maritime applications.
              </p>
            </Link>
            
            <Link to="/market" className="card p-6 hover:shadow-lg transition-all group">
              <Fan className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Marine HVAC Systems
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Specialized HVAC in ships solutions for cruise vessels, cargo ships, and luxury yachts.
              </p>
            </Link>
            
            <Link to="/contact" className="card p-6 hover:shadow-lg transition-all group">
              <Thermometer className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                HVAC Maintenance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Professional maintenance and support for dometic and daikin marine air conditioner systems.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default VentilationInstallationPage;