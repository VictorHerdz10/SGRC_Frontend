import React, { useState } from "react";
import {
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import useValidation from "../../hooks/useValidation";
import JsonViewer from "../others/JsonViewer";
import clienteAxios from "../../axios/axios";

const PanelTrazas = () => {
  const { trazas, setTrazas, obtenerTrazas } = useValidation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [trazasId, setTrazasId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJson, setSelectedJson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("nada");
  const itemsPerPage = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  };

  const formatJSON = (inputString) => {
    if (!inputString) return "N/A"; // Si el input es nulo o vacío, devuelve "N/A"

    try {
      // Intenta parsear el string como JSON
      const parsed = JSON.parse(inputString);

      // Si el parsing tiene éxito, devuelve el JSON formateado
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      // Si falla el parsing, devuelve el string original
      return inputString;
    }
  };

  const filteredTrazas = trazas.filter((trazas) => {
    if (!searchTerm) return true;
    if (filterField === "all") {
      return Object.values(trazas).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      const fieldValue = trazas[filterField]?.toString().toLowerCase() || "";
      return fieldValue.includes(searchTerm.toLowerCase());
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrazas = filteredTrazas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrazas.length / itemsPerPage);

  const maxPageButtons = 10;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const handleDeleteTrazas = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `/trazas/${id}`;
      const response = await clienteAxios.delete(url, config);
      setShowConfirmDelete(false);
      obtenerTrazas();
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 dark:text-white">
        <div>
          <h2 className="bg-clip-text text-2xl font-semibold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-300 dark:to-teal-200">
            Trazas generadas
          </h2>
          <div className="overflow-x-auto">
            {/* Buscador y Filtro */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex items-center bg-blue-500 border border-blue-600 rounded-lg overflow-hidden shadow-sm dark:bg-blue-600 dark:border-blue-700">
                <div className="relative flex items-center w-full">
                  <style>
                    {`
                      .search-input::placeholder {
                        color: white;
                        opacity: 1;
                      }
                    `}
                  </style>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input flex-grow px-12 py-3 text-sm text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:placeholder-gray-300"
                    disabled={filterField === "nada"}
                  />
                  <FaSearch className="absolute left-4 w-5 h-5 text-white/70 dark:text-white/80" />
                </div>
              </div>

              <select
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                className="flex-shrink-0 w-full md:w-[200px] px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="nada">Filtrar por ...</option>
                <option value="all">Todas</option>
                <option value="entity_name">Entidad</option>
                <option value="action_type">Acción</option>
                <option value="changed_by">Usuario</option>
                <option value="ip_address">IP</option>
                <option value="session_id">Sesión</option>
                <option value="transaction_id">Transacción</option>
              </select>
            </div>
            {/* Tabla */}
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-l border-b border-r dark:border-gray-700">
                    ID
                  </th>
                  <th className="py-2 px-4 border-l border-b border-r dark:border-gray-700">
                    Entidad
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    ID Entidad
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Acción
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Valor Antiguo
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Nuevo Valor
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Usuario
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Fecha
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    IP
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Sesión
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Transacción
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Metadatos
                  </th>
                  <th className="py-2 px-4 border-b border-r dark:border-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTrazas.map((trazas) => (
                  <tr
                    key={trazas._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-2 border-l px-6 border-b border-r dark:border-gray-600">
                      {trazas._id}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.entity_name}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.entity_id || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.action_type}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.old_value ? (
                        <button
                          onClick={() => setSelectedJson(trazas.old_value)}
                          className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                            <FaEye />
                          </motion.div>
                          <span>Ver detalles</span>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.new_value ? (
                        <button
                          onClick={() => setSelectedJson(trazas.new_value)}
                          className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                            <FaEye />
                          </motion.div>
                          <span>Ver detalles</span>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.changed_by}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {formatDate(trazas.change_date)}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.ip_address}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.session_id}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.transaction_id}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      {trazas.metadata ? (
                        <button
                          onClick={() =>
                            setSelectedJson(JSON.stringify(trazas.metadata))
                          }
                          className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                            <FaEye />
                          </motion.div>
                          <span>Ver detalles</span>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r dark:border-gray-600">
                      <div className="flex space-x-2 justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <FaTrash
                            className="text-red-500 cursor-pointer dark:text-red-400"
                            onClick={() => {
                              setShowConfirmDelete(true);
                              setTrazasId(trazas._id);
                            }}
                          />
                        </motion.div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-4 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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
                <FaChevronLeft />
              </motion.div>
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => setCurrentPage(startPage + i)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === startPage + i
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {startPage + i}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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
                <FaChevronRight />
              </motion.div>
            </button>
          </div>
        </div>
        {/* Modal de confirmación de eliminación */}
        {showConfirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setShowConfirmDelete(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close confirmation"
              >
                <IoClose size={24} />
              </motion.button>
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Advertencia
              </h2>
              <p className="text-gray-600 mb-6 dark:text-gray-300">
                ¿Estás seguro de que deseas eliminar esta traza?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteTrazas(trazasId)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedJson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setSelectedJson(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close JSON viewer"
              >
                <IoClose size={24} />
              </motion.button>
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Detalles
              </h2>
              <div className="bg-gray-100 p-4 rounded dark:bg-gray-700">
                {(() => {
                  const formatted = formatJSON(selectedJson); // Formatea el JSON o devuelve el string
                  if (
                    typeof formatted === "string" &&
                    !formatted.startsWith("{")
                  ) {
                    // Si es un string simple (no JSON), lo muestra en negrita
                    return (
                      <p className="font-bold dark:text-white">{formatted}</p>
                    );
                  } else {
                    // Si es un JSON válido, lo pasa al JsonViewer
                    return <JsonViewer json={JSON.parse(formatted)} />;
                  }
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PanelTrazas;
