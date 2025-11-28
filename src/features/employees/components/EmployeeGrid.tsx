import './EmployeeGrid.css'
import type { Employee } from '../graphql'
import { employeeImageByName } from '../profileImages'
import { FiEdit2, FiTrash2, FiFlag } from 'react-icons/fi'

export type EmployeeGridRow = Pick<
  Employee,
  | 'id'
  | 'name'
  | 'age'
  | 'employeeType'
  | 'department'
  | 'contactNumber'
  | 'assignedRegion'
  | 'employmentStatus'
  | 'performanceScore'
  | 'attendance'
  | 'isFlagged'
  | 'flagReason'
>

type EmployeeGridProps = {
  rows: EmployeeGridRow[]
  isAdmin: boolean
  onRowClick: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleFlag: (id: string, currentlyFlagged?: boolean | null) => void
}

export function EmployeeGrid({
  rows,
  isAdmin,
  onRowClick,
  onEdit,
  onDelete,
  onToggleFlag,
}: EmployeeGridProps) {
  return (
    <div className="employee-grid-wrap">
      <div className="employee-grid">
        <div className="employee-grid-head">
          <div>Name</div>
          <div>Age</div>
          <div>Type</div>
          <div>Department</div>
          <div>Contact</div>
          <div>Region</div>
          <div>Status</div>
          <div>Score</div>
          <div>Attendance</div>
          <div>Actions</div>
        </div>
        <div className="employee-grid-body">
          {rows.map((row) => (
            <button
              key={row.id}
              type="button"
              className="employee-grid-row"
              onClick={() => onRowClick(row.id)}
            >
              <div className="cell-strong">
                <span className="avatar-pill">
                  {employeeImageByName[row.name] ? (
                    <img
                      src={employeeImageByName[row.name]}
                      alt={row.name}
                      className="avatar-img"
                    />
                  ) : (
                    row.name.charAt(0)
                  )}
                </span>
                <div className="cell-name">
                  <span>{row.name}</span>
                  <span className="cell-sub">{row.employeeType}</span>
                </div>
              </div>
              <div>{row.age}</div>
              <div>{row.employeeType}</div>
              <div>{row.department}</div>
              <div>{row.contactNumber}</div>
              <div>{row.assignedRegion ?? '—'}</div>
              <div>
                <span className={`status-pill status-${row.employmentStatus.toLowerCase()}`}>
                  {row.employmentStatus}
                </span>
              </div>
              <div>{row.performanceScore ?? '—'}</div>
              <div>{row.attendance.toFixed(1)}%</div>
              <div className="cell-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`icon-action-btn flag ${row.isFlagged ? 'active' : ''}`}
                  onClick={() => onToggleFlag(row.id, row.isFlagged)}
                  aria-label={row.isFlagged ? 'Unflag employee' : 'Flag employee'}
                >
                  <FiFlag />
                </button>
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      className="icon-action-btn"
                      onClick={() => onEdit(row.id)}
                      aria-label="Edit employee"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      className="icon-action-btn danger"
                      onClick={() => onDelete(row.id)}
                      aria-label="Delete employee"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


