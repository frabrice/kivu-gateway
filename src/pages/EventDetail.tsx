import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin, Tag } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import { formatDate } from '../components/shared/EventCard'

export default function EventDetail() {
  const { id } = useParams()
  const { events } = useData()
  const event = events.find((e) => e.id === id)

  useDocumentTitle(event ? event.title : 'Event Not Found', event?.description)

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-700">Event not found</h1>
        <Link to="/events" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <ArrowLeft size={15} /> Back to Events
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link to="/events" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white">
            <ArrowLeft size={14} /> Back to Events
          </Link>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{event.category}</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-lg font-bold text-navy-700">About this event</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">{event.description}</p>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Calendar size={16} className="shrink-0 text-blue-600" />
                <span className="text-navy-600">{formatDate(event.date)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="shrink-0 text-blue-600" />
                <span className="text-navy-600">{event.time}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />
                <span className="text-navy-600">{event.venue}, {event.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Tag size={16} className="shrink-0 text-blue-600" />
                <span className="text-navy-600">{event.category}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
