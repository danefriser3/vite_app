import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { App } from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { TaskProvider } from "./context/TaskContext";

const Main = () => {
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

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
