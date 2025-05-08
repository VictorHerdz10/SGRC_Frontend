import React, { useState } from "react";
import { FaFile, FaFileArchive, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import useValidation from "../../hooks/useValidation";
import clienteAxios from "../../axios/axios";
import { motion } from "framer-motion";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FileUploadInput = ({ showNotification }) => {
  const { file, setFile } = useValidation();
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
        setError("");
        setUploadProgress(0);
      } else {
        setFile(null);
        setError("Tipo de archivo inválido. Por favor, sube un archivo ZIP.");
      }
    }
  };

  const isValidFileType = (file) => {
    const acceptedTypes = ["application/zip", "application/x-zip-compressed"];
    return acceptedTypes.includes(file.type);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("zip"))
      return <FaFileArchive className="text-yellow-500 dark:text-yellow-400" />;
    return <FaFile className="text-gray-500 dark:text-gray-400" />;
  };

  const handleUploadBackup = async () => {
    if (!file || isUploading) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('backupFile', file);

    try {
      const token = localStorage.getItem("token");
      
      await clienteAxios.post('/backup/restaurar-backup-local', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      showNotification("Copia de seguridad restaurada con éxito", "success");
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error("Error al restaurar:", err);
      showNotification(
        err.response?.data?.msg || "Error al restaurar la copia de seguridad",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setError("");
    setIsUploading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div>
        <label
          htmlFor="file-upload"
          className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
        >
          Elige un archivo zip
        </label>
        <div className="relative">
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Subir archivo"
            accept=".zip,application/zip,application/x-zip-compressed"
            disabled={isUploading}
          />
          <motion.label
            htmlFor="file-upload"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 ${
              error ? "border-red-500 dark:border-red-500" : ""
            } ${isUploading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <span className="flex items-center gap-2">
              {isUploading ? (
                <FaCloudUploadAlt className="text-blue-500 animate-pulse" />
              ) : (
                file ? (
                  <>
                    {getFileIcon(file.type)}
                    <span className="truncate max-w-xs">{file.name}</span>
                  </>
                ) : (
                  "Seleccionar archivo"
                )
              )}
            </span>
            {!isUploading && file && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
          </motion.label>
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-4"
        >
          <div className="flex items-center justify-center">
            <div className="w-20 h-20">
              <CircularProgressbar
                value={uploadProgress}
                text={`${uploadProgress}%`}
                styles={{
                  path: {
                    stroke: `rgba(59, 130, 246, ${uploadProgress / 100})`,
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                  },
                  text: {
                    fill: '#4B5563',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  },
                  trail: {
                    stroke: '#E5E7EB',
                  },
                }}
              />
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {uploadProgress === 100 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-green-600 dark:text-green-400"
                >
                  <FaCheckCircle /> ¡Listo para restaurar!
                </motion.div>
              ) : (
                `Subiendo... ${uploadProgress}%`
              )}
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={handleUploadBackup}
                disabled={isUploading || (uploadProgress > 0 && uploadProgress < 100)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 ${
                  (isUploading || (uploadProgress > 0 && uploadProgress < 100)) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadProgress === 100 ? 'Restaurar' : 'Subir archivo'}
              </motion.button>
              
              <motion.button
                onClick={handleCancelUpload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
              >
                Cancelar
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUploadInput;