import { useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTaskContext } from "../context/useTaskContext";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { toggleTheme } = useTaskContext();
  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
        toggleTheme();
      }}
      className="bg-gray-500 p-2 text-sm text-white flex flex-row gap-2 rounded-full shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]"
    >
      {darkMode ? (
        <LightMode fontSize="small" />
      ) : (
        <DarkMode fontSize="small" />
      )}
    </button>
  );
};

export default ThemeToggle;
