import { useState, useEffect } from "react";

function useRandomColumns(numColumns) {
  const [activeColumns, setActiveColumns] = useState([]);

  useEffect(() => {
    const generateRandomColumns = () => {
      const columns = [];
      for (let i = 0; i < numColumns; i++) {
        columns.push(Math.floor(Math.random() * 20)); // Random number between 0 and 19
      }
      setActiveColumns(columns);
    };

    generateRandomColumns();
  }, [numColumns]); // Regenerate when numColumns changes

  return activeColumns;
}
export default useRandomColumns;
