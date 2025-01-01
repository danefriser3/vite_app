import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Check, Clear, Delete, MoreHoriz, Search } from "@mui/icons-material";

type TaskCardProps = {
  task: {
    id: string;
    title: string;
    priority: string;
    status: string;
    description: string;
    dueDate: string;
    completed: boolean;
    completedDate: string | null;
    assignedUser?: string;
  };
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { removeTask, selectTask, toggleTaskCompletion } = useTaskContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const getDueDateColor = (dueDate: string) => {
    if (!dueDate) return "text-gray-500";
    const today = new Date();
    const due = new Date(dueDate);

    if (due > today) {
      return "text-green-500";
    } else if (due.toDateString() === new Date().toDateString()) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "border-2 border-green-700";
      case "Medium":
        return "border-2 border-purple-700";
      case "High":
        return "border-2 border-red-700";
      default:
        return "text-gray-500";
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
      className={`task-card p-4 bg-white shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.2)] rounded-md flex flex-col overflow-hidden  ${getPriorityColor(
        task.priority
      )}`}
    >
      <div className={`flex flex-row items-center justify-between gap-2`}>
        <h3 className="text-black font-semibold break-words max-w-[80%]">
          {task.title}
        </h3>
        <div className="relative flex flex-row items-center gap-1">
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className={`text-black bg-transparent p-0`}
          >
            {task.completed ? (
              <Check
                fontSize="small"
                color={task.completed ? "success" : "error"}
              />
            ) : (
              <Clear
                fontSize="small"
                color={task.completed ? "success" : "error"}
              />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="text-black bg-transparent p-0"
          >
            <MoreHoriz fontSize="small" />
          </button>
          {menuOpen && (
            <div className="task-card-menu absolute right-0 top-6 bg-white shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.2)] border rounded-md z-50 w-40">
              <button
                onClick={() => {
                  selectTask(task);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-white text-sm text-black border-none hover:!bg-slate-100"
              >
                <Search fontSize="small" />
                <span className="ml-2">Edit Task</span>
              </button>
              <button
                onClick={() => {
                  removeTask(task.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 shadow-2xl bg-white text-sm text-red-500 border-none hover:!bg-slate-100"
              >
                <Delete fontSize="small" />
                <span className="ml-2">Delete Task</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500 my-2 max-h-24 overflow-auto break-words">
        {task.description}
      </p>
      <p className="text-sm text-gray-500 font-semibold my-2 max-h-24 overflow-auto break-words">
        {task.assignedUser}
      </p>
      <p className="text-sm text-gray-500 font-semibold">
        Priority: {task.priority}
      </p>
      <p
        className={`text-sm mt-2 font-semibold ${getDueDateColor(
          task.dueDate
        )}`}
      >
        {task.dueDate
          ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
          : "No due date"}
      </p>
      <p className={`text-sm mt-2 text-gray-500`}>
        {task.completedDate
          ? `Completed on: ${new Date(task.completedDate).toLocaleDateString()}`
          : ""}
      </p>
    </div>
  );
};

export default TaskCard;
