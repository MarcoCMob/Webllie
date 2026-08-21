import type { Difficulty, Position, SudokuGrid, SudokuPuzzle } from '../../types'
import { DIGITS, EMPTY, GRID_SIZE } from './constants'
import { cloneGrid, countFilled, createEmptyGrid, findEmptyCell, shuffle } from './grid'
import { canPlace } from './validate'
import { hasUniqueSolution } from './solve'

const GIVENS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 26,
}

function fillRandomComplete(grid: SudokuGrid): boolean {
  const empty = findEmptyCell(grid)
  if (!empty) {
    return true
  }

  const { row, col } = empty

  for (const value of shuffle(DIGITS)) {
    if (!canPlace(grid, row, col, value)) {
      continue
    }

    grid[row][col] = value
    if (fillRandomComplete(grid)) {
      return true
    }
    grid[row][col] = EMPTY
  }

  return false
}

function allPositions(): Position[] {
  const positions: Position[] = []

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      positions.push({ row, col })
    }
  }

  return positions
}

export function generatePuzzle(difficulty: Difficulty): SudokuPuzzle {
  const solution = createEmptyGrid()
  const filled = fillRandomComplete(solution)

  if (!filled) {
    throw new Error('No se pudo construir un tablero completo de Sudoku.')
  }

  const puzzle = cloneGrid(solution)
  const targetGivens = GIVENS_BY_DIFFICULTY[difficulty]

  for (const { row, col } of shuffle(allPositions())) {
    if (countFilled(puzzle) <= targetGivens) {
      break
    }

    const previous = puzzle[row][col]
    puzzle[row][col] = EMPTY

    if (!hasUniqueSolution(puzzle)) {
      puzzle[row][col] = previous
    }
  }

  return {
    puzzle,
    solution,
    difficulty,
  }
}
