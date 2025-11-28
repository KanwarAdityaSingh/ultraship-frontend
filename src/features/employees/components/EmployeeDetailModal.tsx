import { useQuery } from '@apollo/client/react'
import { AnimatePresence, motion } from 'framer-motion'
import './EmployeeDetailModal.css'
import { GET_EMPLOYEE, type Employee } from '../graphql'
import { employeeImageByName } from '../profileImages'

type EmployeeDetailModalProps = {
  id: string | null
  onClose: () => void
}

type EmployeeResponse = {
  employee: Employee
}

export function EmployeeDetailModal({ id, onClose }: EmployeeDetailModalProps) {
  const { data, loading, error } = useQuery<EmployeeResponse>(GET_EMPLOYEE, {
    variables: { id },
    skip: !id,
  })

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          className="detail-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="detail-dialog"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {loading && <p className="detail-loading">Loading employee details…</p>}
            {error && <p className="detail-error">Unable to load details: {error.message}</p>}
            {data && <EmployeeDetailContent employee={data.employee} onClose={onClose} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmployeeDetailContent({ employee, onClose }: { employee: Employee; onClose: () => void }) {
  return (
    <div className="detail-layout">
      <header className="detail-header">
        <div className="detail-header-main">
          <div className="detail-avatar">
            {employeeImageByName[employee.name] ? (
              <img
                src={employeeImageByName[employee.name]}
                alt={employee.name}
                className="detail-avatar-img"
              />
            ) : (
              <span>{employee.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="detail-name">{employee.name}</h2>
            <p className="detail-sub">
              {employee.employeeType} · {employee.department}
            </p>
          </div>
        </div>
        <button type="button" className="ghost-chip" onClick={onClose}>
          Close
        </button>
      </header>

      <section className="detail-two-column">
        <div className="detail-column">
          <h3>Overview</h3>
          <dl className="detail-list">
            <div>
              <dt>Age</dt>
              <dd>{employee.age}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{employee.contactNumber}</dd>
            </div>
            <div>
              <dt>Emergency contact</dt>
              <dd>{employee.emergencyContact ?? '—'}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{employee.employmentStatus}</dd>
            </div>
            <div>
              <dt>Hire date</dt>
              <dd>{new Date(employee.hireDate).toLocaleDateString()}</dd>
            </div>
            <div>
              <dt>Shift</dt>
              <dd>{employee.shiftSchedule ?? '—'}</dd>
            </div>
          </dl>
        </div>

        <div className="detail-column">
          <h3>Assignment & Performance</h3>
          <dl className="detail-list">
            <div>
              <dt>Region</dt>
              <dd>{employee.assignedRegion ?? '—'}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{employee.vehicleAssigned ?? '—'}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{employee.currentLocation ?? '—'}</dd>
            </div>
            <div>
              <dt>Score</dt>
              <dd>{employee.performanceScore ?? '—'}</dd>
            </div>
            <div>
              <dt>On-time delivery</dt>
              <dd>
                {employee.onTimeDeliveryRate != null
                  ? `${employee.onTimeDeliveryRate.toFixed(1)}%`
                  : '—'}
              </dd>
            </div>
            <div>
              <dt>Attendance</dt>
              <dd>{employee.attendance.toFixed(1)}%</dd>
            </div>
          </dl>
        </div>
      </section>

      {employee.licenseNumber && (
        <section className="detail-section">
          <h3>Licensing & Certifications</h3>
          <dl className="detail-list horizontal">
            <div>
              <dt>License</dt>
              <dd>{employee.licenseNumber}</dd>
            </div>
            <div>
              <dt>Expiry</dt>
              <dd>{employee.licenseExpiry ? employee.licenseExpiry.split('T')[0] : '—'}</dd>
            </div>
            <div>
              <dt>Certifications</dt>
              <dd>{employee.certifications.join(', ') || '—'}</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="detail-section">
        <h3>Subjects & Class</h3>
        <p className="detail-chip-row">
          <span className="detail-chip">{employee.class}</span>
          {employee.subjects.map((subj) => (
            <span key={subj} className="detail-chip muted">
              {subj}
            </span>
          ))}
        </p>
      </section>
    </div>
  )
}


