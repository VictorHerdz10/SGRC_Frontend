import React, { useState, useEffect } from "react";
import FileUploadInput from "../others/fileupload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import ConfirmationModal from "../modals/confirmacionModal";
import useValidation from "../../hooks/useValidation";
import clienteAxios from "../../axios/axios";

const FormularioContrato = ({ tipoContrato }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [tipoDeContrato, setTipoDeContrato] = useState("");
  const [objetoDelContrato, setObjetoDelContrato] = useState("");
  const [entidad, setEntidad] = useState("");
  const [direccionEjecuta, setDireccionEjecuta] = useState("");
  const [aprobadoPorCC, setAprobadoPorCC] = useState("");
  const [firmado, setFirmado] = useState("");
  const [entregadoJuridica, setEntregadoJuridica] = useState("");
  const [fechaRecibido, setFechaRecibido] = useState("");
  const [valor, setValor] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [estado, setEstado] = useState("");
  const [numeroDictamen, setNumeroDictamen] = useState("");
  const [timeVigencia, setTimeVigencia] = useState("");
  const [errorTipoDeContrato, setErrorTipoDeContrato] = useState("");
  const [errorObjetoDelContrato, setErrorObjetoDelContrato] = useState("");
  const [errorEntidad, setErrorEntidad] = useState("");
  const [errorDireccionEjecuta, setErrorDireccionEjecuta] = useState("");
  const [errorAprobadoPorCC, setErrorAprobadoPorCC] = useState("");
  const [errorFirmado, setErrorFirmado] = useState("");
  const [errorEntregadoJuridica, setErrorEntregadoJuridica] = useState("");
  const [errorFechaRecibido, setErrorFechaRecibido] = useState("");
  const [errorValor, setErrorValor] = useState("");
  const [errorVigencia, setErrorVigencia] = useState("");
  const [errorTimeVigencia, setErrorTimeVigencia] = useState("");
  const [errorEstado, setErrorEstado] = useState("");
  const [errorNumeroDictamen, setErrorNumeroDictamen] = useState("");
  let errores,
    errores1,
    errores2,
    errores3,
    errores4,
    errores5,
    errores6,
    errores7,
    errores8,
    errores9,
    errores10,
    errores11;
  const {
    validarInput,
    direcciones,
    entidades,
    file,
    obtenerRegistros,
    setFile,
    showForm,
    setShowForm,
    setSelectContrato,
    selectContrato,
    formatDate,
    setIsEditing,
    isEditing,
    contractTypes,
  } = useValidation();
  const loadContractData = (contract) => {
    // Verifica si contract existe
    if (!contract) return;

    // Divide la vigencia si existe
    const [part1, part2] = contract.vigencia
      ? contract.vigencia.split(" ")
      : [null, null];

    // Setea los valores solo si existen en contract
    if (contract.tipoDeContrato !== undefined)
      setTipoDeContrato(contract.tipoDeContrato);
    if (contract.objetoDelContrato !== undefined)
      setObjetoDelContrato(contract.objetoDelContrato);
    if (contract.entidad !== undefined) setEntidad(contract.entidad);
    if (contract.direccionEjecuta !== undefined)
      setDireccionEjecuta(contract.direccionEjecuta);
    if (contract.aprobadoPorCC !== undefined)
      setAprobadoPorCC(formatDate(contract.aprobadoPorCC));
    if (contract.firmado !== undefined)
      setFirmado(formatDate(contract.firmado));
    if (contract.entregadoJuridica !== undefined)
      setEntregadoJuridica(formatDate(contract.entregadoJuridica));
    if (contract.fechaRecibido !== undefined)
      setFechaRecibido(formatDate(contract.fechaRecibido));
    if (contract.valorPrincipal !== undefined)
      setValor(contract.valorPrincipal);
    if (part1 !== null) setVigencia(part1);
    if (contract.estado !== undefined) setEstado(contract.estado);
    if (contract.numeroDictamen !== undefined)
      setNumeroDictamen(contract.numeroDictamen);
    if (part2 !== null) setTimeVigencia(part2);
  };
  useEffect(() => {
    setTipoDeContrato(tipoContrato);
    if (showForm && isEditing) {
      loadContractData(selectContrato);
    }
  }, [selectContrato, tipoContrato]);
  const showModalForConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const hideModalForConfirmation = () => {
    setShowConfirmationModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validar cada campo solo si existe
    const errores =
      tipoDeContrato !== undefined && tipoDeContrato !== null
        ? validarInput(tipoDeContrato, "text", "")
        : "";
    const errores1 =
      objetoDelContrato !== undefined && objetoDelContrato !== null
        ? validarInput(objetoDelContrato, "text", "")
        : "";
    const errores2 =
      entidad !== undefined && entidad !== null
        ? validarInput(entidad, "text", "")
        : "";
    const errores3 =
      direccionEjecuta !== undefined && direccionEjecuta !== null
        ? validarInput(direccionEjecuta, "text", "")
        : "";
    const errores4 =
      aprobadoPorCC !== undefined && aprobadoPorCC !== null
        ? validarInput(aprobadoPorCC, "date", "")
        : "";
    const errores5 =
      firmado !== undefined && firmado !== null
        ? validarInput(firmado, "date", "")
        : "";
    const errores6 =
      entregadoJuridica !== undefined && entregadoJuridica !== null
        ? validarInput(entregadoJuridica, "date", "")
        : "";
    const errores7 =
      fechaRecibido !== undefined && fechaRecibido !== null
        ? validarInput(fechaRecibido, "date", "")
        : "";
    const errores8 =
      valor !== undefined && valor !== null
        ? validarInput(valor, "number", "")
        : "";
    const errores9 =
      vigencia !== undefined && vigencia !== null
        ? validarInput(vigencia, "number", "")
        : "";
    const errores10 =
      estado !== undefined && estado !== null
        ? validarInput(estado, "text", "")
        : "";
    const errores11 =
      numeroDictamen !== undefined && numeroDictamen !== null
        ? validarInput(numeroDictamen, "text", "")
        : "";

    // Asignar errores a los estados correspondientes
    setErrorTipoDeContrato(errores || "");
    setErrorObjetoDelContrato(errores1 || "");
    setErrorEntidad(errores2 || "");
    setErrorDireccionEjecuta(errores3 || "");
    setErrorAprobadoPorCC(errores4 || "");
    setErrorFirmado(errores5 || "");
    setErrorEntregadoJuridica(errores6 || "");
    setErrorFechaRecibido(errores7 || "");
    setErrorValor(errores8 || "");
    setErrorVigencia(errores9 || "");
    setErrorEstado(errores10 || "");
    setErrorNumeroDictamen(errores11 || "");

    // Validar el campo de tiempo de vigencia
    if (timeVigencia === "") {
      setErrorTimeVigencia("El campo tiempo de vigencia es requerido");
    } else {
      setErrorTimeVigencia("");
    }

    // Verificar si hay errores en los campos requeridos
    const camposRequeridos =
      contractTypes.find((ct) => ct.nombre === tipoContrato)
        ?.camposRequeridos || [];

    const hayErrores = camposRequeridos.some((campo) => {
      switch (campo.id) {
        case "tipoDeContrato":
          return errores !== "";
        case "objetoDelContrato":
          return errores1 !== "";
        case "entidad":
          return errores2 !== "";
        case "direccionEjecuta":
          return errores3 !== "";
        case "aprobadorCC":
          return errores4 !== "";
        case "firmado":
          return errores5 !== "";
        case "entregadoJuridica":
          return errores6 !== "";
        case "fechaRecibido":
          return errores7 !== "";
        case "monto":
          return errores8 !== "";
        case "vigencia":
          return errores9 !== "";
        case "estado":
          return errores10 !== "";
        case "numeroDictamen":
          return errores11 !== "";
        default:
          return false;
      }
    });

    if (hayErrores) {
      toast.error("Algunos campos requeridos tienen errores");
      return;
    }

    let vigenciaReal = `${vigencia} ${timeVigencia}`;
    const formData = new FormData();

    // Agregar los valores al FormData solo si existen
    if (tipoDeContrato !== undefined && tipoDeContrato !== null) {
      formData.append("tipoDeContrato", tipoDeContrato.trim());
    }

    if (objetoDelContrato !== undefined && objetoDelContrato !== null) {
      formData.append("objetoDelContrato", objetoDelContrato.trim());
    }

    if (entidad !== undefined && entidad !== null) {
      formData.append("entidad", entidad);
    }

    if (direccionEjecuta !== undefined && direccionEjecuta !== null) {
      formData.append("direccionEjecuta", direccionEjecuta);
    }

    if (aprobadoPorCC !== undefined && aprobadoPorCC !== null) {
      formData.append("aprobadoPorCC", aprobadoPorCC);
    }

    if (firmado !== undefined && firmado !== null) {
      formData.append("firmado", firmado);
    }

    if (entregadoJuridica !== undefined && entregadoJuridica !== null) {
      formData.append("entregadoJuridica", entregadoJuridica);
    }

    if (fechaRecibido !== undefined && fechaRecibido !== null) {
      formData.append("fechaRecibido", fechaRecibido);
    }

    if (valor !== undefined && valor !== null) {
      formData.append("valorPrincipal", valor);
    }

    if (
      vigenciaReal !== undefined &&
      vigenciaReal !== null &&
      vigenciaReal !== " "
    ) {
      formData.append("vigencia", vigenciaReal);
    }

    if (estado !== undefined && estado !== null) {
      formData.append("estado", estado);
    }

    if (numeroDictamen !== undefined && numeroDictamen !== null) {
      formData.append("numeroDictamen", numeroDictamen.trim());
    }
    // Agregar el archivo al FormData
    if (file) {
      formData.append("subirPDF", file);
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (isEditing) {
        const url = `contratos/actualizar-registro-contrato/${selectContrato._id}`;
        const response = await clienteAxios.put(url, formData, config);
        toast.success(response.data.msg);
        setTimeout(() => {
          setObjetoDelContrato("");
          setEntidad("");
          setDireccionEjecuta("");
          setAprobadoPorCC("");
          setFirmado("");
          setEntregadoJuridica("");
          setFechaRecibido("");
          setValor("");
          setVigencia("");
          setEstado("");
          setNumeroDictamen("");
          obtenerRegistros(tipoContrato);
          setShowForm(false);
          setFile(null);
          setSelectContrato({});
          setIsEditing(false);
        }, 500);
      } else {
        try {
          const url = "/contratos";
          const response = await clienteAxios.post(url, formData, config);

          toast.success(response.data.msg);
          setTimeout(() => {
            setObjetoDelContrato("");
            setEntidad("");
            setDireccionEjecuta("");
            setAprobadoPorCC("");
            setFirmado("");
            setEntregadoJuridica("");
            setFechaRecibido("");
            setValor("");
            setVigencia("");
            setEstado("");
            setNumeroDictamen("");
            obtenerRegistros(tipoContrato);
            setShowForm(false);
            setFile(null);
          }, 500);
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.msg);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-300 dark:to-teal-200">
        Gestión de los Registros
      </h1>

      <button
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4 dark:bg-blue-600 dark:hover:bg-blue-800"
        onClick={() => {
          setShowForm(!showForm);
          setObjetoDelContrato("");
          setEntidad("");
          setDireccionEjecuta("");
          setAprobadoPorCC("");
          setFirmado("");
          setEntregadoJuridica("");
          setFechaRecibido("");
          setValor("");
          setVigencia("");
          setEstado("");
          setNumeroDictamen("");
          setFile(null);
        }}
      >
        <FaPlus className="inline mr-2" />
        {showForm ? "Ocultar formulario" : "Agregar un nuevo registro"}
      </button>
      {showForm && (
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-white shadow-xl rounded px-6 pt-6 pb-8 mb-4 dark:bg-gray-800"
          >
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center mx-auto dark:text-indigo-300">
              {isEditing
                ? "Actualizar el registro de contrato"
                : "Registrar un nuevo contrato"}
            </h2>

            <div className="mb-4">
              <label
                htmlFor="tipo_contrato"
                className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
              >
                Tipo de Contrato
              </label>
              <input
                type="text"
                id="tipo_contrato"
                name="tipo_contrato"
                placeholder="Tipo de Contrato"
                value={tipoDeContrato}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
              {errorTipoDeContrato && (
                <span className="text-red-500 dark:text-red-400">
                  {errorTipoDeContrato}
                </span>
              )}
            </div>

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "objetoContrato"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="objeto_contrato"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Objeto del Contrato
                </label>
                <textarea
                  id="objeto_contrato"
                  name="objeto_contrato"
                  rows={3}
                  placeholder="Objeto del Contrato"
                  value={objetoDelContrato}
                  onChange={(e) => setObjetoDelContrato(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorObjetoDelContrato && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorObjetoDelContrato}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some((campo) => campo.id === "entidad") && (
              <div className="mb-4">
                <label
                  htmlFor="entidad"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Entidad
                </label>
                <select
                  id="entidad"
                  name="entidad"
                  placeholder="Entidad"
                  value={entidad}
                  onChange={(e) => setEntidad(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value=" ">Seleccione...</option>
                  {entidades.map((entidad) => (
                    <option key={entidad._id} value={entidad.entidad}>
                      {entidad.entidad}
                    </option>
                  ))}
                </select>
                {errorEntidad && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorEntidad}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "direccionEjecutiva"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="direccionEjecutiva"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Dirección Ejecutiva
                </label>
                <select
                  id="direccionEjecutiva"
                  name="direccionEjecutiva"
                  placeholder="Dirección que lo Ejecuta"
                  value={direccionEjecuta}
                  onChange={(e) => setDireccionEjecuta(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value="">Seleccione...</option>
                  {direcciones.map((direccion) => (
                    <option
                      key={direccion._id}
                      value={direccion.direccionEjecutiva}
                    >
                      {direccion.direccionEjecutiva}
                    </option>
                  ))}
                </select>
                {errorDireccionEjecuta && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorDireccionEjecuta}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "aprobadorCC"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="aprovadorCC"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Aprobador por el CC
                </label>
                <input
                  type="date"
                  id="aprovadorCC"
                  name="aprovadorCC"
                  placeholder="Aprobador por el CC"
                  value={aprobadoPorCC}
                  onChange={(e) => setAprobadoPorCC(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorAprobadoPorCC && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorAprobadoPorCC}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "fechaFirmada"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="firmado"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Fecha Firmada
                </label>
                <input
                  type="date"
                  id="firmado"
                  name="firmado"
                  placeholder="Fecha Firmada"
                  value={firmado}
                  onChange={(e) => setFirmado(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorFirmado && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorFirmado}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "entregadoJuridica"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="entregadoJuridica"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Entregado Jurídica
                </label>
                <input
                  type="date"
                  id="entregadoJuridica"
                  name="entregadoJuridica"
                  placeholder="Entregado Jurídica"
                  value={entregadoJuridica}
                  onChange={(e) => setEntregadoJuridica(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorEntregadoJuridica && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorEntregadoJuridica}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some(
                (campo) => campo.id === "fechaRecibido"
              ) && (
              <div className="mb-4">
                <label
                  htmlFor="fechaRecibido"
                  className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300"
                >
                  Fecha Recibido
                </label>
                <input
                  type="date"
                  id="fechaRecibido"
                  name="fechaRecibido"
                  placeholder="Fecha Recibido"
                  value={fechaRecibido}
                  onChange={(e) => setFechaRecibido(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorFechaRecibido && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorFechaRecibido}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some((campo) => campo.id === "monto") && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                  htmlFor="monto"
                >
                  Monto
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  placeholder="monto"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorValor && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorValor}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some((campo) => campo.id === "vigencia") && (
              <div className="mb-4">
                <label
                  htmlFor="vigencia"
                  className="block text-sm text-gray-700 font-bold mb-1 dark:text-gray-300"
                >
                  Vigencia
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="vigencia"
                    name="vigencia"
                    placeholder="Vigencia"
                    className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    value={vigencia}
                    onChange={(e) => setVigencia(e.target.value)}
                  />
                  <div className="ml-2 flex-shrink-0">
                    <select
                      className="bg-gray-200 text-gray-700 border border-gray-400 rounded-r-lg w-32 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
                      value={timeVigencia}
                      onChange={(e) => setTimeVigencia(e.target.value)}
                    >
                      <option value="">Seleccione...</option>
                      <option value="months">Meses</option>
                      <option value="years">Años</option>
                    </select>
                  </div>
                </div>
                {errorVigencia && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorVigencia}
                  </span>
                )}
              </div>
            )}

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some((campo) => campo.id === "estado") && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                  htmlFor="estado"
                >
                  Estado
                </label>
                <select
                  type="text"
                  id="estado"
                  name="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value="">Seleccione...</option>
                  <option value="Ejecución">Ejecución</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                {errorEstado && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorEstado}
                  </span>
                )}
              </div>
            )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                  htmlFor="numeroDictamen"
                >
                  Número de Dictamen
                </label>
                <input
                  type="text"
                  id="numeroDictamen"
                  name="numeroDictamen"
                  placeholder="Núm. de Dictamen"
                  value={numeroDictamen}
                  onChange={(e) => setNumeroDictamen(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errorNumeroDictamen && (
                  <span className="text-red-500 dark:text-red-400">
                    {errorNumeroDictamen}
                  </span>
                )}
              </div>

            {contractTypes
              .find((ct) => ct.nombre === tipoContrato)
              ?.camposRequeridos.some((campo) => campo.id === "subirPDF") && (
              <div className="mb-4">
                <label
                  htmlFor="subirPDF"
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                >
                  Subir PDF
                </label>
                <FileUploadInput />
              </div>
            )}

            <ConfirmationModal
              isOpen={showConfirmationModal}
              onClose={() => hideModalForConfirmation()}
              onConfirm={(e) => {
                hideModalForConfirmation();
                handleSubmit(e);
              }}
              title={
                isEditing
                  ? "¿Estás seguro que deseas actualizar este registro de contrato?"
                  : "¿Estás seguro que deseas crear un nuevo registro de contrato?"
              }
              message="Esta acción no se puede deshacer. ¿Deseas continuar?"
            />

            <div className="flex items-center justify-between">
              <p
                onClick={showModalForConfirmation}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {isEditing ? "Actualizar Registro" : "Crear Registro"}
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormularioContrato;
