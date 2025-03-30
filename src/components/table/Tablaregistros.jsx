import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaTrash,
  FaEdit,
  FaFileDownload,
  FaPlus,
  FaPencilAlt,
  FaInfoCircle,
  FaFilePdf,
  FaFileExcel,
  FaSearch,
  FaPlusCircle,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import clienteAxios from "../../axios/axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ViewSupplementsModal, {
  SupplementViewerTrigger,
} from "../modals/ViewSupplementsModal";
import SupplementModal from "../modals/SupplementModal";
import useValidation from "../../hooks/useValidation";

const ContractTable = ({ tipoContrato }) => {
  const {
    validarInput,
    obtenerRegistros,
    contratos,
    setContratos,
    entidades,
    direcciones,
    selectContrato,
    setSelectContrato,
    setShowForm,
    isEditing,
    setIsEditing,
    obtenerNotificaciones,
    contractTypes,
    handleGetSupplements,
    setShowSupplementModal,
    showSupplementModal,
    setShowModalGetInfo,
    setIsSuplemento,
    isSuplemento,
    isCreate,
    setIsCreate,
    selectedContract,
    setSelectedContract,
  } = useValidation();
  let errores, errores2;
  const [contractTypeSelect, setContractTypeSelect] = useState(null);
  const [currentSupplements, setCurrentSupplements] = useState([]);
  const [showSupplementsGetInfoModal, setShowSupplementsGetInfoModal] =
    useState(false);
  const [totalItems, setTotalItems] = useState(contratos.length);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(contratos.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [contrato, setContrato] = useState({});
  const [numeroDictamen, setNumeroDictamen] = useState("");
  const [numeroDictamenNew, setNumeroDictamenNew] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [monto, setMonto] = useState("");
  const [actualMonto, setActualMonto] = useState(0);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [errorMonto, setErrorMonto] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState();
  const [errorText1, setErrorText1] = useState();
  const [filtarDireccion, setFiltrarDireccion] = useState("");
  const [filtarEntidad, setFiltrarEntidad] = useState("");
  const [filtarEstado, setFiltrarEstado] = useState("");
  const [selectedSupplement, setSelectedSupplement] = useState(null);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = contratos.slice(indexOfFirstItem, indexOfLastItem);
  const calculatePageIndex = (page, itemIndex) => {
    return (page - 1) * pageSize + itemIndex;
  };
  useEffect(() => {
    const verificar = async () => {
      if (selectedContract) {
        const suplemento = await handleGetSupplements(selectedContract._id);
        setIsSuplemento(suplemento);
        setIsCreate(false);
      }
    };

    verificar();
  }, [isCreate]);

  const parcearDateFile = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
    return `${dia}${mes}${ano}_${horas}${minutos}${segundos}`;
  };

  const handlePageChange = async (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };
  function getElementsInRange(array, start, end) {
    return array.slice(start - 1, end);
  }
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          aria-label={`Go to page ${i}`}
          className={`px-3 py-1 mx-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const parseDuration = (duration) => {
    const regex = /(\d+)\s*(months?|years?)/;
    const match = duration.match(regex);

    if (match) {
      const quantity = parseInt(match[1]);
      const unit = match[2].toLowerCase().trim();

      if (["months", "years"].includes(unit)) {
        if (quantity === 1 && unit === "months") {
          return `${quantity} mes de vigencia`;
        }
        if (quantity > 1 && unit === "months") {
          return `${quantity} meses de vigencia`;
        }
        if (quantity === 1 && unit === "years") {
          return `${quantity} año de vigencia`;
        }
        if (quantity > 1 && unit === "years") {
          return `${quantity} años de vigencia`;
        }
      }

      return null;
    }
  };

  const handleDownload = (id) => {
    const descargas = contratos.filter((contrato) => contrato._id === id);
    if (descargas.length > 0) {
      const link = descargas[0].subirPDF;

      if (!navigator.onLine) {
        toast.error(
          "No hay conexión a internet. No se puede descargar el archivo.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }

      if (link === null || link === " ") {
        toast.error("No hay archivo vinculado a este registro.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      toast.info("Descargando archivo...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      window.location.href = link;
      setTimeout(() => {
        toast.success("Archivo descargado exitosamente!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 2500);
    } else {
      toast.error("Hubo un error al intentar descargar el archivo.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // 2. Restar 4 horas de una fecha base
  const restarCuatroHoras = (fechaBase) => {
    const offset = -4;
    const correctedDate = new Date(fechaBase.getTime());
    correctedDate.setHours(correctedDate.getHours() + offset);
    return correctedDate;
  };
  const parcearDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Fecha inválida");
    }
    // Obtener la fecha en formato UTC
    const dia = String(parsedDate.getUTCDate()).padStart(2, "0");
    const mes = String(parsedDate.getUTCMonth() + 1).padStart(2, "0"); // Aseguramos que el mes tenga dos dígitos
    const ano = parsedDate.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const getValueColor = (totalValue, remainingValue) => {
    if (remainingValue >= totalValue * 0.5) {
      return "bg-green-500"; // Más del 50%
    } else if (remainingValue >= totalValue * 0.3) {
      return "bg-yellow-500"; // Entre el 30% y el 50%
    } else {
      return "bg-red-500"; // Menos del 30%
    }
  };
  const handleFilter = async () => {
    let query = {};
    query.tipoContrato = tipoContrato;
    if (filtarEstado) {
      query.estado = filtarEstado;
    }

    if (filtarDireccion) {
      query.direccionEjecuta = filtarDireccion;
    }

    if (filtarEntidad) {
      query.entidad = filtarEntidad;
    }
    if (Object.keys(query).some((key) => query[key] !== "")) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const url = `contratos/filtrar-contratos`;
        const response = await clienteAxios.post(url, query, config);

        setContratos(response.data);
      } catch (error) {}
    }
  };

  const handleEliminarRegistro = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `contratos/eliminar-registro-contrato/${id}`;
      const response = await clienteAxios.delete(url, config);
      toast.success(response.data.msg);
      setShowEliminarModal(false);
      obtenerRegistros(tipoContrato);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `facturas/eliminar-factura/${id}?numeroDictamen=${selectedInvoice.numeroDictamen}`;

      const response = await clienteAxios.delete(url, config);
      toast.success(response.data.msg);
      setShowModal(false);
      obtenerRegistros(tipoContrato);
      obtenerNotificaciones();
      setId("");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    errores = validarInput(numeroDictamenNew, "text", "");
    errores2 = validarInput(monto, "number", "");

    setErrorMonto(null);
    setErrorText(errores || "");
    setErrorText1(errores2 || "");
    if (errores || errores2) {
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `facturas/advertencia-monto-modificar`;
      const response = await clienteAxios.post(
        url,
        { _id: id, numeroDictamen, monto },
        config
      );
      if (response.data) {
        setErrorMonto(response.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMonto(error.response.data);
      setIsCreate(true);
      return;
    }
    try {
      const url = `facturas/modificar-factura`;
      const response = await clienteAxios.put(
        url,
        { numeroDictamen, newNumeroDictamen: numeroDictamenNew, monto: monto },
        config
      );
      toast.success(response.data.msg);
      setShowModalUpdate(false);
      setSelectedContract(null);
      setErrorMonto(null);
      setMonto("");
      setNumeroDictamen("");
      obtenerRegistros(tipoContrato);
      obtenerNotificaciones();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  // Función para parcear la vigencia
  const parcearVigencia = (vigencia) => {
    if (typeof vigencia !== "string") return vigencia;

    let newValue = vigencia;

    if (vigencia.toLowerCase().includes("months")) {
      newValue = vigencia.replace("months", "meses");
    } else if (vigencia.toLowerCase().includes("years")) {
      newValue = vigencia.replace("years", "años");
    } else if (vigencia.toLowerCase().includes("month")) {
      newValue = vigencia.replace("month", "mes");
    } else if (vigencia.toLowerCase().includes("year")) {
      newValue = vigencia.replace("year", "año");
    }

    // Verificar singular/plural
    if (vigencia.startsWith("1 ")) {
      newValue = newValue.replace("meses", "mes").replace("años", "año");
    }

    return newValue;
  };

  // Función para formatear las facturas con saltos de línea
  const formatearFacturas = (facturas) => {
    if (!facturas || !Array.isArray(facturas)) return "N/A";

    return facturas
      .map((f) => `${f.numeroDictamen || "N/A"}: $${f.monto || "0"}`)
      .join("\n"); // Usar saltos de línea para separar las facturas
  };

  const exportToPDF = (contratos) => {
    try {
      // Verificar si hay menos de 10 contratos
      const isVertical =
        contractTypes.find((tipo) => tipo.nombre === tipoContrato)
          .camposRequeridos.length < 10;

      // Crear el documento en formato horizontal o vertical según el caso
      const doc = new jsPDF({
        orientation: isVertical ? "portrait" : "landscape", // Vertical si hay menos de 10 contratos
        unit: "mm",
        format: "a4",
      });

      // Título del documento
      const title =
        "Registros de Contratos de la Dirección General de Servicios";
      doc.setFontSize(12); // Tamaño de fuente fijo
      doc.setFont("helvetica", "bold");
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (pageWidth - textWidth) / 2;
      doc.text(title, textOffset, 10);
      doc.setFont("helvetica", "normal");

      // Definir las columnas de la tabla dinámicamente
      const availableColumns = [
        { key: "tipoDeContrato", label: "Tipo de Contrato", width: 30 },
        { key: "objetoDelContrato", label: "Objeto del Contrato", width: 30 },
        { key: "entidad", label: "Entidad", width: 20 },
        {
          key: "direccionEjecuta",
          label: "Dirección que lo ejecuta",
          width: 20,
        },
        { key: "aprobadoPorCC", label: "Aprobado por el CC", width: 15 },
        { key: "firmado", label: "Firmado", width: 15 },
        {
          key: "entregadoJuridica",
          label: "Entregado al área jurídica",
          width: 15,
        },
        { key: "fechaRecibido", label: "Fecha Recibido", width: 15 },
        { key: "valorPrincipal", label: "Monto", width: 15 },
        { key: "valorDisponible", label: "Monto Disponible", width: 15 },
        { key: "valorGastado", label: "Monto Gastado", width: 15 },
        { key: "factura", label: "Facturas", width: 25 },
        { key: "vigencia", label: "Vigencia", width: 15 },
        { key: "fechaVencimiento", label: "Fecha Vencimiento", width: 15 },
        { key: "estado", label: "Estado", width: 15 },
        { key: "numeroDictamen", label: "No. de Dictamen", width: 15 },
      ];

      // Filtrar columnas que tienen al menos un valor definido en los contratos
      const filteredColumns = availableColumns.filter((column) =>
        contratos.some(
          (contrato) =>
            contrato[column.key] !== null && contrato[column.key] !== ""
        )
      );

      // Obtener las etiquetas de las columnas filtradas
      const tableColumn = [
        "No.",
        ...filteredColumns.map((column) => column.label),
      ];

      // Mapear los datos de los contratos a las filas de la tabla
      const tableRows = contratos.map((contrato, index) => {
        const row = [index + 1]; // Número de fila
        filteredColumns.forEach((column) => {
          const value = contrato[column.key];
          if (value !== null && value !== "") {
            // Formatear valores según el tipo de columna
            switch (column.key) {
              case "aprobadoPorCC":
              case "firmado":
              case "entregadoJuridica":
              case "fechaRecibido":
              case "fechaVencimiento":
                row.push(parcearDate(value) || "N/A");
                break;
              case "valorPrincipal":
                row.push(`$${value || "0"}`);
                break;
              case "valorDisponible":
                row.push(`$${value || "0"}`);
                break;
              case "valorGastado":
                row.push(`$${value || "0"}`);
                break;
              case "factura":
                row.push(formatearFacturas(value) || "N/A");
                break;
              case "vigencia":
                row.push(parcearVigencia(value) || "N/A");
                break;
              default:
                row.push(value || "N/A");
            }
          } else {
            row.push("N/A"); // Si el valor es null o vacío, se coloca "N/A"
          }
        });
        return row;
      });

      // Calcular el ancho total disponible para la tabla
      const totalWidth = doc.internal.pageSize.getWidth() - 20; // 10mm de margen a cada lado

      // Calcular el ancho de cada columna proporcionalmente
      const columnWidths = filteredColumns.map((column) => {
        return (
          (column.width /
            availableColumns.reduce((sum, col) => sum + col.width, 0)) *
          totalWidth
        );
      });

      // Crear la tabla en el documento
      doc.autoTable({
        startY: 20, // Espacio adicional para el título
        head: [tableColumn],
        body: tableRows,
        styles: {
          fontSize: 6, // Tamaño de fuente fijo
          cellPadding: 1, // Espacio entre celdas fijo
          halign: "center",
          valign: "middle",
        },
        headStyles: {
          fillColor: [70, 130, 180], // Color azul acero (Steel Blue)
          textColor: [255, 255, 255],
          fontSize: 7, // Tamaño de fuente fijo para el encabezado
          fontStyle: "bold",
        },
        theme: "striped",
        margin: { horizontal: 10 }, // Margen horizontal fijo
        tableWidth: "auto",
        columnStyles: filteredColumns.reduce(
          (styles, column, index) => {
            styles[index + 1] = { cellWidth: columnWidths[index] }; // Ancho de las celdas proporcional
            return styles;
          },
          { 0: { cellWidth: 8 } } // Ancho fijo para la columna "No."
        ),
        didDrawCell: (data) => {
          // Ajustar el alto de la celda de facturas si es necesario
          if (
            data.column.index === tableColumn.indexOf("Facturas") &&
            data.cell.raw.includes("\n")
          ) {
            const lines = data.cell.raw.split("\n").length;
            data.row.height = lines * 5; // Ajustar el alto de la fila según el número de líneas
          }
        },
      });

      // Guardar el PDF
      let currentDate = new Date();
      const formattedDate = parcearDateFile(currentDate);
      doc.save(`contratos${formattedDate}.pdf`);

      toast.success("PDF exportado exitosamente!");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error(
        "Ocurrió un error al exportar PDF. Por favor, inténtelo nuevamente."
      );
    }
  };

  const exportToExcel = (contratos) => {
    try {
      if (!contratos || contratos.length === 0) {
        throw new Error("No se encontraron contratos para exportar");
      }

      // Crear una nueva hoja de cálculo
      const ws = XLSX.utils.json_to_sheet([]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contratos");

      // Título del documento
      const title = `REGISTROS DE CONTRATOS`;
      XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "E1" }); // Centrar el título en la columna E
      ws["!merges"] = [{ s: { r: 0, c: 4 }, e: { r: 0, c: 8 } }]; // Combinar celdas para el título

      // Filtrar y transformar los datos
      const filteredContratos = contratos.map((contrato, index) => {
        const {
          _id,
          info,
          subirPDF,
          __v,
          factura,
          cloudinaryPublicId,
          originalName,
          ...rest
        } = contrato;

        // Convertir los encabezados a mayúsculas y agregar índice
        const transformedContrato = {
          NO: index + 1,
          ...Object.fromEntries(
            Object.entries(rest)
              .filter(([key, value]) => value !== null && value !== "") // Filtrar valores nulos o vacíos
              .map(([key, value]) => {
                let newKey = key;
                let newValue = value;

                // Formatear valores monetarios
                if (key.toLowerCase().includes("valor")) {
                  newValue = `$${value}`;
                }

                // Personalizar las claves
                if (key.toLowerCase().includes("tipo")) {
                  newKey = "Tipo de Contrato";
                } else if (key.toLowerCase().includes("objeto")) {
                  newKey = "Objeto del Contrato";
                } else if (key.toLowerCase().includes("aprobado")) {
                  newKey = "Aprobado por el CC";
                } else if (key.toLowerCase().includes("firmado")) {
                  newKey = "Firmado";
                } else if (key.toLowerCase().includes("entregado")) {
                  newKey = "Entregado al área jurídica";
                } else if (key.toLowerCase().includes("recibido")) {
                  newKey = "Fecha Recibido";
                } else if (key.toLowerCase().includes("valorprincipal")) {
                  newKey = "Monto";
                } else if (key.toLowerCase().includes("valordisponible")) {
                  newKey = "Monto Disponible";
                } else if (key.toLowerCase().includes("valorgastado")) {
                  newKey = "Monto Gastado";
                } else if (key.toLowerCase().includes("fechavencimiento")) {
                  newKey = "Fecha de Vencimiento";
                } else if (key.toLowerCase().includes("estado")) {
                  newKey = "Estado";
                } else if (key.toLowerCase().includes("dictamen")) {
                  newKey = "No. de Dictamen";
                } else if (key.toLowerCase().includes("vigencia")) {
                  newKey = "Vigencia";
                } else if (key.toLowerCase().includes("entidad")) {
                  newKey = "Entidad";
                } else if (key.toLowerCase().includes("direccion")) {
                  newKey = "Dirección Ejecutiva";
                }

                // Modificar valores de vigencia
                if (
                  key.toLowerCase().includes("vigencia") &&
                  typeof value === "string"
                ) {
                  if (value.toLowerCase().includes("months")) {
                    newValue = value.replace("months", "meses");
                  } else if (value.toLowerCase().includes("years")) {
                    newValue = value.replace("years", "años");
                  } else if (value.toLowerCase().includes("month")) {
                    newValue = value.replace("month", "mes");
                  } else if (value.toLowerCase().includes("year")) {
                    newValue = value.replace("year", "año");
                  }
                  // Verificar singular/plural
                  if (value.startsWith("1 ")) {
                    newValue = newValue
                      .replace("meses", "mes")
                      .replace("años", "año");
                  }
                }

                // Parsear las fechas
                if (
                  key.toLowerCase().includes("fecha") ||
                  key.toLowerCase().includes("aprobado") ||
                  key.toLowerCase().includes("firmado") ||
                  key.toLowerCase().includes("entregado")
                ) {
                  newValue = parcearDate(new Date(value));
                }

                return [newKey, newValue];
              })
          ),
        };

        // Listar las facturas si existen
        if (factura && Array.isArray(factura)) {
          transformedContrato.Facturas = factura
            .map((f) => `${f.numeroDictamen}: $${f.monto}`)
            .join(", ");
        }

        return transformedContrato;
      });

      // Añadir los datos de la tabla
      XLSX.utils.sheet_add_json(ws, filteredContratos, {
        origin: "A3",
        skipHeader: false,
      });

      // Ajustar el ancho de las columnas dinámicamente
      const wscols = [
        { wch: 5 }, // Ancho de la columna NO.
        { wch: 20 }, // Ancho de la columna Tipo de Contrato
        { wch: 30 }, // Ancho de la columna Objeto del Contrato
        { wch: 20 }, // Ancho de la columna Entidad
        { wch: 20 }, // Ancho de la columna Dirección Ejecutiva
        { wch: 15 }, // Ancho de la columna Aprobado por el CC
        { wch: 15 }, // Ancho de la columna Firmado
        { wch: 15 }, // Ancho de la columna Entregado al área jurídica
        { wch: 15 }, // Ancho de la columna Fecha Recibido
        { wch: 15 }, // Ancho de la columna Monto
        { wch: 15 }, // Ancho de la columna Monto Disponible
        { wch: 15 }, // Ancho de la columna Monto Gastado
        { wch: 25 }, // Ancho de la columna Facturas
        { wch: 15 }, // Ancho de la columna Vigencia
        { wch: 15 }, // Ancho de la columna Fecha de Vencimiento
        { wch: 15 }, // Ancho de la columna Estado
        { wch: 15 }, // Ancho de la columna No. de Dictamen
      ];
      ws["!cols"] = wscols;

      // Guardar el archivo Excel
      let currentDate = new Date();
      const formattedDate = parcearDateFile(currentDate);
      XLSX.writeFile(wb, `contratos_${formattedDate}.xlsx`);

      toast.success("Excel exportado exitosamente!");
    } catch (error) {
      toast.error("Error al exportar excel!");
      console.error("Excel Export Error:", error);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    errores = validarInput(numeroDictamen, "text", "");
    errores2 = validarInput(monto, "number", "");

    setErrorMonto(null);
    setErrorText(errores || "");
    setErrorText1(errores2 || "");
    if (errores || errores2) {
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `facturas/advertencia-monto-crear`;
      const response = await clienteAxios.post(url, { _id: id, monto }, config);
      if (!response.data.success) {
        setErrorMonto(response.data);
        setIsCreate(true);
        return;
      }
    } catch (error) {
      console.error(error);
      setErrorMonto(error.response.data);

      return;
    }
    try {
      const url = `facturas/crear-factura`;
      const response = await clienteAxios.post(
        url,
        { _id: id, numeroDictamen, monto },
        config
      );
      toast.success(response.data.msg);
      setSelectedContract(null);
      setErrorMonto(null);
      setErrorText("");
      setErrorText1("");
      setMonto("");
      setNumeroDictamen("");
      setShowModalCreate(false);
      obtenerRegistros(tipoContrato);
      obtenerNotificaciones();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleModal = async (type, invoice, id) => {
    try {
      await setModalType(type);
      if (type === "view") {
        await obtenerFactura(invoice);
      }
      if (type === "info") {
        setContrato(invoice);
      }

      if (type === "delete") {
        await obtenerFactura(invoice);
        setNumeroDictamen(selectedInvoice.numeroDictamen);
        setMonto(selectedInvoice.monto);
      }
    } catch (error) {}

    setShowModal(true);
  };
  const obtenerFactura = async (fac) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `facturas/visualizar-factura/`;
      const response = await clienteAxios.post(
        url,
        { numeroDictamen: fac.numeroDictamen },
        config
      );
      const factura = response.data;
      await setSelectedInvoice(factura);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerRegistros(tipoContrato);
  }, []);

  const Modal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full animate-slideIn">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {modalType === "view" && "Detalles de la Factura"}
            {modalType === "delete" && "Eliminar Factura"}
            {modalType === "info" && "Detalles del Registro"}
          </h2>

          <div className="mb-4">
            {modalType === "view" && (
              <div>
                <div></div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Número de factura:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {selectedInvoice?.numeroDictamen}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Fecha:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(selectedInvoice?.fechaCreacion)
                      )
                    )}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Monto:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    ${selectedInvoice?.monto.toLocaleString()}{" "}
                    {/* Formatear el monto */}
                  </span>
                </p>

                {/* Mostrar monto de suplementos si existe */}
                {selectedInvoice?.montoSuplement > 0 && (
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Cantidad utilizada de suplementos:{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      ${selectedInvoice?.montoSuplement.toLocaleString()}{" "}
                      {/* Formatear el monto */}
                    </span>
                  </p>
                )}
              </div>
            )}
            {modalType === "delete" && (
              <p className="text-gray-800 dark:text-gray-200">
                ¿Está seguro de eliminar la factura{" "}
                {selectedInvoice?.numeroDictamen}?
              </p>
            )}
            {modalType === "info" && (
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Creado por:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {contrato.info?.creadoPor}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Fecha de creación:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(contrato.info?.fechaDeCreacion)
                      )
                    )}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Modificado por:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {contrato.info?.modificadoPor}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Fecha de modificación:{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(contrato.info?.fechaDeModificacion)
                      )
                    )}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              {modalType === "view" || modalType === "info"
                ? "Cerrar"
                : "Cancelar"}
            </button>
            {modalType !== "view" && (
              <>
                {modalType === "delete" ? (
                  <button
                    onClick={() => handleDelete()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto p-4 pr-12">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-300 dark:to-teal-200">
          Listado de Contratos{" "}
        </h1>
        <div className="mb-4 pr-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contractTypes
            .find((ct) => ct.nombre === tipoContrato)
            ?.camposRequeridos.some(
              (campo) => campo.id === "direccionEjecutiva"
            ) && (
            <select
              id="direccionEjecutiva"
              name="direccionEjecutiva"
              placeholder="Filtrar por dirección ejecutiva"
              value={filtarDireccion}
              onChange={(e) => setFiltrarDireccion(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200"
            >
              <option value=" ">Filtrar por dirección ejecutiva</option>
              {direcciones.map((direccion) => (
                <option
                  key={direccion._id}
                  value={direccion.direccionEjecutiva}
                >
                  {direccion.direccionEjecutiva}
                </option>
              ))}
            </select>
          )}
          {contractTypes
            .find((ct) => ct.nombre === tipoContrato)
            ?.camposRequeridos.some((campo) => campo.id === "entidad") && (
            <select
              id="entidad"
              name="entidad"
              placeholder="Entidad"
              value={filtarEntidad}
              onChange={(e) => setFiltrarEntidad(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200"
            >
              <option value=" ">Filtar por entidad</option>
              {entidades.map((entidad) => (
                <option key={entidad._id} value={entidad.entidad}>
                  {entidad.entidad}
                </option>
              ))}
            </select>
          )}

          {contractTypes
            .find((ct) => ct.nombre === tipoContrato)
            ?.camposRequeridos.some((campo) => campo.id === "estado") && (
            <select
              type="text"
              id="estado"
              name="estado"
              value={filtarEstado}
              onChange={(e) => setFiltrarEstado(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-200"
            >
              <option value=" ">Filtar por estado</option>
              <option value="Ejecución">Ejecución</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          )}
          {contractTypes
            .find((ct) => ct.nombre === tipoContrato)
            ?.camposRequeridos.some((campo) =>
              ["estado", "entidad", "direccionEjecutiva"].includes(campo.id)
            ) && (
            <>
              <button
                onClick={() => handleFilter()}
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200  dark:bg-blue-600 dark:hover:bg-blue-800"
              >
                Aplicar Filtros
              </button>
              <button
                onClick={() => {
                  setFiltrarDireccion("");
                  setFiltrarEntidad("");
                  setFiltrarEstado("");
                  obtenerRegistros(tipoContrato);
                }}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Limpiar Filtros
              </button>
            </>
          )}
          <button
            onClick={() => exportToPDF(contratos)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
          >
            <FaFilePdf /> Export PDF
          </button>
          <button
            onClick={() => exportToExcel(contratos)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-800"
          >
            <FaFileExcel /> Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
          ) : (
            <table className="min-w-full bg-white dark:bg-gray-800  shadow-md rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border-l">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Tipo de Contrato
                  </th>
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "objetoContrato"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Objeto del Contrato
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "entidad"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Entidad
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "direccionEjecutiva"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Dirección Ejecutiva
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "aprobadorCC"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Aprobado por el CC
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "fechaFirmada"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Firmado
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "entregadoJuridica"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Entregado al área jurídica
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "fechaRecibido"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Fecha Recibido
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "monto"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Monto
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "monto"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Monto Disponible
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "monto"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Monto Gastado
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Facturas
                  </th>
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "vigencia"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Vigencia
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "fechaRecibido"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Fecha de Vencimiento
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "estado"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Estado
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "numeroDictamen"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      No. de Dictamen
                    </th>
                  )}
                  {contractTypes
                    .find((ct) => ct.nombre === tipoContrato)
                    ?.camposRequeridos.some(
                      (campo) => campo.id === "subirPDF"
                    ) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      PDF
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Editar e info del Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Suplementos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border-r">
                    Crear Factura
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.map((contract, index) => (
                  <tr
                    className="border-l border-r dark:border-gray-700"
                    key={contract._id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                      {calculatePageIndex(currentPage, index) + 1}
                    </td>
                    {contract.tipoDeContrato && (
                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs dark:text-gray-200">
                        {contract.tipoDeContrato}
                      </td>
                    )}
                    {contract.objetoDelContrato && (
                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs dark:text-gray-200">
                        {contract.objetoDelContrato}
                      </td>
                    )}
                    {contract.entidad && (
                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs dark:text-gray-200">
                        {contract.entidad}
                      </td>
                    )}
                    {contract.direccionEjecuta && (
                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs dark:text-gray-200">
                        {contract.direccionEjecuta}
                      </td>
                    )}
                    {contract.aprobadoPorCC && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {parcearDate(new Date(contract.aprobadoPorCC))}
                      </td>
                    )}
                    {contract.firmado && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {parcearDate(new Date(contract.firmado))}
                      </td>
                    )}
                    {contract.entregadoJuridica && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {parcearDate(new Date(contract.entregadoJuridica))}
                      </td>
                    )}
                    {contract.fechaRecibido && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {parcearDate(new Date(contract.fechaRecibido))}
                      </td>
                    )}
                    {contract.valorPrincipal && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        ${contract.valorPrincipal}
                      </td>
                    )}
                    {contract.valorPrincipal && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        <div className="flex flex-col items-start">
                          {/* Contenedor para el círculo y el valor disponible (en la misma línea) */}
                          <div className="flex items-center">
                            {/* Círculo de color */}
                            <div
                              className={`w-3 h-3 rounded-full ${getValueColor(
                                contract.valorPrincipal,
                                contract.valorDisponible
                              )} mr-2`} // Margen derecho para separar el círculo del valor
                            ></div>

                            {/* Valor disponible */}
                            <div className="block">
                              ${contract.valorDisponible.toLocaleString()}
                            </div>
                          </div>

                          {/* Suplementos */}
                          {contract.supplement &&
                            contract.supplement.length > 0 &&
                            contract.supplement.filter((mont) => mont.monto > 0)
                              .length > 0 && ( // Verifica si hay suplementos con monto > 0
                              <>
                                {contract.supplement
                                  .filter((mont) => mont.monto > 0) // Filtra solo los suplementos con monto > 0
                                  .map((mont, index) => (
                                    <div
                                      key={index}
                                      className="block text-green-500"
                                    >
                                      + ${mont.monto.toLocaleString()}{" "}
                                      {/* Agregamos el símbolo $ aquí */}
                                    </div>
                                  ))}

                                {/* Texto "de suplemento" si hay suplementos con monto > 0 */}
                                <div className="block text-green-500">
                                  de suplemento{"(s)"}
                                </div>
                              </>
                            )}
                        </div>
                      </td>
                    )}
                    {contract.valorPrincipal && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        ${contract.valorGastado.toLocaleString()}
                      </td>
                    )}
                    <td className="px-6 py-4 dark:text-gray-200">
                      <div className="space-y-2">
                        {contract.factura.length === 0 ? (
                          <p className="text-clip text-gray-500 dark:text-gray-400">
                            Sin facturas asociadas
                          </p>
                        ) : (
                          <>
                            {contract.factura.map((factura) =>
                              factura.numeroDictamen ? (
                                <div
                                  key={factura._id}
                                  className="flex items-center space-x-2"
                                >
                                  <span>Fac {factura.numeroDictamen}</span>
                                  <div className="flex space-x-1">
                                    <FaEye
                                      className="text-blue-500 cursor-pointer dark:text-blue-400"
                                      onClick={() =>
                                        handleModal("view", factura, "")
                                      }
                                    />
                                    <FaTrash
                                      className="text-red-500 cursor-pointer dark:text-red-400"
                                      onClick={() => {
                                        handleModal("delete", factura, "");
                                        setId(contract._id);
                                      }}
                                    />
                                    <FaEdit
                                      className="text-yellow-500 cursor-pointer dark:text-yellow-400"
                                      onClick={() => {
                                        setNumeroDictamenNew(
                                          factura?.numeroDictamen
                                        );
                                        setNumeroDictamen(
                                          factura?.numeroDictamen
                                        );
                                        setSelectedContract(contract);
                                        setErrorMonto(null);
                                        setActualMonto(factura?.monto);
                                        setShowModalUpdate(true);
                                        setId(contract._id);
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    {contract.vigencia && (
                      <td className="px-6 whitespace-normal break-words max-w-xs dark:text-gray-200">
                        {/* Vigencia principal */}
                        <div className="block">
                          {parseDuration(contract.vigencia)}
                        </div>

                        {/* Suplementos de tiempo */}
                        {contract.supplement &&
                          contract.supplement.length > 0 &&
                          contract.supplement
                            .filter((sup) => sup.tiempo) // Filtra solo los suplementos con tiempo
                            .map((sup, index) => {
                              const { days, months, years } = sup.tiempo;
                              const tiempoSuplemento = [];

                              // Agregar años si son mayores que 0
                              if (years > 0) {
                                tiempoSuplemento.push(
                                  `${years} año${years > 1 ? "s" : ""}`
                                );
                              }

                              // Agregar meses si son mayores que 0
                              if (months > 0) {
                                tiempoSuplemento.push(
                                  `${months} mes${months > 1 ? "es" : ""}`
                                );
                              }

                              // Agregar días si son mayores que 0
                              if (days > 0) {
                                tiempoSuplemento.push(
                                  `${days} día${days > 1 ? "s" : ""}`
                                );
                              }

                              // Si hay tiempo suplementario, mostrarlo
                              if (tiempoSuplemento.length > 0) {
                                return (
                                  <div
                                    key={index}
                                    className="block text-blue-500"
                                  >
                                    {" "}
                                    {/* Color azul para resaltar */}+{" "}
                                    {tiempoSuplemento.join(", ")}{" "}
                                    {/* Unir los elementos con comas */}
                                  </div>
                                );
                              }

                              return null; // Si no hay tiempo suplementario, no mostrar nada
                            })}

                        {/* Texto "de suplemento" si hay suplementos de tiempo */}
                        {contract.supplement &&
                          contract.supplement.some(
                            (sup) =>
                              sup.tiempo && // Verifica si hay tiempo
                              (sup.tiempo.days > 0 ||
                                sup.tiempo.months > 0 ||
                                sup.tiempo.years > 0) // Verifica si el tiempo es válido
                          ) && (
                            <div className="block text-blue-500">
                              {" "}
                              {/* Color azul para resaltar */}
                              de suplemento{"(s)"}
                            </div>
                          )}
                      </td>
                    )}
                    {contract.fechaVencimiento && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {parcearDate(new Date(contract.fechaVencimiento))}
                      </td>
                    )}
                    {contract.estado && (
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                        {contract.estado}
                      </td>
                    )}
                    {contract.numeroDictamen && (
                      <td className="px-6 py-4 whitespace-nowrap text-center dark:text-gray-200">
                        {contract.numeroDictamen}
                      </td>
                    )}
                    {contractTypes
                      .find((ct) => ct.nombre === tipoContrato)
                      ?.camposRequeridos.some(
                        (campo) => campo.id === "subirPDF"
                      ) && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <FaFileDownload
                          className="text-blue-500 cursor-pointer dark:text-blue-400"
                          onClick={() => handleDownload(contract._id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2 justify-around">
                        <FaPencilAlt
                          className="text-blue-500 cursor-pointer dark:text-blue-400"
                          onClick={() => {
                            setShowForm(true);
                            setSelectContrato(contract);
                            setIsEditing(true);
                          }}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer dark:text-red-400"
                          onClick={() => {
                            setShowEliminarModal(true);
                            setId(contract._id);
                          }}
                        />
                        <FaInfoCircle
                          className="text-blue-500 cursor-pointer dark:text-blue-400"
                          onClick={() => handleModal("info", contract, "")}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2 justify-around">
                        <button
                          aria-label="Agregar suplemento"
                          onClick={(e) => {
                            e.stopPropagation();
                            setContractTypeSelect(contract);
                            setShowSupplementModal(true);
                          }}
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600"
                        >
                          <FaPlusCircle />
                        </button>
                        {contract?.isGotSupplement && (
                          <SupplementViewerTrigger
                            onClick={async () => {
                              const suplemento = await handleGetSupplements(
                                contract._id
                              );
                              setCurrentSupplements(suplemento);
                              setSelectedContract(contract);
                              setShowSupplementsGetInfoModal(true);
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={async () => {
                          setSelectedContract(contract);
                          setShowModalCreate(true);
                          await setId(contract._id);

                          setMonto("");
                          setNumeroDictamen("");
                        }}
                        className="flex items-center space-x-1 px-1 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        <FaPlus className="h-3 w-2" />
                        <span className="text-white font-serif text-sm">
                          Crear Factura
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showModalUpdate && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
                <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
                  <button
                    onClick={() => {
                      setShowModalUpdate(false);
                      setSelectedContract(null);
                      setNumeroDictamen("");
                      setNumeroDictamenNew("");
                      setMonto("");
                      setErrorMonto(null);
                      setErrorText("");
                      setErrorText1("");
                      setId("");
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-300 dark:hover:text-gray-100"
                    aria-label="Close confirmation"
                  >
                    <IoClose size={24} />
                  </button>
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Actualizar factura
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="numeroDictamen"
                      className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                    >
                      Número de factura
                    </label>
                    <input
                      type="text"
                      id="numeroDictamen"
                      name="numeroDictamen"
                      placeholder="Número de factura"
                      value={numeroDictamenNew}
                      onChange={(e) => setNumeroDictamenNew(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    {errorText && (
                      <span className="text-red-500 dark:text-red-400">
                        {errorText}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="monto"
                      className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                    >
                      Monto (Valor Actual: {actualMonto})
                    </label>
                    <input
                      type="number"
                      id="monto"
                      name="monto"
                      placeholder={`Monto actual ${actualMonto}`}
                      value={monto}
                      onChange={(e) => {
                        setMonto(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    {errorText1 && (
                      <span className="text-red-500 dark:text-red-400">
                        {errorText1}
                      </span>
                    )}
                    {errorMonto && (
                      <>
                        <span
                          className={`${
                            errorMonto.success
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {errorMonto.msg}
                        </span>

                        {/* Sección de acciones para suplementos */}
                        <div className="mt-3 space-y-2 border-t pt-3 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿Desea resolver este error con suplementos?
                          </p>

                          <div className="flex gap-2">
                            {/* Botón para usar suplementos existentes */}
                            {isSuplemento?.length > 0 ||
                            selectedContract?.isGotSupplement ? (
                              <button
                                onClick={async () => {
                                  const suplemento = await handleGetSupplements(
                                    selectedContract._id
                                  );
                                  setCurrentSupplements(suplemento);
                                  setShowSupplementsGetInfoModal(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400"
                              >
                                🗂 Usar suplementos existentes
                              </button>
                            ) : (
                              /* Botón para crear nuevo suplemento */
                              <button
                                onClick={() => {
                                  setContractTypeSelect(selectedContract);
                                  setShowSupplementModal(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors dark:bg-green-900/30 dark:text-green-400"
                              >
                                ➕ Crear nuevo suplemento
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Sección de suplementos existentes */}
                    {selectedContract?.supplement && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                          Suplementos de monto en uso:
                        </p>
                        {selectedContract.supplement
                          .filter((sup) => sup.monto)
                          .map((sup, index) => (
                            <div
                              key={index}
                              className="text-green-600 dark:text-green-400 text-sm"
                            >
                              + ${sup.monto.toLocaleString()}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4 mt-5">
                    <button
                      onClick={() => {
                        setShowModalUpdate(false);
                        setSelectedContract(null);
                        setNumeroDictamen("");
                        setNumeroDictamenNew("");
                        setErrorMonto(null);
                        setErrorText("");
                        setErrorText1("");
                        setMonto("");
                        setId("");
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={(e) => handleUpdate(e)}
                      className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800`}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {showModalCreate && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
                <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
                  <button
                    onClick={() => {
                      setShowModalCreate(false);
                      setSelectedContract(null);
                      setErrorText("");
                      setErrorText1("");
                      setId("");
                      setErrorMonto(null);
                      setMonto("");
                      setNumeroDictamen("");
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-300 dark:hover:text-gray-100"
                    aria-label="Close confirmation"
                  >
                    <IoClose size={24} />
                  </button>

                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Registrar una nueva factura
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="numeroDictamen"
                      className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                    >
                      Número de factura
                    </label>
                    <input
                      type="text"
                      id="numeroDictamen"
                      name="numeroDictamen"
                      placeholder="Número de factura"
                      value={numeroDictamen}
                      onChange={(e) => setNumeroDictamen(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    {errorText && (
                      <span className="text-red-500 dark:text-red-400">
                        {errorText}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="monto"
                      className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                    >
                      Monto
                    </label>
                    <input
                      type="number"
                      id="monto"
                      name="monto"
                      placeholder="Monto"
                      value={monto}
                      onChange={(e) => {
                        setMonto(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    {errorText1 && (
                      <span className="text-red-500 dark:text-red-400">
                        {errorText1}
                      </span>
                    )}
                    {errorMonto && (
                      <>
                        <span
                          className={`${
                            errorMonto.success
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {errorMonto.msg}
                        </span>

                        {/* Sección de acciones para suplementos */}
                        <div className="mt-3 space-y-2 border-t pt-3 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿Desea resolver este error con suplementos?
                          </p>

                          <div className="flex gap-2">
                            {/* Botón para usar suplementos existentes */}
                            {isSuplemento?.length > 0 ||
                            selectedContract?.isGotSupplement ? (
                              <button
                                onClick={async () => {
                                  const suplemento = await handleGetSupplements(
                                    selectedContract._id
                                  );
                                  setCurrentSupplements(suplemento);
                                  setShowSupplementsGetInfoModal(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400"
                              >
                                🗂 Usar suplementos existentes
                              </button>
                            ) : (
                              /* Botón para crear nuevo suplemento */
                              <button
                                onClick={() => {
                                  setContractTypeSelect(selectedContract);
                                  setShowSupplementModal(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors dark:bg-green-900/30 dark:text-green-400"
                              >
                                ➕ Crear nuevo suplemento
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Sección de suplementos existentes */}
                    {selectedContract?.supplement && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                          Suplementos de monto en uso:
                        </p>
                        {selectedContract.supplement
                          .filter((sup) => sup.monto)
                          .map((sup, index) => (
                            <div
                              key={index}
                              className="text-green-600 dark:text-green-400 text-sm"
                            >
                              + ${sup.monto.toLocaleString()}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4 mt-5">
                    <button
                      onClick={() => {
                        setShowModalCreate(false);
                        setSelectedContract(null);
                        setErrorText("");
                        setErrorText1("");
                        setId("");
                        setErrorMonto(null);
                        setMonto("");
                        setNumeroDictamen("");
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={(e) => handleCreate(e)}
                      className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800`}
                    >
                      Registrar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {showEliminarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
              <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-slideIn dark:bg-gray-800">
                <button
                  onClick={() => setShowEliminarModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-300 dark:hover:text-gray-100"
                  aria-label="Close confirmation"
                >
                  <IoClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4 dark:text-white">
                  Advertencia
                </h2>
                <p className="text-gray-600 mb-6 dark:text-gray-300">
                  ¿Estás seguro de que deseas eliminar este registro?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowEliminarModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleEliminarRegistro()}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando{" "}
            {contratos.length === 0 ? indexOfFirstItem : indexOfFirstItem + 1} a
            la {Math.min(indexOfLastItem, contratos.length)} de{" "}
            {contratos.length} entradas
          </div>
          {contratos.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`flex items-center px-3 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:-text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                }`}
              >
                <FiChevronLeft className="mr-1" /> Anterior
              </button>

              <div className="hidden sm:flex">
                {getElementsInRange(
                  renderPageNumbers(),
                  currentPage,
                  currentPage + 9
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`flex items-center px-3 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:-text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Próximo <FiChevronRight className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal />}
      {showSupplementModal && (
        <SupplementModal
          contratoSeleccionado={contractTypeSelect}
          tipoContrato={tipoContrato}
        />
      )}
      {showSupplementsGetInfoModal && (
        <ViewSupplementsModal
          supplements={currentSupplements}
          contractName={selectedContract?.numeroDictamen}
          contractId={selectedContract?._id}
          onClose={async () => {
            await obtenerRegistros(tipoContrato);
            setShowSupplementsGetInfoModal(false);
          }}
          setErrorMonto={setErrorMonto}
        />
      )}
    </>
  );
};

export default ContractTable;
