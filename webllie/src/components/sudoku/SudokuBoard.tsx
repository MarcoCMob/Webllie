import { useMemo } from 'react'
import type { Position, SudokuGrid } from '../../types'
import { SudokuCell } from './SudokuCell'
import './SudokuBoard.css'

type SudokuBoardProps = {
  board: SudokuGrid
  selectedCell: Position | null
  errorCells: Position[]
  isGiven: (position: Position) => boolean
  onSelect: (position: Position) => void
}

function positionKey(row: number, col: number) {
  return `${row}-${col}`
}

export function SudokuBoard({
  board,
  selectedCell,
  errorCells,
  isGiven,
  onSelect,
}: SudokuBoardProps) {
  const errorKeys = useMemo(
    () => new Set(errorCells.map(({ row, col }) => positionKey(row, col))),
    [errorCells],
  )

  return (
    <div className="sudoku-board" role="grid" aria-label="Tablero de Sudoku">
      {board.map((rowValues, row) =>
        rowValues.map((value, col) => (
          <SudokuCell
            key={positionKey(row, col)}
            value={value}
            row={row}
            col={col}
            isGiven={isGiven({ row, col })}
            isSelected={selectedCell?.row === row && selectedCell?.col === col}
            isError={errorKeys.has(positionKey(row, col))}
            onSelect={(r, c) => onSelect({ row: r, col: c })}
          />
        )),
      )}
    </div>
  )
}
