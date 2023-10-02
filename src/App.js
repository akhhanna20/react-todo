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

const today = new Date();
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <h3>
        Date: {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
      </h3>

      <ul>
        {todoList.map((listItem) => (
          <li key={listItem.id}>{listItem.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
