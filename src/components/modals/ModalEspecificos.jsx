import { useState, useEffect } from "react";
import { FaEye, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { ModalDetalleContrato } from "./ModalDetalleContrato";
import clienteAxios from "../../axios/axios";

const ModalEspecificos = ({ marcoId, onClose }) => {
  const [especificos, setEspecificos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContrato, setSelectedContrato] = useState(null);

  const getValueColor = (totalValue, remainingValue) => {
    if (remainingValue >= totalValue * 0.5) {
      return "bg-green-500"; // Más del 50%
    } else if (remainingValue >= totalValue * 0.3) {
      return "bg-yellow-500"; // Entre el 30% y el 50%
    } else {
      return "bg-red-500"; // Menos del 30%
    }
  };
  useEffect(() => {
    const fetchEspecificos = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const url = `/contratos/marco/${marcoId}/especificos`;
        const response = await clienteAxios(url, config);
        setEspecificos(response.data);
      } catch (error) {
        console.error("Error fetching específicos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecificos();
  }, [marcoId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Cargando...
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Contratos Específicos
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  N° Dictamen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Monto Disponible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Monto Gastado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {especificos.map((contrato) => (
                <tr key={contrato._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {contrato.numeroDictamen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {contrato.tipoDeContrato}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${contrato.valorPrincipal?.toLocaleString() || "0"}
                  </td>
                  {(contrato.isMarco || contrato.valorDisponible !== null) && (
                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${getValueColor(
                              +contrato.valorPrincipal || 0,
                              +contrato.valorDisponible || 0
                            )} mr-2`}
                          ></div>
                          <div className="block">
                            ${(contrato.valorDisponible || 0).toLocaleString()}
                          </div>
                        </div>

                        {/* Mostrar suplementos GLOBALES (marco) */}
                        {contrato.isMarco &&
                          contrato.supplement?.some((s) => s.isGlobal) && (
                            <>
                              {contrato.supplement
                                .filter((s) => s.isGlobal && s.monto > 0)
                                .map((sup, i) => (
                                  <div
                                    key={`global-${i}`}
                                    className="block text-purple-500"
                                  >
                                    + ${sup.monto.toLocaleString()} (Global)
                                  </div>
                                ))}
                            </>
                          )}

                        {/* Mostrar suplementos ESPECÍFICOS (si no es marco) */}
                        {!contrato.isMarco &&
                          contrato.supplement?.length > 0 && (
                            <>
                              {contrato.supplement
                                .filter((sup) => sup.monto > 0)
                                .map((sup, i) => (
                                  <div
                                    key={`local-${i}`}
                                    className="block text-green-500"
                                  >
                                    + ${sup.monto.toLocaleString()}
                                  </div>
                                ))}
                            </>
                          )}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${contrato.valorGastado?.toLocaleString() || "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        contrato.estado === "Ejecución"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {contrato.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-block"
                    >
                      <FaEye
                        className="text-blue-500 cursor-pointer dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        onClick={() => setSelectedContrato(contrato)}
                      />
                    </motion.div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedContrato && (
          <ModalDetalleContrato
            contrato={selectedContrato}
            onClose={() => setSelectedContrato(null)}
          />
        )}
      </div>
    </div>
  );
};
export default ModalEspecificos;
