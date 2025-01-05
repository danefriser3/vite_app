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
