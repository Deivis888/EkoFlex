import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
              <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Name and contact information</li>
                  <li>Company details</li>
                  <li>Project requirements and specifications</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information against accidental or unlawful destruction, loss, 
                  alteration, unauthorized disclosure, or access. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 text-gray-600 dark:text-gray-400">
                  <p>EkoFlex, UAB</p>
                  <p>Email: privacy@ekoflex.lt</p>
                  <p>Phone: +370 5 123 4567</p>
                  <p>Address: Chemijos g. 27C-62, LT-51332 Kaunas, Lithuania</p>
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

export default PrivacyPolicyPage;