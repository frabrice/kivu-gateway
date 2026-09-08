import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import FilterChips from '../components/shared/FilterChips'
import EventCard from '../components/shared/EventCard'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import type { City } from '../data/types'

const CITIES: City[] = ['Goma', 'Gisenyi']

export default function Events() {
  useDocumentTitle('Events', "What's happening in Goma and Gisenyi — business forums, music, community days and more.")
  const { events } = useData()
  const [city, setCity] = useState('All')

  const filtered = useMemo(
    () =>
      events
        .filter((e) => city === 'All' || e.city === city)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events, city],
  )

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Business forums, music nights, community days and more — happening in Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=40"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FilterChips label="City" options={CITIES} value={city} onChange={setCity} />

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-navy-400">No events match that filter right now.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <CTABand title="Hosting an event in Goma or Gisenyi?" description="Get it listed here so more people know about it." primaryLabel="Submit an Event" />
    </>
  )
}
