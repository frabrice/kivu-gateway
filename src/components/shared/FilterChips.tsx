type FilterChipsProps = {
  label?: string
  options: string[]
  value: string
  onChange: (value: string) => void
  allLabel?: string
}

export default function FilterChips({ label, options, value, onChange, allLabel = 'All' }: FilterChipsProps) {
  const items = [allLabel, ...options]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="mr-1 text-xs font-bold uppercase tracking-wide text-navy-400">{label}</span>}
      {items.map((item) => {
        const isActive = item === value
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              isActive ? 'bg-blue-500 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
