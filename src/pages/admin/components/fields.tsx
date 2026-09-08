import type { ReactNode } from 'react'

export const inputClass =
  'mt-1.5 w-full rounded-md border border-navy-100 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">{label}</span>
      {children}
    </label>
  )
}
