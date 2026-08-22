import { useCallback, useEffect, useState } from 'react'
import { RotateCcw, Shuffle } from 'lucide-react'
import { GameHeader } from '../../components/sudoku/GameHeader'
import { SudokuBoard } from '../../components/sudoku/SudokuBoard'
import { NumberPad } from '../../components/sudoku/NumberPad'
import { VictoryModal } from '../../components/sudoku/VictoryModal'
import { useSudoku } from '../../hooks/useSudoku'
import { useTimer } from '../../hooks/useTimer'
import type { Difficulty, Digit } from '../../types'
import './SudokuPage.css'

function isDigit(value: number): value is Digit {
  return value >= 1 && value <= 9
}

export function SudokuPage() {
  const sudoku = useSudoku('easy')
  const [gameId, setGameId] = useState(0)

  const seconds = useTimer(gameId, sudoku.isWon)

  const handleRestart = useCallback(() => {
    sudoku.restart()
    setGameId((id) => id + 1)
  }, [sudoku])

  const handleNewGame = useCallback(
    (difficulty?: Difficulty) => {
      sudoku.newGame(difficulty)
      setGameId((id) => id + 1)
    },
    [sudoku],
  )

  const handleChangeDifficulty = useCallback(
    (difficulty: Difficulty) => {
      if (difficulty === sudoku.difficulty) {
        return
      }
      handleNewGame(difficulty)
    },
    [sudoku.difficulty, handleNewGame],
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isDigit(Number(event.key))) {
        sudoku.inputNumber(Number(event.key) as Digit)
        return
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        sudoku.clearCell()
        return
      }

      const { selectedCell } = sudoku
      if (!selectedCell) {
        return
      }

      const deltas: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      }

      const delta = deltas[event.key]
      if (!delta) {
        return
      }

      event.preventDefault()
      const nextRow = selectedCell.row + delta[0]
      const nextCol = selectedCell.col + delta[1]

      if (nextRow < 0 || nextRow > 8 || nextCol < 0 || nextCol > 8) {
        return
      }

      sudoku.selectCell({ row: nextRow, col: nextCol })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sudoku])

  const isCellEditable =
    sudoku.selectedCell !== null && !sudoku.isGiven(sudoku.selectedCell)

  return (
    <section className="sudoku-page">
      <GameHeader
        difficulty={sudoku.difficulty}
        onChangeDifficulty={handleChangeDifficulty}
        seconds={seconds}
        mistakeCount={sudoku.mistakeCount}
      />

      <SudokuBoard
        board={sudoku.board}
        selectedCell={sudoku.selectedCell}
        errorCells={sudoku.errorCells}
        isGiven={sudoku.isGiven}
        onSelect={sudoku.selectCell}
      />

      <NumberPad
        onInput={sudoku.inputNumber}
        onClear={sudoku.clearCell}
        disabled={!isCellEditable}
      />

      <div className="sudoku-controls">
        <button type="button" className="sudoku-control-button" onClick={handleRestart}>
          <RotateCcw size={16} />
          Reiniciar
        </button>
        <button
          type="button"
          className="sudoku-control-button sudoku-control-button--primary"
          onClick={() => handleNewGame()}
        >
          <Shuffle size={16} />
          Nuevo Sudoku
        </button>
      </div>

      <VictoryModal
        isOpen={sudoku.isWon}
        seconds={seconds}
        mistakeCount={sudoku.mistakeCount}
        difficulty={sudoku.difficulty}
        onPlayAgain={() => handleNewGame()}
      />
    </section>
  )
}
