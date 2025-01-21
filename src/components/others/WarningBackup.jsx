import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoWarningOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const BackupWarning = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleBackupClick = () => {
    navigate('/admin/respaldo-datos');
    setVisible(false);
    const nextShowTime = Date.now() + 5 * 60 * 60 * 1000; // 5 horas
    localStorage.setItem('nextShowTime', nextShowTime);
  };

  const handleCloseClick = () => {
    setVisible(false);
    toast.info(`La copia de seguridad ha sido pospuesta por 10 minutos    
        ¡Recuerda realizar tu copia de seguridad local!`, {
        autoClose: 5000,
    });
    const nextShowTime = Date.now() + 10 * 60 * 1000; // 10 minutos
    localStorage.setItem('nextShowTime', nextShowTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextShowTime = localStorage.getItem('nextShowTime');
      if (nextShowTime && Date.now() >= nextShowTime) {
        setVisible(true);
        localStorage.removeItem('nextShowTime');
      }
    }, 1000); // Verificar cada segundo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextShowTime = localStorage.getItem('nextShowTime');
    if (nextShowTime && Date.now() < nextShowTime) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-yellow-100 text-black rounded-lg shadow-lg animate-bounce z-50">
      <div className="flex justify-between items-center">
        <IoWarningOutline size={24} className="text-red-600 mr-2" />
        <span>Realiza tu copia de seguridad local ahora !!!</span>
        <button
          onClick={handleCloseClick}
          className="ml-4 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Close warning"
        >
          <IoClose size={24} />
        </button>
      </div>
      <button
        onClick={handleBackupClick}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Ir a Copias de Seguridad
      </button>
    </div>
  );
};

export default BackupWarning;