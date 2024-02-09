import React, { useState } from "react";

function Sorting() {
  const [ascSort, setAscSort] = useState(true);

  const toggleSortingAsc = () => {
    setAscSort(false);
  };
  const toggleSortingDsc = () => {
    setAscSort(true);
  };
  return (
    <>
      {ascSort ? (
        <button className="primary-btn" onClick={toggleSortingAsc}>
          ▲
        </button>
      ) : (
        <button className="primary-btn" onClick={toggleSortingDsc}>
          ▼
        </button>
      )}
    </>
  );
}
export default Sorting;
