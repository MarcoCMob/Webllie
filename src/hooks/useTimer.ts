import { useEffect, useState } from 'react'

/**
 * Temporizador en segundos, independiente del estado del Sudoku.
 *
 * - Cuenta mientras `isPaused` es `false`.
 * - Se reinicia a 0 cada vez que cambia `resetKey`.
 */
export function useTimer(resetKey: unknown, isPaused: boolean) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setSeconds(0)
  }, [resetKey])

  useEffect(() => {
    if (isPaused) {
      return
    }

    const id = window.setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => window.clearInterval(id)
  }, [isPaused, resetKey])

  return seconds
}

export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
