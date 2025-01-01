import { TaskProvider } from "./context/TaskContext";
import TaskBoard from "./components/TaskBoard";
import Chart from "./components/Chart";
import ThemeToggle from "./components/ThemeToggle";

export const App = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col h-screen">
        <header className="p-4 flex flex-row justify-between items-center border-b border-gray-200  shadow-[0px_1px_5px_rgba(0,0,0,0.5)]">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <ThemeToggle />
        </header>
        <div className=" p-4  flex flex-row gap-6 h-full">
          <TaskBoard />
          <Chart />
        </div>
      </div>
    </TaskProvider>
  );
};
