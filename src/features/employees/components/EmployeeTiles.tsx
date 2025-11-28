import './EmployeeTiles.css'
import type { Employee } from '../graphql'
import { EmployeeTileMenu } from './EmployeeTileMenu'
import { employeeImageByName } from '../profileImages'

export type EmployeeTile = Pick<
  Employee,
  | 'id'
  | 'name'
  | 'employeeType'
  | 'department'
  | 'performanceScore'
  | 'employmentStatus'
  | 'isFlagged'
  | 'flagReason'
>

type EmployeeTilesProps = {
  items: EmployeeTile[]
  isAdmin: boolean
  onTileClick: (id: string) => void
  onEdit: (id: string) => void
  onFlag: (id: string) => void
  onDelete: (id: string) => void
}

export function EmployeeTiles({
  items,
  isAdmin,
  onTileClick,
  onEdit,
  onFlag,
  onDelete,
}: EmployeeTilesProps) {
  return (
    <div className="tiles-grid">
      {items.map((emp) => (
        <button
          key={emp.id}
          type="button"
          className="tile-card"
          onClick={() => onTileClick(emp.id)}
        >
          <div className="tile-card-header">
            <div className="tile-avatar">
              {employeeImageByName[emp.name] ? (
                <img
                  src={employeeImageByName[emp.name]}
                  alt={emp.name}
                  className="tile-avatar-img"
                />
              ) : (
                <span>{emp.name.charAt(0)}</span>
              )}
            </div>
            <div className="tile-title-block">
              <span className="tile-name">{emp.name}</span>
              <span className="tile-tagline">
                {emp.employeeType} · {emp.department}
              </span>
            </div>
            <EmployeeTileMenu
              isAdmin={isAdmin}
              isFlagged={emp.isFlagged}
              onEdit={() => onEdit(emp.id)}
              onFlag={() => onFlag(emp.id)}
              onDelete={() => onDelete(emp.id)}
            />
          </div>

          <div className="tile-metrics">
            <div className="metric">
              <span className="metric-label">Performance</span>
              <span className="metric-value">
                {emp.performanceScore != null ? `${emp.performanceScore.toFixed(0)} / 100` : '—'}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Status</span>
              <span className={`status-pill status-${emp.employmentStatus.toLowerCase()}`}>
                {emp.employmentStatus}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}


