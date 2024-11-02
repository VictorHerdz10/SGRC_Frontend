import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VisitanteLayout = () => {
const{auth,cargando}= useAuth();


  if(cargando) return 'cargando...';
 
  return (
    <div>
      <>
        
       {auth?._id ? <Outlet/>:<Navigate to="/auth/signin"/>}
      
      </>
    </div>
  );
};

export default VisitanteLayout;