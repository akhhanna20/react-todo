import React from "react";

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
        <li key={listItem.id}>{listItem.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
