import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, users } = useAuth();
  const [error, setError] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fullname ||
      !username ||
      !password ||
      users.some((user) => user.username === username)
    )
      setError(true);
    else {
      register(fullname, username, password);
      history("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-6  w-4/5 md:w-3/12 rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]"
      >
        <h2 className="text-lg font-bold mb-4 text-black">Register</h2>
        <div className="flex flex-col gap-2 text-white text-black1">
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            className={`w-full border rounded p-2 ${
              error ? "border-red-500 border-2" : ""
            }`}
          />
          {error && fullname === "" && (
            <p className="text-red-500 text-sm font-bold">
              * Full Name must not be empty
            </p>
          )}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`w-full border rounded p-2 ${
              error ? "border-red-500 border-2" : ""
            }`}
          />
          {error &&
            ((username !== "" && (
              <p className="text-red-500 text-sm font-bold">
                * Username already exists
              </p>
            )) ||
              (username === "" && (
                <p className="text-red-500 text-sm font-bold">
                  * Username must not be empty
                </p>
              )))}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full border rounded p-2 ${
              error ? "border-red-500 border-2" : ""
            }`}
          />
          {error && password === "" && (
            <p className="text-red-500 text-sm font-bold">
              * Password must not be empty
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
