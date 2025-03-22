import { useState } from "react";
import { FaFileContract, FaTrash, FaTimes, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import clienteAxios from "../../axios/axios";
import useValidation from "../../hooks/useValidation";
import SupplementModalEdit from "./SupplementModalEdit";

const ViewSupplementsModal = ({
  supplements,
  contractName,
  contractId,
  onClose,
  setErrorMonto,
}) => {
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUse, setShowModalUse] = useState(false);
  const [actualSupplement, setActualSupplement] = useState(supplements);
  const {
    handleGetSupplements,
    setShowSupplementModalEdit,
    showSupplementModalEdit,
    setSelectedContract,setWithSupplement
  } = useValidation();

  const handleConfirmation = (supplement) => {
    setSelectedSupplement(supplement);
  };
  const handleUseSupplement = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(
        `contratos/suplementos/usar/${selectedSupplement}`,
        config
      );
      setWithSupplement(true)
      toast.success(data.msg);
      setSelectedContract(data.contract);
      setSelectedSupplement(null);
      setShowModalUse(false);
      const suplemento = await handleGetSupplements(contractId);
      setActualSupplement(suplemento);
      setErrorMonto(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al eliminar suplemento");
      throw error;
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(
        `contratos/suplementos/${selectedSupplement}`,
        config
      );
      toast.success(data.msg);
      setShowModalDelete(false);
      setSelectedSupplement(null);
      const suplemento = await handleGetSupplements(contractId);
      setActualSupplement(suplemento);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al eliminar suplemento");
      throw error;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-slideIn w-full max-w-2xl relative">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold dark:text-gray-200">
                Suplementos del contrato {contractName}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actualSupplement.length === 0 ? (
                <div className="col-span-full text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay suplementos registrados
                </div>
              ) : (
                actualSupplement.map((supplement, index) => (
                  <div
                    key={supplement._id}
                    className="border rounded-lg p-4 dark:border-gray-700 relative"
                  >
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => {
                          handleConfirmation(supplement);
                          setShowSupplementModalEdit(true);
                        }}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setShowModalDelete(true);
                          handleConfirmation(supplement._id);
                        }}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <button
                        onClick={() => {
                          handleConfirmation(supplement._id);
                          setShowModalUse(true);
                        }}
                        className="px-3 py-1 rounded text-sm font-medium bg-green-500 hover:bg-green-600 text-white"
                      >
                        Usar
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-medium dark:text-gray-200">
                        <FaFileContract className="mr-2 text-blue-500" />
                        Dedicado a: {supplement.nombre}
                      </div>

                      {supplement.tiempo && (
                        <div className="text-sm dark:text-gray-300">
                          <span className="font-medium">
                            Extensión de tiempo:{" "}
                          </span>
                          <div className="flex space-x-2 mt-1">
                            {supplement.tiempo.years > 0 && (
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                {supplement.tiempo.years}A
                              </span>
                            )}
                            {supplement.tiempo.months > 0 && (
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                {supplement.tiempo.months}M
                              </span>
                            )}
                            {supplement.tiempo.days > 0 && (
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                {supplement.tiempo.days}D
                              </span>
                            )}
                            <span className="font-bold text-red-500">
                              {supplement.tiempo.days == 0 &&
                              supplement.tiempo.months == 0 &&
                              supplement.tiempo.days == 0
                                ? "No hay suplementos de tiempo "
                                : " "}
                            </span>
                          </div>
                        </div>
                      )}

                      {supplement.monto ? (
                        <div className="text-sm dark:text-gray-300">
                          <span className="font-medium">Monto adicional:</span>
                          <div className="mt-1 text-green-600 dark:text-green-400">
                            ${supplement.monto.toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm dark:text-gray-300">
                          <span className="font-medium">Monto adicional:</span>
                          <div className="mt-1 text-red-500 dark:text-red-600">
                            <span className="font-bold">
                              No hay suplementos de monto
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Creado el:{" "}
                        {new Date(supplement.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {showSupplementModalEdit && (
              <SupplementModalEdit
                suplemento={selectedSupplement}
                tipoContrato={tipoContrato}
                contractName={contractName}
                contractId={contractId}
                setActualSupplement={setActualSupplement}
              />
            )}
          </div>

          {/* Modal de confirmación de eliminación */}
          {showModalDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md shadow-xl animate-slideIn">
                <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">
                  ¿Eliminar suplemento?
                </h4>
                <p className="dark:text-gray-300 mb-4">
                  Esta acción no se puede deshacer
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowModalDelete(false);
                      setSelectedSupplement(null);
                      onClose;
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={async () => await handleDelete()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showModalUse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md shadow-xl animate-slideIn">
              <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">
                ¿Usar este suplemento para el contrato {contractName}?
              </h4>
              <p className="dark:text-gray-300 mb-4">
                ¿Estás seguro de que deseas usar este suplemento? Esta acción no
                se puede deshacer.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedSupplement(null);
                    setShowModalUse(false);
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleUseSupplement(selectedSupplement);
                    setSelectedSupplement(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Sí, usar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const SupplementViewerTrigger = ({ onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all transform hover:scale-110"
  >
    <FaFileContract
      className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
      size={16}
    />
  </div>
);

export default ViewSupplementsModal;
