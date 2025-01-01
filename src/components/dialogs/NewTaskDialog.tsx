import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { PlaylistAdd } from "@mui/icons-material";

const NewTaskDialog = () => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { columns, addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [status, setStatus] = useState(columns[0]?.name || "");
  const [dueDate, setDueDate] = useState("");

  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (isTaskDialogOpen) {
      setValidate(false);
      setDescription("");
      setTitle("");
      setPriority("Low");
      setDueDate("");
    }
  }, [isTaskDialogOpen]);

  const handleAddTask = () => {
    if (!(title.trim() && dueDate)) {
      setValidate(true);
      return;
    }
    addTask({
      id: Date.now().toString(),
      title,
      priority,
      status,
      description,
      dueDate,
      completed: false,
      completedDate: null,
    });
    setTitle("");
    setIsTaskDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsTaskDialogOpen(true)}
        disabled={columns.length === 0}
        className={`bg-green-500 text-white py-1 px-2 rounded-md  border-none rounded-r-none ${
          columns.length === 0 ? "cursor-not-allowed" : "hover:bg-green-700"
        }`}
      >
        <PlaylistAdd fontSize="small" /> Task
      </button>
      {isTaskDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-lg p-6 w-96 bg-gray-600">
            <h2 className="text-lg font-bold mb-4 text-black">Add New Task</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title..."
                className={`w-full border rounded p-2 ${
                  title === "" && validate ? "border-2 border-red-500" : ""
                }`}
              />
              {title === "" && validate && (
                <span className="text-xs text-red-700 font-bold">
                  * Add a title
                </span>
              )}
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description..."
                className="border rounded px-2 py-1"
              />
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "Low" | "Medium" | "High")
                }
                className="border rounded px-2 py-1 text-white"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded px-2 py-1 text-white"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full border rounded p-2  text-white ${
                  dueDate === "" && validate ? "border-2 border-red-500" : ""
                }`}
              />
              {dueDate === "" && validate && (
                <span className="text-xs text-red-700 font-bold">
                  * Please select a due date
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsTaskDialogOpen(false)}
                className="bg-gray-500 text-white  px-2 py-1 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white  px-2 py-1 rounded hover:bg-green-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewTaskDialog;
