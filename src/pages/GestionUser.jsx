import React, { useState } from "react";
import HeaderAdmin from "../partials/headers/HeaderAuth"
import AsideAdmin from '../components/aside/AsideAdmin'
import useValidation from "../hooks/useValidation";
import PanelUsuario from '../components/table/TablaUsers'
import { IoClose } from "react-icons/io5";
import clienteAxios from "../axios/axios";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
const GestionUser = () => {
  const{auth}=useAuth();
    const{isOpen,validarInput}=useValidation();
    const[mostrarModal,setMostrarModal]=useState(false);
    const[acessToken,setAccesToken]=useState('');
    const[errorText,setErrorText]=useState([]);

    const handleponer = async(e)=>{
      e.preventDefault();
      const errores = validarInput(acessToken,'text','');
      setErrorText(errores || '');
      if(errores){
        return;
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const uri = `usuario/poner-token`;
        const response = await clienteAxios.post(uri, { token:acessToken }, config);
        toast.success(response.data.msg);
        setMostrarModal(false);
        setAccesToken('')
      } catch (error) {
        toast.error(error.response.data.msg);
        
      }
    }
  
    return (
  <>
  
  <div className="flex">
    <div className={  isOpen ? "p-4 ml-10 w-64" : "p-4 w-20" }>
      <AsideAdmin/>
    </div>
    <div className="w-full flex flex-col">
      <div className= 'w-full p-4'>
        <HeaderAdmin/>
      </div>
      
      <div className={`w-full p-10  ml-0 mt-20 col-span-10 bg-white dark:bg-gray-900 overflow-y-auto`}>
        <PanelUsuario/>
       {auth?.tipo_usuario === 'Admin_Gnl'? <button
            onClick={()=>setMostrarModal(true)}
            className="bg-blue-600 w-50 text-white py-2 px-4 ml-5 rounded-md hover:bg-blue-800  transition duration-200"
          >
            Colocar Token de Archivos
          </button> : ''}
      </div>
      
    </div>
    {mostrarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn">
              <button
                onClick={() => {setMostrarModal(false)
                    setAccesToken("");
                    
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close confirmation"
              >
                <IoClose size={24} />
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Actualizar Token
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="token"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Token de acceso valido por 4 horas
                </label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  placeholder="Token de acceso"
                  value={acessToken}
                  onChange={(e) => setAccesToken(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errorText && <span className="text-red-500">{errorText}</span>}
              </div>
              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => {
                    setMostrarModal(false);
                    setErrorText("");
                   
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => handleponer(e)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}
  </div>
       </>   
      
    );
  };
  
  export default GestionUser;