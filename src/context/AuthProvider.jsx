import { useEffect, useState, createContext } from "react";
import clienteAxios from "../axios/axios";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuario/perfil", config);
        setAuth(data);
      } catch (error) {
        
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
