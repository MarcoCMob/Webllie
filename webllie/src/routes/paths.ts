export const paths = {
  home: '/',
  sudoku: '/sudoku',
} as const

/**
 * Rutas previstas que aún no tienen página.
 * Cuando toque Recuerdos, basta con añadir la ruta aquí y registrarla en AppRouter.
 */
export const futurePaths = {
  memories: '/recuerdos',
} as const
