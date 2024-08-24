import React from 'react';

import styles from './MatrixTable.module.css';
import { useMatrix } from '@/context/MatrixContext';

const MatrixTable: React.FC = () => {
  const { matrix, updateCell, rowSums, columnAverages } = useMatrix();

  if (matrix.length === 0 || matrix[0].length === 0) {
    return <p>Please generate a matrix using the form above.</p>;
  }

  return (
    <table className={styles.matrixTable}>
      <thead>
        <tr>
          <th />
          {matrix[0].map((_, colIndex) => (
            <th key={colIndex}>{`Cell Value N = ${colIndex + 1}`}</th>
          ))}
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
             <td>{`Cell Value M = ${rowIndex + 1}`}</td>
            {row.map((cell, colIndex) => (
              <td key={cell.id} onClick={() => updateCell(rowIndex, colIndex)}>
                {cell.amount}
              </td>
            ))}
            <td>{rowSums[rowIndex]}</td>
          </tr>
        ))}
        <tr>
          <td>Average</td>
          {columnAverages.map((average, colIndex) => (
            <td key={colIndex}>{average.toFixed(2)}</td>
          ))}
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default MatrixTable;
