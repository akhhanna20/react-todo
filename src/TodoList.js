import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((listItem) => (
        <TodoListItem key={listItem.id} todo={listItem.title} />
      ))}
    </ul>
  );
}

export default TodoList;
