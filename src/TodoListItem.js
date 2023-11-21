import React from "react";
import { GoTrash } from "react-icons/go";

function TodoListItem({ todo, onRemoveTodo, listItem }) {
  return (
    <li className="todo-list-item">
      {todo}
      {/* <button > */}
      <GoTrash
        className="icon-delete"
        onClick={() => onRemoveTodo(listItem.id)}
      />
      {/* </button> */}
    </li>
  );
}

export default TodoListItem;
