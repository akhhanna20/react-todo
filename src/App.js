import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";

const today = new Date();

const useSemiPersistentState = () => {
  //This state change the list of todos method and retrieves objects from localStorage;
  //When we stored the data, we first converted it to a JSON string.
  //In order to make use of it, we need to convert JSON string back to a JSON object.
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  //setItem is used to store objects in localStorage.
  //To store data in localStorage, you must first stringify it.
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  //Callback handler, to ad New Todo to List
  const addTodo = (newTodo) => {
    setTodoList((todoList) => [...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
