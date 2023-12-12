import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({
  todoList,
  onRemoveTodo,
  handleCheckboxChange,
  handleDrag,
  handleDrop,
  id,
}) {
  return (
    <ul className="todo-list">
      {todoList
        .sort((a, b) => a.order - b.order)
        .map((listItem) => (
          <TodoListItem
            key={listItem.id}
            todo={listItem.title}
            listItem={listItem}
            // id={listItem.id}
            onRemoveTodo={onRemoveTodo}
            handleCheckboxChange={handleCheckboxChange}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        ))}
    </ul>
  );
}

export default TodoList;
