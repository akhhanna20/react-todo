import React, { useEffect } from "react";

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
