import React, { useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useActionData } from "react-router-dom";
// import { action } from "../pages/Singup";
import toast from "react-hot-toast";
import useGlobalContext from "./useGlobalContext";

function useSingup() {
  let { cretae } = useGlobalContext();
  let action = useActionData();
  useEffect(() => {
    if (action) {
      handleSubmit();
    }
  }, [action]);
  let handleSingOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  let { dispetch } = cretae;
  const provider = new GoogleAuthProvider();
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispetch({ type: "LOG_IN", paylod: user });
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        toast.error(errorMessage);

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  let handleSubmit = () => {
    if (action) {
      createUserWithEmailAndPassword(auth, action.email, action.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: action.name,
            photoURL: action.url,
          });
          dispetch({ type: "LOG_IN", paylod: user });
          toast.success(`Welcome ${user.displayName}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);

          // ..
        });
    }
  };

  let handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return { handleGoogle, handleSubmit, handleSingOut, handleLogin };
}

export default useSingup;
