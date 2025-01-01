import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { toggleTheme } = useTaskContext();
  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
        toggleTheme();
      }}
      className="bg-gray-500 text-sm text-white flex flex-row gap-2 rounded-md shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]"
    >
      {darkMode ? (
        <DarkMode fontSize="small" />
      ) : (
        <LightMode fontSize="small" />
      )}
    </button>
  );
};

export default ThemeToggle;
