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
      title: "Marine HVAC System Design",
      description: "Custom marine hvac system design for all vessel types including cruise ships, cargo vessels, and luxury yachts."
    },
    {
      icon: <Fan className="h-8 w-8" />,
      title: "Dometic & Daikin Installation",
      description: "Professional installation of dometic marine air conditioner and daikin marine air conditioner systems."
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Rekuperatorių Montavimas",
      description: "Energy-efficient heat recovery ventilation systems for optimal air quality and energy savings."
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "HVAC Engineering Solutions",
      description: "Complete HVAC engineer services from design to commissioning by certified heating and air conditioning engineers."
    }
  ];

  const expertise = [
    "15+ years in marine engineering",
    "Certified HVAC engineer team",
    "Maritime engineering compliance",
    "Energy-efficient solutions",
    "24/7 emergency support",
    "Global service network"
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
              Leading <strong>marine engineering companies</strong> trust our expertise in <strong>marine hvac systems</strong>, 
              <strong>dometic marine air conditioner</strong> installations, and comprehensive <strong>HVAC in ships</strong> solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Consultation
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
              <h2 className="text-3xl font-bold mb-6">Expert <strong>Marine Engineering</strong> & <strong>HVAC Installation</strong></h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                <p className="mb-6">
                  As one of the leading <strong>marine engineering companies</strong> in the Baltic region, EkoFlex specializes in 
                  comprehensive <strong>ventilation installation</strong> and <strong>marine hvac</strong> solutions for all types of vessels. 
                  Our team of certified <strong>HVAC engineers</strong> and <strong>maritime engineering</strong> specialists delivers 
                  cutting-edge <strong>marine hvac systems</strong> that ensure optimal air quality, energy efficiency, and regulatory compliance.
                </p>
                
                <p className="mb-6">
                  Our expertise spans from traditional <strong>heating and air conditioning engineer</strong> services to advanced 
                  <strong>rekuperatorių montavimas</strong> (heat recovery ventilation) systems. We work with premium brands including 
                  <strong>dometic marine air conditioner</strong> and <strong>daikin marine air conditioner</strong> systems, ensuring 
                  our clients receive the highest quality equipment backed by professional installation and ongoing support.
                </p>

                <p className="mb-6">
                  Every <strong>installation engineer HVAC</strong> project we undertake follows strict <strong>maritime engineering</strong> 
                  standards and international regulations. Our <strong>naval engineer</strong> team brings decades of combined experience 
                  in <strong>marine and naval engineering</strong>, making us the preferred choice for complex <strong>HVAC in ships</strong> 
                  installations across Europe and beyond.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive <strong>Marine HVAC Services</strong></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From initial design to final commissioning, our <strong>marine hvac engineer</strong> team delivers complete solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
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
              <h2 className="text-3xl font-bold mb-6">Advanced <strong>Marine Engineering</strong> Solutions</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                <p className="mb-6">
                  Our <strong>marine hvac companies</strong> partnership network enables us to source the most advanced equipment 
                  and technologies available. Whether you need a complete <strong>marine hvac system</strong> overhaul or specific 
                  <strong>dometic marine air conditioner</strong> installation, our <strong>installation engineer HVAC</strong> 
                  specialists ensure seamless integration with your vessel's existing systems.
                </p>
                
                <p className="mb-6">
                  Energy efficiency is at the core of our <strong>maritime engineering</strong> approach. Our <strong>rekuperatorių montavimas</strong> 
                  solutions can reduce energy consumption by up to 40% while maintaining optimal air quality throughout your vessel. 
                  This is particularly important for <strong>HVAC in ships</strong> where energy costs and environmental impact 
                  are critical considerations.
                </p>

                <p className="mb-6">
                  As certified <strong>heating and air conditioning engineers</strong>, we understand the unique challenges of 
                  <strong>marine and naval engineering</strong> environments. Salt air, vibration, space constraints, and safety 
                  requirements all factor into our design and installation processes, ensuring long-term reliability and performance.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
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
                src="https://i.imgur.com/7e6sVYr.jpeg"
                alt="Marine HVAC Installation"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-semibold">Professional Installation</p>
                  <p className="text-xs opacity-75">Certified Marine HVAC Engineers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our <strong>Ventilation Installation</strong> Process</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every <strong>marine hvac engineer</strong> project follows our proven methodology for optimal results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
              <h3 className="text-2xl font-bold mb-4">1. Engineering Assessment & Design</h3>
              <p className="mb-6">
                Our <strong>naval engineer</strong> team begins with a comprehensive vessel assessment, analyzing existing systems, 
                space constraints, and operational requirements. This critical phase ensures our <strong>marine hvac system</strong> 
                design integrates seamlessly with your vessel's architecture and operational needs.
              </p>

              <h3 className="text-2xl font-bold mb-4">2. Equipment Selection & Procurement</h3>
              <p className="mb-6">
                Working with leading <strong>marine hvac companies</strong>, we select optimal equipment including 
                <strong>daikin marine air conditioner</strong> units, ventilation fans, ductwork, and control systems. 
                Our partnerships ensure competitive pricing and genuine manufacturer warranties.
              </p>

              <h3 className="text-2xl font-bold mb-4">3. Professional Installation</h3>
              <p className="mb-6">
                Our certified <strong>installation engineer HVAC</strong> team executes the installation with minimal 
                disruption to vessel operations. We specialize in <strong>rekuperatorių montavimas</strong> and complex 
                <strong>HVAC in ships</strong> configurations, ensuring all work meets maritime safety standards.
              </p>

              <h3 className="text-2xl font-bold mb-4">4. Testing & Commissioning</h3>
              <p className="mb-6">
                Every <strong>ventilation installation</strong> undergoes rigorous testing including airflow measurement, 
                temperature control verification, and system integration testing. Our <strong>HVAC engineer</strong> team 
                provides comprehensive documentation and crew training upon completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Request a <strong>Marine HVAC</strong> Consultation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get expert advice from our <strong>marine engineering</strong> specialists
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
                      Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
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
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input pl-10"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
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
                    className="input min-h-[100px] resize-y"
                    placeholder="Tell us about your vessel and HVAC requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary btn-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-2\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Request Consultation'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Why Choose EkoFlex for <strong>Marine HVAC</strong> Solutions?</h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                <p className="mb-6">
                  With over 15 years of experience in <strong>marine engineering</strong> and <strong>ventilation installation</strong>, 
                  EkoFlex has established itself as one of the most trusted <strong>marine engineering companies</strong> in the region. 
                  Our commitment to excellence, combined with our expertise in <strong>maritime engineering</strong> and 
                  <strong>HVAC in ships</strong>, ensures every project exceeds expectations.
                </p>
                
                <p className="mb-8">
                  Whether you need a simple <strong>dometic marine air conditioner</strong> replacement or a complete 
                  <strong>marine hvac system</strong> overhaul with <strong>rekuperatorių montavimas</strong>, our team of 
                  certified <strong>heating and air conditioning engineers</strong> delivers solutions that combine reliability, 
                  efficiency, and compliance with international maritime standards.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Start Your Project
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Learn About Our Company
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VentilationInstallationPage;