import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const today = new Date();
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
