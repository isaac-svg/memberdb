import React from "react";
import { Todo } from "../models/Todo";
interface props {
  getAllTodos: () => void;
  todos: Todo[];
  getActive: () => void;
  getCompleted: () => void;
  clearCompleted: () => void;
}
const TodoInfo = ({
  getAllTodos,
  todos,
  getActive,
  getCompleted,
  clearCompleted,
}: props) => {
  return (
    <>
      <div className="todos__count">
        <span className="count">
          {todos.length} {todos.length < 2 ? "item" : "items"} left
        </span>
        <button className="clear__completed" onClick={clearCompleted}>
          {todos.some((todo) => todo.completed)
            ? "Clear Completed"
            : "None Completed"}
        </button>
      </div>
      {/* filters  */}
      <div className="filters">
        <button className="all" onClick={getAllTodos}>
          All
        </button>
        <button className="active" onClick={getActive}>
          Active
        </button>
        <button className="completed" onClick={getCompleted}>
          Completed
        </button>
      </div>
    </>
  );
};

export default TodoInfo;
