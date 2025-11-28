import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type ProtectedRouteProps = {
  children: ReactElement
  requiredRole?: 'ADMIN' | 'EMPLOYEE'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/employees" replace />
  }

  return children
}


