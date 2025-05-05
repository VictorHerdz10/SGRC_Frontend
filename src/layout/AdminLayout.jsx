import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useValidation from "../hooks/useValidation";
import Cerrar from "../components/modals/CerrarSesion";
import BackupWarning from "../components/others/WarningBackup";
import { 
  FaBuilding, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaCube,
  FaTimes
} from "react-icons/fa";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const {
    showModal,
    setShowModal,
    selectedNotification,
    setSelectedNotification,
    restarCuatroHoras,
    horaatualcorr,
    parcearDate,
    calcularTiempoTranscurrido,
    horaActual,
    obtenerHoraActual,
    showConfirmModal,
  } = useValidation();

// Componente auxiliar para las tarjetas de información
const InfoCard = ({ title, value, icon }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
    <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
      {icon}
      <span className="text-xs md:text-sm font-medium">{title}</span>
    </div>
    <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base mt-0.5">{value}</p>
  </div>
);

// Función auxiliar para formatear el tiempo
const formatTiempo = (tiempo) => {
  const parts = [];
  if (tiempo.years > 0) parts.push(`${tiempo.years} año${tiempo.years > 1 ? 's' : ''}`);
  if (tiempo.months > 0) parts.push(`${tiempo.months} mes${tiempo.months > 1 ? 'es' : ''}`);
  if (tiempo.days > 0) parts.push(`${tiempo.days} día${tiempo.days > 1 ? 's' : ''}`);
  return parts.join(' ') || '0 días';
};

  if (cargando) return "cargando...";

  return (
    <div className="min-w-screen-md dark:bg-uci">
      <>{auth?._id ? <Outlet /> : <Navigate to="/auth/signin" />}</>

{showModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-full max-w-sm md:max-w-md mx-auto shadow-2xl animate-slideIn my-4">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          Detalles de la Notificación
        </h3>
        <button 
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      
      {/* Contenido principal - Scroll interno si es necesario */}
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
        <div className="space-y-4">
          {/* Descripción */}
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-100 break-words">
              {selectedNotification.description}
            </p>
          </div>
          
          {/* Tarjetas de información - Grid responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard 
              title="Dirección ejecutiva" 
              value={selectedNotification.direccionEjecutiva}
              icon={<FaBuilding className="h-3 w-3 md:h-4 md:w-4" />}
            />
            
            <InfoCard 
              title="Entidad" 
              value={selectedNotification.entidad}
              icon={<FaFileAlt className="h-3 w-3 md:h-4 md:w-4" />}
            />
            
            <InfoCard 
              title="Vencimiento" 
              value={parcearDate(restarCuatroHoras(new Date(selectedNotification.fechaVencimiento)))}
              icon={<FaCalendarAlt className="h-3 w-3 md:h-4 md:w-4" />}
            />
            
            <InfoCard 
              title="Monto disponible" 
              value={selectedNotification.valorDisponible}
              icon={<FaDollarSign className="h-3 w-3 md:h-4 md:w-4" />}
            />
          </div>
          
          {/* Sección de suplementos con scroll interno si hay muchos */}
          {selectedNotification.supplement && selectedNotification.supplement.length > 0 && (
            <div className="mt-3">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                <FaCube className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Suplementos ({selectedNotification.supplement.length})
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {selectedNotification.supplement.map((sup, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{sup.nombre}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm whitespace-nowrap ml-2">
                        +{sup.monto}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <div>Duración: {formatTiempo(sup.tiempo)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Pie de modal */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Hace {calcularTiempoTranscurrido(
            restarCuatroHoras(new Date(selectedNotification.create)),
            horaatualcorr
          )}
        </span>
        <button
          className="px-3 py-1.5 text-sm md:text-base bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow"
          onClick={() => setShowModal(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}



      {showConfirmModal && <Cerrar />}
      <BackupWarning />
    </div>
  );
};

export default RutaProtegida;