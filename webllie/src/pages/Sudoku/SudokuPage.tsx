import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { paths } from '../../routes/paths'
import './SudokuPage.css'

export function SudokuPage() {
  return (
    <section className="sudoku-placeholder">
      <div className="sudoku-placeholder-card">
        <h1>Sudoku</h1>
        <p>El tablero llega en el siguiente paso. Por ahora esta ruta ya existe.</p>
        <Link className="sudoku-back" to={paths.home}>
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
