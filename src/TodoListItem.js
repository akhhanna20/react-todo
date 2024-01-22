import React from "react";
import { GoTrash } from "react-icons/go";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, listItem, handleCheckboxChange }) {
  return (
    <li className={styles.ListItem}>
      <div>
        <input
          type="checkbox"
          id="listItem"
          name="listIitem"
          checked={listItem.done}
          onChange={() => handleCheckboxChange(listItem.id)}
        />
      </div>

      <div className={listItem.done ? styles.Close : styles.Description}>
        {todo}
      </div>

      <div>
        <GoTrash
          className={styles.IconDelete}
          onClick={() => onRemoveTodo(listItem.id)}
        />
      </div>
    </li>
  );
}

export default TodoListItem;
