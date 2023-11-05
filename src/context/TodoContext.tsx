import React, { useEffect } from "react";
import { TodoContextProps } from "../types/types"; // 2. Import the types
import { TodoContextType } from "../types/types"; // 2. Import the types
import { TaskType } from "../types/types";
import { v4 as uuidv4 } from "uuid";
const todoLists = {
  [uuidv4()]: {
    title: "Todo",
    todos: [],
  },
};

export const TodoContext = React.createContext<TodoContextType>({
  isDarkMode: false,
  tasks: [],
  toggleDarkMode: () => {},
  addTask: () => {},
  deleteTaskById: () => {},
  unCompletedTasks: 0,
  markTaskAsCompleted: () => {},
  completedTasks: [],
  isCompletedTasks: false,
  completedTasksHandler: () => {},
  clearCompletedTasks: () => {},
});

// 1. Create a context with default value
const TodoContextProvider = ({ children }: TodoContextProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const [taskList, setTaskList] = React.useState<TaskType[]>(
    todoLists[Object.keys(todoLists)[0]].todos
  );
  const [completedTasks, setCompletedTasks] = React.useState<TaskType[]>(
    todoLists[Object.keys(todoLists)[0]].todos
  );

  const [isCompletedTasks, setIsCompletedTasks] =
    React.useState<boolean>(false);
  //Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    //If local storage is empty, set the default tasks and completed tasks
    //If local storage is not empty, get the tasks and completed tasks from local storage
    if (localStorage.getItem("tasks") === null) {
      return setTaskList(todoLists[Object.keys(todoLists)[0]].todos);
    } else {
      const tasks = JSON.parse(localStorage.getItem("tasks") as string);
      const completedTasks = JSON.parse(
        localStorage.getItem("completedTasks") as string
      );
      setTaskList(tasks);
      setCompletedTasks(completedTasks);
    }
  }, []);
  //Function to add task
  const addTask = (task: TaskType) => {
    setTaskList((prevTaskList) => {
      if (prevTaskList.includes(task)) {
        alert("Task already exists");
        return prevTaskList;
      }
      localStorage.setItem("tasks", JSON.stringify([...prevTaskList, task]));
      return [...prevTaskList, task];
    });
  };
  //Function to delete task
  const deleteTaskById = (id: string) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  };
  //Function to get uncompleted tasks and track changes
  const unCompletedTasks = taskList.filter((task) => !task.completed);
  //Function to mark task as completed
  const markTaskAsCompleted = (id: string) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        console.log(prevTaskList);
        if (task.id === id) {
          localStorage.setItem(
            "tasks",
            JSON.stringify([...prevTaskList, { ...task, completed: true }])
          );
          return { ...task, completed: true };
        }
        return task;
      });
    });
  };
  console.log(taskList + "from tasks");
  //Function to get completed tasks and track changes
  const completedTasksHandler = (status: string) => {
    if (status === "Completed") {
      const completed = taskList.filter((task) => task.completed);
      console.log(completed);
      setCompletedTasks(completed);
      setIsCompletedTasks(true);
    } else {
      setIsCompletedTasks(false);
    }
  };
  //Function to clear completed tasks
  console.log(completedTasks);
  const clearCompletedTasks = () => {
    const cleared = completedTasks.map((task) => {
      return { ...task, completed: false };
    });
    setCompletedTasks(cleared);
    setCompletedTasks([]);
  };
  return (
    <TodoContext.Provider
      value={{
        isDarkMode: false,
        tasks: taskList,
        toggleDarkMode,
        addTask,
        deleteTaskById,
        unCompletedTasks: unCompletedTasks.length,
        markTaskAsCompleted,
        completedTasksHandler,
        completedTasks,
        isCompletedTasks,
        clearCompletedTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
// 4. Export the context provider
export default TodoContextProvider;
