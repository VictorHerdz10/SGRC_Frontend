import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200 dark:border-gray-700">
          {/* Social links */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <Link
                to="#"
                className="flex justify-center items-center text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 bg-white dark:bg-gray-700 hover:bg-white-100 dark:hover:bg-gray-600 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link
                to="#"
                className="flex justify-center items-center text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 bg-white dark:bg-gray-700 hover:bg-white-100 dark:hover:bg-gray-600 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link
                to="#"
                className="flex justify-center items-center text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 bg-white dark:bg-gray-700 hover:bg-white-100 dark:hover:bg-gray-600 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Facebook"
              >
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()}
            <div className="inline-flex items-center ml-2 pr-1">
              <p className="mr-2">
                <svg
                  className="w-4 h-4"
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
                      id="footer-logo"
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
                    fill="url(#footer-logo)"
                    fillRule="nonzero"
                  />
                </svg>
              </p>
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                SGC
              </h1>
            </div>
            Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
