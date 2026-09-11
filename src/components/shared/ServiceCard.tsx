import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  description: string
  to: string
  image: string
}

export default function ServiceCard({ icon: Icon, title, description, to, image }: ServiceCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white text-center transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="relative h-28 w-full overflow-hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 via-navy-800/10 to-transparent" />
        <span className="absolute bottom-2 left-1/2 flex h-10 w-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-blue-500 shadow-card">
          <Icon size={18} className="text-white" />
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-8">
        <h3 className="font-heading text-sm font-bold text-navy-700">{title}</h3>
        <p className="mt-1.5 text-xs text-navy-400">{description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
          Explore <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  )
}
