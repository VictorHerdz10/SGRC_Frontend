import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  FiRefreshCw,
  FiTrash2,
  FiCheck,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiLock,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import useValidation from "../../hooks/useValidation";
import clienteAxios from "../../axios/axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FileUploadInput from "../../components/others/FileUploadInput";

const BackupComponent = () => {
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [dropboxPath, setDropboxPath] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [localBackup, setLocalBackup] = useState([]);
  const { backupHistory, obtenerBackup } = useValidation();
  const parcearDate = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0"); // Aseguramos que el mes tenga dos dígitos
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
    return `${dia}${mes}${ano}_${horas}${minutos}${segundos}`;
  };
  const downloadBackupAsZip = async (backupData) => {
    const zip = new JSZip();

    // Convertir cada tabla a JSON y añadir al ZIP
    for (const [tableName, tableData] of Object.entries(backupData)) {
      const jsonData = JSON.stringify(tableData, null, 2);
      zip.file(`${tableName}.json`, jsonData);
    }

    // Generar el archivo ZIP
    const content = await zip.generateAsync({ type: "blob" });
    toast.success(
      "Copia de seguridad creada con éxito, descargando archivo ZIP..."
    );

    let currentDate = new Date();
    const formattedDate = parcearDate(currentDate);

    setTimeout(() => {
      // Descargar el archivo ZIP
      saveAs(content, `backup_${formattedDate}.zip`);
    }, 2000);
  };

  function formatFileSize(bytes) {
    const KB = 1024;
    const MB = KB * 1024;

    if (bytes < KB) {
      return `${bytes} bytes`;
    } else if (bytes < MB) {
      return `${(bytes / KB).toFixed(2)} KB`;
    } else {
      return `${(bytes / MB).toFixed(2)} MB`;
    }
  }

  const handleLocalBackup = async () => {
    setIsLoading1(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = "/backup/crear-backup-local";
      const response = await clienteAxios.get(url, config);
      await downloadBackupAsZip(response.data);
      showNotification("Copia de seguridad local creada con éxito", "success");
    } catch (err) {
      showNotification(err.response.data.msg, "error");
    } finally {
      setIsLoading1(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!navigator.onLine) {
      showNotification(
        "No tienes conexión a internet para realizar la copia de seguridad",
        "error"
      );
      setIsLoading(false);
      return;
    }
    try {
      const url = "/backup";
      const response = await clienteAxios(url, config);
      obtenerBackup();
      showNotification(response.data.msg, "success");
    } catch (err) {
      showNotification(err.response.data.msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (dropboxPath) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!navigator.onLine) {
      showNotification(
        "No tienes conexión a internet para restablecer esta copia de seguridad",
        "error"
      );
      setShowRestoreModal(false);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const url = `/backup/restore-db`;
      setShowRestoreModal(false);
      const response = await clienteAxios.post(
        url,
        { dropboxPath: dropboxPath },
        config
      );
      showNotification(response.data.msg, "success");
      obtenerBackup();
    } catch (err) {
      showNotification(err.response.data.msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!navigator.onLine) {
      showNotification(
        "No tienes conexión a internet para eliminar la copia de seguridad",
        "error"
      );
      setShowEliminarModal(false);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const url = `/backup/eliminar-backup/${id}`;
      setShowEliminarModal(false);
      const response = await clienteAxios.delete(url, config);

      showNotification(response.data.msg, "success");
      obtenerBackup();
    } catch (err) {
      showNotification(err.response.data.msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3500);
  };

  const filteredBackups = backupHistory.filter(
    (backup) =>
      new Date(backup.fechacreado)
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      formatFileSize(backup.size)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto dark:text-white">
        <div className="mb-8 text-center">
          <div className="mb-2 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={handleBackup}
              disabled={isLoading}
              className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 mb-4 sm:mb-0"
              aria-label="Backup Now"
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin -ml-1 mr-2 h-6 w-6" />
                  Procesando...
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <FiRefreshCw className="-ml-1 mr-2 h-6 w-6" />
                  </motion.div>
                  Crear copia de seguridad ahora
                </>
              )}
            </button>

            <button
              onClick={handleLocalBackup}
              disabled={isLoading}
              className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              aria-label="Local Backup Now"
            >
              {isLoading1 ? (
                <>
                  <CgSpinner className="animate-spin -ml-1 mr-2 h-6 w-6" />
                  Procesando...
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <FiRefreshCw className="-ml-1 mr-2 h-6 w-6" />
                  </motion.div>
                  Crear copia de seguridad local ahora
                </>
              )}
            </button>
          </div>
          <div className="mt-5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <FileUploadInput showNotification={showNotification} />
            </motion.div>
          </div>
        </div>

        {notification.show && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            } transition-all duration-300 ease-in-out animate-bounce`}
            role="alert"
          >
            <div className="flex items-center">
              {notification.type === "success" ? (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <FiCheck className="h-5 w-5 mr-2" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <FiAlertCircle className="h-5 w-5 mr-2" />
                </motion.div>
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Buscar copias de seguridad..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                </motion.div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <FiFilter className="text-gray-400 dark:text-gray-300" />
                </motion.div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Filtrar
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Backup History">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Fecha de creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Tamaño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Seguridad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredBackups.map((backup) => (
                  <tr
                    key={backup._id}
                    className="hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {new Date(backup.fechacreado).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completado
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {formatFileSize(backup.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      <span className="inline-flex items-center text-green-600 dark:text-green-400">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <FiLock className="mr-1" />
                        </motion.div>{" "}
                        Encriptado
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setShowRestoreModal(true);
                          setDropboxPath(backup.dropboxPath);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        disabled={isLoading}
                      >
                        Restaurar
                      </button>
                      <button
                        onClick={() => {
                          setShowEliminarModal(true);
                          setId(backup._id);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-transform duration-200 dark:bg-red-500 dark:hover:bg-red-600"
                        disabled={isLoading}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <FiTrash2 className="-ml-0.5 mr-1 h-4 w-4" />
                        </motion.div>{" "}
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showEliminarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setId("");
                setShowEliminarModal(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close confirmation"
            >
              <IoClose size={24} />
            </motion.button>
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Advertencia
            </h2>
            <p className="text-gray-600 mb-6 dark:text-gray-300">
              ¿Estás seguro de que deseas eliminar esta copia de seguridad
              permanentemente?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setId("");
                  setShowEliminarModal(false);
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setDropboxPath("");
                setShowRestoreModal(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close confirmation"
            >
              <IoClose size={24} />
            </motion.button>
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Advertencia
            </h2>
            <p className="text-gray-600 mb-6 dark:text-gray-300">
              ¿Estás seguro de que deseas restaurar esta copia de seguridad?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setDropboxPath("");
                  setShowRestoreModal(false);
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleRestore(dropboxPath)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackupComponent;
