# Proyecto de Registro de Contratos

Este proyecto es una aplicación web para la gestión de registros de contratos. Fue creado utilizando [Vite](https://vitejs.dev/) y varias bibliotecas de React.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:
src/ │ ├── App.jsx ├── axios/ │ └── axios.jsx ├── components/ │ ├── aside/ │ ├── form/ │ ├── modals/ │ ├── others/ │ │ ├── CuadroPerfil.jsx │ │ ├── FileUploadInput.jsx │ │ ├── FrameOptions.jsx │ │ ├── ThemeToggle.jsx │ │ └── ... │ ├── table/ │ └── Transition.jsx ├── context/ │ ├── AuthProvider.jsx │ └── ValidationProvider.jsx ├── css/ │ ├── additional-styles/ │ │ ├── utility-patterns.css │ │ ├── range-slider.css │ │ ├── toggle-switch.css │ │ └── theme.css │ ├── style.css │ └── tailwind.config.js ├── hooks/ │ ├── useAuth.jsx │ └── useValidation.jsx ├── images/ ├── layout/ │ ├── AdminLayout.jsx │ ├── AuthLayout.jsx │ ├── DirectivoLayout.jsx │ └── EspecialistaLayout.jsx ├── main.jsx ├── pages/ │ ├── 404.jsx │ ├── CambioPassword.jsx │ ├── GestionDataBase.jsx │ ├── GestionDireccion.jsx │ ├── GestionEntidad.jsx │ ├── GestionRegistro.jsx │ └── ... ├── partials/ │ └── ... └── ...


## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install

Desarrollo
Para compilar y recargar automáticamente el proyecto durante el desarrollo, ejecuta:

npm run dev

Producción
Para compilar y minificar el proyecto para producción, ejecuta:

npm run build

Personalización de la Configuración
Para más detalles sobre cómo personalizar la configuración, consulta la Guía de Configuración.

Descripción de Carpetas y Archivos
axios/: Contiene la configuración de Axios para las solicitudes HTTP.
components/: Contiene los componentes reutilizables de la aplicación.
aside/: Componentes relacionados con el menú lateral.
form/: Componentes de formularios.
modals/: Componentes de modales.
others/: Otros componentes diversos.
table/: Componentes relacionados con tablas.
context/: Proveedores de contexto para la autenticación y validación.
css/: Archivos de estilos CSS y configuración de Tailwind CSS.
hooks/: Hooks personalizados para la autenticación y validación.
images/: Imágenes utilizadas en la aplicación.
layout/: Componentes de diseño para diferentes tipos de usuarios.
pages/: Páginas de la aplicación.
partials/: Componentes parciales reutilizables en varias páginas.
Autores
Nombre del Autor - Desarrollador Principal - Tu Perfil
```
## Usage

This project was bootstrapped with [Vite](https://vitejs.dev/).

#### Customize configuration
See [Configuration Reference](https://vitejs.dev/guide/).
