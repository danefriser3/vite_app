import { useEffect /* useState */ } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFields } from "../utils/types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: { username: "admin", password: "admin" },
  });
  const { login, isAuthenticated } = useAuth();

  const history = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      history("/");
    }
  }, [isAuthenticated, history]);

  const onSubmit: SubmitHandler<LoginFormFields> = async ({
    username,
    password,
  }: LoginFormFields) => {
    login(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-gray-600 p-6 rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)] w-4/5 md:w-3/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-lg font-bold mb-4 text-black">Login</h2>
        <div className="flex flex-col gap-2 text-white text-black1">
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 1,
                message: "Username must be at least 1 characters long",
              },
            })}
            className="w-full border rounded p-2"
          />
          {errors.username && (
            <p className="text-red-500 text-sm font-bold">
              {errors.username.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 1,
                message: "Password must be at least 1 characters long",
              },
            })}
            className="w-full border rounded p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-bold">
              {errors.password.message}
            </p>
          )}
          <u className="text-xs text-center">
            * Tip: for demo purpose, just use admin / admin
          </u>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            {isSubmitting ? "Please wait..." : "Login"}
          </button>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
