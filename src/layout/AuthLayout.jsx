import { Outlet } from "react-router-dom"
import imageUrl from "../images/register_bg_2.png";
const AuthLayout = () => {

  return (
    <div className="container mx-auto px-4 py-5 absolute inset-0  w-full h-full bg-blueGray-800 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>

      <Outlet />

    </div>
  )
}

export default AuthLayout;
