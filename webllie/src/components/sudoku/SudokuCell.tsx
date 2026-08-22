import type { CellValue } from '../../types'

type SudokuCellProps = {
  value: CellValue
  row: number
  col: number
  isGiven: boolean
  isSelected: boolean
  isError: boolean
  onSelect: (row: number, col: number) => void
}

export function SudokuCell({
  value,
  row,
  col,
  isGiven,
  isSelected,
  isError,
  onSelect,
}: SudokuCellProps) {
  const classNames = [
    'sudoku-cell',
    isGiven ? 'sudoku-cell--given' : 'sudoku-cell--input',
    isSelected ? 'sudoku-cell--selected' : '',
    isError ? 'sudoku-cell--error' : '',
    col % 3 === 2 && col !== 8 ? 'sudoku-cell--border-right' : '',
    row % 3 === 2 && row !== 8 ? 'sudoku-cell--border-bottom' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => onSelect(row, col)}
      aria-label={`Fila ${row + 1}, columna ${col + 1}${value ? `, valor ${value}` : ', vacía'}`}
      aria-pressed={isSelected}
    >
      {value !== 0 ? value : ''}
    </button>
  )
}
