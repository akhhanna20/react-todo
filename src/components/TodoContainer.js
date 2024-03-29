import React, { useCallback, useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "../app.css";

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/`;

function TodoContainer({ tableName }) {
  const today = new Date();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragId, setDragId] = useState();
  const [ascSort, setAscSort] = useState(true);

  const sortTodosByFieldAsc = (objectA, objectB) => {
    if (
      objectA.fields.title.toUpperCase() < objectB.fields.title.toUpperCase()
    ) {
      return -1;
    }
    if (
      objectA.fields.title.toUpperCase() > objectB.fields.title.toUpperCase()
    ) {
      return 1;
    }
    return 0;
  };

  const toggle = () => {
    setAscSort(!ascSort);
  };

  const sortTodosByFieldDsc = (objectA, objectB) => {
    if (
      objectA.fields.title.toUpperCase() < objectB.fields.title.toUpperCase()
    ) {
      return 1;
    }
    if (
      objectA.fields.title.toUpperCase() > objectB.fields.title.toUpperCase()
    ) {
      return -1;
    }
    return 0;
  };

  //To GET data from Airtable
  const fetchData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `${baseUrl}${tableName}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const todosFromAPI = await response.json();

      const todos = todosFromAPI.records
        .filter((records) => Object.keys(records.fields).length !== 0)
        .sort(ascSort ? sortTodosByFieldAsc : sortTodosByFieldDsc)
        .map((todo) => {
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
  }, [tableName, ascSort]);

  useEffect(() => {
    fetchData();
  }, [fetchData, tableName]);

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
    const url = `${baseUrl}${tableName}`;

    try {
      const response = await fetch(url, options);
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
        done: updTodo.done,
        title: updTodo.title,
      },
    };
    const url = `${baseUrl}${tableName}/${id}`;
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
    const url = `${baseUrl}${tableName}/${id}`;
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
    updTodo.done = !updTodo.done;
    await changeTodo(id, updTodo);
    await fetchData();
  };

  //To edit data
  const updateNewTitle = async (id, newTitle) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodoList(updatedTodoList);
    const updTodo = updatedTodoList.find((todo) => todo.id === id);
    await changeTodo(id, updTodo);
  };

  //To handle drag
  const handleDrag = (event) => {
    setDragId(event.currentTarget.id);
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

  return (
    <>
      <div className="todo-wrapper">
        <div className="image-container">
          <img src="images/ocean.jpg" alt="ocean" />
          <div className="bottom-right">
            All your dreams can come true if you have the courage to pursue them
          </div>
        </div>
        <h1>Todo List integrated with Airtable</h1>
        <h3>
          Date: {today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}
        </h3>
        <AddTodoForm onAddTodo={addTodo} />

        <div className="toggle-container">
          {ascSort ? (
            <button className="toggle-btn" onClick={toggle}>
              ▲ A - Z
            </button>
          ) : (
            <button className="toggle-btn" onClick={toggle}>
              ▼ Z - A
            </button>
          )}
        </div>

        {isLoading ? (
          <p>Loading your todos...</p>
        ) : (
          <>
            <TodoList
              todoList={todoList}
              onRemoveTodo={removeTodo}
              handleCheckboxChange={handleCheckboxChange}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              onUpdateNewTitle={updateNewTitle}
            />
          </>
        )}
      </div>
    </>
  );
}

export default TodoContainer;
