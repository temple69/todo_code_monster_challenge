import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Todo from "./Components/Todo"; //Todo Component
import TodoContextProvider from "./context/TodoContext";

function App() {
  return (
    <main
      className={`${
        false
          ? "bg-[var(--primary-bg-color-darkmode)]"
          : "bg-[var(--primary-bg-color-lightmode)]"
      }`}
    >
      <TodoContextProvider>
        <Todo />
      </TodoContextProvider>
    </main>
  );
}

export default App;
