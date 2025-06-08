import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Trash2, Eye } from 'lucide-react';
import { useEmployee } from '../../contexts/EmployeeContext';

const DocumentsPage = () => {
  const { documents, uploadDocument } = useEmployee();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const documentTypes = [
    { value: 'passport', label: 'Pasas' },
    { value: 'id_card', label: 'ID kortelė' },
    { value: 'drivers_license', label: 'Vairuotojo pažymėjimas' },
    { value: 'insurance_card', label: 'Draudimo kortelė' },
    { value: 'medical_certificate', label: 'Medicininė pažyma' },
    { value: 'other', label: 'Kiti leidimai ir pažymėjimai' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && selectedType) {
      await uploadDocument(selectedFile, selectedType as any);
      setSelectedFile(null);
      setSelectedType('');
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    return documentTypes.find(dt => dt.value === type)?.label || type;
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dokumentai
        </h1>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Įkelti naują dokumentą
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dokumento tipas
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input"
              >
                <option value="">Pasirinkite dokumento tipą</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Failas
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-primary-600 dark:text-primary-400 hover:underline">
                      Pasirinkite failą
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF, JPG, PNG, DOC, DOCX (maks. 10MB)
                  </p>
                </div>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Pasirinktas failas: {selectedFile.name}
                </p>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedType}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Įkelti dokumentą
            </button>
          </div>
        </motion.div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Įkelti dokumentai
          </h2>

          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {getDocumentTypeLabel(doc.type)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Įkelta: {new Date(doc.uploadedAt).toLocaleDateString('lt-LT')}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                      className="btn btn-outline btn-sm inline-flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Peržiūrėti
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = doc.fileUrl;
                        link.download = doc.fileName;
                        link.click();
                      }}
                      className="btn btn-outline btn-sm inline-flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Atsisiųsti
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nėra įkeltų dokumentų
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pradėkite įkeldami savo pirmus dokumentus
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentsPage;