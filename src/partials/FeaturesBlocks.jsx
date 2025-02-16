import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

function FeaturesBlocks() {
  // Inicializar Swiper después de que el componente se monte
  useEffect(() => {
    new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1, // En móviles, solo una tarjeta
        },
        1024: {
          slidesPerView: 1, // En pantallas grandes, solo una tarjeta
          spaceBetween: 0, // Sin espacio entre tarjetas
        },
      },
    });
  }, []);

  return (
    <section className="relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4  text-gray-800 dark:text-gray-100">
              Gestión ágil de contratos
            </h2>
            <p className="text-xl  text-gray-600 dark:text-gray-300">
              Facilita el acceso a tus contratos y facturas, asegurando que toda
              la información esté organizada y disponible rápidamente.
            </p>
          </div>

          {/* Carrusel de tarjetas */}
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {/* 1st item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M20 12h24v40H20z"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M20 20h24M20 28h24M20 36h24M20 44h24"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl text-center font-bold leading-snug tracking-tight mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Registros de Contratos
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Permite un seguimiento detallado y organizado de todos tus
                    contratos, asegurando que no se pierda información
                    importante.
                  </p>
                </div>
              </div>

              {/* 2nd item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeLinecap="square" strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M20.571 20.571h13.714v17.143H20.571z"
                        />
                        <path
                          className="stroke-current text-blue-300"
                          d="M38.858 26.993l6.397 1.73-4.473 16.549-13.24-3.58"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug text-center tracking-tight mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Registros Facturas
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Automatiza el proceso de registro y seguimiento de facturas,
                    facilitando el control sobre los pagos y límites
                    presupuestarios.
                  </p>
                </div>
              </div>

              {/* 3rd item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                        />
                        <path
                          className="stroke-current text-blue-300"
                          d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                          strokeLinecap="square"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Entidades
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Administra información sobre las entidades involucradas en
                    los contratos, garantizando que todos los datos estén
                    actualizados y accesibles.
                  </p>
                </div>
              </div>

              {/* 4th item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g transform="translate(22.857 19.429)" strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          strokeLinecap="square"
                          d="M12.571 4.571V0H0v25.143h12.571V20.57"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M16 12.571h8"
                        />
                        <path
                          className="stroke-current text-white"
                          strokeLinecap="square"
                          d="M19.429 8L24 12.571l-4.571 4.572"
                        />
                        <circle
                          className="stroke-current text-blue-300"
                          strokeLinecap="square"
                          cx="12.571"
                          cy="12.571"
                          r="3.429"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Direcciones
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Administra información sobre las direcciones ejecutivas
                    involucradas en los contratos, garantizando que todos los
                    datos estén actualizados y accesibles.
                  </p>
                </div>
              </div>

              {/* 5th item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <circle
                          className="stroke-current text-white"
                          cx="32"
                          cy="28"
                          r="8"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M32,36c8,0,15,4,15,12H17C17,40,24,36,32,36z"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Usuarios
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Controla el acceso y permisos dentro del sistema,
                    permitiendo una administración segura y eficiente de la
                    información.
                  </p>
                </div>
              </div>

              {/* 6th item */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2" transform="translate(19.429 20.571)">
                        <circle
                          className="stroke-current text-white"
                          strokeLinecap="square"
                          cx="12.571"
                          cy="12.571"
                          r="1.143"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                        />
                        <path
                          className="stroke-current text-blue-300"
                          d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-center mb-2 text-gray-800 dark:text-gray-100">
                    Sistema de Notificaciones
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Mantiene a los usuarios informados sobre los vencimientos de
                    los contratos y acciones necesarias.
                  </p>
                </div>
              </div>

              {/* 7th item - Exportar información */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M20 12h24v40H20z"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M32 20v12m-4-4l4 4 4-4"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-center mb-2 text-gray-800 dark:text-gray-100">
                    Exportar Información
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Exporta los registros en formatos Excel y PDF para un
                    análisis detallado y compartir información de manera
                    eficiente.
                  </p>
                </div>
              </div>

              {/* 8th item - Gestión de Tipos de Contratos */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M20 12h24v40H20z"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M20 20h24M20 28h24M20 36h24M20 44h24"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-center mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Tipos de Contratos
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Crea y personaliza tipos de contratos con tablas y
                    formularios específicos según tus necesidades.
                  </p>
                </div>
              </div>

              {/* 9th item - Gestión de Trazas */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M32 20v24M20 32h24"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M32 20l8 8-8 8-8-8z"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-center mb-2 text-gray-800 dark:text-gray-100">
                    Gestión de Trazas
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Registra y monitorea todas las acciones realizadas en el
                    sistema para mantener un historial completo.
                  </p>
                </div>
              </div>

              {/* 10th item - Respaldos de Información */}
              <div className="swiper-slide">
                <div className="relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl mx-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                  <svg
                    className="w-20 h-20 p-1 -mt-1 mb-4"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-white"
                          d="M32 20v24M20 32h24"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M32 20v24M20 32h24"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-center mb-2 text-gray-800 dark:text-gray-100">
                    Respaldos de Información
                  </h4>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center">
                    Realiza respaldos de información de manera local y en la
                    nube para garantizar la seguridad de tus datos.
                  </p>
                </div>
              </div>
            </div>

            {/* Paginación del carrusel */}
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
