import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./app.css";
//require("dotenv").config();
//import "dotenv/config";
//require("dotenv").config();

function App() {
  console.log("env", process.env.REACT_APP_TABLE_NAME);
  const today = new Date();

  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [dragId, setDragId] = useState();

  // const fetchData = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  //     },
  //   };
  //   const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

  //   try {
  //     const response = await fetch(url, options);

  //     if (!response.ok) {
  //       const message = `Error: ${response.status}`;
  //       throw new Error(message);
  //     }

  //     const data = await response.json();
  //     return data;
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData().then((data) => {
  //     const todos = data.records.map((todo) => {
  //       const newTodo = {
  //         title: todo.fields.title,
  //         id: todo.id,
  //       };
  //       return newTodo;
  //     });
  //     setTodoList(todos);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    new Promise((resolve, reject) => {
      //the function is executed automatically when the promise is constructed
      //after 2 sec signal that the job is done with the result
      setTimeout(
        () =>
          resolve({
            //This state change the list of todos method and retrieves objects from localStorage;
            //When we stored the data, we first converted it to a JSON string.
            //In order to make use of it, we need to convert JSON string back to a JSON object.
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

  const reorderItems = (newTodoList) => {
    const newItems = newTodoList.map((todo, index) => {
      todo.order = index;
      return todo;
    });
    setTodoList(newItems);
  };

  //Callback handler, to ad New Todo to List
  const addTodo = (newTodo) => {
    setTodoList((todoList) => [
      ...todoList,
      { ...newTodo, done: false, order: todoList.length },
    ]);
  };
  // console.log(todoList);

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    //setTodoList(newTodoList);
    reorderItems(newTodoList);
  };

  const handleCheckboxChange = (id) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodoList(newTodoList);
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  });

  const handleDrag = (event) => {
    setDragId(event.currentTarget.id);

    console.log("dragID", event.currentTarget.id);
    console.log("dragIDTYPE", typeof event.currentTarget.id);
  };
  console.log("todoList", todoList);

  const handleDrop = (event) => {
    const dragBoxIndex = todoList.findIndex(
      (todo) => todo.id.toString() === dragId
    );
    console.log("drag", dragBoxIndex);
    const dropBoxIndex = todoList.findIndex(
      (todo) => todo.id.toString() === event.currentTarget.id
    );

    console.log("dropInd", dropBoxIndex);
    console.log("dropID", event.currentTarget.id);

    const newTodoState = todoList.map((todo) => {
      if (todo.id.toString() === dragId) {
        todo.order = dropBoxIndex;
      }
      if (todo.id.toString() === event.currentTarget.id) {
        todo.order = dragBoxIndex;
      }
      return todo;
    });

    setTodoList(newTodoState);
  };

  return (
    <div className="todo-wrapper">
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm onAddTodo={addTodo} />

      {isLoading ? (
        <p>Loading your todos...</p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          handleCheckboxChange={handleCheckboxChange}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
        />
      )}
    </div>
  );
}

export default App;
