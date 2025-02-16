import { useState, useEffect, useRef } from "react";
import {
  FaUsersCog,
  FaUserCircle,
  FaBuilding,
  FaIndustry,
  FaDatabase,
  FaListAlt,
  FaFileContract,
} from "react-icons/fa";
import { RiDashboardFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import useValidation from "../../hooks/useValidation";
import { useLocation, useNavigate } from "react-router-dom";
const SideMenu = () => {
  const {
    isOpen,
    setIsOpen,
    setShowConfirmModal,
    obtenerDirecciones,
    obtenerEntidades,
    obtenerPerfil,
    obtenerBackup,
    obtenerUsuarios,
    setDirecciones,
    setEntidades,
    setContratos,
    setBackupHistory,
    obtenerNotificaciones,
    setUsers,
    obtenerTrazas,
    setTrazas,
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
            case "/admin/registro-contrato":
              await obtenerDirecciones();
              await obtenerNotificaciones();
              await obtenerEntidades();
              await obtenerPerfil();
              await obtenerTiposContrato();
              await setBackupHistory([]);
              await setUsers([]);
              await setTrazas([]);
              break;
            case "/admin/gestion-direccion-empresarial":
              await obtenerDirecciones();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setEntidades([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setUsers([]);
              await setTrazas([]);
              await setContractTypes([]);
              break;
            case "/admin/gestion-entidad":
              await obtenerEntidades();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setDirecciones([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setUsers([]);
              await setTrazas([]);
              await setContractTypes([]);
              break;
            case "/admin/gestion-usuarios":
              await obtenerUsuarios();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setTrazas([]);
              await setContractTypes([]);
              break;
            case "/admin/respaldo-datos":
              await obtenerBackup();
              await obtenerNotificaciones();
              await obtenerPerfil();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setUsers([]);
              await setTrazas([]);
              await setContractTypes([]);
              break;
            case "/admin/mi-perfil":
              await obtenerPerfil();
              await obtenerNotificaciones();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setUsers([]);
              await setTrazas([]);
              await setContractTypes([]);
              break;
            case "/admin/gestion-trazas":
              await obtenerPerfil();
              await obtenerNotificaciones();
              await obtenerTrazas();
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setUsers([]);
              await setContractTypes([]);
              break;
            case "/admin/gestion-tipo-contrato":
              await obtenerPerfil();
              await obtenerNotificaciones();
              await obtenerTiposContrato();
              await obtenerTrazas([]);
              await setDirecciones([]);
              await setEntidades([]);
              await setContratos([]);
              await setBackupHistory([]);
              await setUsers([]);
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
      path: "/admin/registro-contrato",
    },
    {
      id: "tipo-contrato", // Nuevo ítem para la gestión de tipos de contrato
      label: "Gestión de Tipo de Contrato",
      icon: <FaFileContract className="text-xl" />, // Ícono para la gestión de tipos de contrato
      path: "/admin/gestion-tipo-contrato", // Ruta para la gestión de tipos de contrato
    },
    {
      id: "direccion-empresarial",
      label: "Gestión de Direcciones Ejecutivas",
      icon: <FaBuilding className="text-xl" />,
      path: "/admin/gestion-direccion-empresarial",
    },
    {
      id: "entidad",
      label: "Gestión de Entidades",
      icon: <FaIndustry className="text-xl" />,
      path: "/admin/gestion-entidad",
    },
    {
      id: "users",
      label: "Gestión de Usuarios",
      icon: <FaUsersCog className="text-xl" />,
      path: "/admin/gestion-usuarios",
    },
    {
      id: "trazas",
      label: "Gestión de Trazas",
      icon: <FaListAlt className="text-xl" />, // Ícono para la gestión de trazas
      path: "/admin/gestion-trazas", // Ruta para la gestión de trazas
    },
    {
      id: "backup",
      label: "Gestión de Copias de Seguridad",
      icon: <FaDatabase className="text-xl" />,
      path: "/admin/respaldo-datos",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <FaUserCircle className="text-xl" />,
      path: "/admin/mi-perfil",
    },
    {
      id: "logout",
      label: "Cerrar Sesión",
      icon: <RiLogoutBoxRLine className="text-xl" />,
    },
  ];
  usePageReloadDetection();
  const isActiveMenuItem = useActiveMenu();

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

  const handleMenuClick = async (itemId, path) => {
    if (itemId === "logout") {
      setShowConfirmModal(true);
    }
    if (itemId === "records") {
      await obtenerDirecciones();
      await obtenerNotificaciones();
      await obtenerEntidades();
      await obtenerPerfil();
      await obtenerTiposContrato();
      await setBackupHistory([]);
      await setUsers([]);
    }
    if (itemId === "direccion-empresarial") {
      await obtenerDirecciones();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setEntidades([]);
      await setContratos([]);
      await setBackupHistory([]);
      await setUsers([]);
    }
    if (itemId === "entidad") {
      await obtenerEntidades();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setDirecciones([]);
      await setContratos([]);
      await setBackupHistory([]);
      await setUsers([]);
    }
    if (itemId === "users") {
      await obtenerUsuarios();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
      await setBackupHistory([]);
    }
    if (itemId === "backup") {
      await obtenerBackup();
      await obtenerNotificaciones();
      await obtenerPerfil();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
      await setUsers([]);
    }
    if (itemId === "profile") {
      await obtenerPerfil();
      await obtenerNotificaciones();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
      await setBackupHistory([]);
      await setUsers([]);
    }
    if (itemId === "tipo-contrato") {
      await obtenerPerfil();
      await obtenerNotificaciones();
      await obtenerTiposContrato();
      await setDirecciones([]);
      await setEntidades([]);
      await setContratos([]);
      await setBackupHistory([]);
      await setUsers([]);
    }
    setActiveItem(itemId);
    navigate(path);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800  shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1
            className={`font-semibold text-gray-800 dark:text-gray-300 transition-opacity duration-200 ${
              isOpen ? "" : "opacity-0 hidden"
            }`}
          >
            Panel de Administración
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-blue-900"
            aria-label="Toggle menu"
            disabled={window.innerWidth <= 1024}
          >
            <RiDashboardFill className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2 pl-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`w-full flex items-center p-3 rounded-l-lg transition-all duration-200 dark:text-gray-300  ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-600 dark:bg-uci dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-900"
                  }`}
                  aria-label={item.label}
                >
                  <span className="flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span
                    className={` ml-3 font-medium transition-opacity duration-200 ${
                      isOpen
                        ? "text-gray-800 dark:text-gray-300"
                        : "opacity-0 hidden"
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

export default SideMenu;
