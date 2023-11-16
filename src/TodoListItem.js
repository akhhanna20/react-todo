import React from "react";

function TodoListItem({ todo, onRemoveTodo, listItem }) {
  return (
    <li>
      {todo}
      <button onClick={() => onRemoveTodo(listItem.id)}>Remove</button>
    </li>
  );
}

export default TodoListItem;
