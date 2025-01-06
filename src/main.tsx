import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { TaskProvider } from "./context/TaskContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./components/Main";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </TaskProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
