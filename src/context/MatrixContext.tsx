import React from 'react';

export type CellId = number;
export type CellValue = number;
export type Cell = {
  id: CellId;
  amount: CellValue;
};

type MatrixContextType = {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  rowSums: number[];
  columnAverages: number[];
  updateCell: (row: number, col: number) => void;
};

const MatrixContext = React.createContext<MatrixContextType | undefined>(undefined);

// TODO mode to utils
export function getRandomNumber(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO mode to utils
export function generateInitialMatrix(rows: number, columns: number): Cell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => ({
      id: rowIndex * columns + colIndex,
      amount: getRandomNumber()
    }))
  );
};

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matrix, setMatrix] = React.useState<Cell[][]>([]);

  const updateCell = (row: number, col: number) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix];
      newMatrix[row][col] = { ...newMatrix[row][col], amount: newMatrix[row][col].amount + 1 };
      return newMatrix;
    });
  };

  const calculateRowSums = (matrix: Cell[][]): number[] => {
    return matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));
  };

  const calculateColumnAverages = (matrix: Cell[][]): number[] => {
    const numRows = matrix.length;
    const numCols = matrix[0]?.length || 0;
    const columnSums = Array(numCols).fill(0);

    matrix.forEach(row => {
      row.forEach((cell, colIndex) => {
        columnSums[colIndex] += cell.amount;
      });
    });

    return columnSums.map(sum => (numRows > 0 ? sum / numRows : 0));
  };

  const rowSums = calculateRowSums(matrix);
  const columnAverages = calculateColumnAverages(matrix);

  return (
    <MatrixContext.Provider value={{ matrix, updateCell, setMatrix, rowSums, columnAverages }}>
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = React.useContext(MatrixContext);
  if (context === undefined) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};
