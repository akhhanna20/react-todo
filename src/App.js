import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";

const today = new Date();

function App() {
  //This state change the list of todos;
  const [todoList, setTodoList] = useState([]);

  //Callback handler, to ad New Todo to List
  const addTodo = (newTodo) => {
    console.log("newTodo", newTodo);
    setTodoList([...todoList, newTodo]);
    console.log("newTodo", newTodo);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm onAddTodo={addTodo} />
      {/* <p>{newTodo}</p> */}
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
