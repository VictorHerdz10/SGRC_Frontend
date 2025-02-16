import React, { useState } from "react";
import clienteAxios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const CambioPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const validarInput = (valor) => {
    if (valor.trim() === "") {
      return "Este campo no puede estar vacío";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarInput(password);
    setErrorPassword(errores || "");
    if (errores) {
      return;
    }
    try {
      const respuesta = await clienteAxios.post(
        `usuario/nuevo-password/${token}`,
        { password }
      );
      toast.success(respuesta.data.msg);
      setTimeout(() => {
        navigate(`/auth/signin`);
      }, 500);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Page content */}
      <main className="flex-grow flex items-center justify-center">
        <section className="w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4 text-black dark:text-white">
                  Ha solicitado un <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    restablecimiento de credenciales
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Ingrese su nueva contraseña.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form noValidate onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 dark:text-white text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Contraseña{" "}
                        <span
                          className={password ? "text-black" : "text-red-600"}
                        >
                          *
                        </span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errorPassword && (
                        <span className="text-red-500">{errorPassword}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Cambiar contraseña
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CambioPassword;
