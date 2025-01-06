import TaskBoard from "./components/TaskBoard";
import ThemeToggle from "./components/ThemeToggle";
import { Logout } from "@mui/icons-material";
import { useAuth } from "./context/useAuth";

export const App = () => {
  const { logout, loggedUser } = useAuth();
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <header className="p-4 flex flex-row justify-between items-center border-b border-gray-200  shadow-[0px_1px_5px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <div className="flex flex-row gap-4 items-center">
          Hi, {loggedUser?.fullname}
          <button
            onClick={() => logout()}
            className="bg-blue-500 flex flex-row gap-2 items-center text-white py-1 px-2 rounded-full shadow-[0px_1px_5px_rgba(0,0,0,0.5)] md:rounded-md hover:bg-blue-700 border-none"
          >
            <Logout fontSize="small" />{" "}
            <span className="hidden w-full md:block">Logout</span>
          </button>
          <ThemeToggle />
        </div>
      </header>
      <div className=" p-4 flex flex-row gap-6 h-full overflow-auto">
        <TaskBoard />
      </div>
    </div>
  );
};
