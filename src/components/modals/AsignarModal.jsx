import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const directoresPrueba = [
  { _id: '1', nombre: 'Ana García' },
  { _id: '2', nombre: 'Carlos Rodríguez' },
  { _id: '3', nombre: 'Elena Martínez' },
  { _id: '4', nombre: 'David López' },
  { _id: '5', nombre: 'Isabel Sánchez' },
];

const RoleAssignmentModal = ({ showConfirmUpdate, setShowConfirmUpdate }) => {
  const [rol, setRol] = useState('');
  const [selectedDirector, setSelectedDirector] = useState('');

  const handleDirectorChange = (directorId) => {
    setSelectedDirector(directorId);
  };

  const handleSubmit = () => {
    // Manejar el envío del formulario aquí
    console.log("Rol:", rol);
    console.log("Director seleccionado:", selectedDirector);
    
    // Limpiar el formulario
    setRol('');
    setSelectedDirector('');
    
    // Cerrar el modal
    setShowConfirmUpdate(false);
  };

  const handleClose = () => {
    // Limpiar el formulario al cerrar el modal
    setRol('');
    setSelectedDirector('');
    setShowConfirmUpdate(false);
  };

  if (!showConfirmUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Cerrar confirmación"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Asignar Rol</h2>

        <p className="text-gray-600 mb-6">
          Seleccione el rol para asignarlo al usuario:
        </p>

        <select
          name="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        >
          <option value="">Seleccione un rol</option>
          <option value="director">Director</option>
          <option value="especialista">Especialista</option>
          <option value="Admin_Gnl">Administrador del Sistema</option>
        </select>

        {rol === 'especialista' && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Para obtener permisos, debe vincular al especialista con un director:
            </p>
            <div className="max-h-40 overflow-y-auto">
              {directoresPrueba.map((director) => (
                <div key={director._id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`radio-${director._id}`}
                    name="director"
                    value={director._id}
                    checked={selectedDirector === director._id}
                    onChange={() => handleDirectorChange(director._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`radio-${director._id}`} className="text-sm">
                    {director.nombre}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={rol === 'especialista' && !selectedDirector}
          >
            Asignar Rol
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignmentModal;