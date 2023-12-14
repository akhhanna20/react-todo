import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo, handleCheckboxChange }) {
  return (
    <ul className="todo-list">
      {todoList.map((listItem) => (
        <TodoListItem
          key={listItem.id}
          todo={listItem.title}
          listItem={listItem}
          onRemoveTodo={onRemoveTodo}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </ul>
  );
}

export default TodoList;
