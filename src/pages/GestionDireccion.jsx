import React, { useState } from "react";
import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import AsideDirector from "../components/aside/AsideDirector";
import PanelDireccion from "../components/table/TablaDireccion";

const GestionDireccion = () => {
  const { auth } = useAuth();
  const { isOpen } = useValidation();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className={isOpen ? "p-4 ml-10 w-64" : "p-4 w-20"}>
          {auth.tipo_usuario === "Admin_Gnl" ? (
            <AsideAdmin />
          ) : (
            <AsideDirector />
          )}
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full p-4 ">
            <HeaderAdmin />
          </div>

          <div className="w-full p-10 ml-0 mt-20 col-span-10 bg-white dark:bg-uci overflow-y-auto">
            <PanelDireccion />
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionDireccion;
