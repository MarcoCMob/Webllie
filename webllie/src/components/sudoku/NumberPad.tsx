import { Delete } from 'lucide-react'
import type { Digit } from '../../types'
import { DIGITS } from '../../utils/sudoku'
import './NumberPad.css'

type NumberPadProps = {
  onInput: (value: Digit) => void
  onClear: () => void
  disabled: boolean
}

export function NumberPad({ onInput, onClear, disabled }: NumberPadProps) {
  return (
    <div className="number-pad" role="group" aria-label="Teclado numérico">
      {DIGITS.map((digit) => (
        <button
          key={digit}
          type="button"
          className="number-pad-key"
          onClick={() => onInput(digit)}
          disabled={disabled}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        className="number-pad-key number-pad-key--clear"
        onClick={onClear}
        disabled={disabled}
        aria-label="Borrar número"
      >
        <Delete size={20} />
      </button>
    </div>
  )
}
