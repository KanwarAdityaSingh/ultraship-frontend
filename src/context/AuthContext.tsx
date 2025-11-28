import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { apolloClient } from '../apollo/client'

type Role = 'ADMIN' | 'EMPLOYEE' | null

type AuthState = {
  token: string | null
  role: Role
}

type AuthContextValue = {
  token: string | null
  role: Role
  isAuthenticated: boolean
  login: (token: string, role: Exclude<Role, null>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_TOKEN_KEY = 'token'
const STORAGE_ROLE_KEY = 'role'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY)
    const storedRole = localStorage.getItem(STORAGE_ROLE_KEY) as Role
    if (storedToken && storedRole) {
      return { token: storedToken, role: storedRole }
    }
    return { token: null, role: null }
  })

  const login = useCallback((token: string, role: Exclude<Role, null>) => {
    localStorage.setItem(STORAGE_TOKEN_KEY, token)
    localStorage.setItem(STORAGE_ROLE_KEY, role)
    setState({ token, role })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    localStorage.removeItem(STORAGE_ROLE_KEY)
    setState({ token: null, role: null })
    apolloClient.clearStore().catch(() => {
      // ignore cache clear errors
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      token: state.token,
      role: state.role,
      isAuthenticated: Boolean(state.token),
      login,
      logout,
    }),
    [state, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}


