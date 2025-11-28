import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './EmployeeFormDialog.css'
import type { Department, Employee, EmployeeType, EmploymentStatus } from '../graphql'
import { Select } from '../../../components/controls/Select'

type BaseFormValues = {
  name: string
  age: string
  class: string
  subjects: string
  attendance: string
  employeeType: EmployeeType
  department: Department
  contactNumber: string
  assignedRegion: string
  employmentStatus: EmploymentStatus
}

type EmployeeFormDialogProps = {
  mode: 'create' | 'edit'
  open: boolean
  initial?: Employee | null
  onClose: () => void
  onSubmit: (values: BaseFormValues) => void
  loading?: boolean
}

const defaultValues: BaseFormValues = {
  name: '',
  age: '',
  class: '',
  subjects: '',
  attendance: '',
  employeeType: 'DRIVER',
  department: 'OPERATIONS',
  contactNumber: '',
  assignedRegion: '',
  employmentStatus: 'ACTIVE',
}

export function EmployeeFormDialog({
  mode,
  open,
  initial,
  onClose,
  onSubmit,
  loading,
}: EmployeeFormDialogProps) {
  const [values, setValues] = useState<BaseFormValues>(defaultValues)

  useEffect(() => {
    if (initial && open) {
      setValues({
        name: initial.name,
        age: String(initial.age),
        class: initial.class,
        subjects: initial.subjects.join(', '),
        attendance: String(initial.attendance),
        employeeType: initial.employeeType,
        department: initial.department,
        contactNumber: initial.contactNumber,
        assignedRegion: initial.assignedRegion ?? '',
        employmentStatus: initial.employmentStatus,
      })
    } else if (open) {
      setValues(defaultValues)
    }
  }, [initial, open])

  function handleChange<K extends keyof BaseFormValues>(key: K, value: BaseFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="detail-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="form-dialog"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <header className="form-header">
              <h2>{mode === 'create' ? 'Add employee' : 'Edit employee'}</h2>
            </header>
            <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              required
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Age</label>
            <input
              type="number"
              min={18}
              value={values.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Class</label>
            <input
              value={values.class}
              onChange={(e) => handleChange('class', e.target.value)}
              placeholder="A-Level"
            />
          </div>
          <div className="field">
            <label>Subjects</label>
            <input
              value={values.subjects}
              onChange={(e) => handleChange('subjects', e.target.value)}
              placeholder="Route Planning, Safety"
            />
          </div>
          <div className="field">
            <label>Attendance %</label>
            <input
              type="number"
              min={0}
              max={100}
              value={values.attendance}
              onChange={(e) => handleChange('attendance', e.target.value)}
            />
          </div>

          <div className="field">
            <label>Type</label>
            <Select
              value={values.employeeType}
              options={[
                { value: 'DRIVER', label: 'Driver' },
                { value: 'DISPATCHER', label: 'Dispatcher' },
                { value: 'WAREHOUSE_STAFF', label: 'Warehouse' },
                { value: 'ADMIN', label: 'Admin' },
              ]}
              onChange={(val) => handleChange('employeeType', (val as EmployeeType) || 'DRIVER')}
            />
          </div>
          <div className="field">
            <label>Department</label>
            <Select
              value={values.department}
              options={[
                { value: 'OPERATIONS', label: 'Operations' },
                { value: 'DISPATCH', label: 'Dispatch' },
                { value: 'WAREHOUSE', label: 'Warehouse' },
                { value: 'ADMINISTRATION', label: 'Administration' },
              ]}
              onChange={(val) =>
                handleChange('department', (val as Department) || 'OPERATIONS')
              }
            />
          </div>
          <div className="field">
            <label>Contact</label>
            <input
              required
              value={values.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Region</label>
            <input
              value={values.assignedRegion}
              onChange={(e) => handleChange('assignedRegion', e.target.value)}
              placeholder="Northeast"
            />
          </div>
          <div className="field">
            <label>Status</label>
            <Select
              value={values.employmentStatus}
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'ON_LEAVE', label: 'On leave' },
                { value: 'TERMINATED', label: 'Terminated' },
              ]}
              onChange={(val) =>
                handleChange('employmentStatus', (val as EmploymentStatus) || 'ACTIVE')
              }
            />
          </div>

              <footer className="form-footer">
                <button type="button" className="ghost-chip" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Saving…' : mode === 'create' ? 'Create employee' : 'Save changes'}
                </button>
              </footer>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


