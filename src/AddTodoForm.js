import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  //State for New Todo title from input
  const [todoTitle, setTodoTitle] = useState("");

  //Handler to set new todoTitle
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  //Event listener, call callback function onAddTodo with new todoTitle object
  //and reset the todoTitle state to an empty String
  //Handler works after press "Add" button
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>

      <input
        name="title"
        type="text"
        id="todoTitle"
        placeholder="Type the task"
        value={todoTitle}
        onChange={handleTitleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
