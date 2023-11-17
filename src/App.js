import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";

const today = new Date();

function App() {
  //This state change the list of todos method and retrieves objects from localStorage;
  //When we stored the data, we first converted it to a JSON string.
  //In order to make use of it, we need to convert JSON string back to a JSON object.
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      //the function is executed automatically when the promise is constructed
      //after 2 sec signal that the job is done with the result
      setTimeout(
        () =>
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
            },
          }),
        2000
      );
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  //setItem is used to store objects in localStorage.
  //To store data in localStorage, you must first stringify it.
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  });

  //Callback handler, to ad New Todo to List
  const addTodo = (newTodo) => {
    setTodoList((todoList) => [...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((el) => el.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </div>
      )}
    </>
  );
}

export default App;
