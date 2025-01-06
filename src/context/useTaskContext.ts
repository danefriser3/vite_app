import React, { createContext } from "react";
import { TaskContextType } from "../utils/types";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
