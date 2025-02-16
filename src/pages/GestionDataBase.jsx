import BackupComponent from "../components/others/Backup";
import AsideAdmin from "../components/aside/AsideAdmin";
import HeaderAdmin from "../partials/headers/HeaderAuth";
import useValidation from "../hooks/useValidation";

const GestionDataBase = () => {
  const { isOpen } = useValidation();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className={isOpen ? "w-64" : "w-20"}>
          <AsideAdmin />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="sticky top-0 w-full p-4 bg-opacity-10 z-10 mb-6">
            <HeaderAdmin />
          </div>
          <div className="flex-1 p-6 bg-white dark:bg-uci overflow-y-auto">
            <BackupComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionDataBase;
