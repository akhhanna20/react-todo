import React, { useState } from "react";

function Sorting(onToggle) {
  const [ascSort, setAscSort] = useState(true);

  const toggleT = () => {
    onToggle(setAscSort(ascSort));
  };

  return (
    <>
      {ascSort ? (
        <button className="primary-btn" onClick={toggleT}>
          ▲
        </button>
      ) : (
        <button className="primary-btn" onClick={toggleT}>
          ▼
        </button>
      )}
    </>
  );
}
export default Sorting;
