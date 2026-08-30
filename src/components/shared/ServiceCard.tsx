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
    <div className="flex flex-col items-center rounded-xl border border-navy-100 bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-600">
        <Icon size={26} className="text-gold-500" />
      </span>
      <h3 className="mt-4 font-heading text-base font-bold text-navy-700">{title}</h3>
      <p className="mt-2 text-sm text-navy-400">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gold-600 hover:text-gold-700"
      >
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  )
}
