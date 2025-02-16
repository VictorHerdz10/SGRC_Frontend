import React, { useState } from "react";
import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import PanelTrazas from "../components/table/TablaTrazas";

const GestionTrazas = () => {
  const { isOpen } = useValidation();
  const { auth } = useAuth();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className={isOpen ? "w-64" : "w-20"}>
          {auth.tipo_usuario === "Admin_Gnl" ? <AsideAdmin /> : ""}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="sticky top-0 w-full p-4  bg-opacity-10 z-10 mb-10">
            <HeaderAdmin />
          </div>
          <div className="flex-1 p-6 bg-white dark:bg-uci overflow-y-auto space-y-6">
            <PanelTrazas />
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionTrazas;
