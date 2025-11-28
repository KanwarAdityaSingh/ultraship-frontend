import { useState } from 'react'
import './EmployeeTiles.css'

type EmployeeTileMenuProps = {
  isAdmin: boolean
  onEdit: () => void
  onFlag: () => void
  onDelete: () => void
  isFlagged?: boolean | null
}

export function EmployeeTileMenu({
  isAdmin,
  onEdit,
  onFlag,
  onDelete,
  isFlagged,
}: EmployeeTileMenuProps) {
  const [open, setOpen] = useState(false)

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  function wrap(action: () => void) {
    return (e: React.MouseEvent) => {
      e.stopPropagation()
      action()
      setOpen(false)
    }
  }

  return (
    <div className="tile-menu">
      <button
        type="button"
        className="tile-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <div className="tile-menu-popover" role="menu">
          {isAdmin && (
            <button type="button" className="tile-menu-item" onClick={wrap(onEdit)}>
              Edit
            </button>
          )}
          <button type="button" className="tile-menu-item" onClick={wrap(onFlag)}>
            {isFlagged ? 'Unflag' : 'Flag'}
          </button>
          {isAdmin && (
            <button
              type="button"
              className="tile-menu-item danger"
              onClick={wrap(onDelete)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}


