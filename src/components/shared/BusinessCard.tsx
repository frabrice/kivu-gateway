import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import type { Business } from '../../data/types'

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      to={`/business/directory/${business.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={business.images[0]}
          alt={business.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {business.tier === 'featured' && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[11px] font-bold text-white">
            <Star size={11} className="fill-white" /> Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-blue-600">{business.category}</span>
        <h3 className="mt-1 font-heading text-base font-bold text-navy-700">{business.name}</h3>
        <p className="mt-1 text-xs text-navy-400">{business.tagline}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-semibold text-navy-500">
          <MapPin size={13} className="text-blue-500" />
          {business.city}
        </div>
      </div>
    </Link>
  )
}
