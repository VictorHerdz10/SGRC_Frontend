import { IoClose } from "react-icons/io5";
import {
  FaEye,
  FaTrash,
  FaBell,
  FaUser,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../../axios/axios";
import { data } from "autoprefixer";
import useValidation from "../../hooks/useValidation";

const Notification = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
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
    setNotifications,
    notifications,
    obtenerNotificaciones,
  } = useValidation();

  const handleDeleteNotification = async (notificationId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `contratos/marcar-leida/${notificationId}`;
      const response = await clienteAxios(url, config);
      setNotifications([]);

      obtenerNotificaciones();
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleshowNotification = () => {
    setShowNotifications(!showNotifications);
    setTimeout(() => {
      setShowNotifications(false);
    }, 10000);
  };
  const handleCloseNotification = () => {
    setShowNotifications(false);
  };
  const handleClearAllNotifications = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `contratos/marcar-leidas-all`;
      const response = await clienteAxios(url, config);
      obtenerNotificaciones();
      setNotifications([]);

      setShowConfirmModal(false);
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="relative">
        <FaBell
          className="text-2xl dark:text-white cursor-pointer"
          onClick={handleshowNotification}
        />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
            <a
              className="text-bold justify-end w-full text-xs text-end flex"
              onClick={handleCloseNotification}
            >
              <p className="text-xs hover:text-xl hover:text-black justify-end items-end">
                <IoClose size={20} />{" "}
              </p>
            </a>
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                  >
                    <div>
                      <p className="text-sm text-gray-700">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        hace{" "}
                        {calcularTiempoTranscurrido(
                          restarCuatroHoras(new Date(notification.create)),
                          horaatualcorr
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <FaEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          setSelectedNotification(notification);
                          setShowModal(true);
                        }}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-clip text-gray-500">No hay notificaciones</p>
            )}
            <button
              className="w-full text-center py-2 text-sm text-red-500 hover:bg-gray-100"
              onClick={() => setShowConfirmModal(true)}
            >
              Limpiar Todas
            </button>
          </div>
        )}
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close confirmation"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Advertencia</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas borrar todas las notificaciones?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleClearAllNotifications()}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Notification;
