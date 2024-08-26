import React from 'react';
import styles from './MatrixForm.module.css';
import { generateInitialMatrix, useMatrix } from '@/context/MatrixContext';

const MatrixForm: React.FC = () => {
  const { setMatrix, setXValue, xValue } = useMatrix();
  const [rows, setRows] = React.useState('');
  const [columns, setColumns] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMatrix(generateInitialMatrix(Number(rows), Number(columns)));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>Rows:</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          min="0"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Columns:</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          min="0"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>X:</label>
        <input
          type="number"
          value={xValue ? xValue : ''}
          onChange={(e) => setXValue(Number(e.target.value))}
          min="0"
          required
        />
      </div>
      <button type="submit">Generate Matrix</button>
    </form>
  );
};

export default MatrixForm;
