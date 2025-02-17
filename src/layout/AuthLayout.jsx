import { Outlet } from "react-router-dom"
const AuthLayout = () => {

  return (
    <div className="w-full h-full min-w-screen-md dark:bg-uci">
      <Outlet />

    </div>
  )
}

export default AuthLayout;
