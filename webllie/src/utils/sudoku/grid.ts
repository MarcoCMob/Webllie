import type { CellValue, Position, SudokuGrid } from '../../types'
import { EMPTY, GRID_SIZE } from './constants'

export function createEmptyGrid(): SudokuGrid {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => EMPTY),
  )
}

export function cloneGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map((row) => [...row])
}

export function isInBounds(row: number, col: number) {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE
}

export function findEmptyCell(grid: SudokuGrid): Position | null {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (grid[row][col] === EMPTY) {
        return { row, col }
      }
    }
  }

  return null
}

export function boxOrigin(row: number, col: number): Position {
  return {
    row: Math.floor(row / 3) * 3,
    col: Math.floor(col / 3) * 3,
  }
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = copy[i]
    copy[i] = copy[j]
    copy[j] = current
  }

  return copy
}

export function countFilled(grid: SudokuGrid) {
  return grid.flat().filter((value: CellValue) => value !== EMPTY).length
}
