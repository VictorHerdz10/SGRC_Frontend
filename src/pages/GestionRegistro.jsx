import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormularioContrato from "../components/form/formularioContrato"
import HeaderAdmin from "../partials/headers/HeaderAuth"
import AsideAdmin from '../components/aside/AsideAdmin'
import AsideDirector from  '../components/aside/AsideDirector'
import AsideEspecialista from  '../components/aside/AsideEspecialista'

import useValidation from "../hooks/useValidation";
import ContractTable from '../components/table/Tablaregistros'
import useAuth from "../hooks/useAuth";



const GestionRegistro = () => {
  const{isOpen,setIsOpen}=useValidation();
  const{auth}=useAuth();

  return (
<>

<div className="flex">
  <div className={  isOpen ? "p-4 ml-10 w-64" : "p-4 w-20" }>
  {auth.tipo_usuario === 'Admin_Gnl' ? <AsideAdmin /> :
   auth.tipo_usuario === 'director' ? <AsideDirector /> :
   auth.tipo_usuario === 'especialista' ? <AsideEspecialista /> :
   ''}</div>
  <div className="w-full flex flex-col">
    <div className="w-full p-4 ">
      <HeaderAdmin/>
    </div>
    
    <div className="w-full p-6 ml-0 mt-20 col-span-10 bg-white dark:bg-gray-900 overflow-y-auto">
      <FormularioContrato/>
  
    </div>
    
    
  </div>
</div>
<div  className="flex">
  <div className={  isOpen ? "p-20 ml-20 w-64" :
  "p-9 w-20" }>
    </div>
    <div className="w-full flex flex-col">
    
    <div className="w-full p-6 ml-0 mt-20 col-span-10 bg-white dark:bg-gray-900 overflow-y-auto">
      <ContractTable/>
  </div>
    </div>
  </div>

     </>   
    
  );
};

export default GestionRegistro;