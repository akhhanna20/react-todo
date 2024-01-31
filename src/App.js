import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./app.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const today = new Date();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragId, setDragId] = useState();

  //To GET data from Airtable
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const todosFromAPI = await response.json();
      const todos = todosFromAPI.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
          done: Boolean(todo.fields.done),
        };
        return newTodo;
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //To add data to Airtable
  const postTodo = async (newTodo) => {
    const airtableData = {
      fields: {
        title: newTodo.title,
        done: newTodo.done,
      },
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtableData),
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/`;

    try {
      const response = await fetch(url, options);
      // console.log("resp", response.json());

      if (!response.ok) {
        const message = `Error has ocured: ${response.status}`;
        throw new Error(message);
      }
      const dataResponse = response;
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //To change data in Airtable
  const changeTodo = async (id, updTodo) => {
    const airtableDataToUpdate = {
      fields: {
        done: !updTodo.done,
        title: updTodo.title,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtableDataToUpdate),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      const todoFromAPI = await response.json();
      return todoFromAPI;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  // //To reorder items
  // const reorderItems = (newTodoList) => {
  //   const newItems = newTodoList.map((todo, index) => {
  //     todo.order = index;
  //     return todo;
  //   });
  //   setTodoList(newItems);
  // };

  //Function to add new todo to the list
  const addTodo = async (newTodo) => {
    await postTodo(newTodo);
    await fetchData();
  };
  //Function to remove todo from the list
  const removeTodo = async (id) => {
    await deleteTodo(id);
    await fetchData();
  };

  //Handler for checkbox(done/undone)
  const handleCheckboxChange = async (id) => {
    const updTodo = todoList.find((todo) => todo.id === id);
    await changeTodo(id, updTodo);
    await fetchData();
  };

  //To edit data
  const updateNewTitle = async (id, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    console.log("updList", updatedTodoList);
    setTodoList(updatedTodoList);
    const updTodo = updatedTodoList.find((todo) => todo.id === id);
    await changeTodo(id, updTodo);
  };

  //To handle drag
  const handleDrag = (event) => {
    setDragId(event.currentTarget.id);

    // console.log("dragID", event.currentTarget.id);
    // console.log("dragIDTYPE", typeof event.currentTarget.id);
  };
  //To handle drop
  const handleDrop = (event) => {
    const dragBoxIndex = todoList.findIndex(
      (todo) => todo.id.toString() === dragId
    );

    const dropBoxIndex = todoList.findIndex(
      (todo) => todo.id.toString() === event.currentTarget.id
    );

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="todo-wrapper">
              <div className="image-container">
                <img src="images/mountains.jpg" alt="mountains" />
                <div className="bottom-right">
                  All your dreams can come true if you have the courage to
                  pursue them
                </div>
              </div>
              <h1>Todo List</h1>
              <h3>
                Date: {today.getMonth() + 1}/{today.getDate()}/
                {today.getFullYear()}
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
                  onUpdateNewTitle={updateNewTitle}
                />
              )}
            </div>
          }
        ></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
