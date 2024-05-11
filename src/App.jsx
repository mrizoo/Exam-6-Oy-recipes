import React from "react";
import { About, Contact, Crerate, Home, Login, Singup } from "./pages";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProucterRouter from "./components/ProucterRouter";
import useGlobalContext from "./hooks/useGlobalContext";
import { useEffect } from "react";
//action
import { action as actionSingup } from "./pages/Singup";
import { actionLogin as actionLogin } from "./pages/Login";
import { action as actionCreate } from "./pages/Crerate";

//furebases
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
import SingleDish from "./pages/SingleDish";

function App() {
  let { cretae } = useGlobalContext();
  let { user, dispetch, authReady } = cretae;
  localStorage.getItem(user) ? JSON.parse(localStorage.getItem(user)) : null;
  let routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProucterRouter user={user}>
          <MainLayout />
        </ProucterRouter>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          // loader :
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/create",
          element: <Crerate />,
          action: actionCreate,
        },
        {
          path: "/about",
          element: <About />,
        },
        { path: "/dish/:name", element: <SingleDish /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: actionLogin,
    },
    {
      path: "/singup",
      element: user ? <Navigate to="/" /> : <Singup />,
      action: actionSingup,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispetch({ type: "LOG_IN", paylod: user });
      dispetch({ type: "AUTH_READY" });
    });
  }, []);
  return <>{authReady && <RouterProvider router={routers} />}</>;
}

export default App;
