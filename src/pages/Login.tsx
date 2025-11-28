import type { FormEvent } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ultrashipLogo from '../assets/ultraship-logo.svg'
import './Login.css'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        role
      }
    }
  }
`

type LoginResponse = {
  login: {
    token: string
    user: {
      id: string
      email: string
      role: string
    }
  }
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth() as any

  const [executeLogin] = useMutation<LoginResponse>(LOGIN_MUTATION)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    executeLogin({
      variables: {
        email: username,
        password,
      },
    })
      .then((res) => {
        const payload = res.data?.login
        if (!payload) {
          throw new Error('Unexpected response')
        }
        sessionStorage.setItem('ultraship_play_landing_animation', 'true')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        login(payload.token, payload.user.role)
        const from = (location.state as { from?: Location } | null)?.from?.pathname ?? '/employees'
        navigate(from, { replace: true })
      })
      .catch((err) => {
        setErrorMessage(err.message ?? 'Invalid credentials')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <aside className="left-panel">
        <div className="brand-wrap">
          <div className="brand-logo-wrap">
            <img src={ultrashipLogo} alt="Ultraship TMS" className="brand-logo-large" />
          </div>
          <h1 className="brand-title">Employee Directory</h1>
          <p className="brand-subtitle">
            Discover, connect, and collaborate with ease across your organization.
          </p>
        </div>
      </aside>

      <main className="right-panel">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
        >
          <header className="login-header">
            <h2 className="login-title">Sign in</h2>
            <p className="login-subtitle">Welcome back. Please enter your details.</p>
          </header>

          {errorMessage && <div className="login-error">{errorMessage}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="jane.doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <footer className="login-footer">
            <span className="muted">Need help? Contact IT support.</span>
          </footer>
        </motion.div>
      </main>
    </motion.div>
  )
}


