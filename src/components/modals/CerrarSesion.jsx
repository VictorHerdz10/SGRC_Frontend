import useAuth from "../../hooks/useAuth";
import useValidation from "../../hooks/useValidation";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const Cerrar = () => {
  const {
    setShowConfirmModal,
    setDirecciones,
    setEntidades,
    setContratos,
    setBackupHistory,
    setNotifications,
    setUsers,
    setPerfil,
  } = useValidation();
  const { cerrarSesion } = useAuth();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-slideIn sm:max-w-sm">
         
            
          <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Close confirmation"
              ><IoClose size={24} /></motion.button> 
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Advertencia
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ¿Estás seguro que quieres cerrar sesión?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                cerrarSesion();
                setDirecciones([]);
                setEntidades([]);
                setContratos([]);
                setBackupHistory([]);
                setNotifications([]);
                setUsers([]);
                setPerfil([]);
                setShowConfirmModal(false);
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cerrar;
