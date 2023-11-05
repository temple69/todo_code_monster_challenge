import useTodoContext from "../hooks/useTodoContext";
import { TaskType } from "../types/types";
//Component for TodoList
const TodoList = ({ id, task, completed }: TaskType) => {
  //Consuming context
  const { isDarkMode, markTaskAsCompleted } = useTodoContext();
  return (
    <article
      key={id}
      className={`${
        isDarkMode
          ? " border-b border-b-[#393A4B] text-[#C8CBE7] "
          : " border-b border-b-[#E3E4F1] text-[#494C6B]"
      } flex gap-4  py-4 px-4`}
    >
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={completed ? true : false}
          onClick={() => markTaskAsCompleted(id)}
        />
        <span className="checkmark"></span>
      </label>
      <p
        className={`text-[0.75rem] md:text-[1.125rem] ${isDarkMode ? "" : ""}${
          completed
            ? isDarkMode
              ? "line-through text-[#4D5067]"
              : "line-through text-[#D1D2DA]"
            : ""
        }`}
      >
        {task}
      </p>
    </article>
  );
};

export default TodoList;
