import React, { useEffect } from "react";
import PropTypes from "prop-types";

//Type-checking tool for props
InputWithLabel.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};

function InputWithLabel({ name, id, value, handleTitleChange, children }) {
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
