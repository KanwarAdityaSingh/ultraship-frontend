import { NavLink } from 'react-router-dom'
import { FiUsers, FiGrid, FiTruck, FiPackage, FiLayers, FiChevronLeft } from 'react-icons/fi'
import './Nav.css'

type SideNavProps = {
  isOpen: boolean
  onToggle: () => void
}

export function SideNav({ isOpen, onToggle }: SideNavProps) {
  return (
    <aside className={`side-nav ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="side-nav-header">
        <span className="side-section-label brand">{isOpen ? 'Navigation' : ''}</span>
        <button
          type="button"
          className="side-collapse-btn"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <FiChevronLeft className={`collapse-icon ${isOpen ? '' : 'rotated'}`} />
        </button>
      </div>

      <div className="side-section">
        <span className="side-section-label">Main</span>
        <NavLink to="/employees" className="side-link">
          <FiUsers className="side-icon" />
          <span className="side-label">Employees</span>
        </NavLink>
        <button type="button" className="side-link is-button">
          <FiGrid className="side-icon" />
          <span className="side-label">Dashboard</span>
        </button>
      </div>

      <div className="side-section">
        <span className="side-section-label">Operations</span>
        <details className="side-group" open>
          <summary className="side-link">
            <FiTruck className="side-icon" />
            <span className="side-label">Fleet</span>
          </summary>
          <div className="side-submenu">
            <button type="button" className="side-sublink">
              Drivers
            </button>
            <button type="button" className="side-sublink">
              Dispatch
            </button>
          </div>
        </details>
        <details className="side-group">
          <summary className="side-link">
            <FiPackage className="side-icon" />
            <span className="side-label">Warehouse</span>
          </summary>
          <div className="side-submenu">
            <button type="button" className="side-sublink">
              Inventory
            </button>
            <button type="button" className="side-sublink">
              Shifts
            </button>
          </div>
        </details>
        <button type="button" className="side-link is-button">
          <FiLayers className="side-icon" />
          <span className="side-label">Admin</span>
        </button>
      </div>
    </aside>
  )
}

