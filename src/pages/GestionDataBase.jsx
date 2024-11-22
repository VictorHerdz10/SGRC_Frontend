import BackupComponent from "../components/others/Backup";
import AsideAdmin from "../components/aside/AsideAdmin";
import HeaderAdmin from '../partials/headers/HeaderAuth';
import useValidation from "../hooks/useValidation";

const GestionDataBase = ()=>{

    const{isOpen}=useValidation();


    return (
    <>
  <div className="flex">
    <div className={  isOpen ? "p-4 ml-10 w-64" : "p-4 w-20" }>
      <AsideAdmin/>
    </div>
    <div className="w-full flex flex-col">
      <div className={`w-full p-4 `} >
        <HeaderAdmin/>
      </div>
      
      <div className={`w-full p-6  ml-0 mt-20 col-span-10 bg-white dark:bg-gray-900 overflow-y-auto`}>
        <BackupComponent/>
       
      </div>
      
    </div>
  </div>
         
    </>);
}
export default GestionDataBase;