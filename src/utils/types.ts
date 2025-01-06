export type TaskCardProps = {
  task: {
    id: string;
    title: string;
    priority: string;
    status: string;
    description: string;
    dueDate: string;
    completed: boolean;
    completedDate: string | null;
    assignedUser?: string;
    createdBy: string;
  };
};

export type NewColumnFormFields = {
  columnName: string;
};

export type RegisterFormFields = {
  fullname: string;
  username: string;
  password: string;
};

export type LoginFormFields = {
  username: string;
  password: string;
};

export type NewTaskFormFields = {
  title: string;
  assignedUser: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  dueDate: string;
};

export type EditTaskFormFields = {
  title: string;
  description: string;
  priority: string;
  assignedUser: string;
  dueDate: string;
};

export type AuthContextType = {
  users: User[];
  loggedUser: User | null;
  isAuthenticated: boolean;
  addUser: (user: {
    fullname: string;
    username: string;
    password: string;
  }) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (fullname: string, username: string, password: string) => void;
};

export type Task = {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High" | string;
  status: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedDate: string | null;
  assignedUser?: string;
  createdBy: string;
};

export type Column = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  fullname?: string;
  username?: string;
  password: string;
};

export type TaskContextType = {
  tasks: Task[];
  columns: Column[];
  theme: "light" | "dark";
  selectedTask: Task | null;
  updateTaskStatus: ({ id, status }: { id: string; status: string }) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  addColumn: (name: string) => void;
  removeColumn: (id: string) => void;
  toggleTheme: () => void;
  selectTask: (task: Task | null) => void;
  updateTask: (updatedTask: Task) => void;
  toggleTaskCompletion: (id: string) => void;
};
