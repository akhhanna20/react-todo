import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";

const today = new Date();

function App() {
  const [newTodo, setNewTodo] = useState("Hi! Something will be here");

  return (
    <div>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
