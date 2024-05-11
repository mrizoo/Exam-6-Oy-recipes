import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
function useCollection() {
  let [data, setData] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "dishes"), (snapshot) => {
      let dushes = [];
      snapshot.docs.forEach((doc) => {
        dushes.push({ ...doc.data(), ifF: doc.id });
      });
      setData(dushes);
    });
  }, []);
  return { data };
}

export default useCollection;
