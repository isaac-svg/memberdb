"use client"
import React, {
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Todo } from "./models/Todo";
import { Header } from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoComponent from "./components/TodoComponent";
import TodoInfo from "./components/TodoInfo";
import Link from "next/link";

const App = () => {
  const taskRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allowSave, setAllowSave] = useState<boolean>(false);
  const [lightTheme, setLigthTheme] = useState(false);
  // gets and set todos from local storage
  useEffect(() => {
    let localTodos: string | null = localStorage.getItem("todos");
    let theme: string = localStorage.getItem("todoTheme") || "true";
    if (!localTodos) {
      let emptyTodos: Todo[] = [];
      setTodos(emptyTodos);
      return;
    }
    setLigthTheme(JSON.parse(theme));
    setTodos(JSON.parse(localTodos));
  }, []);

  // set Todos to localStorage
  useEffect(() => {
    localStorage.setItem("todoTheme", JSON.stringify(lightTheme));
  }, [lightTheme]);
  const populateTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!taskRef.current!.value) {
      return;
    }
    const task = {
      id: Date.now(),
      completed: false,
      content: taskRef.current!.value,
    };
    setTodos((prevState) => {
      // setAllowSave(!allowSave);

      return [...prevState, task];
    });
    localStorage.setItem("todos", JSON.stringify(todos));

    taskRef.current!.value = "";
    taskRef.current!.focus();
  };
  const deleteTodo = (e: MouseEvent) => {
    const elem = e.target as HTMLImageElement;
    const id = elem.dataset.id!;
    const newTodos = todos.filter((todo) => todo.id !== parseInt(id));

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const handleComplete = (id: number): void => {
    let completedTodos: Todo[] = [];
    const modifiedTodo = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });
    completedTodos = modifiedTodo.filter((todo) => todo.completed === true);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    setTodos(modifiedTodo);
  };
  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
    localStorage.setItem("completedTodos", JSON.stringify(newTodos));
  };
  const getAllTodos = () => {
    const localTodos = localStorage.getItem("todos")!;
    const allTodos = JSON.parse(localTodos);
    setTodos(allTodos);
  };
  const getCompleted = () => {
    const allTodos = JSON.parse(localStorage.getItem("completedTodos")!);
    setTodos(allTodos);
  };
  const getActive = () => {
    const allTodos = todos.filter((todo) => todo.completed === true);
    // setTodos(allTodos);
  };
  //  change theme

  const toggleTheme = () => {
    setLigthTheme(!lightTheme);
  };
  return (
    <main className={`main ${lightTheme && "light"}`}>
      <div className="banner__wrapper"></div>
      <Link href={"/folder"}>Upload</Link>
      <div id="section">
        {/* Todo Component */}
        <div className="todo__component">
          <Header lightTheme={lightTheme} toggleTheme={toggleTheme} />
          <TodoForm taskRef={taskRef} populateTodo={populateTodo} />
          <TodoComponent
            todos={todos}
            handleComplete={handleComplete}
            deleteTodo={deleteTodo}
            setTodos={setTodos}
          />
          <TodoInfo
            getAllTodos={getAllTodos}
            getCompleted={getCompleted}
            getActive={getActive}
            clearCompleted={clearCompleted}
            todos={todos}
          />
        </div>
      </div>
      <span className="info__draggable"> Drag and drop to reorder list</span>
    </main>
  );
};

export default App;