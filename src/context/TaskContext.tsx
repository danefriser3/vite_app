import React, { createContext, useState, useEffect, ReactNode } from "react";

export type Task = {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High" | string;
  status: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedDate: string | null;
  assignedUser?: string;
};

export type Column = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export type TaskContextType = {
  tasks: Task[];
  columns: Column[];
  theme: "light" | "dark";
  selectedTask: Task | null;
  users: User[];
  updateTaskStatus: (id: string, status: string) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  addColumn: (name: string) => void;
  removeColumn: (id: string) => void;
  toggleTheme: () => void;
  selectTask: (task: Task | null) => void;
  updateTask: (updatedTask: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  assignUserToTask: (taskId: string, userId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = () => {
    const storedData = localStorage.getItem("taskManagerData");
    return storedData
      ? JSON.parse(storedData)
      : {
          tasks: [],
          columns: [{ id: "backlog", name: "Backlog" }],
          users: [
            { id: "1", name: "John Doe" },
            { id: "2", name: "Daniele Parisi" },
          ],
        };
  };

  const [state, setState] = useState<{
    tasks: Task[];
    columns: Column[];
    theme: "light" | "dark";
    selectedTask: Task | null;
    users: User[];
  }>(() => ({ ...getInitialState(), selectedTask: null }));

  useEffect(() => {
    localStorage.setItem("taskManagerData", JSON.stringify(state));
    document.body.className = state.theme;
  }, [state]);

  const updateTaskStatus = (id: string, status: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    }));
  };

  const addTask = (task: Task) => {
    setState((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
  };

  const removeTask = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  };

  const updateTask = (updatedTask: Task) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  };

  const toggleTaskCompletion = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedDate: task.completed ? null : new Date().toISOString(),
            }
          : task
      ),
    }));
  };

  const addColumn = (name: string) => {
    setState((prev) => ({
      ...prev,
      columns: [...prev.columns, { id: Date.now().toString(), name }],
    }));
  };

  const removeColumn = (id: string) => {
    if (id === "backlog") return;

    const colname = state.columns.find((col) => col.id === id)?.name;
    const tasksToMove = state.tasks.map((task) => ({
      ...task,
      status: task.status === colname ? "Backlog" : task.status,
    }));

    setState((prev) => ({
      ...prev,
      columns: prev.columns.filter((col) => col.id !== id),
      tasks: tasksToMove,
    }));
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const selectTask = (task: Task | null) => {
    setState((prev) => ({
      ...prev,
      selectedTask: task,
    }));
  };

  const assignUserToTask = (taskId: string, userId: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, assignedUser: userId } : task
      ),
    }));
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        updateTaskStatus,
        addTask,
        removeTask,
        addColumn,
        removeColumn,
        toggleTheme,
        selectTask,
        updateTask,
        toggleTaskCompletion,
        assignUserToTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
