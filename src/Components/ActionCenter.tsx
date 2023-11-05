import useTodoContext from "../hooks/useTodoContext";
const taskStates = [
  {
    id: "1",
    description: "All",
    isActive: true,
  },
  {
    id: "2",
    description: "Active",
    isActive: false,
  },
  {
    id: "3",
    description: "Completed",
    isActive: false,
  },
];

const ActionCenter = () => {
  const {
    isDarkMode,
    unCompletedTasks,
    completedTasksHandler,
    clearCompletedTasks,
  } = useTodoContext();
  const actionTasksHandler = (event: any) => {
    const taskState = event.target.innerText;
    completedTasksHandler(taskState);
  };
  return (
    <div className="flex mt-4 justify-between px-6">
      <article>
        <p
          className={`${
            isDarkMode ? "text-[#5B5E7E]" : "text-[#9495A5]"
          } text-sm tracking-[-0.01213rem]`}
        >
          {unCompletedTasks} items left
        </p>
      </article>
      <article>
        {taskStates.map((taskState) => (
          <button
            key={taskState.id}
            type="button"
            className={`${
              isDarkMode ? "text-[#5B5E7E]" : "text-[#9495A5]"
            } text-sm tracking-[-0.01213rem] font-bold mx-4`}
            onClick={actionTasksHandler}
          >
            {taskState.description}
          </button>
        ))}
      </article>
      <article>
        <button
          type="button"
          onClick={clearCompletedTasks}
          className={`${
            isDarkMode ? "text-[#5B5E7E]" : "text-[#9495A5]"
          } text-sm tracking-[-0.01213rem]`}
        >
          Clear Completed
        </button>
      </article>
    </div>
  );
};

export default ActionCenter;
