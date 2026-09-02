import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  description: string
  to: string
}

export default function ServiceCard({ icon: Icon, title, description, to }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-navy-100 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        <Icon size={22} className="text-blue-600" />
      </span>
      <h3 className="mt-3 font-heading text-sm font-bold text-navy-700">{title}</h3>
      <p className="mt-1.5 text-xs text-navy-400">{description}</p>
      <Link
        to={to}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        Explore <ArrowRight size={13} />
      </Link>
    </div>
  )
}
