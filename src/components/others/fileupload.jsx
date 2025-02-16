import React, { useState } from "react";
import {
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useValidation from "../../hooks/useValidation";

const FileUploadInput = () => {
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
        setError(
          "Tipo de archivo inválido. Por favor, sube un archivo PDF, Word, Excel o imagen."
        );
      }
    }
  };

  const isValidFileType = (file) => {
    const acceptedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
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
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-red-500 dark:text-red-400" />;
    if (fileType.includes("word"))
      return <FaFileWord className="text-blue-500 dark:text-blue-400" />;
    if (fileType.includes("excel"))
      return <FaFileExcel className="text-green-500 dark:text-green-400" />;
    if (fileType.includes("image"))
      return <FaFileImage className="text-purple-500 dark:text-purple-400" />;
    return <FaFile className="text-gray-500 dark:text-gray-400" />;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div>
        <label
          htmlFor="file-upload"
          className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
        >
          Elige un archivo
        </label>
        <div className="relative">
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Subir archivo"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
          />
          <label
            htmlFor="file-upload"
            className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 ${
              error ? "border-red-500 dark:border-red-400" : ""
            }`}
          >
            <span>{file ? file.name : "Seleccionar archivo"}</span>
            {file && getFileIcon(file.type)}
          </label>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
      {file && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out dark:bg-blue-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {uploadProgress === 100 && (
        <p className="text-sm text-green-600 dark:text-green-400">
          ¡Archivo cargado exitosamente!
        </p>
      )}
    </div>
  );
};

export default FileUploadInput;
