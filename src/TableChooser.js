import React, { useState } from "react";
import TodoContainer from "./components/TodoContainer";

function TableChooser() {
  const [tableName, setTableName] = useState(process.env.REACT_APP_TABLE_NAME);
  return (
    <div>
      <select
        id="selectField"
        value={tableName}
        onChange={(event) => setTableName(event.target.value)}
      >
        <option value={process.env.REACT_APP_TABLE_NAME}>Todo List 1</option>
        <option value="Todo List 2">Todo List 2</option>
      </select>
      <TodoContainer tableName={tableName} />
    </div>
  );
}
export default TableChooser;
