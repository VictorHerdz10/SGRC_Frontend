import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NotFound = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleGoHome = () => {
    if (auth.tipo_usuario === "Admin_Gnl") {
      navigate('/admin/registro-contrato');
    } else if (auth.tipo_usuario === "director") {
      navigate('/directivo/registro-contrato');
    } else if (auth.tipo_usuario === "especialista") {
      navigate('/especialista/registro-contrato');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 animate-fadeIn p-4">
      <h1 className="text-6xl font-bold text-white mb-4 animate-jump sm:text-5xl md:text-6xl">404</h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white">Página No Encontrada</h2>
      <p className="mt-4 text-white animate-slideIn sm:text-lg md:text-xl">Lo sentimos, la página que estás buscando no existe.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105 animate-bounce sm:px-3 sm:py-1 md:px-4 md:py-2"
      >
        Regresar al Home
      </button>
    </div>
  );
};

export default NotFound;