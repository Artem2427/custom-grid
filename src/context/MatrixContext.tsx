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
  setXValue: React.Dispatch<React.SetStateAction<number>>;
  setRowPercent: React.Dispatch<React.SetStateAction<number | null>>;
  highlightedIds: number[];
  setHighlightedIds: React.Dispatch<React.SetStateAction<number[]>>;
  rowSums: number[];
  xValue: number;
  rowPercent: number | null;
  columnAverages: number[];
  updateCell: (row: number, col: number) => void;
  hoverHighlight: (row: number, col: number) => void;
  addRow: () => void;
  deleteRow: (row: number) => void;
  hoverSum: (row: number) => void;
  unHoverSum: () => void;
  unHoverCell: () => void;
};

const MatrixContext = React.createContext<MatrixContextType | undefined>(undefined);

// TODO mode to utils
export function getRandomNumber(min: number = 100, max: number = 999): number {
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
  const [xValue, setXValue] = React.useState(0);
  const [rowPercent, setRowPercent] = React.useState<number | null>(null);
  const [highlightedIds, setHighlightedIds] = React.useState<number[]>([]);

  const hoverHighlight = (row: number, col: number) => {
    const matrixCellId = matrix[row][col].id;

    const newMatrix = matrix.map((currentRow) =>
      currentRow.map((cell) => ({
        ...cell,
        amount: cell.amount - matrix[row][col].amount,
      }))
    );

    const flattenedMatrix = newMatrix.flat();

    const sortedCells = flattenedMatrix.sort((a, b) =>
      Math.abs(a.amount) - Math.abs(b.amount)
    );

    const idsToHighlight = sortedCells
      .filter(cell => cell.id !== matrixCellId)
      .slice(0, xValue)
      .map(cell => cell.id);

    setHighlightedIds(idsToHighlight);
  };

  const unHoverCell = () => {
    setHighlightedIds([]);
  }

  const hoverSum = (row: number) => {
    setRowPercent(row);
  };

  const unHoverSum = () => {
    setRowPercent(null);
  };

  const updateCell = (row: number, col: number) => {
    setMatrix(prevMatrix => {

      const newMatrix = [...prevMatrix];

      if (newMatrix[row][col].amount === 999) return prevMatrix;
      newMatrix[row][col] = { ...newMatrix[row][col], amount: newMatrix[row][col].amount + 0.5 };
      return newMatrix;
    });
  };

  const addRow = () => {
    setMatrix(prevMatrix => {
      const numCols = prevMatrix[0]?.length || 0;
      const newRow = Array.from({ length: numCols }, (_, colIndex) => ({
        id: prevMatrix.length * numCols + colIndex,
        amount: getRandomNumber(),
      }));
      return [...prevMatrix, newRow];
    });
  };

  const deleteRow = (rowIndex: number) => {
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.filter((_, index) => index !== rowIndex);

      const updatedMatrix = newMatrix.map((row, rIndex) =>
        row.map((cell, cIndex) => ({
          ...cell,
          id: rIndex * row.length + cIndex
        }))
      );

      return updatedMatrix;
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
    <MatrixContext.Provider value={{ matrix, updateCell, setMatrix, rowSums, columnAverages,
      addRow, deleteRow, xValue, setXValue, highlightedIds, setHighlightedIds, hoverHighlight,
      hoverSum, rowPercent, setRowPercent, unHoverSum, unHoverCell }}>
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
