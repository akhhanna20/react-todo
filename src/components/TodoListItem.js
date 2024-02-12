import React, { useState, useRef, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import styles from "./TodoListItem.module.css";
import { CiEdit } from "react-icons/ci";
import { TfiSave } from "react-icons/tfi";
import PropTypes from "prop-types";

//Type-checking tool for props
TodoListItem.propTypes = {
  todo: PropTypes.string.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  listItem: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  onUpdateNewTitle: PropTypes.func.isRequired,
};

function TodoListItem({
  todo,
  onRemoveTodo,
  listItem,
  handleCheckboxChange,
  handleDrag,
  handleDrop,
  onUpdateNewTitle,
}) {
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
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
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
          name="listIitem"
          checked={listItem.done}
          onChange={() => handleCheckboxChange(listItem.id)}
        />
      </div>

      {edit ? (
        <input
          ref={inputRef}
          name="titleToChange"
          className={styles.InputToChange}
          value={newTitle}
          onChange={handleTitleChange}
        />
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
