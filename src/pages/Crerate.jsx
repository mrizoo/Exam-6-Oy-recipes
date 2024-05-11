import InputForm from "../components/InputForm";
import { Form, useActionData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect } from "react";
import { GlobalLoading, showLoading } from "react-global-loading";
export let action = async ({ request }) => {
  let formData = await request.formData();
  let name = formData.get("name");
  let description = formData.get("description");
  let Ingredients = formData.get("Ingredients");
  let image = formData.get("image");
  let time = formData.get("time");
  let method = formData.get("method");
  let newDish = { name, description, Ingredients, image, time, method };
  await addDoc(collection(db, "dishes"), newDish);

  return newDish;
};

function Crerate() {
  let navigate = useNavigate();
  let actionData = useActionData();
  const show = () => {
    showLoading(true);
  };
  useEffect(() => {
    if (actionData) {
      navigate("/");
      showLoading(false);
    } else {
    }
  }, [actionData]);
  return (
    <div className=" aligen-content flex flex-col w-full items-center  ">
      <h1 className=" mt-10 font-bold text-3xl">Dish create</h1>
      <Form method="post" className="flex flex-col w-full items-center gap-5 ">
        <InputForm name="name" label="Name" type="text" />
        <InputForm name="Ingredients" label="Resipe" type="text" />
        <InputForm name="image" label="Image" type="url" />
        <InputForm name="time" label="Time" type="number" />
        <label className=" w-full max-w-xs">
          <div className="">
            <span className="label-text">Method</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered textarea-sm  max-w-xs w-full"
          ></textarea>
        </label>
        <button onClick={show} className="btn btn-accent mb-5 w-80  ">
          Submit
        </button>
        <GlobalLoading />
      </Form>
    </div>
  );
}

export default Crerate;
