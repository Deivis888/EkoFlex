import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Send, MapPin, Phone, Mail, CheckCircle, AlertCircle,
  Linkedin, Facebook, Instagram, Youtube, Building2,
  Users, Calculator
} from 'lucide-react';

const ContactPage = () => {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });

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
          email: 'accounting@ekoflex.com',
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
          email: 'hr@ekoflex.com',
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
          email: 'operations@ekoflex.com',
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
      email: 'info@ekoflex.com',
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!selectedDepartment) {
      setStatus({ type: 'error', message: 'Please select a department' });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeIds[selectedDepartment]}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        form.reset();
        setSelectedDepartment('');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Error sending message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error sending message'
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      {/* ... Paliekamas visas UI turinys, kaip ir anksčiau ... */}

      {/* Contact Form */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Select Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      className="input"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      required
                    >
                      <option value="">-- Select Department --</option>
                      {Object.keys(formspreeIds).map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.name')}
                    </label>
                    <input type="text" id="name" name="name" required className="input" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input type="email" id="email" name="email" required className="input" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.message')}
                    </label>
                    <textarea id="message" name="message" rows={8} required className="input min-h-[200px] resize-y"></textarea>
                  </div>

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

                  <button type="submit" className="relative w-full h-12 rounded-lg group overflow-hidden">
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-[spin_3s_linear_infinite]">
                      <div className="absolute top-0 left-0 w-1/4 h-full bg-[#007acc] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-1/4 w-1/4 h-full bg-[#0099ff] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-2/4 w-1/4 h-full bg-[#ff7e15] transform origin-right group-hover:scale-x-150"></div>
                      <div className="absolute top-0 left-3/4 w-1/4 h-full bg-[#ff6205] transform origin-right group-hover:scale-x-150"></div>
                    </div>
                    <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-[0.99]">
                      <Send className="h-5 w-5 mr-2" />
                      {t('contact.form.send')}
                    </div>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
