import { useRef, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import useTodoContext from "../hooks/useTodoContext";
//Component for adding new todo
const AddTodo = () => {
  const { addTask, isDarkMode } = useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null);
  //Function to add new task
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      const newTodo = {
        id: uuidv4(),
        task: inputRef.current.value,
        completed: false,
      };
      addTask(newTodo);

      inputRef.current.value = "";
    } else {
      alert("Please enter a task");
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white custom_shadow w-full h-[4rem] mt-8 flex items-center]"
    >
      <input
        type="text"
        className={`placeholder: ${
          isDarkMode ? "text-[#767992]" : "text-[#9495A5]"
        } px-4 placeholder:text-[1.125rem] w-full h-full bg-transparent outline-none`}
        placeholder={"Create a new todo..."}
        ref={inputRef}
      />
    </form>
  );
};

export default AddTodo;
