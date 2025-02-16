import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import AsideEspecialista from "../components/aside/AsideEspecialista";
import AsideDirector from "../components/aside/AsideDirector";
import useValidation from "../hooks/useValidation";
import UserProfile from "../components/PerfilUser";
import useAuth from "../hooks/useAuth";

const Perfil = () => {
  const { isOpen, setIsOpen } = useValidation();
  const { auth } = useAuth();
  return (
    <>
      <div className="flex">
        <div className={isOpen ? "p-4 ml-10 w-64" : "p-4 w-20"}>
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
        <div className="w-full flex flex-col">
          <div className="w-full p-4 ">
            <HeaderAdmin />
          </div>

          <div className="w-full p-4 ml-0 mt-10 col-span-10 bg-white dark:bg-uci overflow-y-auto">
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
