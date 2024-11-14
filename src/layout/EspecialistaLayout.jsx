import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useValidation from "../hooks/useValidation";
import Cerrar from "../components/modals/CerrarSesion";

const EspecialistaLayout = () => {
const{auth,cargando}= useAuth();
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
  showConfirmModal
} = useValidation();

  if(cargando) return 'cargando...';
 
  return (
    <div>
    
        
       {auth?._id ? <Outlet/>:<Navigate to="/auth/signin"/>}
     
       {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Detalles de la Notificación
            </h3>
            {/* Descripción principal */}
            <p className="mb-4 text-lg font-semibold text-gray-800 break-words">
              {selectedNotification.description}
            </p>
            {/* Información general */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col">
                  <h2 className="font-semibold">Dirección ejecutiva:</h2>
                  <p>{selectedNotification.direccionEjecutiva}</p>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold">Entidad:</h2>
                  <p>{selectedNotification.entidad}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col">
                  <h2 className="font-semibold">Fecha de Vencimiento:</h2>
                  <p>{parcearDate(
                    restarCuatroHoras(
                      new Date(selectedNotification.fechaVencimiento)
                    )
                  )}</p>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold">Valor Disponible:</h2>
                  <p>{selectedNotification.valorDisponible}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500">
                  Hace{" "}
                  {calcularTiempoTranscurrido(
                    restarCuatroHoras(new Date(selectedNotification.create)),
                    horaatualcorr
                  )}
                </p>
              </div>

              {/* Botón de cierre */}
              <button
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <Cerrar/>
        )}
    </div>
  );
};

export default EspecialistaLayout;
