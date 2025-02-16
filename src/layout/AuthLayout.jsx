import { Outlet } from "react-router-dom"
import imageUrl from "../images/register_bg_2.png";
const AuthLayout = () => {

  return (
    <div className="w-full h-full min-w-screen-md dark:bg-uci">
      <Outlet />

    </div>
  )
}

export default AuthLayout;
