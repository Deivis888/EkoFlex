import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Check, Clock, User } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const ToolsPage = () => {
  const { tools, acceptTool } = useEmployee();

  const handleAcceptTool = async (toolId: string) => {
    await acceptTool(toolId);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Įrankiai
        </h1>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                {tool.photo && (
                  <img
                    src={tool.photo}
                    alt={tool.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2" />
                      <span>Numeris: {tool.toolNumber}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        Priskirta: {new Date(tool.assignedDate).toLocaleDateString('lt-LT')} {tool.assignedTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>Vadovas: {tool.supervisorName}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    {tool.isAccepted ? (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <Check className="h-5 w-5 mr-2" />
                        <span className="font-medium">Priimta</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAcceptTool(tool.id)}
                        className="w-full btn btn-primary"
                      >
                        Priimti įrankį
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nėra priskirtų įrankių
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Įrankiai bus rodomi čia, kai jie bus jums priskirti
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;