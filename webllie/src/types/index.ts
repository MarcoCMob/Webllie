export type Difficulty = 'easy' | 'medium' | 'hard'

/** 0 = celda vacía. 1–9 = dígito colocado. */
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Digit = Exclude<CellValue, 0>

/** Tablero 9×9. `grid[fila][columna]`. */
export type SudokuGrid = CellValue[][]

export type Position = {
  row: number
  col: number
}

/** Puzzle jugable más su solución completa, para comprobar al jugador. */
export type SudokuPuzzle = {
  puzzle: SudokuGrid
  solution: SudokuGrid
  difficulty: Difficulty
}

export type GameStats = {
  gamesCompleted: number
  bestTimeByDifficulty: Partial<Record<Difficulty, number>>
}
