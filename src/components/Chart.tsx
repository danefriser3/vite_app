import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTaskContext } from "../context/TaskContext";

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

  // Calcola i dati per la Pie Chart
  const taskCounts = columns.map((column) => ({
    name: column.name,
    value: tasks.filter((task) => task.status === column.name).length,
  }));

  // Filtra solo le colonne con task per la Pie
  const filteredData = taskCounts.filter((data) => data.value > 0);

  return (
    <div className="border border-gray-200 rounded-lg w-1/3 flex flex-col justify-center min-h-36 h-fit p-2  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
      <h2 className="text-lg font-bold text-center p-2">Tasks Distribution</h2>
      {filteredData.length > 0 ? (
        <PieChart width={500} height={400}>
          <Pie
            data={filteredData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => `${name} (${value})`}
          >
            {filteredData.map((_, index) => (
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
              const data = taskCounts.find((item) => item.name === value);
              return `${value} (${data?.value || 0})`; // Mostra task count nella legenda
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
