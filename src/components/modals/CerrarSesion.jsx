import useAuth from "../../hooks/useAuth";
import useValidation from "../../hooks/useValidation";
import { IoClose } from "react-icons/io5";

const Cerrar = ()=>{
const{setShowConfirmModal}=useValidation();
const { cerrarSesion } = useAuth();


    return(
        <>
        
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close confirmation"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Advertencia</h2>
            <p className="text-gray-600 mb-6">
            ¿Estas seguro que queres cerrar sesión?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {cerrarSesion()
                    setShowConfirmModal(false)
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
       
        </>
    )
}
export default Cerrar;