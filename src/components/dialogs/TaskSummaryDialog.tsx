import { Check, Delete, FiberManualRecord, Search } from "@mui/icons-material";
import { useTaskContext } from "../../context/TaskContext";

const TaskSummaryDialog = () => {
  const { tasks, selectTask, toggleTaskCompletion, removeTask } =
    useTaskContext();

  const getDueDateColor = (dueDate: string) => {
    if (!dueDate) return "inherit";
    const today = new Date();
    const due = new Date(dueDate);

    if (due > today) {
      return "success";
    } else if (due.toDateString() === new Date().toDateString()) {
      return "warning";
    } else {
      return "error";
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  const completedInTime = completedTasks.filter(
    (task) =>
      task.dueDate &&
      task.completedDate &&
      new Date(task.completedDate) <= new Date(task.dueDate)
  );

  const completedLate = completedTasks.filter(
    (task) =>
      task.dueDate &&
      task.completedDate &&
      new Date(task.completedDate) > new Date(task.dueDate)
  );

  const mostUrgentTasks = notCompletedTasks
    .filter((task) => task.dueDate)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  return (
    <div className="flex flex-col gap-4 m-4 text-black bg-gray-300 rounded-lg h-fit shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
      <h2 className="text-xl font-bold px-4 py-2">Tasks Stats</h2>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4 p-4  bg-gray-200  rounded-lg w-1/2  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <h3 className="font-semibold text-lg">Total Tasks</h3>
            <hr className="!border-gray-500" />
            <div>
              <p>Total: {tasks.length}</p>
              <div className="flex flex-row gap-4">
                <p>
                  <FiberManualRecord fontSize="small" color="success" /> Low:{" "}
                  {tasks.filter((t) => t.priority === "Low").length}
                </p>
                <p>
                  <FiberManualRecord fontSize="small" color="warning" /> Medium:{" "}
                  {tasks.filter((t) => t.priority === "Medium").length}
                </p>
                <p>
                  <FiberManualRecord fontSize="small" color="error" /> High:{" "}
                  {tasks.filter((t) => t.priority === "High").length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4  bg-gray-200  rounded-lg w-1/2  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <h3 className="font-semibold text-lg">Completed Tasks</h3>
            <hr className="!border-gray-500" />
            <div>
              <p>Total: {completedTasks.length}</p>
              <div className="flex flex-row gap-4">
                <p>
                  <FiberManualRecord fontSize="small" color="success" /> On
                  Time: {completedInTime.length}
                </p>
                <p>
                  <FiberManualRecord fontSize="small" color="error" /> Late:{" "}
                  {completedLate.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <h3 className="font-semibold text-lg">Uncompleted Tasks</h3>
          {mostUrgentTasks.length > 0 && (
            <div className="overflow-x-auto rounded-lg  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
              <table className="table-auto w-full border-collapse border rounded-lg  border-gray-400 bg-gray-400">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Task Title</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Priority</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-right w-0" />
                  </tr>
                </thead>
                <tbody>
                  {mostUrgentTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-4 py-2">{task.title}</td>
                      <td className="px-4 py-2">
                        <FiberManualRecord
                          fontSize="small"
                          color={getDueDateColor(task.dueDate)}
                        />{" "}
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("it-IT")
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2">{task.priority}</td>
                      <td className="px-4 py-2">{task.status}</td>
                      <td className="px-2 py-1 ">
                        <div className="flex flex-row gap-0 text-right rounded-lg shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
                          <button
                            className="px-2 py-1 flex flex-row items-center gap-1 text-white bg-green-700 rounded-r-none"
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            <Check fontSize="small" />
                          </button>
                          <button
                            className="px-2 py-1 flex flex-row items-center gap-1 text-white bg-blue-700 rounded-none"
                            onClick={() => selectTask(task)}
                          >
                            <Search fontSize="small" />
                          </button>
                          <button
                            className="px-2 py-1 flex flex-row items-center gap-1 text-white bg-red-700 rounded-l-none"
                            onClick={() => removeTask(task.id)}
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
          {notCompletedTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks to display.</p>
          ) : (
            <p className="text-right">Total: {notCompletedTasks.length}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryDialog;
