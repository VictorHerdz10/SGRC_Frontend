import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaClock, FaMoneyBillAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useValidation from "../../hooks/useValidation";
import clienteAxios from "../../axios/axios";
import { motion } from "framer-motion";

const SupplementModalEdit = ({
  suplemento,
  tipoContrato,
  contractName,
  contractId,
  setActualSupplement,
}) => {
  const [supplementTypes, setSupplementTypes] = useState({
    tiempo:
      suplemento?.tiempo.days !== 0 ||
      suplemento?.tiempo.months !== 0 ||
      suplemento?.tiempo.years !== 0
        ? true
        : false,
    monto: suplemento.monto ? true : false,
  });
  const [timeSupplement, setTimeSupplement] = useState({
    days: suplemento.tiempo.days || "",
    months: suplemento.tiempo.months || "",
    years: suplemento.tiempo.years || "",
  });
  const [amountSupplement, setAmountSupplement] = useState(
    suplemento.monto || ""
  );
  const [supplementName, setSupplementName] = useState(suplemento.nombre || "");
  const {
    showSupplementModalEdit,
    setShowSupplementModalEdit,
    obtenerRegistros,
    handleGetSupplements,
    setIsCreate,
  } = useValidation();

  const handleAddSupplement = async () => {
    if (!supplementName) {
      toast.error("El nombre del suplemento es requerido");
      return;
    }
    if (!supplementTypes.tiempo && !supplementTypes.monto) {
      toast.error("Selecciona al menos un tipo de suplemento");
      return;
    }

    const errors = [];
    if (supplementTypes.tiempo) {
      if (
        !timeSupplement.days &&
        !timeSupplement.months &&
        !timeSupplement.years
      ) {
        errors.push("Ingresa al menos un valor de tiempo");
      }
    }

    if (supplementTypes.monto) {
      if (!amountSupplement || isNaN(amountSupplement)) {
        errors.push("Ingresa un monto válido");
      }
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    // Preparar datos para enviar
    const supplementData = {
      nombre: supplementName,
      contratoId: contractId,
      ...(supplementTypes.tiempo && {
        tiempo: {
          days: Number(timeSupplement.days),
          months: Number(timeSupplement.months),
          years: Number(timeSupplement.years),
        },
      }),
      ...(supplementTypes.monto && {
        monto: Number(amountSupplement),
      }),
    };

    // Manejador para obtener suplementos de un contrato
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        `/contratos/suplementos/${suplemento._id}`,
        supplementData,
        config
      );
      toast.success(data.msg);
      const actualizacion = await handleGetSupplements(contractId);
      setActualSupplement(actualizacion);
      setIsCreate(true);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Error al obtener suplementos");
      throw error;
    }
  };

  const handleCloseModal = () => {
    setShowSupplementModalEdit(false);
    setSupplementTypes({ tiempo: false, monto: false });
    setTimeSupplement({ days: "", months: "", years: "" });
    setAmountSupplement("");
  };

  const handleTimeChange = (e, field) => {
    const value = Math.max(0, parseInt(e.target.value)) || "";
    setTimeSupplement((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSupplementType = (type) => {
    setSupplementTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div>
      {showSupplementModalEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-slideIn">
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </motion.button>

            <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
              Actualizar suplemento del contrato N.Dictamen={">"} #{" "}
              {contractName || "#"}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                Razon del Suplemento
              </label>
              <input
                type="text"
                placeholder="Ej: Prorroga por demora en materiales"
                value={supplementName}
                onChange={(e) => setSupplementName(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                Tipos de Suplemento
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => toggleSupplementType("tiempo")}
                  className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all
                    ${
                      supplementTypes.tiempo
                        ? "border-blue-600 bg-blue-100 dark:bg-blue-900/50"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
                    }
                    dark:text-gray-200`}
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
                    <FaClock className="mr-2" />
                  </motion.div>{" "}
                  Tiempo
                </button>

                <button
                  onClick={() => toggleSupplementType("monto")}
                  className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all
                    ${
                      supplementTypes.monto
                        ? "border-green-600 bg-green-100 dark:bg-green-900/50"
                        : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500"
                    }
                    dark:text-gray-200`}
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
                    <FaMoneyBillAlt className="mr-2" />
                  </motion.div>{" "}
                  Monto
                </button>
              </div>
            </div>

            {supplementTypes.tiempo && (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                  Duración del Suplemento
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Días"
                      value={timeSupplement.days}
                      onChange={(e) => handleTimeChange(e, "days")}
                      className="w-full p-2 border rounded dark:bg-gray-700 pr-8 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <span className="absolute right-2 top-2.5 text-sm text-gray-500 dark:text-gray-400">
                      D
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Meses"
                      value={timeSupplement.months}
                      onChange={(e) => handleTimeChange(e, "months")}
                      className="w-full p-2 border rounded dark:bg-gray-700 pr-8 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <span className="absolute right-2 top-2.5 text-sm text-gray-500 dark:text-gray-400">
                      M
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="Años"
                      value={timeSupplement.years}
                      onChange={(e) => handleTimeChange(e, "years")}
                      className="w-full p-2 border rounded dark:bg-gray-700 pr-8 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <span className="absolute right-2 top-2.5 text-sm text-gray-500 dark:text-gray-400">
                      A
                    </span>
                  </div>
                </div>
              </div>
            )}

            {supplementTypes.monto && (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                  Monto Adicional
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 dark:text-gray-300">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ingrese el monto"
                    value={amountSupplement}
                    onChange={(e) =>
                      setAmountSupplement(
                        e.target.value.replace(/[^0-9.]/g, "")
                      )
                    }
                    className="pl-8 pr-4 py-2 border rounded w-full dark:bg-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSupplement}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={
                  (!supplementTypes.tiempo && !supplementTypes.monto) ||
                  (supplementTypes.tiempo &&
                    !timeSupplement.days &&
                    !timeSupplement.months &&
                    !timeSupplement.years) ||
                  (supplementTypes.monto && !amountSupplement)
                }
              >
                Actualizar Suplemento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplementModalEdit;
