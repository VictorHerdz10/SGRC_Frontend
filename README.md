# Proyecto de Registro de Contratos

Este proyecto es una aplicación web para la gestión de registros de contratos. Fue creado utilizando [Vite](https://vitejs.dev/) y varias bibliotecas de React.

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Producción](#producción)
- [Personalización de la Configuración](#personalización-de-la-configuración)
- [Descripción de Carpetas y Archivos](#descripción-de-carpetas-y-archivos)
- [Variables de Entorno](#variables-de-entorno)
- [Autores](#autores)
- [Licencia](#licencia)
- [Changelog](#changelog)
- [Contribuciones](#contribuciones)
- [Contacto](#contacto)

## Tecnologías Utilizadas

![Vite](https://vitejs.dev/logo.svg)
![React](https://reactjs.org/logo-og.png)
![Tailwind CSS](https://tailwindcss.com/_next/static/media/tailwindcss-mark.1b0a3e3f.svg)
![Axios](https://axios-http.com/assets/logo.svg)
![JSZip](https://stuk.github.io/jszip/documentation/logo.svg)
![React Icons](https://react-icons.github.io/react-icons/logo.svg)
![React Router](https://reactrouter.com/_brand/react-router-stacked-color.svg)
![React Toastify](https://fkhadra.github.io/react-toastify/logo.svg)

## Estructura del Proyecto

La estructura del proyecto es la siguiente:
public/ src/ ├── axios/ ├── components/ │ ├── aside/ │ ├── form/ │ ├── modals/ │ ├── others/ │ ├── table/ │ └── Transition.jsx ├── context/ ├── css/ ├── hooks/ ├── images/ ├── layout/ ├── pages/ ├── partials/ └── ... └── index.jsx

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```
## Desarrollo
Para compilar y recargar automáticamente el proyecto durante el desarrollo, ejecuta:
```
npm run dev
```
## Producción
Para compilar y minificar el proyecto para producción,, ejecuta:
```
npm run build
```
## Personalización de la Configuración
Para más detalles sobre cómo personalizar la configuración, consulta la Guía de [Configuración](https://vitejs.dev/guide/).

## Descripción de Carpetas y Archivos
- `public/`: Carpeta pública que contiene archivos estáticos.
- `src/`: Carpeta fuente que contiene el código del proyecto.
- `axios/`: Carpeta que contiene la configuración de Axios.
- `components/`: Carpeta que contiene los componentes del proyecto.
- `context/`: Carpeta que contiene el contexto del proyecto.
- `css/`: Carpeta que contiene los archivos de estilo.
- `hooks/`: Carpeta que contiene los hooks personalizados.
- `images/`: Carpeta que contiene las imágenes del proyecto.
- `layout/`: Carpeta que contiene la estructura de la página.
- `pages/`: Carpeta que contiene las páginas del proyecto.
- `partials/`: Carpeta que contiene los fragmentos de código reutilizables.
- `index.jsx`: Archivo principal del proyecto.
- `main.jsx`: Archivo principal de la aplicación.
- `vite.config.js`: Archivo de configuración de Vite.
- `package.json`: Archivo de configuración de npm.
- `README.md`: Archivo de documentación del proyecto.

### Variables de Entorno
Asegúrate de configurar las variables de entorno en un archivo .env en la raíz del proyecto:
```
VITE_BACKEND_URL=http://localhost:4000
```
## Autores
- [Victor Hernández](https://github.com/VictorHerdz10)
