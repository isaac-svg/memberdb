import React, { DragEventHandler, useRef } from "react";
import { Todo } from "../models/Todo";
import { invoke } from "@tauri-apps/api/tauri";
interface props {
  todos: Todo[];
  deleteTodo: (e: React.MouseEvent) => void;
  handleComplete: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoComponent = ({
  todos,
  deleteTodo,
  handleComplete,
  setTodos,
}: props) => {
  const dragStartItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const mutableTodos: Todo[] = todos;

  const handleSort = () => {
    //
    let _todos = [...todos];
    //  remove and save the dragged item content
    let draggedItemContent = _todos.splice(dragStartItem.current, 1)[0];
    // switch position
    _todos.splice(dragOverItem.current, 0, draggedItemContent);
    // reset the position ref
    dragOverItem.current = null;
    dragStartItem.current = null;

    //  update the actual array
    setTodos(_todos);
  };
  return (
    <div className="todos">
      <ul>
        {todos.map((todo, index) => {
          return (
            <li
            key={index}
              className="single__todo"
              draggable
              data-todo={index}
              onDragStart={() => (dragStartItem.current = index)}
              onDragEnter={() => (dragStartItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              onClick={async ()=>{ 
              const res = await invoke("greet",{name:"From client"})
            
              console.log(res)
          }}
            >
              <div
                className="box__wrapper"
                id={todo.completed ? "completed_wrapper" : ""}
                key={todo.id}
              >
                <input
                  type="checkbox"
                  onClick={() => handleComplete(todo.id)}
                  // onClick={async ()=>{ await invoke("greet",{name:"From client"})}}

                />

                <img
                  className={`check__img  ${
                    todo.completed && "completed__img"
                  }`}
                  src="/images/icon-check.svg"
                />
              </div>

              <p onClick={async ()=>{ 
              const res = await invoke("greet",{name:"From client"})
            
              console.log(res)
          }} className={todo.completed ? "completed__todo" : "todo__msg"}>
                {todo.content}
              </p>

              <img
                src="/images/icon-cross.svg"
                className="del__img"
                onClick={deleteTodo}
                data-id={todo.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoComponent;
