import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth()

  if (loading) return <h1>
    Cargando...
  </h1>

  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

  return (
    <Outlet />
  )
}