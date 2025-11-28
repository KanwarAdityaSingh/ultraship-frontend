import { useEffect, useState } from 'react'
import './FiltersBar.css'
import { Select } from '../../../components/controls/Select'
import type { Department, EmployeeType, EmploymentStatus } from '../graphql'

export type EmployeeFilters = {
  employeeType?: EmployeeType
  department?: Department
  employmentStatus?: EmploymentStatus
  assignedRegion?: string
  search?: string
}

export type SortField =
  | 'name'
  | 'age'
  | 'hireDate'
  | 'performanceScore'
  | 'onTimeDeliveryRate'
  | 'attendance'

export type SortInput = {
  field: SortField
  order: 'asc' | 'desc'
}

type FiltersBarProps = {
  value: EmployeeFilters
  sort: SortInput
  onChange: (filters: EmployeeFilters) => void
  onSortChange: (sort: SortInput) => void
}

export function FiltersBar({ value, sort, onChange, onSortChange }: FiltersBarProps) {
  const [searchTerm, setSearchTerm] = useState(value.search ?? '')

  useEffect(() => {
    const handle = setTimeout(() => {
      onChange({ ...value, search: searchTerm || undefined })
    }, 300)
    return () => clearTimeout(handle)
  }, [searchTerm])

  return (
    <div className="filters-bar">
      <div className="filters-main">
        <div className="field">
          <label>Search</label>
          <input
            type="search"
            placeholder="Search by name, contact, license…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Type</label>
          <Select
            value={value.employeeType ?? ''}
            placeholder="All"
            options={[
              { value: '', label: 'All' },
              { value: 'DRIVER', label: 'Driver' },
              { value: 'DISPATCHER', label: 'Dispatcher' },
              { value: 'WAREHOUSE_STAFF', label: 'Warehouse' },
              { value: 'ADMIN', label: 'Admin' },
            ]}
            onChange={(val) =>
              onChange({
                ...value,
                employeeType: (val || undefined) as EmployeeType | undefined,
              })
            }
          />
        </div>
        <div className="field">
          <label>Department</label>
          <Select
            value={value.department ?? ''}
            placeholder="All"
            options={[
              { value: '', label: 'All' },
              { value: 'OPERATIONS', label: 'Operations' },
              { value: 'DISPATCH', label: 'Dispatch' },
              { value: 'WAREHOUSE', label: 'Warehouse' },
              { value: 'ADMINISTRATION', label: 'Administration' },
            ]}
            onChange={(val) =>
              onChange({
                ...value,
                department: (val || undefined) as Department | undefined,
              })
            }
          />
        </div>
        <div className="field">
          <label>Status</label>
          <Select
            value={value.employmentStatus ?? ''}
            placeholder="All"
            options={[
              { value: '', label: 'All' },
              { value: 'ACTIVE', label: 'Active' },
              { value: 'ON_LEAVE', label: 'On leave' },
              { value: 'TERMINATED', label: 'Terminated' },
            ]}
            onChange={(val) =>
              onChange({
                ...value,
                employmentStatus: (val || undefined) as EmploymentStatus | undefined,
              })
            }
          />
        </div>
        <div className="field">
          <label>Region</label>
          <input
            type="text"
            placeholder="Any"
            value={value.assignedRegion ?? ''}
            onChange={(e) =>
              onChange({
                ...value,
                assignedRegion: e.target.value || undefined,
              })
            }
          />
        </div>
      </div>

      <div className="filters-sort">
        <div className="field">
          <label>Sort by</label>
          <Select
            value={sort.field}
            options={[
              { value: 'performanceScore', label: 'Performance' },
              { value: 'onTimeDeliveryRate', label: 'On-time delivery' },
              { value: 'attendance', label: 'Attendance' },
              { value: 'name', label: 'Name' },
              { value: 'age', label: 'Age' },
              { value: 'hireDate', label: 'Hire date' },
            ]}
            onChange={(val) =>
              onSortChange({ ...sort, field: (val ?? 'performanceScore') as SortField })
            }
          />
        </div>
        <div className="field compact">
          <label>Order</label>
          <button
            type="button"
            className={`order-toggle ${sort.order}`}
            onClick={() =>
              onSortChange({
                ...sort,
                order: sort.order === 'asc' ? 'desc' : 'asc',
              })
            }
          >
            <span className={`order-pill ${sort.order === 'asc' ? 'active' : ''}`}>Asc</span>
            <span className={`order-pill ${sort.order === 'desc' ? 'active' : ''}`}>Desc</span>
          </button>
        </div>
      </div>
    </div>
  )
}


