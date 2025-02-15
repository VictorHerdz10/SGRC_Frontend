import React, { useEffect, useState } from "react";
import ValidationModal from "../components/modals/ValidationModal";
import Header from "../partials/headers/Header";
import useValidation from "../hooks/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../axios/axios";
const ResetPassword = () => {
  const { validarInput } = useValidation();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [showModalValidation, setShowModalValidation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validarInput(email, "email", "");
    setErrorEmail(errores || "");
    if (errores) {
      return;
    }
    try {
      const url = `usuario/olvide-password`;
      const response = await clienteAxios.post(url, { email });
      toast.success(response.data.msg);
      setTimeout(() => {
        setShowModalValidation(true);
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.msg);
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
                <h1 className="h1 mb-4">
                  Vamos a ayudarte a<br></br>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    recuperar tu cuenta
                  </span>
                </h1>
                <p className="text-xl text-gray-600">
                  Ingrese la dirección de correo electrónico asociada a su
                  cuenta y le enviaremos un enlace para restablecer su
                  contraseña
                </p>
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
                        Correo electronico{" "}
                        <span className={ email ? 'text-black':`text-red-600`}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Intruduzca su dirección de correo electronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errorEmail && (
                        <span className="text-red-500">{errorEmail}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Recibir instrucciones
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {showModalValidation && <ValidationModal />}
        </section>
      </main>
    </div>
  );
};

export default ResetPassword;
