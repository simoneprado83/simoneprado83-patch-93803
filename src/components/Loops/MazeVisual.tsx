// src/components/MazeVisual.tsx
import React from 'react';
import styles from './MazeVisual.module.css';

interface MazeVisualProps {
  maze: number[][];
}

const MazeVisual: React.FC<MazeVisualProps> = ({ maze }) => {
  return (
    <div
      className={styles.mazeVisual}
      style={{ gridTemplateColumns: `repeat(${maze[0].length}, 30px)` }}
    >
      {maze.map((row, i) =>
        row.map((cell, j) => {
          let cellClass = styles.mazeCell;
          if (cell === 1) {
            cellClass += ` ${styles.path}`;
            if (i === 0 && j === 0) {
              cellClass += ` ${styles.start}`;
            } else if (i === maze.length - 1 && j === row.length - 1) {
              cellClass += ` ${styles.end}`;
            }
          } else {
            cellClass += ` ${styles.wall}`;
          }
          return (
            <div key={`${i}-${j}`} className={cellClass}>
              {i === 0 && j === 0 ? 'S' : i === maze.length - 1 && j === row.length - 1 ? 'F' : ''}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MazeVisual;