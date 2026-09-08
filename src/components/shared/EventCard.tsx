import { Link } from 'react-router-dom'
import { Calendar, MapPin } from 'lucide-react'
import type { Event } from '../../data/types'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy-800/90 px-2.5 py-1 text-[11px] font-bold text-white">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-bold text-navy-700">{event.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-navy-500">
          <Calendar size={13} className="text-blue-500" />
          {formatDate(event.date)} · {event.time}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-navy-500">
          <MapPin size={13} className="text-blue-500" />
          {event.venue}, {event.city}
        </div>
      </div>
    </Link>
  )
}

export { formatDate }
