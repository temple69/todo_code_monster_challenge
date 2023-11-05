import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useTodoContext from "../hooks/useTodoContext";
import DarkMode from "./Icons/DarkMode";
import LightMode from "./Icons/LightMode";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import AddTodo from "./AddTodo";
import ActionCenter from "./ActionCenter";

const todoLists = {
  [uuidv4()]: {
    title: "Todo",
  },
};

//Component for Todo page
const Todo = () => {
  const { isDarkMode, isCompletedTasks, completedTasks, tasks } =
    useTodoContext();
  const allTasks = isCompletedTasks
    ? completedTasks.filter((task) => task.completed)
    : tasks.filter((task) => !task.completed);
  return (
    <section className="custom_bg h-[100vh] flex flex-col  items-center pt-10">
      <section className="w-1/2">
        <article className="flex justify-between">
          <h2 className=" text-white text-base md:text-[2.5rem] font-bold tracking-[0.9375rem]">
            TODO
          </h2>
          <span>{isDarkMode ? <DarkMode /> : <LightMode />}</span>
        </article>
        <AddTodo />

        <div
          className={`${
            isDarkMode ? "bg-[#25273D]" : "bg-white"
          } custom_shadow pb-4  mt-8`}
        >
          <DragDropContext onDragEnd={(result) => console.log(result)}>
            {Object.entries(todoLists).map(([id]) => (
              <Droppable droppableId={id} key={id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <h3
                      className={`${
                        isDarkMode ? "text-[#5B5E7E]" : "text-[#9495A5]"
                      } text-sm tracking-[-0.01213rem]`}
                    >
                      {}
                    </h3>
                    {allTasks.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <TodoList
                              id={todo.id}
                              task={todo.task}
                              completed={todo.completed}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
          <ActionCenter />
        </div>
      </section>
      <p
        className={`${
          isDarkMode ? "text-[#5B5E7E]" : "text-[#9495A5]"
        } text-sm tracking-[-0.01213rem] my-5`}
      >
        Drag and drop to reorder list
      </p>
    </section>
  );
};

export default Todo;
