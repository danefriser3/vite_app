import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "./TaskContext";

type AuthContextType = {
  users: User[];
  loggedUser: User | null;
  isAuthenticated: boolean;
  addUser: (user: {
    fullname: string;
    username: string;
    password: string;
  }) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (fullname: string, username: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getIsAuthenticated = () => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
    return false;
  };

  const getLoggedUser = () => {
    const storedAuth = localStorage.getItem("loggedUser");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
    return null;
  };

  const [loggedUser, setLoggedUser] = useState<User | null>(getLoggedUser());
  const [users, setUsers] = useState<User[]>(() => {
    const u = JSON.parse(localStorage.getItem("users") || "[]");
    if (u.length > 0) {
      return u;
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: "0",
            fullname: "Admin",
            username: "admin",
            password: "admin",
          },
        ])
      );
      return [
        {
          id: "0",
          fullname: "Admin",
          username: "admin",
          password: "admin",
        },
      ];
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated());

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("loggedUser", JSON.stringify(user));
      window.location.href = "/";
    }
  };
  const addUser = (user: {
    fullname: string;
    username: string;
    password: string;
  }) => {
    setUsers((prev) => [...prev, { ...user, id: prev.length.toString() }]);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoggedUser(null);
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
    localStorage.setItem("loggedUser", JSON.stringify(null));
  };

  const register = (fullname: string, username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ fullname, username, password });
    addUser({ fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        loggedUser,
        users,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
