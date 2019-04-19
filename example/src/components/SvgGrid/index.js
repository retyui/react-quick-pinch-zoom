import React, { forwardRef } from "react";

import "./style.css";

const renderGrid = ({ cols, rows, cellSize }) => {
  const cells = [];

  for (let colIndex = 0; colIndex < cols; colIndex++) {
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const key = `${colIndex}_${rowIndex}`;
      const x = colIndex * cellSize;
      const y = rowIndex * cellSize;

      cells.push(
        <g key={key}>
          <rect
            {...{ x, y }}
            width={cellSize}
            height={cellSize}
            strokeDasharray={`${cellSize}px ${cellSize}px 0px ${cellSize}px`}
            className="cell"
          />
          <text x={x} y={y} dx={10} dy={10} className="cell-text">
            {x}
          </text>
          <text x={x} y={y} dy={22} className="cell-text">
            {y}
          </text>
        </g>
      );
    }
  }

  return cells;
};

export default forwardRef(({ cols, rows, cellSize, ...props }, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props}>
    {renderGrid({
      cols,
      rows,
      cellSize
    })}
  </svg>
));
