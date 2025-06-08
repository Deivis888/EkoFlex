import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, User } from 'lucide-react';

const SupervisorsPage = () => {
  // Mock supervisors data
  const supervisors = [
    {
      id: '1',
      name: 'Petras Kazlauskas',
      position: 'Projekto vadovas',
      email: 'petras.kazlauskas@ekoflex.lt',
      phone: '+37068123456',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Deividas Babinskas',
      position: 'Operacijų direktorius',
      email: 'operations@ekoflex.lt',
      phone: '+37068982568',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Andrius Petrauskas',
      position: 'Techninės priežiūros vadovas',
      email: 'andrius.petrauskas@ekoflex.lt',
      phone: '+37067234567',
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Vadovai ir supervaizeriai
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supervisors.map((supervisor, index) => (
            <motion.div
              key={supervisor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                <img
                  src={supervisor.photo}
                  alt={supervisor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {supervisor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {supervisor.position}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${supervisor.email}`}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      El. paštas
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {supervisor.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${supervisor.phone}`}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Telefonas
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {supervisor.phone}
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {supervisors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nėra priskirtų vadovų
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Vadovų kontaktai bus rodomi čia, kai jie bus priskirti
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorsPage;