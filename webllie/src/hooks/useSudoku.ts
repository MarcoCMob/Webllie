import { useCallback, useMemo, useReducer } from 'react'
import type { Digit, Difficulty, Position, SudokuGrid, SudokuPuzzle } from '../types'
import { cloneGrid, EMPTY, generatePuzzle, GRID_SIZE } from '../utils/sudoku'

type SudokuState = {
  puzzle: SudokuGrid
  board: SudokuGrid
  solution: SudokuGrid
  difficulty: Difficulty
  selectedCell: Position | null
  mistakeCount: number
}

type Action =
  | { type: 'select'; position: Position | null }
  | { type: 'input'; value: Digit }
  | { type: 'clear' }
  | { type: 'restart' }
  | { type: 'load'; match: SudokuPuzzle }

function isInBoard({ row, col }: Position) {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE
}

function isGivenCell(puzzle: SudokuGrid, { row, col }: Position) {
  return puzzle[row][col] !== EMPTY
}

function boardsMatch(board: SudokuGrid, solution: SudokuGrid) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (board[row][col] !== solution[row][col]) {
        return false
      }
    }
  }

  return true
}

function createMatch(difficulty: Difficulty): SudokuState {
  const generated = generatePuzzle(difficulty)

  return {
    puzzle: generated.puzzle,
    board: cloneGrid(generated.puzzle),
    solution: generated.solution,
    difficulty: generated.difficulty,
    selectedCell: null,
    mistakeCount: 0,
  }
}

function placeValue(board: SudokuGrid, { row, col }: Position, value: Digit | typeof EMPTY) {
  const next = cloneGrid(board)
  next[row][col] = value
  return next
}

function reducer(state: SudokuState, action: Action): SudokuState {
  switch (action.type) {
    case 'select': {
      if (action.position !== null && !isInBoard(action.position)) {
        return state
      }

      return { ...state, selectedCell: action.position }
    }
    case 'input': {
      const selected = state.selectedCell
      if (!selected || isGivenCell(state.puzzle, selected)) {
        return state
      }
      if (boardsMatch(state.board, state.solution)) {
        return state
      }

      const current = state.board[selected.row][selected.col]
      if (current === action.value) {
        return state
      }

      const board = placeValue(state.board, selected, action.value)
      const isWrong = action.value !== state.solution[selected.row][selected.col]

      return {
        ...state,
        board,
        mistakeCount: isWrong ? state.mistakeCount + 1 : state.mistakeCount,
      }
    }
    case 'clear': {
      const selected = state.selectedCell
      if (!selected || isGivenCell(state.puzzle, selected)) {
        return state
      }
      if (state.board[selected.row][selected.col] === EMPTY) {
        return state
      }

      return {
        ...state,
        board: placeValue(state.board, selected, EMPTY),
      }
    }
    case 'restart': {
      return {
        ...state,
        board: cloneGrid(state.puzzle),
        selectedCell: null,
        mistakeCount: 0,
      }
    }
    case 'load': {
      return {
        puzzle: action.match.puzzle,
        board: cloneGrid(action.match.puzzle),
        solution: action.match.solution,
        difficulty: action.match.difficulty,
        selectedCell: null,
        mistakeCount: 0,
      }
    }
  }
}

function findErrorCells(board: SudokuGrid, puzzle: SudokuGrid, solution: SudokuGrid): Position[] {
  const errors: Position[] = []

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const value = board[row][col]
      if (value === EMPTY || puzzle[row][col] !== EMPTY) {
        continue
      }
      if (value !== solution[row][col]) {
        errors.push({ row, col })
      }
    }
  }

  return errors
}

export function useSudoku(initialDifficulty: Difficulty = 'easy') {
  const [state, dispatch] = useReducer(reducer, initialDifficulty, createMatch)

  const errorCells = useMemo(
    () => findErrorCells(state.board, state.puzzle, state.solution),
    [state.board, state.puzzle, state.solution],
  )

  const isWon = useMemo(
    () => boardsMatch(state.board, state.solution),
    [state.board, state.solution],
  )

  const selectCell = useCallback((position: Position | null) => {
    dispatch({ type: 'select', position })
  }, [])

  const inputNumber = useCallback((value: Digit) => {
    dispatch({ type: 'input', value })
  }, [])

  const clearCell = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const restart = useCallback(() => {
    dispatch({ type: 'restart' })
  }, [])

  const newGame = useCallback((difficulty: Difficulty = state.difficulty) => {
    dispatch({ type: 'load', match: generatePuzzle(difficulty) })
  }, [state.difficulty])

  const isGiven = useCallback(
    (position: Position) => isGivenCell(state.puzzle, position),
    [state.puzzle],
  )

  return {
    board: state.board,
    puzzle: state.puzzle,
    solution: state.solution,
    difficulty: state.difficulty,
    selectedCell: state.selectedCell,
    mistakeCount: state.mistakeCount,
    errorCells,
    isWon,
    isGiven,
    selectCell,
    inputNumber,
    clearCell,
    restart,
    newGame,
  }
}
