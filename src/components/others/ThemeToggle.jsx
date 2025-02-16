import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Efecto para mostrar y ocultar el botón periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(true); // Mostrar el botón
      setTimeout(() => setIsVisible(false), 2000); // Ocultar después de 2 segundos
    }, 30000); // Intervalo de 30 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={`transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-16"
        }`}
      >
        <button
          onClick={toggleDarkMode}
          className="relative group bg-gradient-to-r from-blue-500 to-purple-500 dark:from-indigo-600 dark:to-purple-700 p-2 rounded-l-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-purple-500"
          aria-label={
            darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"
          }
          title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {darkMode ? (
              <FiSun className="w-6 h-6 text-yellow-300 transition-transform duration-500 rotate-0 hover:rotate-180" />
            ) : (
              <FiMoon className="w-6 h-6 text-slate-900 transition-transform duration-500 rotate-0 hover:rotate-180" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
