import { useContext } from "react";
import ValidationContext from "../context/ValidationProvider";

const useValidation = ()=>{
    return useContext(ValidationContext);
}
export default useValidation;