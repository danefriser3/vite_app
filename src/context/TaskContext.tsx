import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, ReactNode } from "react";
import { Column, Task } from "../utils/types";
import { TaskContext } from "./useTaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = () => {
    const storedData = localStorage.getItem("taskManagerData");
    return storedData
      ? JSON.parse(storedData)
      : {
          tasks: [],
          columns: [{ id: "backlog", name: "Backlog" }],
        };
  };
  const [state, setState] = useState<{
    tasks: Task[];
    columns: Column[];
    theme: "light" | "dark";
    selectedTask: Task | null;
  }>(() => ({ ...getInitialState(), selectedTask: null }));

  useEffect(() => {
    localStorage.setItem("taskManagerData", JSON.stringify(state));
    document.body.className = state.theme;
  }, [state]);

  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return new Promise(() =>
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        }))
      );
    },
  });

  const { mutate: addTask } = useMutation({
    mutationFn: (task: Task) => {
      return new Promise(() => {
        setState((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
      });
    },
  });

  const { mutate: removeTask } = useMutation({
    mutationFn: (id: string) => {
      return new Promise(() => {
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.filter((task) => task.id !== id),
        }));
      });
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: (updatedTask: Task) => {
      return new Promise(() => {
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }));
      });
    },
  });

  const { mutate: toggleTaskCompletion } = useMutation({
    mutationFn: (id: string) => {
      return new Promise(() =>
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedDate: task.completed
                    ? null
                    : new Date().toISOString(),
                }
              : task
          ),
        }))
      );
    },
  });

  const { mutate: addColumn } = useMutation({
    mutationFn: (name: string) => {
      return new Promise(() => {
        setState((prev) => ({
          ...prev,
          columns: [...prev.columns, { id: Date.now().toString(), name }],
        }));
      });
    },
  });

  const { mutate: removeColumn } = useMutation({
    mutationFn: (id: string) => {
      return new Promise(() => {
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
      });
    },
  });

  const { mutate: toggleTheme } = useMutation({
    mutationFn: () => {
      return new Promise(() => {
        setState((prev) => ({
          ...prev,
          theme: prev.theme === "light" ? "dark" : "light",
        }));
      });
    },
  });

  const { mutate: selectTask } = useMutation({
    mutationFn: (task: Task | null) => {
      return new Promise(() => {
        setState((prev) => ({
          ...prev,
          selectedTask: task,
        }));
      });
    },
  });

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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
