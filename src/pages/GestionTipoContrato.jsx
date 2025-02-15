import HeaderAdmin from "../partials/headers/HeaderAuth";
import AsideAdmin from "../components/aside/AsideAdmin";
import useValidation from "../hooks/useValidation";
import useAuth from "../hooks/useAuth";
import ContractConfigPanel from "../components/others/EditorTipoContrato";

const GestionTipoContrato = () => {
  const { isOpen } = useValidation();
  const { auth } = useAuth();

  return (
    <>
      <div className="flex">
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

          <div className="w-full p-10 ml-0 mt-20 col-span-10 bg-white dark:bg-gray-900 overflow-y-auto">
            <ContractConfigPanel/>
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionTipoContrato;
