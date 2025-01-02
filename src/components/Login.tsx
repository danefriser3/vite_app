import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const history = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      history("/");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-6 rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)] w-4/5 md:w-3/12"
      >
        <h2 className="text-lg font-bold mb-4 text-black">Login</h2>
        <div className="flex flex-col gap-2 text-white text-black1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            Login
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
