import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { site } from '../../config/site'
import { paths } from '../../routes/paths'
import './HomePage.css'

export function HomePage() {
  return (
    <section className="home">
      <motion.div
        className="home-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="home-kicker">Made with love.</p>
        <h1 className="home-title">Hey...</h1>
        <p className="home-lead">{site.tagline}</p>
        <p className="home-copy">
          There is always a sudoku ready for you.
        </p>
        <Link className="home-cta" to={paths.sudoku}>
          <Sparkles size={18} />
          Play Sudoku
        </Link>
      </motion.div>
    </section>
  )
}
