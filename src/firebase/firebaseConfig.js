import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVch0BpkJ34z0c3wi7h_XmJCNnXL2DSG4",
  authDomain: "kitchen-78948.firebaseapp.com",
  projectId: "kitchen-78948",
  storageBucket: "kitchen-78948.appspot.com",
  messagingSenderId: "844648750263",
  appId: "1:844648750263:web:d5952b83b360f1ff54c132",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
