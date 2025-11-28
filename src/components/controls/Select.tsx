import { useEffect, useRef, useState } from 'react'
import './Select.css'

export type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  value?: string
  placeholder?: string
  options: SelectOption[]
  onChange: (value: string | undefined) => void
  size?: 'sm' | 'md'
}

export function Select({ value, placeholder, options, onChange, size = 'md' }: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const selected = options.find((opt) => opt.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(val: string) {
    setOpen(false)
    onChange(val || undefined)
  }

  return (
    <div className={`select-root ${size}`} ref={ref}>
      <button
        type="button"
        className="select-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`select-label ${selected ? '' : 'placeholder'}`}>
          {selected?.label ?? placeholder ?? 'Select'}
        </span>
        <span className="select-chevron">▾</span>
      </button>
      {open && (
        <div className="select-menu" role="listbox">
          {options.map((opt) => (
            <button
              key={opt.value || opt.label}
              type="button"
              className={`select-option ${opt.value === value ? 'active' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


