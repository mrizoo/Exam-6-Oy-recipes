import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useActionData } from "react-router-dom";

import toast from "react-hot-toast";
import { useEffect } from "react";
import useGlobalContext from "./useGlobalContext";
function useLogin() {
  let { cretae } = useGlobalContext();

  let { dispetch } = cretae;
  let actionLogin = useActionData();

  useEffect(() => {
    if (actionLogin) {
      handleLogin();
    }
  }, [actionLogin]);
  let handleLogin = () => {
    if (actionLogin) {
      signInWithEmailAndPassword(auth, actionLogin.email, actionLogin.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispetch({ type: "LOG_IN", paylod: user });
          toast.success(`Welcome ${user.displayName}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        
        });
    }
  };
  return { handleLogin };
}

export default useLogin;
