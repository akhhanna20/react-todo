import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({
  todoList,
  onRemoveTodo,
  handleCheckboxChange,
  handleDrag,
  handleDrop,
  id,
  onUpdateNewTitle,
}) {
  //Type-checking tool for props
  TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func,
    handleCheckboxChange: PropTypes.func,
    handleDrag: PropTypes.func,
    handleDrop: PropTypes.func,
    id: PropTypes.string,
    onUpdateNewTitle: PropTypes.func,
  };

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
            id={id}
          />
        ))}
    </ul>
  );
}

export default TodoList;
