import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  removeAllTodos,
} from "./features/todos/todosSlice";
import "./App.css";
import TodoTable from "./components/TodoTable";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.items);
  const { stars } = useSelector((state: RootState) => state.todos);
  const [text, setText] = useState("");
  const [difficult, setDifficult] = useState(1);
  const [completionDate, setCompletionDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      addTodo({
        text,
        difficult,
        completion_date: completionDate,
        ready: false,
      })
    );

    setText("");
    setDifficult(1);
    setCompletionDate("");
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleDeleteAll = () => {
    dispatch(removeAllTodos());
  };

  const allTodos = todos;
  const activeTodos = todos.filter((t) => !t.ready);
  const completedTodos = todos.filter((t) => t.ready);

  return (
    <div className="container">
      <div className="container__head">
        <h1>todos</h1>
        <span>{activeTodos.length} items left</span>
        <span>Stars: {stars}</span>
      </div>

      <div className="container__todos-body">
        <form onSubmit={handleSubmit} className="todos-body__create-new-todo">
          <input
            type="text"
            placeholder="Come up with a new task for yourself"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            placeholder="How difficult is it?"
            value={difficult}
            onChange={(e) => setDifficult(Number(e.target.value))}
            min="1"
            max="10"
          />
          <input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>

        <details className="todo-section">
          <summary>All</summary>
          <TodoTable
            todos={allTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </details>
        <details className="todo-section">
          <summary>Active</summary>
          <TodoTable
            todos={activeTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </details>
        <details className="todo-section">
          <summary>Completed</summary>
          <TodoTable
            todos={completedTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </details>
      </div>
      <button
        className="delete-all-btn"
        onClick={handleDeleteAll}
        disabled={todos.length === 0}
      >
        Delete All Completed Todos
      </button>
      
    </div>
  );
};

export default App;
