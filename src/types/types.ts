// TypeScript declarations for TodoContextProps
export interface TodoContextProps {
  children: React.ReactNode;
}
// TypeScript declarations for TaskType
export type TaskType = {
  id: string;
  task: string;
  completed?: boolean;
};
// TypeScript declarations for TodoContext
export type TodoContextType = {
  isDarkMode: boolean;
  tasks: TaskType[];
  toggleDarkMode: () => void;
  addTask: (task: TaskType) => void;
  deleteTaskById: (id: string) => void;
  unCompletedTasks: number;
  markTaskAsCompleted: (id: string) => void;
  completedTasks: TaskType[];
  isCompletedTasks: boolean;
  completedTasksHandler: (id: string) => void;
  clearCompletedTasks: () => void;
};
