import { Form, Link, useActionData } from "react-router-dom";
import InputForm from "../components/InputForm";
// import { AiOutlineGooglePlus } from "react-icons/ai";
// import { AiOutlineLogin } from "react-icons/ai";
import useLogin from "../hooks/useLogin";
export let actionLogin = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { password, email };
};
function Login() {
  let action = useActionData();

  let { handleLogin } = useLogin();
  return (
    <div className="place-content-center grid min-h-screen ">
      <div className=" p-10 pt-4  bg-blue-100 rounded-2xl w-96">
        <Form method="post">
          <InputForm label="Email" name="email" type="email" />
          <InputForm label="password" name="password" type="password" />
          <button
            onClick={handleLogin}
            className="btn btn-primary w-full mb-3 mt-3 font-semibold"
          >
            Login
          </button>
        </Form>
        <Link to="/singup" type="button" className="btn btn-secondary w-full">
          Singup
        </Link>
      </div>
    </div>
  );
}

export default Login;
