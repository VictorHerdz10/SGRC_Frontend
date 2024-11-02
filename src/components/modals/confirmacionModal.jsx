import useAuth from "../../hooks/useAuth";
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message })=> {
    return (
    <>
    {isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p>{message}</p>
          <div className="mt-4 space-x-2">
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Cancelar
            </button>
            <button  onClick={onConfirm} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )}
    </>
    )
    }
    export default ConfirmationModal;