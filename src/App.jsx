import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";
import { AuthProvider } from "./context/AuthProvider";
import { ValidationProvider } from "./context/ValidationProvider";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import GestionDireccion from "./pages/GestionDireccion";
import GestionRegistro from "./pages/GestionRegistro";
import GestionEntidad from "./pages/GestionEntidad";
import GestionUser from "./pages/GestionUser";
import Perfil from "./pages/Perfil";
import AdminLayout from "./layout/AdminLayout";
import CambioPassword from "./pages/CambioPassword";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
        <ValidationProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/auth/change-pass/:token" element={<CambioPassword />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route
                path="/admin/registro-contrato"
                element={<GestionRegistro />}
              />
              <Route
                path="/admin/gestion-direccion-empresarial"
                element={<GestionDireccion />}
              />
              <Route
                path="/admin/gestion-entidad"
                element={<GestionEntidad />}
              />
              <Route path="/admin/gestion-usuarios" element={<GestionUser />} />
              <Route path="/admin/mi-perfil" element={<Perfil />} />
            </Route>

            <Route path="/directivo" element={<AdminLayout />}>
              <Route
                path="/directivo/registro-contrato"
                element={<GestionRegistro />}
              />
              <Route
                path="/directivo/gestion-direccion-empresarial"
                element={<GestionDireccion />}
              />
              <Route
                path="/directivo/gestion-entidad"
                element={<GestionEntidad />}
              />
              <Route path="/directivo/mi-perfil" element={<Perfil />} />
            </Route>

            <Route path="/especialista" element={<AdminLayout />}>
              <Route
                path="/especialista/registro-contrato"
                element={<GestionRegistro />}
              />
              <Route path="/especialista/mi-perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </ValidationProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
