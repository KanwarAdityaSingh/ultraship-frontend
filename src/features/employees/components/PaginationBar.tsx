import './PaginationBar.css'
import { Select } from '../../../components/controls/Select'

type PaginationBarProps = {
  totalCount: number
  pageSize: number
  pageIndex: number
  onPageSizeChange: (size: number) => void
  onPageChange: (index: number) => void
}

const PAGE_SIZES = [10, 25, 50, 100]

export function PaginationBar({
  totalCount,
  pageSize,
  pageIndex,
  onPageSizeChange,
  onPageChange,
}: PaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize || 1))
  const currentPage = pageIndex + 1

  const start = totalCount === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(totalCount, (pageIndex + 1) * pageSize)

  return (
    <div className="pagination-bar">
      <div className="pagination-left">
        <span className="muted">
          Showing {start}-{end} of {totalCount}
        </span>
      </div>
      <div className="pagination-right">
        <Select
          size="sm"
          value={String(pageSize)}
          options={PAGE_SIZES.map((size) => ({
            value: String(size),
            label: `${size} / page`,
          }))}
          onChange={(val) => onPageSizeChange(Number(val || pageSize))}
        />
        <button
          type="button"
          className="pager-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(pageIndex - 1)}
        >
          Prev
        </button>
        <span className="pager-page">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          className="pager-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(pageIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}


