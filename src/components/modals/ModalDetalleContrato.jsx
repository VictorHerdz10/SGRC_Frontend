import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTimes, FaFilePdf, FaFileAlt, FaCalendarAlt, 
  FaMoneyBillWave, FaReceipt, FaChevronDown, 
  FaChevronUp, FaChartLine, FaClock, FaBuilding,
  FaFileContract, FaPercentage, FaExpand
} from "react-icons/fa";
import { GiDuration, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useState, useEffect } from "react";

export const ModalDetalleContrato = ({ contrato, onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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

    if (vigencia.startsWith("1 ")) {
      newValue = newValue.replace("meses", "mes").replace("años", "año");
    }

    return newValue;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  // Ajustes responsivos
  const maxWidth = windowSize.width > 768 ? 'max-w-xl' : 'max-w-md';
  const textSize = windowSize.width > 768 ? 'text-base' : 'text-sm';

  // Formateadores
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('es-ES') : 'No especificado';
  const formatMoney = (amount) => amount ? `$${new Intl.NumberFormat('es-ES').format(amount)}` : 'No especificado';

  // Secciones colapsables
  const sections = [
    {
      id: 'financiera',
      title: 'Información Financiera',
      icon: <FaChartLine className="text-blue-400" />,
      content: (
        <div className="space-y-3">
          <InfoRow icon={<GiPayMoney />} label="Valor Principal" value={formatMoney(contrato.valorPrincipal)} />
          <InfoRow icon={<GiReceiveMoney />} label="Disponible" value={formatMoney(contrato.valorDisponible)} />
          <InfoRow icon={<FaMoneyBillWave />} label="Gastado" value={formatMoney(contrato.valorGastado)} />
          
          {contrato.factura?.length > 0 && (
            <div className="mt-3 border-t pt-3 border-gray-200 dark:border-gray-600">
              <h5 className="font-medium flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <FaReceipt className="mr-2 text-green-400" /> Facturas
              </h5>
              {contrato.factura.map((fact, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-4 mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg dark:text-white"
                >
                  <InfoRow small label="N° Dictamen" value={fact.numeroDictamen} />
                  <InfoRow small label="Monto" value={formatMoney(fact.monto)} />
                  {fact.montoSuplement && <InfoRow small label="Suplemento" value={formatMoney(fact.montoSuplement)} />}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'fechas',
      title: 'Fechas Clave',
      icon: <FaClock className="text-purple-400" />,
      content: (
        <div className="space-y-3">
          <InfoRow icon={<FaCalendarAlt />} label="Creación" value={formatDate(contrato.info?.fechaDeCreacion)} />
          <InfoRow icon={<FaCalendarAlt />} label="Vencimiento" value={formatDate(contrato.fechaVencimiento)} />
          <InfoRow icon={<FaCalendarAlt />} label="Aprobado por CC" value={formatDate(contrato.aprobadoPorCC)} />
          <InfoRow icon={<FaCalendarAlt />} label="Firmado" value={formatDate(contrato.firmado)} />
          <InfoRow icon={<FaCalendarAlt />} label="Entregado a Jurídica" value={formatDate(contrato.entregadoJuridica)} />
        </div>
      )
    },
    {
      id: 'general',
      title: 'Información General',
      icon: <FaFileContract className="text-green-400" />,
      content: (
        <div className="space-y-3">
          <InfoRow icon={<FaBuilding />} label="Entidad" value={contrato.entidad} />
          <InfoRow icon={<FaBuilding />} label="Dirección Ejecutora" value={contrato.direccionEjecuta} />
          <InfoRow longText icon={<FaFileAlt />} label="Objeto del Contrato" value={contrato.objetoDelContrato} />
          <InfoRow icon={<FaPercentage />} label="Vigencia" value={parcearVigencia(contrato.vigencia)} />
          <InfoRow icon={<FaFileAlt />} label="Estado" value={
            <span className={`px-2 py-1 rounded-full text-xs ${
              contrato.estado === 'Ejecución' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {contrato.estado || 'No especificado'}
            </span>
          } />
        </div>
      )
    },
    {
      id: 'suplementos',
      title: 'Suplementos',
      icon: <GiDuration className="text-orange-400" />,
      content: (
        <div className="space-y-3">
          <InfoRow label="Tiene Suplemento" value={contrato.isGotSupplement ? 'Sí' : 'No'} />
          
          {contrato.supplement?.length > 0 && (
            <div className="space-y-2">
              {contrato.supplement.map((sup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <InfoRow small label="Nombre" value={sup.nombre} />
                  <InfoRow small label="Monto Original" value={formatMoney(sup.montoOriginal)} />
                  <InfoRow small label="Monto Suplemento" value={formatMoney(sup.monto)} />
                  <InfoRow small label="Duración" value={`${sup.tiempo.years}a ${sup.tiempo.months}m ${sup.tiempo.days}d`} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col border dark:border-gray-700`}
        >
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{contrato.tipoDeContrato}</h3>
                <p className="text-sm opacity-90">N° {contrato.numeroDictamen}</p>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Contenido */}
          <div className="overflow-y-auto p-4 flex-1">
            {sections.map((section) => (
              <motion.div 
                key={section.id}
                className="mb-3 overflow-hidden mx-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.button
                  whileHover={{ x: 3, backgroundColor: 'rgba(0,0,0,0.05)' }}
                  whileTap={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/80 rounded-lg hover:dark:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-2">{section.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{section.title}</span>
                  </div>
                  {activeSection === section.id ? 
                    <FaChevronUp className="text-gray-600 dark:text-gray-300" /> : 
                    <FaChevronDown className="text-gray-600 dark:text-gray-300" />}
                </motion.button>

                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 pl-2"
                    >
                      <div className={`${textSize} space-y-2`}>
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Documento PDF (siempre visible) */}
            {contrato.subirPDF && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 rounded-lg flex items-center"
              >
                <FaFilePdf className="text-red-500 mr-3 text-xl" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">Documento PDF</p>
                  <a 
                    href={contrato.subirPDF} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center"
                  >
                    <FaExpand className="mr-1" /> Ver documento completo
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Pie del modal */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Cerrar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InfoRow = ({ icon, label, value, small = false, longText = false }) => {
  if (!value || value === 'No especificado') return null;

  return (
    <motion.div 
      whileHover={{ x: 3 }}
      className={`
        flex ${small ? 'text-sm' : ''} 
        ${longText ? 'flex-col' : 'items-baseline'} 
        my-2 px-3 py-1
        overflow-hidden
      `}
    >
      <div className="flex items-start min-w-[120px] max-w-[40%]">
        {icon && <span className="mr-2 flex-shrink-0 text-gray-600 dark:text-gray-400">{icon}</span>}
        <span className="font-medium text-gray-600 dark:text-gray-400 truncate">
          {label}:
        </span>
      </div>
      
      {longText ? (
        <p className="font-normal mt-1 break-words text-gray-800 dark:text-gray-200">
          {value}
        </p>
      ) : (
        <span className="font-medium text-gray-800 dark:text-gray-200 break-words flex-1 ml-2">
          {value}
        </span>
      )}
    </motion.div>
  );
};