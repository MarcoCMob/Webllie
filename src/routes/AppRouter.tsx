import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../pages/Home/HomePage'
import { SudokuPage } from '../pages/Sudoku/SudokuPage'
import { paths } from './paths'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.sudoku} element={<SudokuPage />} />
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
