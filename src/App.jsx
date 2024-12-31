import { useCallback, useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);

  // Define the colors for the raindrops (you can modify this as needed)
  const colors = ["#FF5733", "#FF6F33", "#FF8C33", "#FFAA33"];

  // Function to create an empty grid
  const createEmptyGrid = () => {
    return Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));
  };

  let arr = [];

  function getRandomNumber() {
    return Math.floor(Math.random() * 20);
  }

  function startInserting() {
    setInterval(() => {
      arr = Array.from(
        { length: Math.min(8, Math.max(1, arr.length + 1)) },
        getRandomNumber
      );

      console.log(arr);
    }, 4000);
  }
  console.log(arr);

  startInserting();

  // Function to simulate the raindrops
  const dropRaindrops = useCallback(
    (prevGrid) => {
      const newGrid = createEmptyGrid();

      const activeColumns = arr;

      for (let j of activeColumns) {
        let count = 0; // Count how many blocks have dropped in this column

        for (let i = rows - 1; i >= 0; i--) {
          if (count >= 5) {
            // Stop filling the column after 5 blocks
            newGrid[i][j] = 0;
          } else if (i === 0) {
            // Add a new block at the top with a probability
            if (Math.random() < 1) {
              newGrid[i][j] = Math.floor(Math.random() * colors.length) + 1;
              count++;
            }
          } else if (prevGrid[i - 1][j] !== 0) {
            // Carry down the block from the previous row
            newGrid[i][j] = prevGrid[i - 1][j];
            count++;
          }
        }
      }

      return newGrid;
    },
    [rows, cols, colors]
  );

  // Effect to update the grid at regular intervals
  useEffect(() => {
    // Initialize grid if empty
    if (grid.length === 0) {
      setGrid(createEmptyGrid());
    }

    const interval = setInterval(() => {
      setGrid((prevGrid) => dropRaindrops(prevGrid)); // Use prevGrid for updates
    }, 500); // Adjust interval for raindrop speed

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [dropRaindrops]);

  return (
    <div className="h-screen w-full bg-gray-800 text-white text-center">
      <h1 className="text-3xl mb-3">Rain Pattern Game</h1>

      {/* Grid */}
      <div
        className="grid gap-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: `${cols}/${rows}`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-full h-full transition-colors duration-200"
              style={{
                backgroundColor: colors[cell - 1] || "#000", // Apply color based on the cell value
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
