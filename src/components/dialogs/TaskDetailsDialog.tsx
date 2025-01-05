import { useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditTaskFormFields } from "../../utils/types";

const TaskDetailsDialog = () => {
  const { selectedTask, selectTask, updateTask } = useTaskContext();
  const { users } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTaskFormFields>({
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      priority: selectedTask?.priority || "",
      assignedUser: selectedTask?.assignedUser || "",
      dueDate: selectedTask?.dueDate || "",
    },
  });

  const handleSave: SubmitHandler<EditTaskFormFields> = ({
    title,
    description,
    priority,
    assignedUser,
    dueDate,
  }: EditTaskFormFields) => {
    updateTask({
      ...selectedTask,
      id: selectedTask!.id,
      status: selectedTask!.status,
      completed: selectedTask!.completed,
      title,
      description,
      priority,
      dueDate,
      createdBy: selectedTask!.createdBy,
      completedDate: selectedTask!.completedDate,
      assignedUser,
    });
    selectTask(null);
  };
  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority,
        assignedUser: selectedTask.assignedUser,
        dueDate: selectedTask.dueDate,
      });
      return;
    }
    reset({
      title: "",
      description: "",
      priority: "",
      assignedUser: "",
      dueDate: "",
    });
  }, [selectedTask, reset]);
  if (!selectedTask) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
      <div className=" bg-gray-600 rounded-lg shadow-lg p-6 md:1/3 w-4/5">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Task Title..."
              {...register("title", {
                required: "Task Title required",
              })}
              className="w-full border rounded px-2 py-1 "
            />
            {errors.title && (
              <p className="text-red-500 text-sm font-bold">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full border rounded px-2 py-1"
              rows={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              {...register("priority")}
              className="w-full border rounded px-2 py-1"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Assigned to</label>
            <select
              {...register("assignedUser")}
              className="w-full border rounded px-2 py-1"
            >
              {users.map((col) => (
                <option key={col.id} value={col.fullname}>
                  {col.fullname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => selectTask(null)}
            className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleSave)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsDialog;
