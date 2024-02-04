import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

//Type-checking tool for props
TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  onUpdateNewTitle: PropTypes.func.isRequired,
};

function TodoList({
  todoList,
  onRemoveTodo,
  handleCheckboxChange,
  handleDrag,
  handleDrop,
  onUpdateNewTitle,
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
            onRemoveTodo={onRemoveTodo}
            handleCheckboxChange={handleCheckboxChange}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            onUpdateNewTitle={onUpdateNewTitle}
            //id={id}
          />
        ))}
    </ul>
  );
}

export default TodoList;
