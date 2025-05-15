import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, HelpCircle } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Agreement to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing or using our services, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of the terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  EkoFlex provides professional ventilation solutions for marine vessels, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Ventilation system installation</li>
                  <li>System maintenance and repairs</li>
                  <li>Airflow measurement and optimization</li>
                  <li>Technical consultation</li>
                  <li>Emergency support services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Warranty and Liability
                </h2>
                <div className="text-gray-600 dark:text-gray-400 space-y-4">
                  <p>
                    Our services come with a standard warranty period of 24 months from the date of 
                    installation. This warranty covers:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Manufacturing defects</li>
                    <li>Installation-related issues</li>
                    <li>System performance according to specifications</li>
                  </ul>
                  <p>
                    We are not liable for damages caused by:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Improper use or maintenance</li>
                    <li>Unauthorized modifications</li>
                    <li>Natural wear and tear</li>
                    <li>Force majeure events</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>EkoFlex, UAB</p>
                  <p>Email: legal@ekoflex.com</p>
                  <p>Phone: +370 5 123 4567</p>
                  <p>Address: 123 Main Street, Vilnius, Lithuania</p>
                </div>
              </section>

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Last updated: February 15, 2025
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;