import { IoClose } from "react-icons/io5";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";
import clienteAxios from "../../axios/axios";
import {useState} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ValidationModal = () =>{
  const navigate = useNavigate();
    const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
    const validateCode = (value) => {
        setCode(value);
        setIsValidCode(value.length === 8 && /^\d+$/.test(value));
      };
      const handleSubmitValidate = async(e)=>{
        e.preventDefault();
        if(!isValidCode){
          return
          }
          try {
            const response = await clienteAxios(`usuario/olvide-password/${code}`);
            
            toast.success(response.data.msg)
            
            setTimeout(()=>{
              navigate(`/auth/change-pass/${code}`)

            },500)
          } catch (error) {
            toast.error(error.response.data.msg)
            
          }
          
      }
    
    
    
    return(
      <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form noValidate onSubmit={handleSubmitValidate}>
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
        
        <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
        <p className="text-gray-600 mb-4">Please enter the 8-digit code sent to your email</p>
        <div className="relative mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => validateCode(e.target.value)}
            maxLength={8}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isValidCode ? "border-green-500 focus:ring-green-200" : "border-gray-300 focus:ring-blue-200"}`}
            placeholder="Enter 8-digit code"
            aria-label="Verification code"
          />
          {code && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValidCode ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
            </div>
          )}
          
        </div>
        <button
        type="submit"
          disabled={!isValidCode}
          className={`w-full py-2 rounded-lg transition-colors ${isValidCode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
        >
          Verify Code
        </button>
      </div>
      </form>
    </div>
    
    </>
  );


}
export default ValidationModal;
  /**/