import { Link } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../hooks/useAuth";

const CuadroPerfil = () => {
  const { perfil } = useValidation();
  const { auth } = useAuth();

  return (
    <>
      {auth.tipo_usuario === "Admin_Gnl" && (
        <Link
          to="/admin/mi-perfil"
          className="btn-sm  ml-3 dark:border-gray-900"
        >
          <div className="flex items-center space-x-2 ">
            <img
              src={perfil.foto_perfil}
              alt="User profile"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = "/src/images/default-avatar-profile-icon.jpg";
              }}
            />
            <span className="dark:text-white">{perfil.nombre}</span>
          </div>
        </Link>
      )}
      {auth.tipo_usuario === "director" && (
        <Link
          to="/directivo/mi-perfil"
          className="btn-sm  ml-3 dark:border-gray-900"
        >
          <div className="flex items-center space-x-2 ">
            <img
              src={perfil.foto_perfil}
              alt="User profile"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = "/src/images/default-avatar-profile-icon.jpg";
              }}
            />
            <span className="dark:text-white">{perfil.nombre}</span>
          </div>
        </Link>
      )}
      {auth.tipo_usuario === "especialista" && (
        <Link
          to="/especialista/mi-perfil"
          className="btn-sm  ml-3 dark:border-gray-900"
        >
          <div className="flex items-center space-x-2 ">
            <img
              src={perfil.foto_perfil}
              alt="User profile"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = "/src/images/default-avatar-profile-icon.jpg";
              }}
            />
            <span className="dark:text-white">{perfil.nombre}</span>
          </div>
        </Link>
      )}
      {auth.tipo_usuario === "visitante" && (
        <Link
          to="/visitante/mi-perfil"
          className="btn-sm  ml-3 dark:border-gray-900"
        >
          <div className="flex items-center space-x-2 ">
            <img
              src={perfil.foto_perfil}
              alt="User profile"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = "/src/images/default-avatar-profile-icon.jpg";
              }}
            />
            <span className="dark:text-white">{perfil.nombre}</span>
          </div>
        </Link>
      )}
    </>
  );
};

export default CuadroPerfil;
