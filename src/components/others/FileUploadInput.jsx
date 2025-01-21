import React, { useState } from "react";
import { FaFile, FaFileArchive } from "react-icons/fa";
import useValidation from "../../hooks/useValidation";
import JSZip from "jszip";
import clienteAxios from '../../axios/axios';

const FileUploadInput = ({ showNotification, setIsLoading }) => {
  const { file, setFile } = useValidation();
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
        setError("");
        simulateUpload();
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

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("zip")) return <FaFileArchive className="text-yellow-500" />;
    return <FaFile className="text-gray-500" />;
  };

  const handleUploadBackup = async () => {
    const zip = new JSZip();
    setIsLoading(true);
  
    try {
      const zipContent = await zip.loadAsync(file);
      const backupData = {};
  
      for (const fileName of Object.keys(zipContent.files)) {
        const fileData = await zipContent.files[fileName].async('string');
        const tableName = fileName.replace('.json', '');
        backupData[tableName] = JSON.parse(fileData);
      }
  
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
       console.log(backupData);
      const url = "/backup/restaurar-backup-local";
      await clienteAxios.post(url, backupData, config);
      showNotification("Copia de seguridad restaurada con éxito", "success");
  
      // Limpiar el input de archivo
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
        console.log(err.response);
      showNotification("Error al restaurar la copia de seguridad", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="file-upload" className="block mb-2 font-medium text-gray-700">
          Elige un archivo
        </label>
        <div className="relative">
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Subir archivo"
            accept=".zip"
          />
          <label
            htmlFor="file-upload"
            className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${error ? "border-red-500" : ""}`}
          >
            <span>{file ? file.name : "Seleccionar archivo"}</span>
            {file && getFileIcon(file.type)}
          </label>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      {file && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {uploadProgress === 100 && (
        <>
          <p className="text-sm text-green-600">¡Archivo cargado exitosamente!</p>
          <button
            onClick={handleUploadBackup}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restaurar copia de seguridad
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploadInput;