import React, { useRef, useEffect, useState } from "react";
import FormularioContrato from "../components/form/formularioContrato";
import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import AsideDirector from "../components/aside/AsideDirector";
import AsideEspecialista from "../components/aside/AsideEspecialista";
import useValidation from "../hooks/useValidation";
import ContractTable from "../components/table/Tablaregistros";
import useAuth from "../hooks/useAuth";
import ContractTypeSelector from "../components/others/ContractTypeSelector";

const GestionRegistro = () => {
  const { isOpen, setIsOpen, showForm, contractTypes, obtenerRegistros,tipoContrato,setTipoContrato } =
    useValidation();
  const { auth } = useAuth();
  const contentRef = useRef(null);

  useEffect(() => {
    if (showForm && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showForm]);

  // Función para manejar el cambio de tipo de contrato
  const handleTipoContratoChange = async (event) => {
    setTipoContrato(event.target.value);
    if (event.target.value !== "") {
      obtenerRegistros(event.target.value);
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className={isOpen ? "w-64" : "w-20"}>
          {auth.tipo_usuario === "Admin_Gnl" ? (
            <AsideAdmin />
          ) : auth.tipo_usuario === "director" ? (
            <AsideDirector />
          ) : auth.tipo_usuario === "especialista" ? (
            <AsideEspecialista />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="sticky top-0 w-full p-4 bg-transparent bg-opacity-10 z-10 mb-10">
            <HeaderAdmin />
          </div>
          <div
            ref={contentRef}
            className="flex-1 p-6 bg-white dark:bg-uci overflow-y-auto space-y-6"
          >
            <ContractTypeSelector contractTypes={contractTypes}/>

            {/* Mensaje grande con degradado azul cuando no hay tipo de contrato seleccionado */}
            {!tipoContrato && (
              <div className="flex items-center justify-center h-96 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg">
                <h1 className="text-4xl font-bold text-white text-center">
                  Área de gestión de los registros de contratos
                </h1>
              </div>
            )}

            {/* Renderizado condicional del formulario y la tabla según el tipo de contrato */}
            {contractTypes.some(
              (contract) => contract.nombre === tipoContrato
            ) && (
              <>
                <FormularioContrato tipoContrato={tipoContrato} />
                <ContractTable tipoContrato={tipoContrato} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionRegistro;
