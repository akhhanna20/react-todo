import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="todo-list">
      {todoList.map((listItem) => (
        <TodoListItem
          key={listItem.id}
          todo={listItem.title}
          listItem={listItem}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
