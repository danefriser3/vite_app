import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

const TaskDetailsDialog = () => {
  const { selectedTask, selectTask, updateTask } = useTaskContext();
  const { users } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
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
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      setAssignedUser(selectedTask.assignedUser!);
      setDueDate(selectedTask.dueDate);
      return;
    }
    setTitle("");
    setDescription("");
    setAssignedUser("");
    setPriority("");
    setDueDate("");
  }, [selectedTask]);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-2 py-1 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-2 py-1"
              rows={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "Low" | "Medium" | "High")
              }
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
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
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
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
            onClick={handleSave}
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
