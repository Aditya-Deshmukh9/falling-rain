import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);
  const [speed, setSpeed] = useState(60);

  const colors = [
    "#ff0000",
    "#f00202",
    "#d40202",
    "#b30202",
    "#990202",
    "#750101",
    "#4d0101",
    "#1f0000",
    "#000000",
  ];

  const createEmptyGrid = () => {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  };

  const addRaindrop = (grid) => {
    const newGrid = grid.map((row) => [...row]);

    const randomCol = Math.floor(Math.random() * cols);
    if (newGrid[0][randomCol] === 0) {
      newGrid[0][randomCol] = Math.floor(Math.random() * colors.length) + 1;
    }
    return newGrid;
  };

  const moveRaindrops = (grid) => {
    const newGrid = createEmptyGrid();
    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] !== 0) {
          if (row < rows - 1) {
            newGrid[row + 1][col] = grid[row][col];
          } else {
            newGrid[row][col] = grid[row][col];
          }
        }
        if (grid[row][col] > 0 && grid[row][col] < colors.length + 1) {
          newGrid[row][col] = grid[row][col] + 1;
        }
      }
    }
    return newGrid;
  };

  useEffect(() => {
    setGrid(createEmptyGrid());

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        let newGrid = moveRaindrops(prevGrid);
        newGrid = addRaindrop(newGrid);
        return newGrid;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [rows, cols]);

  return (
    <div className="min-h-screen w-full bg-black text-white text-center">
      <h1 className="text-4xl mb-4">Falling Raindrops</h1>

      <div className="flex flex-col md:flex-row justify-center items-center w-full gap-x-4 my-4">
        <div>
          <label htmlFor="rows" className="block text-start text-gray-300">
            Speed <span>{speed} sec</span>
          </label>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            className="text-black px-2 py-1 rounded-md"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value) || speed)}
          />
        </div>
        <div>
          <label htmlFor="rows" className="block text-start text-gray-300">
            Rows <span>{rows}</span>
          </label>
          <input
            type="range"
            min={10}
            max={50}
            className="text-black px-2 py-1 rounded-md"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || rows)}
          />
        </div>
        <div className="">
          <label htmlFor="cols" className="block text-start text-gray-300">
            Column <span>{cols}</span>
          </label>
          <input
            type="range"
            min={10}
            max={50}
            className="text-black px-2 py-1 rounded-md"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || cols)}
          />
        </div>
      </div>

      <div
        className="h-full w-full grid gap-[1px] mx-auto border-white border"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          width: "80%",
          maxWidth: "600px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: "100%",
                paddingBottom: "100%",
                backgroundColor: colors[cell - 1] || "#000",
                border: "1px solid #222",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
