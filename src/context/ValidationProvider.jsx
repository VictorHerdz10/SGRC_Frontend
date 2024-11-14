import { useState,useEffect, createContext } from "react";
import clienteAxios from "../axios/axios";
import useAuth from "../hooks/useAuth";
const ValidationContext = createContext();

// eslint-disable-next-line react/prop-types
const ValidationProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [contratos, setContratos] = useState([]);
  const[direcciones,setDirecciones]=useState([])
  const[entidades,setEntidades]=useState([])
  const[perfil,setPerfil]=useState({});
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
const[selectContrato,setSelectContrato]=useState({});
const [showForm, setShowForm] = useState(false);
const[isEditing,setIsEditing]=useState(false);
const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 1. Obtener la hora actual
  function obtenerHoraActual() {
    return new Date();
  }
  const formatDate=(isoDate)=> {
    // Extraer la parte de fecha del string ISO 8601
    const datePart = isoDate.split('T')[0];
    
    // Formatear la fecha para el input tipo date
    return new Date(datePart).toISOString().split('T')[0];
  }
  // 2. Restar 4 horas de una fecha base
  const restarCuatroHoras = (fechaBase) => {
    const offset = -4;
    const correctedDate = new Date(fechaBase.getTime());
    correctedDate.setHours(correctedDate.getHours() + offset);
    return correctedDate;
  };
  const horaActual = obtenerHoraActual();
  const horaatualcorr = restarCuatroHoras(new Date(horaActual.toISOString()));
  const parcearDate = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = date.getMonth() + 1; // Asumimos que enero es 1 y diciembre es 12
    const ano = date.getFullYear() % 100;
    return `${dia}/${mes}/${ano}`;
  };

  function calcularTiempoTranscurrido(fecha1, fecha2) {
    let difference = fecha2.getTime() - fecha1.getTime();

    // Calcular días
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * (1000 * 60 * 60 * 24);

    // Calcular horas
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);

    // Calcular minutos
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);

    // Calcular segundos
    const seconds = Math.floor(difference / 1000);

    // Construir la cadena de salida
    let tiempoTranscurrido;
    if (days > 0) {
      tiempoTranscurrido = `${days} día${days !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      tiempoTranscurrido = `${hours} hora${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      tiempoTranscurrido = `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    } else {
      tiempoTranscurrido = `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
    }

    return tiempoTranscurrido;
  }

  const validarInput = (valor, tipo, valor1) => {
    
    if (valor === "") {
        return "Este campo no puede estar vacio";
      }
    
    if (tipo === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,}$/i.test(valor)) {
        return "Formato de email invalido";
      }
    }
    if (tipo === 'telefono') {
      if (!/^(?:\+?(\d{1,3}[-\s.]*)?\(\d{3}\)[-\s.]*(\d{3})[-\s.]*(\d{4})|\(\d{3}[-\s.]*\d{3}[-\s.]*\d{4}|\d{7}|\d{10}|(\d{3}[-\s.]*(\d{3}|\d{4}))|(\d{3}[-\s.]*(\d{3}|\d{4})))$/.test(valor)) {
        return "El formato del teléfono es inválido. Ejemplo: +1234567890 o (123) 456-7890";
      }
    }
    if (tipo === "password") {
      if (valor.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
      }
    }
    if (tipo === "repetirPassword") {
      if (valor !== valor1) {
        return "Las contraseñas no coinciden";
      }
    }
    if(tipo ==='vigencia' && !/^\d+$/.test(valor) ){
      return 'Solo se permiten números';
    }
    if (tipo === 'date') {
      const fecha = new Date(valor);
      
      if (isNaN(fecha.getTime())) {
        return 'Por favor, ingrese una fecha válida.';
      } 
    }
    // Validación para campos de texto que deben ser números positivos
  if (tipo === 'number' && !/^\+?\d+$/.test(valor)) {
    return 'Solo se permiten números positivos.';
  }
    return "";
  };
  const obtenerPerfil= async()=>{
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (token && auth) {
try {
  const url = '/usuario/obtener-perfil';
  const response = await clienteAxios(url, config);
  await setPerfil(response.data);
  
} catch (error) {
  
}
    }
}

const obtenerDirecciones = async()=>{
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (token && auth) {
  try {
    const url = '/direccion/obtener-direcciones';
    const response = await clienteAxios(url, config);
    await setDirecciones(response.data);
   
  } catch (error) {
    
  }
  }
}
const obtenerEntidades = async()=>{
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (token && auth) {
  try {
    const url = '/entidad/obtener-entidades';
    const response = await clienteAxios(url, config);
    await setEntidades(response.data);
    
  } catch (error) {
   
  }
  }
}
const obtenerRegistros = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (token && auth) {
  try {
    const url = "contratos/listar-registro-contratos";
    const response = await clienteAxios(url, config);
    const { data } = response;
    setContratos(data);
  } catch (error) {
    
  }
}
};

  useEffect(()=>{

obtenerDirecciones();
obtenerEntidades();
obtenerPerfil();
obtenerRegistros();
  },[auth])
  

  return (
    <ValidationContext.Provider
      value={{
        validarInput,
        file,
        setFile,
        isOpen,
        setIsOpen,
        perfil,
        direcciones,
        setDirecciones,
        obtenerDirecciones,
        entidades,
        setEntidades,
        obtenerEntidades,
        obtenerRegistros,
        setContratos,
        contratos,
        obtenerPerfil,
        showModal,
        setShowModal,
        selectedNotification,
        setSelectedNotification,
        restarCuatroHoras,
        horaatualcorr,
        parcearDate,
        calcularTiempoTranscurrido,
        horaActual,
        obtenerHoraActual,
        selectContrato,
        setSelectContrato,
        showForm,
        setShowForm,
        formatDate,
        setIsEditing,
        isEditing,
        showConfirmModal,
        setShowConfirmModal

      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};
export { ValidationProvider };

export default ValidationContext;
