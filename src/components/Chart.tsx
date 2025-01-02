import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTaskContext } from "../context/TaskContext";
import { useEffect, useState } from "react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FFFFFF",
  "#000000",
];

const Chart = () => {
  const { columns, tasks } = useTaskContext();

  const [viewMode, setViewMode] = useState("category");

  const filteredData = columns.map((column) => ({
    name: column.name,
    value: tasks.filter((task) => task.status === column.name).length,
  }));

  const priorityCounts = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredDataPrio = Object.entries(priorityCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const [toShow, setToShow] = useState(filteredData);

  useEffect(() => {
    setToShow(
      viewMode === "category"
        ? columns.map((column) => ({
            name: column.name,
            value: tasks.filter((task) => task.status === column.name).length,
          }))
        : Object.entries(
            tasks.reduce((acc, task) => {
              acc[task.priority] = (acc[task.priority] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([name, value]) => ({
            name,
            value,
          }))
    );
  }, [viewMode, columns, tasks]);

  return (
    <div className="border border-gray-200 bg-gray-200 rounded-lg w-full md:w-1/4 flex flex-col justify-center min-h-36 h-fit p-2  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
      <h2 className="text-lg font-bold text-center p-2">Tasks Distribution</h2>
      <div className="flex justify-center text-sm">
        <button
          className={`bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 border-none rounded-r-none ${
            viewMode === "priority"
              ? "cursor-not-allowed !bg-gray-500 hover:bg-gray-500"
              : ""
          }`}
          disabled={viewMode === "priority"}
          onClick={() => {
            setViewMode("priority");
            setToShow(filteredDataPrio);
          }}
        >
          Priority
        </button>
        <button
          className={`bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-700 border-none rounded-l-none ${
            viewMode === "category"
              ? "cursor-not-allowed !bg-gray-500 hover:bg-gray-500"
              : ""
          }`}
          disabled={viewMode === "category"}
          onClick={() => {
            setViewMode("category");
            setToShow(filteredData);
          }}
        >
          Category
        </button>
      </div>
      {filteredData.length > 0 ? (
        <PieChart width={250} height={400} className="!w-full !h-[350px]">
          <Pie
            data={toShow}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => `${name} (${value})`}
          >
            {toShow.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            formatter={(value) => {
              const data = toShow.find((item) => item.name === value);
              return `${value} (${data?.value || 0})`;
            }}
          />
          <Tooltip />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500">No tasks to display.</p>
      )}
    </div>
  );
};

export default Chart;
