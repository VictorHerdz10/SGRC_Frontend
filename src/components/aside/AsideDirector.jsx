import { useState, useEffect, useRef } from "react";
import {
  FaUsersCog,
  FaUserCircle,
  FaBuilding,
  FaIndustry,
  FaFileContract,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { RiDashboardFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import useValidation from "../../hooks/useValidation";
import { useLocation, useNavigate } from "react-router-dom";
const AsideDirector = () => {
  const {
    isOpen,
    setIsOpen,
    setShowConfirmModal,
    obtenerDirecciones,
    obtenerEntidades,
    obtenerPerfil,
    setDirecciones,
    setEntidades,
    setContratos,
    obtenerNotificaciones,
    obtenerTiposContrato,
    setContractTypes,
  } = useValidation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const useActiveMenu = () => {
    const location = useLocation();

    const isActiveMenuItem = (menuItemPath) => {
      return (
        location.pathname === menuItemPath ||
        location.pathname.startsWith(menuItemPath + "/")
      );
    };

    return isActiveMenuItem;
  };
  const usePageReloadDetection = () => {
    useEffect(() => {
      const executeOnPageReload = async () => {
        try {
          switch (window.location.pathname) {
            case "/directivo/registro-contrato":
              await obtenerTiposContrato();
              await obtenerDirecciones();
              await obtenerNotificaciones();
              await obtenerEntidades();
              await obtenerPerfil();
              break;
            case "/directivo/gestion-direccion-empresarial":
              await obtenerDirecciones();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setEntidades([]);
              await setContratos([]);
              await setContractTypes([]);
              break;
            case "/directivo/gestion-entidad":
              await obtenerEntidades();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setDirecciones([]);
              await setContratos([]);
              await setContractTypes([]);
              break;
            case "/directivo/mi-perfil":
              await obtenerPerfil();
              await obtenerNotificaciones();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setContractTypes([]);
              break;
            case "/directivo/gestion-tipo-contrato":
              await obtenerPerfil();
              await obtenerNotificaciones();
              await obtenerTiposContrato();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              break;
            default:
              navigate("/404");
          }
        } catch (error) {
          console.error("Error during page reload operations:", error);
        }
      };

      executeOnPageReload();

      window.addEventListener("beforeunload", () => {
        localStorage.setItem("pageReloaded", "true");
      });

      if (localStorage.getItem("pageReloaded") === "true") {
        executeOnPageReload();
        localStorage.removeItem("pageReloaded");
      }

      return () => {
        window.removeEventListener("beforeunload", () => {});
      };
    }, [navigate]);

    return null; // Esta función no devuelve nada, solo ejecuta efectos secundarios
  };
  const menuItems = [
    {
      id: "records",
      label: "Gestión de Registros",
      icon: <BsFileEarmarkText className="text-xl" />,
      path: "/directivo/registro-contrato",
    },
    {
      id: "direccion-empresarial",
      label: "Gestión de Direcciones Ejecutivas",
      icon: <FaBuilding className="text-xl" />,
      path: "/directivo/gestion-direccion-empresarial",
    },
    {
      id: "tipo-contrato", // Nuevo ítem para la gestión de tipos de contrato
      label: "Gestión de Tipo de Contrato",
      icon: <FaFileContract className="text-xl" />, // Ícono para la gestión de tipos de contrato
      path: "/directivo/gestion-tipo-contrato", // Ruta para la gestión de tipos de contrato
    },
    {
      id: "entidad",
      label: "Gestión de Entidades",
      icon: <FaIndustry className="text-xl" />,
      path: "/directivo/gestion-entidad",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <FaUserCircle className="text-xl" />,
      path: "/directivo/mi-perfil",
    },
    {
      id: "logout",
      label: "Cerrar Sesión",
      icon: <RiLogoutBoxRLine className="text-xl" />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpen(false);
        setShowConfirmModal(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActiveMenuItem = useActiveMenu();
  usePageReloadDetection();
  useEffect(() => {
    const currentActiveItem = menuItems.find((item) =>
      isActiveMenuItem(item.path)
    );
    if (currentActiveItem) {
      setActiveItem(currentActiveItem.id);
    }
  }, [isActiveMenuItem]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = async (itemId, path) => {
    if (itemId === "logout") {
      setShowConfirmModal(true);
    }
    if (itemId === "records") {
      await obtenerTiposContrato();
      await obtenerDirecciones();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await obtenerEntidades();
    }
    if (itemId === "direccion-empresarial") {
      await obtenerDirecciones();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setEntidades([]);
      await setContratos([]);
      await setContractTypes([]);
    }
    if (itemId === "entidad") {
      await obtenerEntidades();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setDirecciones([]);
      await setContratos([]);
      await setContractTypes([]);
    }

    if (itemId === "profile") {
      await obtenerPerfil();
      await obtenerNotificaciones();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
      await setContractTypes([]);
    }
    if (itemId === "tipo-contrato") {
      await obtenerPerfil();
      await obtenerNotificaciones();
      await obtenerTiposContrato();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
    }
    setActiveItem(itemId);
    navigate(path);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1
            className={`font-semibold text-gray-800 dark:text-gray-300 transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Panel de Acciones
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label="Toggle menu"
            disabled={window.innerWidth <= 1024}
          >
            <RiDashboardFill className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 dark:text-gray-300 ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800"
                  }`}
                  aria-label={item.label}
                >
                  <span className="flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </span>
                  <span
                    className={`ml-3 font-medium transition-opacity duration-200 ${
                      isOpen ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AsideDirector;
