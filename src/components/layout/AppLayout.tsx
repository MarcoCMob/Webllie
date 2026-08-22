import { Link, Outlet } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { site } from '../../config/site'
import { paths } from '../../routes/paths'
import './AppLayout.css'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to={paths.home} className="brand" aria-label={`${site.name}, ir al inicio`}>
          <Heart className="brand-icon" size={18} strokeWidth={2} />
          <span>{site.name}</span>
        </Link>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
