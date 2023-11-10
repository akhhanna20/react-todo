function InputWithLabel({ label, name, id, value, handleTitleChange }) {
  return (
    <>
      <label htmlFor="todoTitle">{label}</label>
      &nbsp;
      <input
        name={name}
        type="text"
        id={id}
        placeholder="Type the task"
        value={value}
        onChange={handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
