import { Login } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { App } from "../App";
import Register from "./Register";
import { useAuth } from "../context/useAuth";

export const Main = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isAuthenticated ? <App /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};
