import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormFields } from "../utils/types";

const Register = () => {
  const {
    register: reg,
    handleSubmit: hs,
    setError: se,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    defaultValues: { fullname: "", username: "", password: "" },
  });

  const { register, users } = useAuth();
  const history = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormFields> = ({
    username,
    fullname,
    password,
  }: RegisterFormFields) => {
    if (
      !fullname ||
      !username ||
      !password ||
      users.some((user) => user.username === username)
    )
      se("username", {
        message: "Username already exists",
      });
    else {
      register(fullname, username, password);
      history("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={hs(onSubmit)}
        className="bg-gray-600 p-6  w-4/5 md:w-3/12 rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]"
      >
        <h2 className="text-lg font-bold mb-4 text-black">Register</h2>
        <div className="flex flex-col gap-2 text-white text-black1">
          <input
            type="text"
            {...reg("fullname", {
              required: {
                value: true,
                message: "Full Name is required",
              },
            })}
            placeholder="Full Name"
            className={`w-full border rounded p-2 ${
              errors.fullname ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm font-bold">
              {errors.fullname.message}
            </p>
          )}
          <input
            type="text"
            {...reg("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            placeholder="Username"
            className={`w-full border rounded p-2 ${
              errors.username ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm font-bold">
              {errors.username.message}
            </p>
          )}
          <input
            type="password"
            {...reg("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            placeholder="Password"
            className={`w-full border rounded p-2 ${
              errors.password ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-bold">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            Register
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
