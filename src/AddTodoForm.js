import React, { useState } from "react";

function AddTodoForm(props) {
  const { onAddTodo } = props;

  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    // const todoTitle = event.target.title.value;
    onAddTodo({ title: todoTitle, id: Date.now() });
    // event.target.reset();
    setTodoTitle(" ");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>

      <input
        name="title"
        type="text"
        id="todoTitle"
        placeholder="Tipe the task"
        value={todoTitle}
        onChange={handleTitleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
