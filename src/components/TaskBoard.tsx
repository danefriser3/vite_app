import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import NewTaskDialog from "./dialogs/NewTaskDialog";
import NewColumnDialog from "./dialogs/NewColumnDialog";
import TaskDetailsDialog from "./dialogs/TaskDetailsDialog";
import {
  Check,
  Clear,
  Delete,
  Edit,
  List,
  Menu as MenuIcon,
  ViewColumn,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import TaskSummaryDialog from "./dialogs/TaskSummaryDialog";

const TaskBoard = () => {
  const {
    columns,
    tasks,
    removeColumn,
    updateTaskStatus,
    selectTask,
    removeTask,
    toggleTaskCompletion,
  } = useTaskContext();
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"columns" | "table">("columns");
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen((prev) => !prev);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status);
  };

  const toggleMenu = (columnId: string) => {
    setOpenMenu((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const handleDeleteColumn = (columnId: string) => {
    removeColumn(columnId);
    setOpenMenu((prev) => ({ ...prev, [columnId]: false }));
  };

  return (
    <div className="p-0 h-full w-2/3 border border-gray-200 rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
      <div className="flex flex-row justify-between gap-4 py-4 px-4 border-b border-gray-300">
        <div className="flex flex-row items-center rounded-md shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
          <NewTaskDialog />
          <NewColumnDialog />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row items-center rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <button
              title="View as Table"
              disabled={viewMode === "table" || open}
              onClick={() => setViewMode("table")}
              className={`bg-red-500 text-white py-1 px-2 rounded-lg border-none rounded-r-none ${
                columns.length === 0 ? "cursor-not-allowed" : "hover:bg-red-700"
              } ${
                viewMode === "table" || open
                  ? "cursor-not-allowed !bg-gray-500 hover:bg-gray-500"
                  : ""
              }`}
            >
              <List fontSize="small" />
            </button>
            <button
              title="View as Columns"
              disabled={viewMode === "columns" || open}
              onClick={() => setViewMode("columns")}
              className={`bg-purple-500 text-white py-1 px-2 hover:bg-purple-700 border-none rounded-lg rounded-l-none ${
                viewMode === "columns" || open
                  ? "cursor-not-allowed !bg-gray-500 hover:bg-gray-500"
                  : ""
              }`}
            >
              <ViewColumn fontSize="small" />
            </button>
          </div>
          <button
            onClick={toggleDialog}
            className="bg-yellow-600 text-white py-1 px-2 hover:bg-yellow-900 border-none rounded-lg"
          >
            {open ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}{" "}
            Task Summary
          </button>
        </div>
      </div>
      {open ? (
        <TaskSummaryDialog />
      ) : viewMode === "columns" ? (
        <div
          className="flex flex-row gap-4 overflow-x-auto p-2 h-full"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.name)}
              className="flex flex-col shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)] flex-shrink-0 w-[375px] h-[95%] overflow-auto bg-gray-300 rounded-lg pb-2 min-h-[200px]"
            >
              <div className="flex justify-between items-center border-b border-gray-600 py-2 px-2 min-h-[55px] relative">
                <h2 className="text-lg font-bold text-black">{column.name}</h2>
                {column.id !== "backlog" && (
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(column.id)}
                      className="p-0 text-black bg-transparent hover:bg-transparent"
                    >
                      <MenuIcon fontSize="small" />
                    </button>
                    {openMenu[column.id] && (
                      <div className="absolute right-0 mt-1 bg-white  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.2)] border rounded-md w-40 z-50">
                        <button
                          onClick={() => handleDeleteColumn(column.id)}
                          className="w-full flex flex-row gap-2 items-center text-left px-4 py-2 bg-white text-sm text-red-500 border-none hover:!bg-slate-100"
                        >
                          <Delete />
                          <span className="w-full text-black">
                            Delete Category
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2 py-2 px-2">
                {tasks
                  .filter((task) => task.status === column.name)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 overflow-auto h-full">
          <table className="table-auto w-full border-collapse border rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)] border-gray-300">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Priority
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Completed
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Completed Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Due Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-0"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex flex-row items-center gap-2">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`py-1 px-1 text-xs rounded-full ${
                          task.completed ? "bg-green-500" : "bg-gray-500"
                        } text-white`}
                      >
                        {task.completed ? (
                          <Check fontSize="small" />
                        ) : (
                          <Clear fontSize="small" />
                        )}
                      </button>
                      {task.completed ? "Completed" : "Incomplete"}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.completedDate
                      ? new Date().toLocaleDateString("it-IT")
                      : "Not completed"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("it-IT")
                      : "No due date"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex flex-row gap-0  rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
                      <button
                        onClick={() => selectTask(task)}
                        className="text-black hover:underline bg-yellow-200 rounded-r-none py-1 px-2"
                      >
                        <Edit fontSize="small" />
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-black hover:underline bg-red-400 rounded-l-none py-1 px-2"
                      >
                        <Delete fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <TaskDetailsDialog />
    </div>
  );
};

export default TaskBoard;
