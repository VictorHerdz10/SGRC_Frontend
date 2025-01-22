import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaTrash,
  FaBell,
  FaUser,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import clienteAxios from "../../axios/axios";
import useAuth from "../../hooks/useAuth";
import useValidation from "../../hooks/useValidation";

const PanelUsuario = () => {
  const { auth } = useAuth();
  const [userId, setUserId] = useState("");
  const [actual, setUsuarioActual] = useState();
  const [rol, setRol] = useState();
  const [showConfirmUpdate, setShowComfirmUpdate] = useState(false);
  const [showConfirmDelete, setShowComfirmDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [directores, setDirectores] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("");
  const{users,obtenerUsuarios} =useValidation();

  const handleDirectorChange = (directorId) => {
    setSelectedDirector(directorId);
  };

  const handleSubmit = () => {
    // Manejar el envío del formulario aquí
    // Limpiar el formulario
    setRol("");
    setSelectedDirector("");
    setShowComfirmUpdate(false);
  };

  const parcearDate = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = date.getMonth() + 1; // Asumimos que enero es 1 y diciembre es 12
    const ano = date.getFullYear() % 100;
    return `${dia}/${mes}/${ano}`;
  };

  const getUserRoleText = (rol) => {
    switch (rol) {
      case "director":
        return "Director";
      case "especialista":
        return "Especialista ";
      case "Admin_Gnl":
        return "Administrador del Sistema";
      default:
        return "Sin Asignar";
    }
  };

  const handleViewUser = (selectedUserId) => {
    // Buscar el usuario en el arreglo users
    const foundUser = users.find((user) => user._id === selectedUserId);
    if (foundUser) {
      setUsuarioActual(foundUser);
      setShowModal(true);
    } else {
      console.warn("Usuario no encontrado");
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `usuario/eliminar-usuario/${userId}`;
    try {
      const respuesta = await clienteAxios.delete(url, config);
      

      setShowComfirmDelete(false);
      setUserId("");
      toast.success(respuesta.data.msg);
        obtenerUsuarios();
    } catch (error) {
      toast.success(error.response.data.msg);
    }
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    try {
      const userToModify = users.find((user) => user._id === userId);
      if (!userToModify) {
        throw new Error("Usuario no encontrado");
      }
      if (token && auth) {
        const url = `usuario/asignar-rol`;

        const respuesta = await clienteAxios.post(
          url,
          { id: userToModify._id, rol: rol, directorId: selectedDirector },
          config
        );
        setShowComfirmUpdate(false);
        toast.success(respuesta.data.msg);
          obtenerUsuarios();
      }
    } catch (error) {
      console.error("Error al asignar rol:", error.message);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div>
          <h2 className="bg-clip-text text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Usuarios existentes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-l border-b border-r">No.</th>
                  <th className="py-2 px-4 border-l border-b border-r">
                    Nombre
                  </th>
                  <th className="py-2 px-4 border-b border-r">
                    Correo electrónico
                  </th>
                  <th className="py-2 px-4 border-b border-r">Rol</th>
                  <th className="py-2 px-4 border-b border-r ">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-2 border-l px-6 border-b border-r ">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-r ">
                      {user.nombre}
                    </td>
                    <td className="py-2 px-4 border-b border-r">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-b border-r">
                      {user.tipo_usuario
                        ? getUserRoleText(user.tipo_usuario)
                        : ""}
                    </td>
                    <td className="py-2 px-4 border-b border-r">
                      <div className="flex space-x-2">
                        <FaEye
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleViewUser(user._id)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setShowComfirmDelete(true);
                            setUserId(user._id);
                          }}
                        />
                        <FaUserPlus
                          className="text-purple-500 cursor-pointer"
                          onClick={() => {
                            setShowComfirmUpdate(true);
                            setUserId(user._id);
                            setDirectores(
                              users.filter((usuario) =>
                                usuario.tipo_usuario
                                  .toLowerCase()
                                  .includes("director")
                              )
                            );
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn">
              <button
                onClick={() => setShowComfirmDelete(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close confirmation"
              >
                <IoClose size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Advertencia</h2>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar este usuario?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowComfirmDelete(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(userId)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 animate-slideIn">
              <h3 className="text-lg font-semibold mb-4">
                Información del usuario
              </h3>
              <h1 className=" flex font-bold text-black">
                Nombre:{" "}
                <p className="text-start text-gray-700 mx-2">{actual.nombre}</p>{" "}
              </h1>
              <h1 className="flex font-bold text-black">
                Email:<p className="text-gray-700 mx-2">{actual.email}</p>
              </h1>
              <h1 className="flex font-bold text-black">
                Rol:
                <p className="text-gray-700 mx-2">
                  {actual.tipo_usuario === "especialista"
                    ? "Especialista"
                    : actual.tipo_usuario === "director"
                    ? "Director"
                    : "Administrador de sistema" || "Sin Asignar"}
                </p>
              </h1>
              <h1 className="flex font-bold text-black">
                Telefono:
                <p className="text-gray-700 mx-2">
                  {actual.telefono ? actual.telefono : "-"}
                </p>
              </h1>

              <h1 className="flex font-bold text-black">
                Cargo:
                <p className="text-gray-700 mx-2">
                  {actual.cargo ? actual.cargo : "-"}
                </p>
              </h1>

              <h1 className="flex font-bold text-black">
                Registrado:
                <p className="text-gray-700 mx-2">
                  {actual.creado ? parcearDate(new Date(actual.creado)) : "-"}
                </p>
              </h1>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  setShowModal(false);
                  setUserId("");
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        {showConfirmUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn">
              <button
                onClick={() => {
                  setRol("");
                  setSelectedDirector("");
                  setShowComfirmUpdate(false);
                }}
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

              {rol === "especialista" && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Para obtener permisos, debe vincular al especialista con un
                    director:
                  </p>
                  <div className="max-h-40 overflow-y-auto">
                    {directores.map((director) => (
                      <div
                        key={director._id}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="radio"
                          id={"radio-${director._id}"}
                          name="director"
                          value={director._id}
                          checked={selectedDirector === director._id}
                          onChange={() => handleDirectorChange(director._id)}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`radio-${director._id}`}
                          className="text-sm"
                        >
                          {director.nombre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => {
                    setRol("");
                    setSelectedDirector("");
                    setShowComfirmUpdate(false);
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    handleAssignRole(e);
                    handleSubmit;
                  }}
                  disabled={rol === "especialista" && !selectedDirector}
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Asignar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PanelUsuario;
