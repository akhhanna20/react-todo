import React, { useState } from "react";
import TodoContainer from "./components/TodoContainer";

function TableChooser() {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  return (
    <div>
      <div className="select-container">
        <select
          className="select-container"
          id="selectField"
          value={tableName}
          onChange={(event) => setTableName(event.target.value)}
        >
          <option value={process.env.REACT_APP_TABLE_NAME}>Todo list_1</option>
          <option value="Todo list_2">Todo list_2</option>
          <option value="New Todo List">New Todo List</option>
        </select>
      </div>
      <TodoContainer tableName={tableName} />
    </div>
  );
}
export default TableChooser;
