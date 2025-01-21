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

<div className="flex h-screen overflow-hidden">
      <div className={isOpen ? "w-64" : "w-20"}>
        {auth.tipo_usuario === 'Admin_Gnl' ? <AsideAdmin /> :
          auth.tipo_usuario === 'director' ? <AsideDirector /> :
            auth.tipo_usuario === 'especialista' ? <AsideEspecialista /> :
              ''}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="sticky top-0 w-full p-4 bg-white dark:bg-gray-900 bg-opacity-10 z-10 mb-10">
          <HeaderAdmin />
        </div>
        <div className="flex-1 p-6 bg-white dark:bg-gray-900 overflow-y-auto space-y-6">
          <FormularioContrato />
          <ContractTable />
        </div>
      </div>
    </div>
     </>   
    
  );
};

export default GestionRegistro;