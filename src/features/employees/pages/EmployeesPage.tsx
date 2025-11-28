import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@apollo/client/react'
import { useQuery } from '@apollo/client/react'
import './EmployeesPage.css'
import { useAuth } from '../../../context/AuthContext'
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  FLAG_EMPLOYEE,
  UNFLAG_EMPLOYEE,
  type Employee,
} from '../graphql'
import { EmployeeGrid } from '../components/EmployeeGrid'
import { EmployeeTiles } from '../components/EmployeeTiles'
import { EmployeeDetailModal } from '../components/EmployeeDetailModal'
import { EmployeeFormDialog } from '../components/EmployeeFormDialog'
import { FiltersBar, type EmployeeFilters, type SortInput } from '../components/FiltersBar'
import { PaginationBar } from '../components/PaginationBar'
import { ConfirmDialog } from '../../../components/overlays/ConfirmDialog'

type EmployeesResponse = {
  employees: {
    edges: { node: Employee; cursor: string }[]
    totalCount: number
  }
}

type ViewMode = 'grid' | 'tiles'

export function EmployeesPage() {
  const { role } = useAuth()
  const isAdmin = role === 'ADMIN'

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filters, setFilters] = useState<EmployeeFilters>({})
  const [sort, setSort] = useState<SortInput>({ field: 'performanceScore', order: 'desc' })
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [pendingFlag, setPendingFlag] = useState<{ id: string; isFlagged?: boolean | null } | null>(
    null,
  )

  const variables = useMemo(
    () => ({
      first: pageSize,
      skip: pageIndex * pageSize,
      filter: {
        employeeType: filters.employeeType,
        department: filters.department,
        employmentStatus: filters.employmentStatus,
        assignedRegion: filters.assignedRegion,
        search: filters.search,
      },
      sort,
    }),
    [filters, sort, pageSize, pageIndex],
  )

  const { data, loading, error, refetch } = useQuery<EmployeesResponse>(GET_EMPLOYEES, {
    variables,
  })

  const [addEmployee, { loading: isCreating }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => refetch(),
  })

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => refetch(),
  })

  const [updateEmployee, { loading: isUpdating }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => refetch(),
  })

  const [flagEmployee] = useMutation(FLAG_EMPLOYEE, {
    onCompleted: () => refetch(),
  })

  const [unflagEmployee] = useMutation(UNFLAG_EMPLOYEE, {
    onCompleted: () => refetch(),
  })

  const employees = data?.employees.edges.map((e) => e.node) ?? []
  const totalCount = data?.employees.totalCount ?? 0

  function openCreate() {
    setFormMode('create')
    setEditingEmployee(null)
    setFormOpen(true)
  }

  function openEdit(id: string) {
    const emp = employees.find((e) => e.id === id)
    if (!emp) return
    setFormMode('edit')
    setEditingEmployee(emp)
    setFormOpen(true)
  }

  function toggleFlag(id: string, isFlagged?: boolean | null) {
    if (isFlagged) {
      unflagEmployee({ variables: { id } })
    } else {
      flagEmployee({
        variables: { id, reason: 'Performance review needed' },
      })
    }
  }

  return (
    <motion.div
      className="employees-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <header className="employees-header">
        <div>
          <h1 className="employees-title">Employee Galaxy</h1>
          <p className="employees-subtitle">
            Explore every driver, dispatcher, and warehouse hero in a single, elegant view.
          </p>
        </div>
        <div className="employees-header-actions">
          <div className="employees-header-buttons">
            {isAdmin && (
              <button type="button" className="submit-btn small" onClick={openCreate}>
                Add employee
              </button>
            )}
            <div className="view-toggle-group">
              <button
                type="button"
                className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                type="button"
                className={`view-toggle ${viewMode === 'tiles' ? 'active' : ''}`}
                onClick={() => setViewMode('tiles')}
              >
                Tiles
              </button>
            </div>
          </div>
        </div>
      </header>

      <FiltersBar value={filters} sort={sort} onChange={setFilters} onSortChange={setSort} />

      {loading && (
        <section className="employees-placeholder">
          <p>Loading your employee constellation…</p>
        </section>
      )}

      {error && !loading && (
        <section className="employees-placeholder error">
          <p>Something went wrong loading employees: {error.message}</p>
        </section>
      )}

      {!loading && !error && employees.length === 0 && (
        <section className="employees-placeholder">
          <p>No employees match this view yet. Try adjusting filters or add a new employee.</p>
        </section>
      )}

      {!loading && !error && employees.length > 0 && (
        <>
          {viewMode === 'grid' ? (
            <EmployeeGrid
              rows={employees}
              isAdmin={isAdmin}
              onRowClick={(id) => setSelectedId(id)}
              onEdit={openEdit}
              onDelete={(id) => {
                setPendingDeleteId(id)
              }}
              onToggleFlag={(id, isFlagged) => setPendingFlag({ id, isFlagged })}
            />
          ) : (
            <EmployeeTiles
              items={employees}
              isAdmin={isAdmin}
              onTileClick={(id) => setSelectedId(id)}
              onEdit={openEdit}
              onFlag={(id) => {
                const current = employees.find((e) => e.id === id)
                setPendingFlag({ id, isFlagged: current?.isFlagged })
              }}
              onDelete={(id) => {
                setPendingDeleteId(id)
              }}
            />
          )}

          <PaginationBar
            totalCount={totalCount}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageSizeChange={(size) => {
              setPageIndex(0)
              setPageSize(size)
            }}
            onPageChange={setPageIndex}
          />
        </>
      )}

      <EmployeeDetailModal id={selectedId} onClose={() => setSelectedId(null)} />

      {isAdmin && (
        <EmployeeFormDialog
          mode={formMode}
          open={formOpen}
          initial={editingEmployee}
          onClose={() => setFormOpen(false)}
          onSubmit={(values) => {
            const baseInput = {
              name: values.name,
              age: parseInt(values.age || '0', 10),
              class: values.class || 'A-Level',
              subjects: values.subjects
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
              attendance: parseFloat(values.attendance || '0'),
              employeeType: values.employeeType,
              department: values.department,
              contactNumber: values.contactNumber,
              employmentStatus: values.employmentStatus,
              assignedRegion: values.assignedRegion || null,
            }

            const op =
              formMode === 'create'
                ? addEmployee({
                    variables: { input: baseInput },
                  })
                : editingEmployee
                  ? updateEmployee({
                      variables: {
                        id: editingEmployee.id,
                        input: baseInput,
                      },
                    })
                  : Promise.resolve()

            op.then(() => setFormOpen(false))
          }}
          loading={formMode === 'create' ? isCreating : isUpdating}
        />
      )}
      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete employee?"
        body="This will mark the employee as deleted. You can no longer manage them in Ultraship TMS."
        confirmLabel="Delete"
        tone="danger"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (!pendingDeleteId) return
          deleteEmployee({ variables: { id: pendingDeleteId } }).finally(() =>
            setPendingDeleteId(null),
          )
        }}
      />
      <ConfirmDialog
        open={Boolean(pendingFlag)}
        title={pendingFlag?.isFlagged ? 'Unflag employee?' : 'Flag employee for review?'}
        body={
          pendingFlag?.isFlagged
            ? 'This will clear the review flag for this employee.'
            : 'This will flag the employee for performance review. Admins will see this in their workflows.'
        }
        confirmLabel={pendingFlag?.isFlagged ? 'Unflag' : 'Flag'}
        onCancel={() => setPendingFlag(null)}
        onConfirm={() => {
          if (!pendingFlag) return
          toggleFlag(pendingFlag.id, pendingFlag.isFlagged)
          setPendingFlag(null)
        }}
      />
    </motion.div>
  )
}

