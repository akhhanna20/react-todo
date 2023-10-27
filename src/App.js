import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";

const today = new Date();

function App() {
  //This state change the list of todos;
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList"))
  );

  //Callback handler, to ad New Todo to List
  const addTodo = (newTodo) => {
    setTodoList((todoList) => [...todoList, newTodo]);
  };

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
