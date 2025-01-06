import { useEffect, useState } from "react";
import { PlaylistAdd } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewTaskFormFields } from "../../utils/types";
import { useAuth } from "../../context/useAuth";
import { useTaskContext } from "../../context/useTaskContext";

const NewTaskDialog = () => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { columns, addTask } = useTaskContext();
  const { users, loggedUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NewTaskFormFields>({
    defaultValues: {
      title: "",
      assignedUser: users[0].fullname,
      description: "",
      priority: "Low",
      status: columns[0]?.name || "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (!isTaskDialogOpen) {
      return;
    }
    reset({
      title: "",
      assignedUser: users[0].fullname,
      description: "",
      priority: "Low",
      status: columns[0]?.name || "",
      dueDate: "",
    });
  }, [isTaskDialogOpen, reset, columns, users]);

  const onAddTask: SubmitHandler<NewTaskFormFields> = ({
    title,
    assignedUser,
    description,
    priority,
    status,
    dueDate,
  }: NewTaskFormFields) => {
    if (!useTaskContext) {
      setError("dueDate", {
        message: "Please enter a due date",
      });
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
      assignedUser,
      createdBy: loggedUser?.fullname ?? "",
    });
    reset({
      title: "",
      assignedUser: users[0].fullname,
      description: "",
      priority: "Low",
      status: columns[0]?.name || "",
      dueDate: "",
    });
    setIsTaskDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsTaskDialogOpen(true)}
        disabled={columns.length === 0}
        className={`bg-green-500 flex flex-row text-white py-1 px-2 rounded-md  border-none rounded-r-none ${
          columns.length === 0 ? "cursor-not-allowed" : "hover:bg-green-700"
        }`}
      >
        <PlaylistAdd fontSize="small" /> Task
      </button>
      {isTaskDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-lg p-6  w-4/5 md:w-4/12 bg-gray-600  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <h2 className="text-lg font-bold mb-4 text-black">Add New Task</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                autoFocus
                {...register("title", {
                  required: "Task Title required",
                })}
                placeholder="Task Title..."
                className={`w-full border rounded text-black1 p-2 ${
                  errors.title ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.title && (
                <span className="text-xs text-red-700 font-bold">
                  * Add a title
                </span>
              )}

              <textarea
                {...register("description")}
                className="w-full border rounded text-black1 px-2 py-1"
                rows={5}
                placeholder="Task Description..."
              />
              <select
                {...register("priority")}
                className="border rounded text-black1 px-2 py-1 text-white"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <select
                {...register("status")}
                className="border rounded px-2 py-1 text-white"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
              <select
                {...register("assignedUser")}
                className="border rounded px-2 py-1 text-white"
              >
                {users.map((col) => (
                  <option key={col.id} value={col.fullname}>
                    {col.fullname}
                  </option>
                ))}
              </select>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Due Date required",
                })}
                className={`w-full border rounded p-2  text-white ${
                  errors.dueDate ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.dueDate && (
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
                onClick={handleSubmit(onAddTask)}
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
