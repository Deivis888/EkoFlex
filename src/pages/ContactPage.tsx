import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Send, MapPin, Phone, Mail, CheckCircle, AlertCircle,
  Linkedin, Facebook, Instagram, Youtube, Building2,
  CreditCard, Users, Calculator, HelpCircle
} from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: {
      render: (element: HTMLElement, options: any) => number;
      reset: (id?: number) => void;
      getResponse: (id?: number) => string;
    };
    onRecaptchaLoad: () => void;
    recaptchaLoaded: boolean;
  }
}

const ContactPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number>();
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formspreeIds = {
    'General Inquiry': 'xjkwldyn',
    'Accountant': 'xovdrzwl',
    'HR Department': 'mqaqnoba',
    'Operations Director': 'xqaqnola'
  };

  const companyInfo = {
    name: 'EkoFlex, UAB',
    code: '306653331',
    vatCode: 'LT100016670514',
    bankAccount: 'LT12 3456 7890 1234 5678',
    bankName: 'SEB Bank',
    swift: 'CBVILT2X'
  };

  const departments = [
    {
      name: 'Accounting Department',
      contacts: [
        {
          name: '',
          position: 'Chief Accountant',
          email: 'accounting@ekoflex.lt',
          phone: ''
        }
      ]
    },
    {
      name: 'HR Department',
      contacts: [
        {
          name: 'Vygintas Kazakevičius',
          position: 'HR Manager',
          email: 'hr@ekoflex.lt',
          phone: '+37060389303'
        }
      ]
    },
    {
      name: 'Management',
      contacts: [
        {
          name: 'Deividas Babinskas',
          position: 'Operations Director',
          email: 'operations@ekoflex.lt',
          phone: '+37068982568'
        }
      ]
    }
  ];

  const offices = [
    {
      name: 'Headquarters',
      address: 'Chemijos g. 27C-62, LT-51332 Kaunas, Lithuania',
      phone: '+37069018889',
      email: 'info@ekoflex.lt',
    }
  ];

  const initializeRecaptcha = () => {
    if (window.recaptchaLoaded && recaptchaRef.current && !recaptchaWidgetId.current) {
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: '6LfKAT8rAAAAAKckE-RbxrXviSBnBchIPnc95tYE',
        theme: 'light'
      });
    }
  };

  window.onRecaptchaLoad = initializeRecaptcha;

  useEffect(() => {
    return () => {
      if (recaptchaWidgetId.current !== undefined) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
        recaptchaWidgetId.current = undefined;
      }
      window.recaptchaLoaded = false;
      window.onRecaptchaLoad = undefined;
    };
  }, []);

  useEffect(() => {
    if (recaptchaWidgetId.current !== undefined) {
      window.grecaptcha.reset(recaptchaWidgetId.current);
      recaptchaWidgetId.current = undefined;
      
      setTimeout(() => {
        initializeRecaptcha();
      }, 100);
    } else {
      initializeRecaptcha();
    }
  }, [selectedDepartment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    setIsSubmitting(true);

    if (!selectedDepartment) {
      setStatus({
        type: 'error',
        message: t('contact.form.selectDepartmentError')
      });
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidgetId.current);
    if (!recaptchaResponse) {
      setStatus({
        type: 'error',
        message: t('contact.form.recaptchaError')
      });
      setIsSubmitting(false);
      return;
    }

    formData.append('g-recaptcha-response', recaptchaResponse);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeIds[selectedDepartment]}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Instead of showing status message, redirect to thank you page
        navigate('/thank-you');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Error sending message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error sending message'
      });
      if (recaptchaWidgetId.current !== undefined) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/cws3Iw9.jpeg"
            alt="Contact Us"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('contact.subtitle')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white hover:text-primary-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white hover:text-primary-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white hover:text-primary-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-white hover:text-primary-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Building2 className="h-6 w-6 mr-2" />
              {t('contact.companyInfo.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">{t('contact.companyInfo.legalInfo')}</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p><strong>{t('contact.companyInfo.companyName')}:</strong> {companyInfo.name}</p>
                  <p><strong>{t('contact.companyInfo.companyCode')}:</strong> {companyInfo.code}</p>
                  <p><strong>{t('contact.companyInfo.vatCode')}:</strong> {companyInfo.vatCode}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">{t('contact.companyInfo.bankingDetails')}</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p><strong>{t('contact.companyInfo.bank')}:</strong> {companyInfo.bankName}</p>
                  <p><strong>{t('contact.companyInfo.account')}:</strong> {companyInfo.bankAccount}</p>
                  <p><strong>{t('contact.companyInfo.swift')}:</strong> {companyInfo.swift}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">{t('contact.departments.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {dept.name === 'Accounting Department' && <Calculator className="h-5 w-5 mr-2" />}
                  {dept.name === 'HR Department' && <Users className="h-5 w-5 mr-2" />}
                  {dept.name === 'Management' && <Building2 className="h-5 w-5 mr-2" />}
                  {dept.name === 'Accounting Department' && t('contact.departments.accounting')}
                  {dept.name === 'HR Department' && t('contact.departments.hr')}
                  {dept.name === 'Management' && t('contact.departments.management')}
                </h3>
                <div className="space-y-4">
                  {dept.contacts.map((contact, i) => (
                    <div key={i} className="border-t dark:border-gray-700 pt-4 first:border-0 first:pt-0">
                      {contact.name && <p className="font-medium">{contact.name}</p>}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contact.position === 'Chief Accountant' && t('contact.departments.chiefAccountant')}
                        {contact.position === 'HR Manager' && t('contact.departments.hrManager')}
                        {contact.position === 'Operations Director' && t('contact.departments.operationsDirector')}
                      </p>
                      <div className="mt-2 space-y-1">
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {contact.email}
                        </a>
                        {contact.phone && (
                          <a 
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Offices */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.selectDepartment')}
                    </label>
                    <select
                      id="department"
                      name="department"
                      className="input"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      required
                    >
                      <option value="">{t('contact.form.selectDepartmentPlaceholder')}</option>
                      {Object.keys(formspreeIds).map((dept) => (
                        <option key={dept} value={dept}>
                          {dept === 'General Inquiry' && t('contact.generalInquiry')}
                          {dept === 'HR Department' && t('contact.hrDepartment')}
                          {dept === 'Accountant' && t('contact.accountant')}
                          {dept === 'Operations Director' && t('contact.operationsDirector')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.name')}
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
                      {t('contact.form.email')}
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
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={8}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="input min-h-[200px] resize-y"
                      style={{ height: '200px' }}
                    ></textarea>
                  </div>

                  {/* reCAPTCHA */}
                  <div ref={recaptchaRef} className="mt-4"></div>

                  {status.type && (
                    <div className={`p-4 rounded-lg ${
                      status.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    } flex items-center`}>
                      {status.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2" />
                      )}
                      {status.message}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full h-12 rounded-lg group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
                      <div className="absolute top-0 left-0 w-1/4 h-full bg-[#007acc] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#0099ff] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#ff7e15] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#ff6205] transform origin-right group-hover:scale-x-150"></div>
                    </div>
                    <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-[0.99]">
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </div>
                  </button>
                </form>
              </div>
            </motion.div>
            
            {/* Offices */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">{t('contact.offices.title')}</h2>
              
              {offices.map((office, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {office.name === 'Headquarters' 
                      ? t('contact.offices.headquarters') 
                      : office.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{office.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                      <a 
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('contact.offices.mapTitle')}</h2>
          <div className="rounded-lg overflow-hidden h-[400px] shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.2606447937243!2d23.95963937678168!3d54.91422997429161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e718f1e1b0d4d9%3A0x3c4b5f5b5b5b5b5b!2sChemijos%20g.%2027C-62%2C%20Kaunas%2051332!5e0!3m2!1sen!2slt!4v1620000000000!5m2!1sen!2slt" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="EkoFlex Headquarters Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;