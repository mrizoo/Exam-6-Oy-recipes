import React, { useContext } from "react";
import { GlobalContext } from "../context/useGlobal";

function useGlobalContext() {
  let cretae = useContext(GlobalContext);
  
  return { cretae };
}

export default useGlobalContext;
