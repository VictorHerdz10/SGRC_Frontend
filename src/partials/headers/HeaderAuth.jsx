import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  FaEye,
  FaTrash,
  FaBell,
  FaUser,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../hooks/useAuth";
import Notification from "../../components/others/Notification";
import CuadroPerfil from "../../components/others/CuadroPerfil";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const HeaderAuth = () => {
  const mobile = useMobile();
  const { isOpen } = useValidation();
  const { auth } = useAuth();

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const [url, setUrl] = useState("");
  useEffect(() => {
    if (auth.tipo_usuario === "Admin_Gnl") {
      setUrl("admin/registro-contrato");
    } else if (auth.tipo_usuario === "especialista") {
      setUrl("especialista/registro-contrato");
    } else {
      setUrl("directivo/registro-contrato");
    }
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out rounded-full border-gray-100 ${
          !top && "bg-white backdrop-blur-sm shadow-lg"
        }`}
      >
        <div
          className={`container mx-0 px-5 ${
            isOpen ? "lg:pr-56 sm:pr-60 md:pr-24" : "pr-10"
          } `}
        >
          <div className="flex items-center justify-between h-16 md:h-20 p-10">
            {/* Site branding */}
            <div className="flex-shrink-0 flex ">
              <div className="flex-shrink-0 mr-4">
                {/* Logo */}
                <Link to={`/${url}`} className="block" aria-label="Cruip">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient
                        cx="21.152%"
                        cy="86.063%"
                        fx="21.152%"
                        fy="86.063%"
                        r="79.941%"
                        id="header-logo"
                      >
                        <stop stopColor="#4FD1C5" offset="0%" />
                        <stop stopColor="#81E6D9" offset="25.871%" />
                        <stop stopColor="#338CF5" offset="100%" />
                      </radialGradient>
                    </defs>
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="url(#header-logo)"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </div>
              <Link
                to={`/${url}`}
                className="text-lg font-bold text-gray-800 transition duration-300 ease-in-out hover:text-gray 
           900"
              >
                {" "}
                <h2 className="bg-clip-text h3 text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  DGS
                </h2>
              </Link>
            </div>
            {/* Site navigation */}
            <nav className="flex-grow md:flex">
              <ul
                className={`flex flex-grow justify-end flex-wrap items-center ml-5 ${
                  mobile ? "pl-10 lg:pr-8" : "p-10 lg:pl-8"
                }`}
              >
                <li className={mobile ? "pr-6" : ""}>
                  {auth.tipo_usuario !== "visitante" && <Notification />}
                </li>
                {!mobile && (
                  <li>
                    <CuadroPerfil />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAuth;
