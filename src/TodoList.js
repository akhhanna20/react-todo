import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: "1",
    title: "Project setup",
  },
  {
    id: "2",
    title: "Learn first lesson",
  },
  {
    id: "3",
    title: "Complete assignment",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map((listItem) => (
        <TodoListItem key={listItem.id} todo={listItem.title} />
      ))}
    </ul>
  );
}

export default TodoList;
