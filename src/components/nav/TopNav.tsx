import './Nav.css'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ultrashipLogo from '../../assets/ultraship-logo.svg'
import { ConfirmDialog } from '../overlays/ConfirmDialog'

type TopNavProps = {
  onToggleSidebar?: () => void
}

export function TopNav({ onToggleSidebar }: TopNavProps) {
  const { role, logout } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  const displayRole =
    role === 'ADMIN' ? 'Admin' : role === 'EMPLOYEE' ? 'Employee' : 'Guest'
  const roleInitial = displayRole.charAt(0)

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <div className="brand-lockup">
          <img src={ultrashipLogo} alt="Ultraship TMS" className="brand-logo" />
        </div>
      </div>

      <button
        type="button"
        className="icon-button ghost top-nav-hamburger"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <nav className="top-nav-menu">
        <a href="#" className="top-nav-link active">
          Overview
        </a>
        <a href="#" className="top-nav-link">
          Performance
        </a>
        <a href="#" className="top-nav-link">
          Compliance
        </a>
        <a href="#" className="top-nav-link">
          Insights
        </a>
      </nav>

      <div className="top-nav-right">
        <div className="profile-chip">
          <div className="profile-avatar">{roleInitial}</div>
          <div className="profile-meta">

            <span className="profile-role">{displayRole}</span>
          </div>
        </div>
        <button type="button" className="primary-button subtle" onClick={() => setShowConfirm(true)}>
          Logout
        </button>
      </div>
      <ConfirmDialog
        open={showConfirm}
        title="Sign out?"
        body="You will be logged out of Ultraship TMS. Any unsaved changes may be lost."
        confirmLabel="Logout"
        tone="danger"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false)
          logout()
        }}
      />
    </header>
  )
}


