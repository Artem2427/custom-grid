import React from 'react';

import styles from './MatrixTable.module.css';
import { useMatrix } from '@/context/MatrixContext';

const MatrixTable: React.FC = () => {
  const { matrix, updateCell, rowSums, columnAverages, addRow, deleteRow, hoverHighlight,
   highlightedIds, hoverSum, rowPercent, unHoverSum, unHoverCell } = useMatrix();

  if (matrix.length === 0 || matrix[0].length === 0) {
    return <p>Please generate a matrix using the form above.</p>;
  }


  return (
    <>
      <table className={styles.matrixTable}>
        <thead>
          <tr>
            <th />
            <th />
            {matrix[0].map((_, colIndex) => (
              <th className={styles.indexCells} key={colIndex}>{`Cell Value N = ${colIndex + 1}`}</th>
            ))}
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className={styles.deleteRow} onClick={() => deleteRow(rowIndex)}>
                <img src="src\assets\trash.svg" alt="Delete a row" />
              </td>
              <td className={styles.indexCells}>{`Cell Value M = ${rowIndex + 1}`}</td>
              {row.map((cell, colIndex) => (
                <td key={cell.id} onClick={() => updateCell(rowIndex, colIndex)} onMouseEnter={() => hoverHighlight(rowIndex,colIndex)}
                  onMouseLeave={() => unHoverCell()}
                  style={{
                    backgroundColor: rowPercent === rowIndex
                      ? `rgba(0, 128, 0, ${cell.amount / rowSums[rowIndex]})`
                      : highlightedIds.includes(cell.id)
                      ? 'yellow' : 'transparent',
                  }}>
                  {rowPercent === rowIndex ? (cell.amount / rowSums[rowIndex]*100).toFixed(0)+ '%' : cell.amount}
                </td>
              ))}
              <td className={styles.infoCells} onMouseEnter={() => hoverSum(rowIndex)}
                onMouseLeave={() => unHoverSum()}>{rowSums[rowIndex]}</td>
            </tr>
          ))}
          <tr>
            <td />
            <td>Average</td>
            {columnAverages.map((average, colIndex) => (
              <td className={styles.infoCells} key={colIndex}>{average.toFixed(2)}</td>
            ))}
            <td />
          </tr>
        </tbody>
      </table>
      <button className={styles.addRowButton} onClick={() => addRow()}>Add a row</button>
    </>
  );
};

export default MatrixTable;
