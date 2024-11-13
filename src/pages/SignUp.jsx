import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/headers/Header";
import useValidation from "../hooks/useValidation";
import { useState } from "react";
import clienteAxios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { validarInput } = useValidation();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepetirPassword, setErrorRepetirPassword] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarInput(nombre, "text", "");
    const errores1 = validarInput(email, "email", "");
    const errores2 = validarInput(password, "password", "");
    const errores3 = validarInput(repetirPassword, "repetirPassword", password);
    setErrorNombre(errores || "");
    setErrorEmail(errores1 || "");
    setErrorPassword(errores2 || "");
    setErrorRepetirPassword(errores3 || "");
    if (errores || errores1 || errores2 || errores3) {
      return;
    }
    if (check) {
      try {
        const respuesta = await clienteAxios.post("/usuario", {
          nombre,
          email,
          password,
          tipo_usuario: "visitante",
        });
        
        toast.success(respuesta.data.msg);
        setTimeout(() => {
          setNombre("");
          setEmail("");
          setPassword("");
          setRepetirPassword("");
          setCheck(false);
          navigate("/auth/signin");
        }, 3000);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      try {
        const respuesta = await clienteAxios.post("/usuario", {
          nombre,
          email,
          password,
        });

        toast.success(respuesta.data.msg);
        setTimeout(()=>{
          setNombre("");
        setEmail("");
        setPassword("");
        setRepetirPassword("");
        setCheck(false);
        navigate("/auth/signin");
        },3000)
        
      } catch (error) {
        toast.error(error.response.data.msg);
      }
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
                  Tu espacio personalizado <br></br>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    Comienza a gestionar contratos de manera intuitiva
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
                        htmlFor="nombre"
                      >
                        Nombre <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    {errorNombre && (
                      <span className="text-red-500">{errorNombre}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Correo electrónico{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errorEmail && (
                      <span className="text-red-500">{errorEmail}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Contraseña <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Introduzca su contraseña "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errorPassword && (
                      <span className="text-red-500">{errorPassword}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="repetirpassword"
                      >
                        Repetir contraseña{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Repita su contraseña"
                        value={repetirPassword}
                        onChange={(e) => setRepetirPassword(e.target.value)}
                      />
                    </div>
                    {errorRepetirPassword && (
                      <span className="text-red-500">
                        {errorRepetirPassword}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Registrarse
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-gray-600 text-center mt-6">
                  ¿Ya tengo una cuenta?{" "}
                  <Link
                    to="/auth/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Iniciar sesion
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

export default SignUp;
