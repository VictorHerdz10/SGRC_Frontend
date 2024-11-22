import { useState, useEffect, useRef } from "react";
import { FaUsersCog, FaUserCircle,FaBuilding, FaIndustry,FaDatabase} from "react-icons/fa";
import { RiDashboardFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import useValidation from "../../hooks/useValidation";
import { useLocation, useNavigate } from "react-router-dom";
const SideMenu = () => {

  const { isOpen, setIsOpen,setShowConfirmModal } = useValidation();
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
  const menuItems = [
    {
      id: "records",
      label: "Gestión de Registros",
      icon: <BsFileEarmarkText className="text-xl" />,
      path: "/admin/registro-contrato",
    },
    {
      id: "direccion-empresarial",
      label: "Gestión de Dirección Empresarial",
      icon: <FaBuilding className="text-xl" />,
      path: "/admin/gestion-direccion-empresarial",
    },
    {
      id: "entidad",
      label: "Gestión de Entidad",
      icon: <FaIndustry className="text-xl" />,
      path: "/admin/gestion-entidad",
    },
    {
      id: "users",
      label: "Gestión de Usuarios",
      icon: <FaUsersCog className="text-xl" />,
      path: "/admin/gestion-usuarios",
    }, {
      id: "backup",
      label: "Copia de Seguridad",
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

  const handleMenuClick = (itemId, path) => {
    if (itemId === "logout") {
      setShowConfirmModal(true);
    }
    setActiveItem(itemId);
    navigate(path);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1
            className={`font-semibold text-gray-800 transition-opacity duration-200 ${
              isOpen ? "" : "opacity-0 hidden"
            }`}
          >
            Panel de Administración
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Toggle menu"
          >
            <RiDashboardFill className="text-xl text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label={item.label}
                >
                  <span className="flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span
                    className={`ml-3 font-medium transition-opacity duration-200 ${
                      isOpen ? "text-gray-800" : "opacity-0 hidden"
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
