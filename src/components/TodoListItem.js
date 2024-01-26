import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import styles from "./TodoListItem.module.css";
import { CiEdit } from "react-icons/ci";
import { TfiSave } from "react-icons/tfi";
import PropTypes from "prop-types";

function TodoListItem({
  todo,
  onRemoveTodo,
  listItem,
  handleCheckboxChange,
  handleDrag,
  handleDrop,
  onUpdateNewTitle,
  id,
}) {
  TodoListItem.propType = {
    todo: PropTypes.string,
    onRemoveTodo: PropTypes.func,
    listItem: PropTypes.object,
    handleCheckboxChange: PropTypes.func,
    onUpdateNewTitle: PropTypes.func,
  };

  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo);

  const toggleEditClick = () => {
    setEdit(true);
  };
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleSaveClick = () => {
    onUpdateNewTitle(listItem.id, newTitle);
    setEdit(false);
  };
  console.log("newT", newTitle);
  return (
    <li
      className={styles.ListItem}
      draggable={true}
      id={listItem.id}
      onDragOver={(event) => event.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
    >
      <div>
        <input
          type="checkbox"
          id="listItem"
          name="listIitem"
          checked={listItem.done}
          onChange={() => handleCheckboxChange(listItem.id)}
        />
      </div>

      {edit ? (
        <input value={newTitle} onChange={handleTitleChange} />
      ) : (
        <div className={listItem.done ? styles.Close : styles.Description}>
          {todo}
        </div>
      )}

      <div className={styles.IitemButtonContainer}>
        {edit ? (
          <TfiSave
            className={styles.IconSave}
            type="button"
            onClick={handleSaveClick}
          />
        ) : (
          <CiEdit
            className={styles.IconEdit}
            type="button"
            onClick={toggleEditClick}
          />
        )}

        <GoTrash
          className={styles.IconDelete}
          onClick={() => onRemoveTodo(listItem.id)}
        />
      </div>
    </li>
  );
}

export default TodoListItem;
