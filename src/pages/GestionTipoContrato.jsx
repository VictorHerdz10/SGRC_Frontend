import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import ContractConfigPanel from "../components/others/EditorTipoContrato";
import AsideDirector from "../components/aside/AsideDirector";

const GestionTipoContrato = () => {
  const { isOpen } = useValidation();
  const { auth } = useAuth();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {" "}
        {/* Evita el scroll en el layout */}
        <div className={isOpen ? "p-4 ml-10 w-64" : "p-4 w-20"}>
          {auth.tipo_usuario === "Admin_Gnl" ? (
            <AsideAdmin />
          ) : (
            <AsideDirector />
          )}
        </div>
        <div className="w-full flex flex-col overflow-hidden">
          {" "}
          {/* Evita el scroll en el layout */}
          <div className="w-full p-4">
            <HeaderAdmin />
          </div>
          <div className="w-full px-10 mt-10 col-span-10 bg-white dark:bg-uci overflow-y-auto">
            {" "}
            {/* Scroll interno */}
            <ContractConfigPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionTipoContrato;
