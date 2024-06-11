import React from "react";
interface props {
  taskRef: React.RefObject<HTMLInputElement>;
  populateTodo: (e: React.FormEvent) => void;
}
const TodoForm = ({ taskRef, populateTodo }: props) => {
  return (
    <form id="form__input" onSubmit={populateTodo}>
      <div className="form__controller">
        <span className="circle"></span>
        <input
          type="text"
          id="input__field"
          placeholder="Create a  new todo..."
          ref={taskRef}
        />
      </div>
    </form>
  );
};

export default TodoForm;
