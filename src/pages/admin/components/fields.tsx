import type { ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export const inputClass =
  'mt-1.5 w-full rounded-md border border-navy-100 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-navy-400">{hint}</span>}
    </label>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-navy-100 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
      {children}
    </div>
  )
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
}

export function Grid3({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{children}</div>
}

type ImageListFieldProps = {
  label: string
  images: string[]
  onChange: (images: string[]) => void
}

export function ImageListField({ label, images, onChange }: ImageListFieldProps) {
  function updateAt(index: number, value: string) {
    onChange(images.map((img, i) => (i === index ? value : img)))
  }
  function removeAt(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }
  function add() {
    onChange([...images, ''])
  }

  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">{label}</span>
      <div className="mt-1.5 space-y-2">
        {images.map((img, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={inputClass + ' mt-0'}
              placeholder="https://images.unsplash.com/..."
              value={img}
              onChange={(e) => updateAt(i, e.target.value)}
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="shrink-0 rounded-md p-2 text-navy-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove photo"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
      >
        <Plus size={14} /> Add another photo
      </button>
    </div>
  )
}
