import type { Digit, SudokuGrid } from '../../types'
import { DIGITS, EMPTY } from './constants'
import { cloneGrid, findEmptyCell } from './grid'
import { canPlace, isConsistent } from './validate'

function solveInPlace(grid: SudokuGrid, digits: readonly Digit[]): boolean {
  const empty = findEmptyCell(grid)
  if (!empty) {
    return true
  }

  const { row, col } = empty

  for (const value of digits) {
    if (!canPlace(grid, row, col, value)) {
      continue
    }

    grid[row][col] = value
    if (solveInPlace(grid, digits)) {
      return true
    }
    grid[row][col] = EMPTY
  }

  return false
}

function countSolutionsInPlace(
  grid: SudokuGrid,
  limit: number,
  digits: readonly Digit[],
): number {
  if (limit <= 0) {
    return 0
  }

  const empty = findEmptyCell(grid)
  if (!empty) {
    return 1
  }

  const { row, col } = empty
  let found = 0

  for (const value of digits) {
    if (!canPlace(grid, row, col, value)) {
      continue
    }

    grid[row][col] = value
    found += countSolutionsInPlace(grid, limit - found, digits)
    grid[row][col] = EMPTY

    if (found >= limit) {
      return found
    }
  }

  return found
}

/** Primera solución encontrada, o `null` si el tablero es imposible. No muta el original. */
export function solve(grid: SudokuGrid): SudokuGrid | null {
  if (!isConsistent(grid)) {
    return null
  }

  const working = cloneGrid(grid)
  return solveInPlace(working, DIGITS) ? working : null
}

/**
 * Cuenta soluciones hasta `limit` (por defecto 2: basta para saber si es única).
 * No muta el original.
 */
export function countSolutions(grid: SudokuGrid, limit = 2) {
  if (!isConsistent(grid) || limit <= 0) {
    return 0
  }

  return countSolutionsInPlace(cloneGrid(grid), limit, DIGITS)
}

export function hasUniqueSolution(grid: SudokuGrid) {
  return countSolutions(grid, 2) === 1
}
