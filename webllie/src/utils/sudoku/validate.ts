import type { Digit, SudokuGrid } from '../../types'
import { BOX_SIZE, DIGITS, EMPTY, GRID_SIZE } from './constants'
import { boxOrigin, isInBounds } from './grid'

function isDigit(value: number): value is Digit {
  return (DIGITS as number[]).includes(value)
}

/**
 * ¿Se puede poner `value` en (row, col) sin romper fila, columna ni bloque 3×3?
 * Ignora el contenido actual de esa celda, para poder validar un movimiento
 * sobre una casilla que ya tiene número.
 */
export function canPlace(
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number,
): boolean {
  if (!isInBounds(row, col) || !isDigit(value)) {
    return false
  }

  for (let i = 0; i < GRID_SIZE; i += 1) {
    if (i !== col && grid[row][i] === value) {
      return false
    }
    if (i !== row && grid[i][col] === value) {
      return false
    }
  }

  const origin = boxOrigin(row, col)

  for (let r = origin.row; r < origin.row + BOX_SIZE; r += 1) {
    for (let c = origin.col; c < origin.col + BOX_SIZE; c += 1) {
      if ((r !== row || c !== col) && grid[r][c] === value) {
        return false
      }
    }
  }

  return true
}

/** Todas las celdas llenas respetan las reglas. Los ceros no cuentan. */
export function isConsistent(grid: SudokuGrid) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const value = grid[row][col]
      if (value === EMPTY) {
        continue
      }
      if (!canPlace(grid, row, col, value)) {
        return false
      }
    }
  }

  return true
}

export function isComplete(grid: SudokuGrid) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (grid[row][col] === EMPTY) {
        return false
      }
    }
  }

  return isConsistent(grid)
}
