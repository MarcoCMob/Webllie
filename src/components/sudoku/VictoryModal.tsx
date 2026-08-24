import { AnimatePresence, motion } from 'framer-motion'
import type { Difficulty } from '../../types'
import { formatTime } from '../../hooks/useTimer'
import './VictoryModal.css'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
}

type VictoryModalProps = {
  isOpen: boolean
  seconds: number
  mistakeCount: number
  difficulty: Difficulty
  onPlayAgain: () => void
}

export function VictoryModal({
  isOpen,
  seconds,
  mistakeCount,
  difficulty,
  onPlayAgain,
}: VictoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="victory-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="victory-card"
            role="dialog"
            aria-modal="true"
            aria-label="Partida ganada"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="victory-title">¡You made it! 💗</p>

            <dl className="victory-stats">
              <div className="victory-stat">
                <dt>Time</dt>
                <dd>{formatTime(seconds)}</dd>
              </div>
              <div className="victory-stat">
                <dt>Errors</dt>
                <dd>{mistakeCount}</dd>
              </div>
              <div className="victory-stat">
                <dt>Difficulty</dt>
                <dd>{DIFFICULTY_LABELS[difficulty]}</dd>
              </div>
            </dl>

            <button type="button" className="victory-cta" onClick={onPlayAgain}>
              Play again
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
