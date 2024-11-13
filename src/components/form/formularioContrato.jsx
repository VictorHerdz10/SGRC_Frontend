import React, { useState, useEffect } from "react";
import FileUploadInput from "../others/fileupload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import ConfirmationModal from "../modals/confirmacionModal";
import useValidation from "../../hooks/useValidation";
import clienteAxios from "../../axios/axios";

const FormularioContrato = () => {
  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const[tipoDeContrato,setTipoDeContrato]=useState('');
  const[objetoDelContrato,setObjetoDelContrato]=useState('');
  const[entidad,setEntidad]=useState('');
  const[direccionEjecuta,setDireccionEjecuta]=useState('');
  const[aprobadoPorCC,setAprobadoPorCC]=useState('');
  const[firmado,setFirmado]=useState('');
  const[entregadoJuridica,setEntregadoJuridica]=useState('');
  const[fechaRecibido,setFechaRecibido]=useState('');
  const[valor,setValor]=useState('');
  const[vigencia,setVigencia]=useState('');
  const[estado,setEstado]=useState('');
  const[numeroDictamen,setNumeroDictamen]=useState('');
  const[timeVigencia,setTimeVigencia]=useState('');
  const[errorTipoDeContrato,setErrorTipoDeContrato]=useState('');
  const[errorObjetoDelContrato,setErrorObjetoDelContrato]=useState('');
  const[errorEntidad,setErrorEntidad]=useState('');
  const[errorDireccionEjecuta,setErrorDireccionEjecuta]=useState('');
  const[errorAprobadoPorCC,setErrorAprobadoPorCC]=useState('');
  const[errorFirmado,setErrorFirmado]=useState('');
  const[errorEntregadoJuridica,setErrorEntregadoJuridica]=useState('');
  const[errorFechaRecibido,setErrorFechaRecibido]=useState('');
  const[errorValor,setErrorValor]=useState('');
  const[errorVigencia,setErrorVigencia]=useState('');
  const[errorTimeVigencia,setErrorTimeVigencia]=useState('');
  const[errorEstado,setErrorEstado]=useState('');
  const[errorNumeroDictamen,setErrorNumeroDictamen]=useState('');
  let errores, errores1,
  errores2,errores3,errores4,errores5,errores6,
  errores7,errores8,errores9,errores10,errores11;
  const{validarInput,direcciones,entidades,file,obtenerRegistros,setFile,showForm,setShowForm,setSelectContrato,selectContrato,formatDate,setIsEditing,isEditing}=useValidation();

  const loadContractData = (contract) => {
    const [part1, part2] = contract.vigencia.split(' ');
    setTipoDeContrato(contract.tipoDeContrato);
    setObjetoDelContrato(contract.objetoDelContrato);
    setEntidad(contract.entidad);
    setDireccionEjecuta(contract.direccionEjecuta);
    setAprobadoPorCC(formatDate(contract.aprobadoPorCC));
    setFirmado(formatDate(contract.firmado));
    setEntregadoJuridica(formatDate(contract.entregadoJuridica));
    setFechaRecibido(formatDate(contract.fechaRecibido));
    setValor(contract.valor);
    setVigencia(part1);
    setEstado(contract.estado);
    setNumeroDictamen(contract.numeroDictamen);
    setTimeVigencia(part2);
  };
  useEffect(()=>{
    if (showForm) {
      loadContractData(selectContrato)
    }
  },[selectContrato])
  const showModalForConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const hideModalForConfirmation = () => {
    setShowConfirmationModal(false);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    errores = validarInput(tipoDeContrato,'text','');
    errores1 = validarInput(objetoDelContrato,'text','');
    errores2 = validarInput(entidad,'text','');
    errores3 = validarInput(direccionEjecuta,'text','');
    errores4 = validarInput(aprobadoPorCC,'date','');
    errores5 = validarInput(firmado,'date','');
    errores6 = validarInput(entregadoJuridica,'date','');
    errores7 = validarInput(fechaRecibido,'date','');
    errores8 =  validarInput(valor,'number','');
    errores9 = validarInput(vigencia,'number','');
    errores10 = validarInput(estado,'text','');
    errores11 = validarInput(numeroDictamen,'text','');
    setErrorTipoDeContrato(errores || '');
    setErrorObjetoDelContrato(errores1 || '');
    setErrorEntidad(errores2 || '');
    setErrorDireccionEjecuta(errores3 || '');
    setErrorAprobadoPorCC(errores4 || '');
    setErrorFirmado(errores5 || '');
    setErrorEntregadoJuridica(errores6 || '');
    setErrorFechaRecibido(errores7 || '');
    setErrorValor(errores8 || '');
    setErrorVigencia(errores9 || '');
    setErrorEstado(errores10 || '');
    setErrorNumeroDictamen(errores11 || '');
    if(timeVigencia===''){
      setErrorTimeVigencia('El campo tiempo de vigencia es requerido');
    }else{
      setErrorTimeVigencia('');
    }

    if(errores!=='' && 
      errores1!=='' &&
      errores2!=='' &&
      errores3!=='' &&
      errores4!=='' &&
      errores5!==''  &&
      errores6!=='' &&
      errores7!=='' &&
      errores8!=='' &&
      errores9!=='' &&
      errores10!=='' &&
      errores11!==''
    ){
      return;
    }
    let vigenciaReal = `${vigencia} ${timeVigencia}`;    const formData = new FormData();

        // Agregar los valores al FormData
        formData.append('tipoDeContrato', tipoDeContrato);
        formData.append('objetoDelContrato', objetoDelContrato);
        formData.append('entidad', entidad);
        formData.append('direccionEjecuta', direccionEjecuta);
        formData.append('aprobadoPorCC', aprobadoPorCC);
        formData.append('firmado', firmado);
        formData.append('entregadoJuridica', entregadoJuridica);
        formData.append('fechaRecibido', fechaRecibido);
        formData.append('valor', valor);
        formData.append('vigencia', vigenciaReal);
        formData.append('estado', estado);
        formData.append('numeroDictamen', numeroDictamen);
     // Agregar el archivo al FormData
     if (file) {
      formData.append('subirPDF', file);
  }
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    
  
  if(isEditing){
    const url = `contratos/actualizar-registro-contrato/${selectContrato._id}`
    const response =  await clienteAxios.put(url,formData,config);
    toast.success(response.data.msg)
    setTimeout(()=>{
      setTipoDeContrato('');
      setObjetoDelContrato('');
      setEntidad('');
      setDireccionEjecuta('');
      setAprobadoPorCC('');
      setFirmado('');
      setEntregadoJuridica('');
      setFechaRecibido('');
      setValor('');
      setVigencia('');
      setEstado('');
      setNumeroDictamen('');
      obtenerRegistros();
      setShowForm(false);
      setFile(null)
      setSelectContrato({});
      setIsEditing(false);
      ;},5000)

  }else {
  try {
    const url = '/contratos';
    const response = await clienteAxios.post(url, formData, config);
    
    toast.success(response.data.msg)
    setTimeout(()=>{
    setTipoDeContrato('');
    setObjetoDelContrato('');
    setEntidad('');
    setDireccionEjecuta('');
    setAprobadoPorCC('');
    setFirmado('');
    setEntregadoJuridica('');
    setFechaRecibido('');
    setValor('');
    setVigencia('');
    setEstado('');
    setNumeroDictamen('');
    obtenerRegistros();
    setShowForm(false);
    setFile(null);
    ;},5000)
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.msg)
    
  }}
} catch (error) {
  toast.error(error.response.data.msg)
}
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
        Gestion los Registros{" "}
      </h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => {setShowForm(!showForm)
          setTipoDeContrato('');
    setObjetoDelContrato('');
    setEntidad('');
    setDireccionEjecuta('');
    setAprobadoPorCC('');
    setFirmado('');
    setEntregadoJuridica('');
    setFechaRecibido('');
    setValor('');
    setVigencia('');
    setEstado('');
    setNumeroDictamen('');
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
            className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-white shadow-xl rounded px-6 pt-6 pb-8 mb-4"
          >
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center mx-auto">
              {isEditing ? 'Actualizando registro de contrato' : 'Registra un nuevo Contrato'}
            </h2>

            

            <div className="mb-4">
              <label
                htmlFor="tipo_contrato"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Tipo de Contrato
              </label>
              <input
                type="text"
                id="tipo_contrato"
                name="tipo_contrato"
                placeholder="Tipo de Contrato"
                value={tipoDeContrato}
                onChange={e=>setTipoDeContrato(e.target.value)}    
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorTipoDeContrato && (
                          <span className="text-red-500">{errorTipoDeContrato}</span>
                        )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="objeto_contrato"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Objeto del Contrato
              </label>
              <textarea
                id="objeto_contrato"
                name="objeto_contrato"
                rows={3}
                placeholder="Objeto del Contrato"
                value={objetoDelContrato}
                onChange={e=>setObjetoDelContrato(e.target.value)}
        
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorObjetoDelContrato && (
                          <span className="text-red-500">{errorObjetoDelContrato}</span>
                        )}
             
            </div>

            <div className="mb-4">
              <label
                htmlFor="entidad"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Entidad
              </label>
              <select
                id="entidad"
                name="entidad"
                placeholder="Entidad"
                value={entidad}
                onChange={e=>setEntidad(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option  value=" ">Seleccione...</option>
                {entidades.map((entidad)=>(
                <option key={entidad._id} value={entidad.entidad}>{entidad.entidad}</option>
                  
                ))}
              </select>
              {errorEntidad && (
                <span className="text-red-500">{errorEntidad}</span>
                )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="direccionEjecutiva"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Dirección Ejecutiva
              </label>
              <select
                id="direccionEjecutiva"
                name="direccionEjecutiva"
                placeholder="Dirección que lo Ejecuta"
                value={direccionEjecuta}
                onChange={e=>setDireccionEjecuta(e.target.value)}
                
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option  value="">Seleccione...</option>
                {direcciones.map((direccion)=>(
                <option key={direccion._id} value={direccion.direccionEjecutiva}>{direccion.direccionEjecutiva}</option>
                  
                ))}
              </select>
              {errorDireccionEjecuta && (
                          <span className="text-red-500">{errorDireccionEjecuta}</span>
                        )}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="aprovadorCC"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Aprobador por el CC
              </label>
              <input
                type="date"
                id="aprovadorCC"
                name="aprovadorCC"
                placeholder="Aprobador por el CC"
                value={aprobadoPorCC}
                onChange={e=>setAprobadoPorCC(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorAprobadoPorCC && (
                          <span className="text-red-500">{errorAprobadoPorCC}</span>
                        )}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="firmado"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Fecha Firmada
              </label>
              <input
                type="date"
                id="firmado"
                name="firmado"
                placeholder="Fecha Firmada"
                value={firmado}
                onChange={e=>setFirmado(e.target.value)}

                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorFirmado && (
                          <span className="text-red-500">{errorFirmado}</span>
                        )}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="entregadoJuridica"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Entregado Jurídica
              </label>
              <input
                type="date"
                id="entregadoJuridica"
                name="entregadoJuridica"
                placeholder="Entregado Jurídica"
                value={entregadoJuridica}
                onChange={e=>setEntregadoJuridica(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorEntregadoJuridica && (
                <span className="text-red-500">{errorEntregadoJuridica}</span>
              )}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="fechaRecibido"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Fecha Recibido
              </label>
              <input
                type="date"
                id="fechaRecibido"
                name="fechaRecibido"
                placeholder="Fecha Recibido"
                value={fechaRecibido}
                onChange={e=>setFechaRecibido(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorFechaRecibido && (<span className="text-red-500">{errorFechaRecibido}</span>)}
              
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="valor"
              >
                Valor
              </label>
              <input
                type="number"
                id="valor"
                name="valor"
                placeholder="Valor"
                value={valor}
                onChange={e=>setValor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorValor && (<span className="text-red-500">{errorValor}</span>)}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="vigencia"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vigencia
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="vigencia"
                  name="vigencia"
                  placeholder="Vigencia"
                  className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vigencia}
                  onChange={e=>setVigencia(e.target.value)}
                  
                />
                <div className="ml-2 flex-shrink-0">
                  <select
                    className="bg-gray-200 text-gray-700 border border-gray-400 rounded-r-lg w-32 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  value={timeVigencia}
                  onChange={e=>setTimeVigencia(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="months">Meses</option>
                    <option value="years">Años</option>
                  </select>
                </div>
                
              </div>
              {errorVigencia && (<span className="text-red-500">{errorVigencia}</span>)}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estado"
              >
                Estado
              </label>
              <select
                type="text"
                id="estado"
                name="estado"
                value={estado}
                onChange={e=>setEstado(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Seleccione...</option>
                <option value="Ejecución">Ejecución</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              {errorEstado && (<span className="text-red-500">{errorEstado}</span>)}
              
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
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
                onChange={e=>setNumeroDictamen(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorNumeroDictamen && (<span className="text-red-500">{errorNumeroDictamen}</span>)}
              
            </div>

            <div className="mb-4">
              <label
                htmlFor="subirPDF"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Subir PDF
              </label>
              <FileUploadInput />
            </div>
            <ConfirmationModal
              isOpen={showConfirmationModal}
              onClose={() => hideModalForConfirmation()}
              onConfirm={(e) => {
                hideModalForConfirmation();
                  handleSubmit(e);
              }}
              title={ isEditing ? '¿Estas  seguro que deseas actualizar este registro de contrato?' :"¿Estas  seguro que deseas crear un nuevo registro de contrato?"}
              message="Esta acción no se puede deshacer. ¿Deseas continuar?"
            />
            <div className="flex items-center justify-between">
              <p
                onClick={showModalForConfirmation}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
              >
                {isEditing ? 'Actualizar Registro':  'Crear Registro'}
              </p>
            </div>
          </form>
        </div>
      )}
      
    </>
  );
};

export default FormularioContrato;
