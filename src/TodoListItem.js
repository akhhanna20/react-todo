import React from "react";
import { GoTrash } from "react-icons/go";

function TodoListItem({ todo, onRemoveTodo, listItem, handleCheckboxChange }) {
  return (
    <li className="todo-list-item">
      <input
        type="checkbox"
        id="listItem"
        name="listIitem"
        checked={listItem.done !== "0"}
        onChange={() => handleCheckboxChange(listItem.id)}
      />

      <div className={listItem.done !== "0" ? "close" : ""}>{todo}</div>

      <GoTrash
        className="icon-delete"
        onClick={() => onRemoveTodo(listItem.id)}
      />
    </li>
  );
}

export default TodoListItem;
