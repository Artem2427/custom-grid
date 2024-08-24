import React from 'react';
import styles from './MatrixForm.module.css';
import { generateInitialMatrix, useMatrix } from '@/context/MatrixContext';

function getRandomNumber(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const MatrixForm: React.FC = () => {
  const { setMatrix } = useMatrix();
  const [rows, setRows] = React.useState('');
  const [columns, setColumns] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMatrix(generateInitialMatrix(Number(rows), Number(columns)));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Rows:
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          min="0"
          required
        />
      </label>
      <label>
        Columns:
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          min="0"
          required
        />
      </label>
      <button type="submit">Generate Matrix</button>
    </form>
  );
};

export default MatrixForm;
