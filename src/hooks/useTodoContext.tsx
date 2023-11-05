import React from "react";
import { TodoContext } from "../context/TodoContext";
//Create a custom hook to use the context
const useTodoContext = () => {
  const todoContext = React.useContext(TodoContext);
  return todoContext;
};
// 3. Export the custom hook
export default useTodoContext;
