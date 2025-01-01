import { useTaskContext } from "../../context/TaskContext";

const TaskSummaryDialog = () => {
  const { tasks } = useTaskContext();

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
    )
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4 m-4 text-black bg-gray-300 rounded-lg h-fit">
      <h2 className="text-xl font-bold p-4">Task Summary</h2>
      <div className="p-4 ">
        <div>
          <h3 className="font-semibold text-lg">Completed Tasks</h3>
          <p>Total: {completedTasks.length}</p>
          <p>In Time: {completedInTime.length}</p>
          <p>Late: {completedLate.length}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Uncompleted Tasks</h3>
          <p>Total: {notCompletedTasks.length}</p>
          {mostUrgentTasks.length > 0 && (
            <div>
              <h4 className="font-semibold text-md">Most Urgent:</h4>
              <ul className="list-disc pl-6">
                {mostUrgentTasks.map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong> - Due:{" "}
                    {new Date(task.dueDate!).toLocaleDateString("it-IT")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryDialog;
