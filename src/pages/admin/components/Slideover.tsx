import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type SlideoverProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export default function Slideover({ open, title, onClose, children }: SlideoverProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-navy-900/40" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
          <h2 className="font-heading text-base font-bold text-navy-700">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-navy-400 hover:bg-navy-50" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
