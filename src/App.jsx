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
import FrameOptions from './components/others/FrameOptions';
import DirectivoLayout from "./layout/DirectivoLayout";
import EspecialistaLayout from "./layout/EspecialistaLayout";
import GestionDataBase from "./pages/GestionDataBase";
import ThemeToggle from "./components/others/ThemeToggle";
import NotFound from "./pages/404";

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
            
            {/* Rutas para redirigir a 404 si se intenta acceder directamente a los layouts */}
            <Route path="/admin" element={<NotFound />} />
            <Route path="/auth" element={<NotFound />} />
            <Route path="/directivo" element={<NotFound />} />
            <Route path="/especialista" element={<NotFound />} />

            <Route path="/auth" element={<AuthLayout />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="change-pass/:token" element={<CambioPassword />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route
                path="registro-contrato"
                element={<GestionRegistro />}
              />
              <Route
                path="gestion-direccion-empresarial"
                element={<GestionDireccion />}
              />
              <Route
                path="gestion-entidad"
                element={<GestionEntidad />}
              />
              <Route path="gestion-usuarios" element={<GestionUser />} />
              <Route path="respaldo-datos" element={<GestionDataBase />} />
              <Route path="mi-perfil" element={<Perfil />} />
            </Route>

            <Route path="/directivo" element={<DirectivoLayout />}>
              <Route
                path="registro-contrato"
                element={<GestionRegistro />}
              />
              <Route
                path="gestion-direccion-empresarial"
                element={<GestionDireccion />}
              />
              <Route
                path="gestion-entidad"
                element={<GestionEntidad />}
              />
              <Route path="mi-perfil" element={<Perfil />} />
            </Route>

            <Route path="/especialista" element={<EspecialistaLayout />}>
              <Route
                path="registro-contrato"
                element={<GestionRegistro />}
              />
              <Route path="mi-perfil" element={<Perfil />} />
            </Route>
            {/* Rutas para redirigir a 404 si se intenta acceder directamente a los layouts */}
            <Route path="/admin" element={<NotFound />} />
            <Route path="/auth" element={<NotFound />} />
            <Route path="/directivo" element={<NotFound />} />
            <Route path="/especialista" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ValidationProvider>
      </AuthProvider>
      <ToastContainer />
      <FrameOptions />
      <ThemeToggle/>
    </>
  );
}

export default App;
