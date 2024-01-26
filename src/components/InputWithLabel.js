import React, { useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ name, id, value, handleTitleChange, children }) {
  InputWithLabel.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    handleTitleChange: PropTypes.func,
  };
  const inputRef = React.useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      &nbsp;
      <input
        name={name}
        type="text"
        id={id}
        placeholder="Type the task"
        value={value}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}

export default InputWithLabel;
