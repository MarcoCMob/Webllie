import { Timer } from 'lucide-react'
import type { Difficulty } from '../../types'
import { formatTime } from '../../hooks/useTimer'
import './GameHeader.css'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

type GameHeaderProps = {
  difficulty: Difficulty
  onChangeDifficulty: (difficulty: Difficulty) => void
  seconds: number
  mistakeCount: number
}

export function GameHeader({
  difficulty,
  onChangeDifficulty,
  seconds,
  mistakeCount,
}: GameHeaderProps) {
  return (
    <div className="game-header">
      <h1 className="game-header-title">Sudoku 💗</h1>

      <div className="game-header-difficulty" role="group" aria-label="Dificultad">
        {DIFFICULTIES.map((option) => (
          <button
            key={option}
            type="button"
            className={
              option === difficulty
                ? 'difficulty-pill difficulty-pill--active'
                : 'difficulty-pill'
            }
            onClick={() => onChangeDifficulty(option)}
          >
            {DIFFICULTY_LABELS[option]}
          </button>
        ))}
      </div>

      <div className="game-header-stats">
        <span className="game-header-stat">
          <Timer size={16} />
          {formatTime(seconds)}
        </span>
        <span className="game-header-stat">Errores: {mistakeCount}</span>
      </div>
    </div>
  )
}
