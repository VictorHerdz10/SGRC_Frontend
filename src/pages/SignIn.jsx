import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Header from "../partials/headers/Header";
import useValidation from "../hooks/useValidation";
import clienteAxios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const{setAuth}=useAuth();
  const { validarInput } = useValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarInput(email, "email", "");
    const errores1 = validarInput(password, "", "");
    setErrorEmail(errores || "");
    setErrorPassword(errores1 || "");
    if (errores || errores1) {
      return;
    }

    try {
      const response = await clienteAxios.post("usuario/login", {email,password});
      localStorage.setItem('token',response.data.token);
      setAuth(response.data);
      setEmail('');
      setPassword('');
      if (response.data.tipo_usuario === 'Admin_Gnl') {
        navigate('/admin/registro-contrato');
    } else if (response.data.tipo_usuario === 'director') {
        navigate('/directivo/registro-contrato');
    } else if (response.data.tipo_usuario === 'especialista') {
        navigate('/especialista/registro-contrato');
    } else if (response.data.tipo_usuario === 'visitante') {
        navigate('/visitante/registro-contrato');
    }
      
    } catch (error) {
      toast.error(error.response.data.msg)
      
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Bienvenido nuevamente <br></br>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    Tu puerta de acceso al universo de contratos
                  </span>
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form noValidate onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su dirección de correo electrónico"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                      />
                    </div>
                    {errorEmail && (
                      <span className="text-red-500">{errorEmail}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Contraseña
                        </label>
                        <Link
                          to="/auth/reset-password"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          ¿Tiene problemas para iniciar sesión?
                        </Link>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su contraseña"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                    </div>
                    {errorPassword && (
                      <span className="text-red-500">{errorPassword}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Iniciar sesión
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-gray-600 text-center mt-6">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/auth/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Registrate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
