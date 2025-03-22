import { useState } from "react";
import useValidation from "../../hooks/useValidation";

const ContractTypeSelector = ({ contractTypes }) => {
  const {tipoContrato, setTipoContrato} = useValidation();
  const [showAll, setShowAll] = useState(false); // Controla si se muestran todas las opciones

  const handleTipoContratoChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "ver-mas") {
      // Si se selecciona "Ver más...", mostrar todas las opciones
      setShowAll(true);
      setTipoContrato(""); // Reiniciar la selección
    } else {
      setTipoContrato(selectedValue);
    }
  };

  // Limitar a 5 opciones iniciales
  const visibleOptions = showAll ? contractTypes : contractTypes.slice(0, 5);

  return (
    <div className="mb-6">
      <label
        htmlFor="tipoContrato"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Selecciona el tipo de contrato:
      </label>
      <select
        id="tipoContrato"
        name="tipoContrato"
        value={tipoContrato}
        onChange={handleTipoContratoChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      >
        {/* Opción por defecto */}
        <option value="">Seleccione un tipo de contrato...</option>

        {/* Mapear contractTypes para generar las opciones dinámicamente */}
        {visibleOptions.map((contract) => (
          <option key={contract._id} value={contract.nombre}>
            {contract.nombre}
          </option>
        ))}

        {/* Opción "Ver más..." */}
        {!showAll && contractTypes.length > 5 && (
          <option value="ver-mas">Ver más...</option>
        )}
      </select>
    </div>
  );
};

export default ContractTypeSelector;